<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [

            [
                'name' => 'View Users',
                'slug' => 'users.view',
                'permission_group' => 'users',
            ],

            [
                'name' => 'Create Users',
                'slug' => 'users.create',
                'permission_group' => 'users',
            ],

            [
                'name' => 'Ban Users',
                'slug' => 'users.ban',
                'permission_group' => 'users',
            ],

            [
                'name' => 'Manage Roles',
                'slug' => 'roles.manage',
                'permission_group' => 'roles',
            ],

            [
                'name' => 'Manage Permissions',
                'slug' => 'permissions.manage',
                'permission_group' => 'roles',
            ],


            [
                'name' => 'Create Artworks',
                'slug' => 'artworks.create',
                'permission_group' => 'artworks',
            ],

            [
                'name' => 'Manage Artworks',
                'slug' => 'artworks.manage',
                'permission_group' => 'artworks',
            ],

        ];


        foreach ($permissions as $permission) {


            Permission::updateOrCreate(

                [
                    'slug' => $permission['slug']
                ],

                [
                    ...$permission,
                    'id' => Str::uuid()
                ]

            );

        }

    }
}
