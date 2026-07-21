<?php

namespace App\Models\Admin;

use App\Models\User\ArtistProfile;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{

    use HasUuids;

    protected $fillable = [
        'parent_id',
        'name',
        'slug',
        'description',
        'cover_image_url',
        'icon',
        'display_order',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'display_order' => 'integer',
    ];

    //===========================================
    //RELAZIONI
    //===========================================

    //categoria padre (se sottocategoria)
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    //sottocategorie
    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id')->orderBy('display_order');
    }


    //pivot con artist_profile
    public function artistProfiles(): BelongsToMany
    {
        return $this->belongsToMany(ArtistProfile::class)->withTimestamps();
    }
}
