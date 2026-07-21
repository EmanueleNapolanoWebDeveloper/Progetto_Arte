<?php

namespace App\Models\Admin;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArtistApplication extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'status',
        'statement',
        'portfolio_samples',
        'specialties',
        'reviewed_by',
        'review_notes',
        'reviewed_at'
    ];

    protected $casts = [
        'portfolio_samples' => 'array',
        'specialties' => 'array',
        'reviewed_at' => 'datetime',
    ];

    //relazioni

    //utente che ha inviato candidatura
    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    //utente che ha revisionato candidatura
    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
