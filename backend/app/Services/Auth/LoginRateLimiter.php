<?php

namespace App\Services\Auth;

use App\Models\Auth\LoginHistory;
use App\Models\User;
use Illuminate\Support\Facades\RateLimiter;

class LoginRateLimiter
{

    protected int $maxAttempts = 5;
    protected int $decayMinutes = 1;


    //geneazione di chiave univoca per identificare tentativvo login
    public function getThrottleKey(
        string $email,
        ?string $ip
    ): string {
        return 'login:' . md5($ip . '|' . strtolower(trim($email)));
    }

    // controllo se ha già superato tentativo di accesso (rate limiter)
    public function tooManyAttempt(string $key): bool
    {
        return RateLimiter::tooManyAttempts($key, $this->maxAttempts);
    }

    //contatore di tentativi, viene azzerato dopo 1 minuto
    public function hit(string $key): void
    {
        RateLimiter::hit($key, $this->decayMinutes * 60);
    }

    //gestione dei tentativi di login ed eventuale blocco
    public function handleFailedAttempt(
        User $user,
        string $email,
        ?string $ip,
        ?string $userAgent
    ): void {

        $user->increment('failed_login_attempts');

        $status = 'invalid_credentials';

        // se utente supera soglia di tentativi viene bloccato per 15 min
        if ($user->failed_login_attempts >= $this->maxAttempts) {
            $user->update([
                'locked_until' => now()->addMinutes(15)
            ]);
            $status = 'locked';
        }

        // Registrazione del log di tentativo fallito
        LoginHistory::create([
            'user_id' => $user->id,
            'email_attempt' => $email,
            'ip_address' => $ip ?? '0.0.0.0',
            'status' => $status,
            'user_agent' => $userAgent,
        ]);
    }

    //resetta contatori e ratelimiter
    public function clear(
        User $user,
        string $key
    ) {
        $user->update([
            'failed_login_attempts' => 0,
            'locked_until' => null,
        ]);

        RateLimiter::clear($key);
    }


}

