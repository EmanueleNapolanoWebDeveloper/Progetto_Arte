<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Models\Auth\PasswordResetTokens;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ResetPasswordController extends Controller
{
    public function __invoke(ResetPasswordRequest $request)
    {
        //validazione dati entrata
        $validated = $request->validated();


        $response = DB::transaction(function () use ($validated) {

            //recupero user
            $user = User::where('email', $validated['email'])->first();

            if (!$user) {
                return [
                    'success' => false,
                    'status' => 422,
                    'message' => 'Questo link di recupero non è valido o è già stato utilizzato.',
                ];
            }

            $candidates = PasswordResetTokens::where('user_id', $user->id)
                ->whereNull('used_at')
                ->orderByDesc('created_at')
                ->get();

            //ricerca token reset-password
            $resetRecord = $candidates->first(
                function ($record) use ($validated) {
                    return hash_equals($record->token_hash, hash('sha256', $validated['token']));
                }
            );

            //----->GUARDS

            //token non esiste
            if (!$resetRecord) {
                return [
                    'success' => false,
                    'status' => 422,
                    'message' => 'Questo link di recupero non è valido o è già stato utilizzato.'
                ];
            }

            //token scaduto
            if (now()->greaterThan($resetRecord->expires_at)) {

                //puliamo token scaduto
                PasswordResetTokens::where('id', $resetRecord->id)
                    ->update([
                        'used_at' => now(),
                    ]);

                return [
                    'success' => false,
                    'status' => 410,
                    'message' => 'Il link di recupero è scaduto. Richiedi una nuova email.'
                ];
            }

            //TOEKN VALIDO - AGGIORNA PASSWORD
            $user->update([
                'password' => Hash::make($validated['password'])
            ]);

            //INVALIDAZIONI SESSIONE ATTIVE
            DB::table('sessions')
                ->where('user_id', $user->id)
                ->delete();

            //revoca access token utente
            $user->tokens()->delete();

            //eliminazione token usato
            PasswordResetTokens::where('user_id', $user->id)
                ->whereNull('used_at')
                ->update([
                    'used_at' => now()
                ]);

            return [
                'success' => true,
                'status' => 200,
                'user' => $user,
                'message' => 'Password aggiornata con successo.'
            ];
        });

        if ($response['success']) {
            event(new PasswordReset($response['user']));
        }

        //RISPOSTA PER FRONT END
        if (!$response['success']) {
            return response()->json([
                'message' => $response['message'],
            ], $response['status']);
        }

        return response()->json([
            'message' => $response['message'],
        ], 200);
    }
}
