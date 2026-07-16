<?php

namespace App\Models;

use App\Models\Auth\LoginHistory;
use App\Models\Role;
use App\Models\Auth\UserBan;
use App\Models\Auth\UserSuspension;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasApiTokens, SoftDeletes, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'locale',
        'status',
        'last_login_ip',
        'last_login_at',
        'locked_until',
        'email_verified_at'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [

            'email_verified_at' => 'datetime',

            'password' => 'hashed',

            'last_login_at' => 'datetime',

            'locked_until' => 'datetime',

            'deleted_at' => 'datetime',

            'failed_login_attempts' => 'integer',

        ];
    }


    //==============================================
    // RELAZIONI 
    //==============================================

    // ========> RUOLI ASSEGNATI A UTENTI (PIVOT ROLE_USER)
    public function roles()
    {
        return $this->belongsToMany(
            Role::class,
            'user_roles'
        )
            ->withPivot([
                'assigned_by',
                'assigned_at'
            ])
            ->withTimestamps();
    }

    // ====> relazione con login history (1 -> N)
    public function loginHistory()
    {
        return $this->hasMany(
            LoginHistory::class
        );
    }

    // relazione con basns (1 -> N)
    public function userBans()
    {
        return $this->hasMany(
            UserBan::class
        );
    }

    // relazioni con user_suspendions (1-> N)
    public function userSuspensions()
    {
        return $this->hasMany(
            UserSuspension::class
        );
    }




    //==============================================
    // HELPERS 
    //==============================================


    // helper per determinare se un utente ha un determinato ruolo
    public function hasRole(string $role)
    {
        return $this->roles()
            ->where('slug', $role)
            ->exists();
    }

    // helper per determinare se un utente ha permesso in base al ruolo
    public function hasPermission(string $permission)
    {
        return $this->roles()
            ->whereHas(
                'permissions',
                fn($query) => $query->where('slug', $permission)
            )->exists();
    }

    // utente bloccato
    public function hasBlocked(): bool
    {
        return $this->userBans()
            ->active()
            ->exists()
            ||
            $this->userSuspension()
                ->active()
                ->exists();
    }

}
