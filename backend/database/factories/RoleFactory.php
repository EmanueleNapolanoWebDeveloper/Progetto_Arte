<?php

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Role>
 */


class RoleFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $name = fake()->unique()->randomElement([
            'Super Admin',
            'Admin',
            'Moderator',
            'Artist',
            'Customer',
        ]);

        return [
            'id' => Str::uuid(),

            'name' => $name,

            'slug' => Str::slug($name),

            'description' => fake()
                ->optional()
                ->sentence(),

            'is_system' => fake()
                ->boolean(20),
        ];
    }


    /**
     * Ruolo di sistema protetto.
     */
    public function system(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_system' => true,
        ]);
    }


    /**
     * Ruolo artista.
     */
    public function artist(): static
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Artist',
            'slug' => 'artist',
            'description' => 'User role for artists.',
            'is_system' => true,
        ]);
    }


    /**
     * Ruolo cliente.
     */
    public function customer(): static
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Customer',
            'slug' => 'customer',
            'description' => 'Standard customer account.',
            'is_system' => true,
        ]);
    }


    /**
     * Ruolo amministratore.
     */
    public function admin(): static
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Admin',
            'slug' => 'admin',
            'description' => 'Administrator role.',
            'is_system' => true,
        ]);
    }
}
