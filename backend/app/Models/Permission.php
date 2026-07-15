<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory,HasUuids;

    protected $fillable = [
        'name',
        'slug',
        'permission_group',
        'description'
    ];

    //===========================================
    //RELAZIONI
    //===========================================

    // relazioni con tabell roles (N => 1)
    public function roles()
    {
        return $this->belongsToMany(
            Role::class,
            'role_permissions'
        )
            ->withTimestamps();
    }


    //===========================================
    //HELPERS
    //===========================================

    // ritrona gruppi del permesso
    public function permissionGroup(): string
    {
        return $this->permission_group;
    }

}
