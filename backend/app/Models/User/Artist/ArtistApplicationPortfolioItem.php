<?php

namespace App\Models\User\Artist;

use App\Models\User\Artist\ArtistApplication;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArtistApplicationPortfolioItem extends Model
{

    use HasUuids;
    protected $fillable = [
        'application_id',
        'title',
        'medium',
        'year',
        'image_url',
        'sort_order'
    ];

    protected $casts = [
        'year' => 'integer',
        'sort_order' => 'integer',
    ];

    //RELAZIONI

    //candidatura a cui appartiene
    public function application(): BelongsTo
    {
        return $this->belongsTo(ArtistApplication::class, 'application_id');
    }
}
