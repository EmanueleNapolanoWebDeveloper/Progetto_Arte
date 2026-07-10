<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
        ]);



        $adminRole = Role::where('slug', 'admin')->first();

        $artistRole = Role::where('slug', 'artist')->first();

        $customerRole = Role::where('slug', 'customer')->first();



        // ADMIN TEST

        $admin = User::factory()->create([

            'name' => 'Admin Test',

            'username' => 'admin',

            'email' => 'admin@test.com',

            'status' => 'active',

        ]);


        $admin->roles()->attach($adminRole);



        // ARTIST TEST

        $artist = User::factory()->create([

            'name' => 'Artist Test',

            'username' => 'artist',

            'email' => 'artist@test.com',

            'status' => 'active',

        ]);


        $artist->roles()->attach($artistRole);



        // CUSTOMER TEST

        $customer = User::factory()->create([

            'name' => 'Customer Test',

            'username' => 'customer',

            'email' => 'customer@test.com',

            'status' => 'active',

        ]);


        $customer->roles()->attach($customerRole);



        // utenti fake

        User::factory(50)->create();

    }
}
