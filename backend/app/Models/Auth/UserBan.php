<?php

namespace App\Models\Auth;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserBan extends Model
{

    use HasFactory;

    protected $fillable = [
        'reason',
        'is_permanent',
        'expires_at',
    ];

    protected function casts(): array
    {
        return [
            'is_permanent' => 'boolean',
            'expires_at' => 'datetime',
            'lifted_at' => 'datetime',
            'created_at' => 'datetime',
        ];
    }

    //===========================================
    //RELAZIONI
    //===========================================

    // relazione con user (1-> 1)
    public function user()
    {
        return $this->belongsTo(
            User::class
        );
    }

    // user che ha applicato ban
    public function bannedBy()
    {
        return $this->belongsTo(
            User::class,
            'banned_by'
        );
    }

    // user che ha rimosso ban
    public function liftedBy()
    {
        return $this->belongsTo(
            User::class,
            'lifted_by'
        );
    }

    //===========================================
    //HELPERS
    //===========================================

    // ban attivo
    public function isBanned(): bool
    {
        if ($this->lifted_at !== null) {
            return false;
        }

        if ($this->is_permanent) {
            return true;
        }

        return $this->expires_at !== null && now()->lessThan($this->expires_at);
    }

    // revoca ban
    public function lift(?User $user = null): void
    {

        $this->update([
            'lifted_at' => now(),
            'lifted_by' => $user?->id
        ]);
    }

    // scope ban attivi
    public function scopeActive($query)
    {
        return $query
            ->whereNull('lifted_at')
            ->where(function ($q) {

                $q->where('is_permanent', true)
                    ->orWhere(
                        'expires_at',
                        '>',
                        now()
                    );

            });
    }
}
