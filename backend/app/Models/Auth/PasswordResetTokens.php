<?php

namespace App\Models\Auth;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PasswordResetTokens extends Model
{
    // Disabilitiamo i timestamp standard di Eloquent (created_at e updated_at) 
    // perché non abbiamo la colonna 'updated_at' in questa tabella.
    public $timestamps = false;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'token_hash',
        'expires_at',
        'used_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'used_at' => 'datetime',
        'created_at' => 'datetime',
    ];

    //==============================================
    // RELAZIONI 
    //==============================================
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    //===========================================
    // Boot del modello per gestire la creazione automatica di created_at.
    //=========================================
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->created_at) {
                $model->created_at = now();
            }
        });
    }
}
