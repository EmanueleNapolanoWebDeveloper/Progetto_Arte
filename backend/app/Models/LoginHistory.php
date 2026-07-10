<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoginHistory extends Model
{
    use HasFactory, HasUuids;

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
