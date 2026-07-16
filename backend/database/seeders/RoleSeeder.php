<?php

namespace Database\Seeders;

use App\Models\Role;
use Database\Factories\RoleFactory;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Popola/aggiorna i ruoli a partire dal catalogo definito
     * in RoleFactory (unica fonte di verità). Idempotente.
     */
    public function run(): void
    {
        collect(array_keys(RoleFactory::catalog()))
            ->each(function (string $key): void {
                $attributes = RoleFactory::attributesFor($key);

                Role::updateOrCreate(
                    ['slug' => $attributes['slug']],
                    $attributes
                );
            });

        $this->command?->info(sprintf('%d ruoli sincronizzati.', count(RoleFactory::catalog())));
    }
}