<?php

namespace App\Models\Auth;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSuspension extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'reason',
        'starts_at',
        'ends_at',
    ];


    protected function casts(): array
    {
        return [
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
            'lifted_at' => 'datetime',
            'created_at' => 'datetime'
        ];
    }

    //===========================================
    //RELAZIONI
    //===========================================

    // relazione con utente user (1->1)
    public function user()
    {
        return $this->belongsTo(
            User::class
        );
    }


    //Chi ha applicato la sospensione

    public function suspendedBy()
    {
        return $this->belongsTo(
            User::class,
            'suspended_by'
        );
    }


    // Chi ha rimosso la sospensione
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

    // controllo se sospensione è attiva
    public function isSuspended(): bool
    {
        return $this->lifted_at === null
            && now()->between(
                $this->starts_at,
                $this->ends_at
            );
    }

    // revoca sospensione
    public function lift(?User $user = null): void
    {
        $this->update([
            'lifted_at' => now(),
            'lifted_by' => $user?->id
        ]);
    }


    // Scope sospensioni attive

    public function scopeActive($query)
    {
        return $query
            ->whereNull('lifted_at')
            ->where('starts_at', '<=', now())
            ->where('ends_at', '>=', now());
    }
}
