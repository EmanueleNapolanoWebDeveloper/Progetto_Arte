<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Concerns\HasUniqueIds;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{

    use HasFactory, HasUniqueIds;


    protected $fillable = [
        'name',
        'slug',
        'description',
        'is_system'
    ];

    protected function casts(): array
    {
        return [
            'is_system' => 'boolean'
        ];
    }




    //===========================================
    //RELAZIONI
    //===========================================

    // relazioni con users (N => 1)
    public function users()
    {
        return $this->belongsToMany(
            User::class,
            'user_roles'
        )
            ->withPivot([
                'assigned_at',
                'assigned_by'
            ])
            ->withTimestamps();
    }

    //relazioni con tabella permission associato al ruolo
    public function permissions()
    {
        return $this->belongsToMany(
            Permission::class,
            'role_permissions'
        )
            ->withTimestamps();
    }


    //===========================================
    //HELPERS
    //===========================================

    // controllo se ruolo possiede permesso+
    public function hasPermission(string $permission): bool
    {

        return $this->permissions()
            ->where('slug', $permission)
            ->exists();
    }

    // controllo se ruolo è coperto da system
    public function isSystem(): bool
    {
        return $this->is_system;
    }

}
