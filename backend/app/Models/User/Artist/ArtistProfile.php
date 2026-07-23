<?php

namespace App\Models\User\Artist;

use App\Models\Admin\Category;
use App\Models\SRC\Media;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ArtistProfile extends Model
{

    use HasUuids;
    protected $fillable = [
        'user_id',
        'slug',
        'display_name',
        'bio',
        'statement',
        'city',
        'region',
        'country_code',
        'website_url',
        'social_links',
        'avatar_media_id',
        'banner_media_id',
        'status',
        'commission_rate',
        'featured',
        'featured_at',
        'verified_at',
        'verified_by',
    ];

    protected $casts = [
        'social_links' => 'array',
        'featured' => 'boolean',
        'commission_rate' => 'decimal:2',
        'featured_at' => 'datetime',
        'verified_at' => 'datetime',
    ];

    //RELAZIONI

    //relazione con User 1->1
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    //utente che verifica profilo
    public function verifiedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    //relazione con categories
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'artist_specialties')->withTimestamps();
    }

    //MEDIA AVATAR E BANNER
    public function avatars(): HasMany
    {
        return $this->hasMany(Media::class, 'avatar_media_id');
    }

    public function banners(): HasMany
    {
        return $this->hasMany(Media::class, 'banner_media_id');
    }
}
