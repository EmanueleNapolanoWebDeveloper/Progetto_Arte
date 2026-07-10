<?php

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Role>
 */
class UserBanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'id' => Str::uuid(),

            'user_id' => \App\Models\User::factory(),

            'banned_by' => \App\Models\User::factory(),

            'reason' => fake()->sentence(),

            'is_permanent' => true,

            'expires_at' => null,

            'lifted_at' => null,

            'lifted_by' => null,

            'created_at' => now(),

        ];
    }
}
