<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Mail\ResetPasswordNotification;
use App\Models\Auth\PasswordResetTokens;
use App\Models\User\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class ForgotPasswordController extends Controller
{
    public function __invoke(Request $request)
    {

        $validated = $request->validate([
            'email' => ['required', 'string', 'email'],
        ]);

        //recupero email
        $user = User::where('email', $validated['email'])
            ->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Questo indirizzo email non è associato a nessun account.'
            ], 404);
        }

        $token = DB::transaction(function () use ($user) {
            $plainToken = Str::random(64);
            $tokenHash = hash('sha256', $plainToken);

            //invalida token precedenti ancora validid
            PasswordResetTokens::where('user_id', $user->id)
                ->whereNull('used_at')
                ->update(['used_at' => now()]);

            //inserisci nuovo token valido
            PasswordResetTokens::create([
                'id' => (string) Str::uuid(),
                'user_id' => $user->id,
                'token_hash' => $tokenHash,
                'expires_at' => now()->addHour(), // scadenza dopo 1 ora
                'created_at' => now(),
            ]);

            return $plainToken;
        });

        Mail::to($user->email)->send(new ResetPasswordNotification($user, $token));

        return response()->json([
            'message' => 'Se l\'indirizzo esiste nel nostro sistema, riceverai a breve un\'email con le istruzioni per il reset.'
        ], 200);
    }
}
;


