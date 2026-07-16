<?php

namespace Database\Seeders;

use App\Models\Permission;
use Database\Factories\PermissionFactory;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Popola/aggiorna i permessi a partire dal catalogo
     * definito in PermissionFactory (unica fonte di verità).
     * Idempotente: eseguibile più volte senza duplicati né side-effect.
     */
    public function run(): void
    {
        collect(array_keys(PermissionFactory::catalog()))
            ->each(function (string $slug): void {
                Permission::updateOrCreate(
                    ['slug' => $slug],
                    PermissionFactory::attributesFor($slug)
                );
            });

        $this->command?->info(sprintf(
            '%d permessi sincronizzati dal catalogo.',
            count(PermissionFactory::catalog())
        ));
    }
}