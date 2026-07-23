<?php

namespace App\Models\SRC;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Media extends Model
{
    use HasUuids;

    protected $fillable = [
        'uploaded_by',
        'disk',
        'path',
        'mime_type',
        'size_bytes',
        'width',
        'height',
        'variants',
    ];

    protected $casts = [
        'size_bytes' => 'integer',
        'width' => 'integer',
        'height' => 'integer',
        'variants' => 'array',
    ];

    //RELAZIONI

    public function uploadedby(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
