<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [

            [
                'name' => 'Super Admin',
                'slug' => 'super_admin',
                'description' => 'Full system access',
                'is_system' => true,
            ],

            [
                'name' => 'Admin',
                'slug' => 'admin',
                'description' => 'Administrator',
                'is_system' => true,
            ],

            [
                'name' => 'Moderator',
                'slug' => 'moderator',
                'description' => 'Community moderator',
                'is_system' => true,
            ],

            [
                'name' => 'Artist',
                'slug' => 'artist',
                'description' => 'Artist account',
                'is_system' => true,
            ],

            [
                'name' => 'Customer',
                'slug' => 'customer',
                'description' => 'Customer account',
                'is_system' => true,
            ],

        ];


        foreach ($roles as $role) {

            Role::updateOrCreate(
                [
                    'slug' => $role['slug']
                ],
                [
                    ...$role,
                    'id' => Str::uuid()
                ]
            );

        }
    }
}
