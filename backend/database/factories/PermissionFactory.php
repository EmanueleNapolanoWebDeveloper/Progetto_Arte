<?php

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Role>
 */
class PermissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $permission = fake()->unique()->randomElement([
            'users.view',
            'users.create',
            'users.update',
            'users.delete',
            'users.ban',
            'roles.manage',
            'permissions.manage',
            'artworks.create',
            'artworks.update',
            'artworks.delete',
            'orders.manage',
        ]);


        return [
            'id' => Str::uuid(),

            'name' => Str::headline(
                str_replace('.', ' ', $permission)
            ),

            'slug' => $permission,

            'permission_group' => explode('.', $permission)[0],

            'description' => fake()
                ->optional()
                ->sentence(),
        ];
    }


    /**
     * Permessi utenti.
     */
    public function users(): static
    {
        return $this->state(fn() => [
            'permission_group' => 'users',
        ]);
    }


    /**
     * Permessi artisti.
     */
    public function artworks(): static
    {
        return $this->state(fn() => [
            'permission_group' => 'artworks',
        ]);
    }


    /**
     * Permessi amministrazione.
     */
    public function admin(): static
    {
        return $this->state(fn() => [
            'permission_group' => 'admin',
        ]);
    }
}
