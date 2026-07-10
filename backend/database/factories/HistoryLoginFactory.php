<?php

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Role>
 */
class HistoryLoginFactory extends Factory
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

            'email_attempted' => fake()->safeEmail(),

            'ip_address' => fake()->ipv4(),

            'status' => 'success',

            'user_agent' => fake()->userAgent(),

            'created_at' => now(),

        ];
    }


    public function failed(): static
    {
        return $this->state([
            'status' => 'failed_password'
        ]);
    }
}
