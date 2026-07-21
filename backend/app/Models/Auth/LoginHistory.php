<?php

namespace App\Models\Auth;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class LoginHistory extends Model
{
    use HasFactory, HasUuids;

    const UPDATED_AT = null;

    protected $fillable = [
        'user_id',
        'email_attempted',
        'ip_address',
        'status',
        'user_agent',
        'created_at'
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime'
        ];
    }

    /**
     * Boot del modello: genera automaticamente l'UUID prima della creazione.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid(); // Genera un UUID v4 standard di Laravel
            }
        });
    }


    //==============================================
    // RELAZIONI 
    //==============================================

    // relazione con tabella user (N->1)
    public function user()
    {
        return $this->belongsTo(
            User::class
        );
    }

    //==============================================
    // HELPERS 
    //==============================================

    // login riusciti
    public function scopeSuccessful($query)
    {
        return $query->where('status', 'success');
    }

    // login falliti
    public function scopeFailed($query)
    {
        return $query->where('status', '!=', 'success');
    }
}
