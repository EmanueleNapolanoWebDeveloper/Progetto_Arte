<?php

namespace App\Models\User;

use App\Models\Admin\Category;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ArtistProfile extends Model
{

    use HasUuids;
    protected $fillable = [
        'user_id',
        'display_name',
        'bio',
        'statement',
        'studio_location',
        'website_url',
        'social_links',
        'status',
        'commission_rate',
        'featured'
    ];

    protected $casts = [
        'social_links' => 'array', // Comodissimo per salvare i link social come JSON
        'featured' => 'boolean',
        'commission_rate' => 'decimal:2',
    ];

    //RELAZIONI

    //relazione con User 1->1
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    //relazione con categories
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'artist_specialties')->withTimestamps();
    }
}
