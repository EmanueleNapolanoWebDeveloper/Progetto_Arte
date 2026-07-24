<?php

namespace App\Models\User\Artist;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ArtistApplication extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'previous_application_id',
        'status',
        'statement',
        'reviewed_by',
        'review_notes',
        'reviewed_at'
    ];

    protected $casts = [
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

    // Candidatura precedente (storico)
    public function previousApplication(): BelongsTo
    {
        return $this->belongsTo(self::class, 'previous_application_id');
    }

    //candidature successive collegata a questa (previous application)
    public function nextApplication(): HasMany
    {
        return $this->hasMany(self::class, 'previous_application_id');
    }

    //portfolio samples
    public function portfolioSamples(): HasMany
    {
        return $this->hasMany(ArtistApplicationPortfolioItem::class, 'application_id');
    }
}
