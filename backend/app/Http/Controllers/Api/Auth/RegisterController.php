<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\VerifyEmailRequest;
use App\Http\Resources\UserResources;
use App\Mail\VerifyEmailNotification;
use App\Models\Auth\EmailVerificationToken;
use App\Models\Admin\Role;
use App\Models\User\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class RegisterController extends Controller
{

    // REGISTRAZIONE 1 - RICEVE DATI E INVIO EMAIL DI VERIFICA
    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();

        // DB::Transaction nel caso l'invio della mail fallisce
        $data = DB::transaction(function () use ($validated) {

            //creazione utente
            $user = User::create([
                'name' => $validated['name'],
                'username' => $validated['username'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'status' => 'pending',
            ]);

            //generazione token
            $token = Str::random(64);
            $tokenHash = hash('sha256', $token);

            //salva token in db email_verification_token
            EmailVerificationToken::create([
                'id' => (string) Str::uuid(),
                'user_id' => $user->id,
                'token_hash' => $tokenHash,
                'expires_at' => now()->addHours(24), // token valido per un giorno
                'created_at' => now(),
            ]);

            //assegnazione ruolo di default
            // $user->roles->attach($roleId);

            return compact('user', 'token');
        });

        // Invio mail all'utente passando token
        Mail::to($data['user']->email)->send(new VerifyEmailNotification($data['user'], $data['token']));

        return response()->json([
            'message' => 'Registrazione completata. Controlla la tua email per verificare l\'account.',
            'user' => new UserResources($data['user']),
        ], 201);
    }

    // REGISTRAZIONE 2 - VERIFICA EMAIL
    public function verifyEmail(VerifyEmailRequest $request)
    {
        $token = $request->validated('token');

        //hashing da front
        $tokenHash = hash('sha256', $token);

        //ricerca token (utilizzo transaction per evitare race condition) 
        $response = DB::transaction(function () use ($tokenHash) {

            //recupero token
            $storedToken = DB::table('email_verification_tokens')
                ->where('token_hash', $tokenHash)
                ->lockForUpdate()
                ->first();


            //======>GUARDS

            // token non esiste 
            if (!$storedToken) {
                return [
                    'success' => false,
                    'status' => 422,
                    'message' => 'Link di verifica non è valido!'
                ];
            }

            //token utilizzato
            if ($storedToken->used_at !== null) {
                return [
                    'success' => false,
                    'status' => 410,
                    'message' => 'Questo link è già stato utilizzato in precedenza'
                ];
            }

            //token scaduto 
            if (now()->greaterThan($storedToken->expires_at)) {
                return [
                    'success' => false,
                    'status' => 410,
                    'message' => 'Questo link di verifica è scaduto. Richiedine uno nuovo.',
                ];
            }


            // TOKEN VALIDO -> attivazione utente
            $user = User::find($storedToken->user_id);

            if (!$user) {
                return [
                    'success' => false,
                    'status' => 404,
                    'message' => 'Utente non trovato.',
                ];
            }

            //se email_verified è !== da null procedi lo stesso (nel caso utente abbia aperto 2 link diversi)
            if ($user->email_verified_at !== null) {
                return ['success' => true];
            }


            //CONTROLLI SUPERATI - PROCEDIAMO CON UPDATE
            if ($user) {
                $user->update([
                    'status' => 'active',
                    'email_verified_at' => now(),
                ]);
            }

            //------>ASSEGNAZIONE RUOLO 'CUSTOMER'

            // recupero ruolo
            $customerRole = Role::where('slug', 'customer')->first();

            //attach alla tabella pivot
            if ($customerRole) {
                $user->roles()->syncWithoutDetaching([ //syncWithOutDetaching serve in caso di richiesta simultanea, psql non restuiterà l'errore costraign
                    $customerRole->id => [
                        'id' => Str::uuid(),
                        'assigned_by' => null,
                        'assigned_at' => now()
                    ]
                ]);
            }


            //marchiamo token 
            EmailVerificationToken::where('id', $storedToken->id)
                ->update(['used_at' => now()]);


            // Invalidiamo eventuali altri token ancora attivi per lo stesso utente,
            EmailVerificationToken::where('user_id', $user->id)
                ->where('id', '!=', $storedToken->id)
                ->whereNull('used_at')
                ->update(['used_at' => now()]);


            return [
                'success' => true,
                'status' => 200,
                'message' => 'Account attivato con successo! Ora puoi effettuare il login.',
            ];
        });

        //--->RISPOSTA PER FRONT END

        //guard -> se response fallisce
        if (!$response['success']) {
            return response()->json([
                'error' => $response['message']
            ], $response['status']);
        }

        //se response è ok
        return response()->json([
            'message' => $response['message']
        ], 200);
    }
}
