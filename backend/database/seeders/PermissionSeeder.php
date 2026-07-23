<?php

namespace Database\Seeders;

use App\Models\Admin\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PermissionSeeder extends Seeder
{
    /**
     * Catalogo permessi — slug in formato "gruppo.azione".
     * Unica fonte di verità: ogni slug qui presente deve coprire
     * tutti quelli referenziati in RolePermissionSeeder::$matrix.
     */
    private const CATALOG = [
        // users
        'users.view',
        'users.create',
        'users.update',
        'users.delete',
        'users.ban',

        // artworks
        'artworks.view',
        'artworks.create',
        'artworks.update',
        'artworks.delete',
        'artworks.review',
        'artworks.curate',

        // orders
        'orders.view',
        'orders.manage',
        'orders.refund',

        // payments
        'payments.view',

        // reports
        'reports.view',

        // disputes
        'disputes.manage',

        // collections
        'collections.manage',

        // galleries
        'galleries.manage',
    ];

    /**
     * Popola/aggiorna i permessi a partire dal catalogo sopra.
     * Idempotente: eseguibile più volte senza duplicati né side-effect.
     */
    public function run(): void
    {
        DB::transaction(function (): void {
            collect(self::CATALOG)->each(
                fn(string $slug) => Permission::updateOrCreate(
                    ['slug' => $slug],
                    $this->attributesFor($slug)
                )
            );
        });

        $this->command?->info(sprintf('%d permessi sincronizzati dal catalogo.', count(self::CATALOG)));
    }

    /**
     * Deriva gli attributi del permesso dallo slug "gruppo.azione".
     */
    private function attributesFor(string $slug): array
    {
        [$group] = explode('.', $slug);

        return [
            'slug' => $slug,
            'name' => Str::headline($slug),
            'permission_group' => $group,
        ];
    }
}