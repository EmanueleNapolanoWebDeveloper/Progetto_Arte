<?php
namespace App\Services\Auth;

use App\Exceptions\AuthenticationException;
use App\Models\Auth\LoginHistory;
use App\Models\User;
use App\Models\Auth\UserBan;
use App\Models\Auth\UserSuspension;

class AccountStatusChecker
{

    //verifica se utente ha restrizioni attive 8ban,sospensioni o lock)
    public function checkRestriction(
        User $user,
        string $email,
        ?string $ip,
        ?string $userAgent
    ): void {

        //--->CONTROLLO BAN ATTIVO
        $activeBan = UserBan::where('user_id', $user->id)
            ->whereNull('lifted_at')
            ->where(function ($query) {
                $query->where('is_permanent', true)
                    ->orWhere('expires_at', '>', now());
            })->first();

        if ($activeBan) {
            LoginHistory::insert([
                'user_id' => $user->id,
                'email_attempted' => $email,
                'ip_address' => $ip ?? '0.0.0.0',
                'status' => 'banned',
                'user_agent' => $userAgent,
                'created_at' => now()
            ]);
            throw AuthenticationException::accountBanned();
        }

        //--->CONTROLLO SOSPENSIONE ATTIVA
        $activeSuspension = UserSuspension::where('user_id', $user->id)
            ->whereNull('lifted_at')
            ->where('ends_at', '>', now())
            ->first();

        if ($activeSuspension) {
            LoginHistory::insert([
                'user_id' => $user->id,
                'email_attempted' => $email,
                'ip_address' => $ip ?? '0.0.0.0',
                'status' => 'suspended',
                'user_agent' => $userAgent,
                'created_at' => now()
            ]);
            throw AuthenticationException::accountSuspended($activeSuspension->ends_at);
        }

        //---> CONTROLLO LOCK TEMPORANEO
        if ($user->locked_until && $user->locked_until->isFuture()) {
            LoginHistory::insert([
                'user_id' => $user->id,
                'email_attempted' => $email,
                'ip_address' => $ip ?? '0.0.0.0',
                'status' => 'locked',
                'user_agent' => $userAgent,
                'created_at' => now()
            ]);
            throw AuthenticationException::accountLocked($user->locked_until);
        }
    }
}