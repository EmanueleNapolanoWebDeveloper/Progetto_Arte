<?php

namespace App\Actions\Auth;

use App\Exceptions\AuthenticationException;
use App\Models\Auth\LoginHistory;
use App\Models\User;
use App\Services\Auth\AccountStatusChecker;
use App\Services\Auth\LoginRateLimiter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthenticateUserAction
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        protected LoginRateLimiter $rateLimiter,
        protected AccountStatusChecker $statusChecker,
    ) {
    }

    //esecuzione dell'aziome
    public function execute(Request $request): User
    {

        $email = (string) $request->email;
        $ip = $request->ip();
        $userAgent = $request->userAgent();



        //generazione throttle key
        $throttleKey = $this->rateLimiter->getThrottleKey($request->email, $request->ip);

        if ($this->rateLimiter->tooManyAttempt($throttleKey)) {
            LoginHistory::insert([
                'user_id' => null,
                'email_attempted' => (string) $email,
                'ip_address' => (string) $ip ?? '0.0.0.0',
                'status' => 'rate_limited',
                'user_agent' => (string) $userAgent ?? null,
                'created_at' => now(),
            ]);
            throw AuthenticationException::rateLimited();
        } 

        //ricerca user
        $user = User::withTrashed()
            ->whereRaw('LOWER(email) = ?', [strtolower($email)])
            ->first();

        //gestione utente non trovato (mitigazione timing attach)
        if (!$user) {
            Hash::check($request->password, '$argon2id$v=19$m=65536,t=4,p=1$Z2VuZXJpY19zYWx0XzEyeQ$blE5vpYcraELDamQQK/760vl3p21FLCPdFfR1A574xg');

            $this->rateLimiter->hit($throttleKey);
            LoginHistory::insert([
                'user_id' => null,
                'email_attempted' => (string) $email,
                'ip_address' => (string) $ip ?? '0.0.0.0',
                'status' => 'invalid_credentials',
                'user_agent' => (string) $userAgent ?? null,
                'created_at' => now(),
            ]);
            throw AuthenticationException::invalidCredentials();
        }

        //controllo se utente è stato eliminato con soft delete
        if ($user->trashed()) {
            Hash::check($request->password, '$argon2id$v=19$m=65536,t=4,p=1$Z2VuZXJpY19zYWx0XzEyeQ$blE5vpYcraELDamQQK/760vl3p21FLCPdFfR1A574xg');

            $this->rateLimiter->hit($throttleKey);
            LoginHistory::insert([
                'user_id' => null,
                'email_attempted' => (string) $email,
                'ip_address' => (string) $ip ?? '0.0.0.0',
                'status' => 'deleted_user',
                'user_agent' => (string) $userAgent ?? null,
                'created_at' => now(),
            ]);
            throw AuthenticationException::invalidCredentials();
        }

        //controllo preliminari di stato (ban,suspended,locked)
        $this->statusChecker->checkRestriction(
            $user,
            $email,
            $ip,
            $userAgent
        );

        //verifica password 
        if (!Hash::check($request->password, $user->password)) {
            $this->rateLimiter->hit($throttleKey);
            $this->rateLimiter->handleFailedAttempt(
                $user,
                $email,
                $ip,
                $userAgent
            );
            throw AuthenticationException::invalidCredentials();
        }

        //se password è corretta procediamo con l'accesso
        return DB::transaction(function () use ($user, $request, $throttleKey, $email, $ip, $userAgent) {

            //reset contatori
            $this->rateLimiter->clear($user, $throttleKey);

            //rigerazione sessione
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            //login Effettivo
            Auth::login($user, $request->remember);

            $user->update([
                'last_login_at' => now(),
                'last_login_ip' => $request->ip(),
            ]);

            //scrittura dell history login
            LoginHistory::insert([
                'user_id' => $user->id,
                'email_attempted' => (string) $email,
                'ip_address' => (string) $ip ?? '0.0.0.0',
                'status' => 'success',
                'user_agent' => (string) $userAgent ?? null,
                'created_at' => now(),
            ]);

            return $user;
        });

    }
}
