<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => Str::uuid(),

            'name' => fake()->name(),

            'username' => fake()
                ->unique()
                ->userName(),

            'email' => fake()
                ->unique()
                ->safeEmail(),

            'email_verified_at' => now(),

            'password' => Hash::make('password'),

            'status' => 'active',

            'role_default_id' => null,

            'locale' => 'it',

            'last_login_at' => now(),

            'last_login_ip' => fake()->ipv4(),

            'failed_login_attempts' => 0,

            'locked_until' => null,

            'deleted_at' => null,
        ];
    }


    public function pending(): static
    {
        return $this->state([
            'status' => 'pending',
            'email_verified_at' => null
        ]);
    }


    public function banned(): static
    {
        return $this->state([
            'status' => 'banned'
        ]);
    }


    public function artist(): static
    {
        return $this->state([
            'status' => 'active'
        ]);
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
