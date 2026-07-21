<?php

namespace Database\Seeders;

use App\Models\Admin\Permission;
use App\Models\Admin\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Matrice ruolo (slug) => permessi (slug) assegnati.
     * Unica fonte di verità per gli accoppiamenti ruolo/permesso:
     * modificarla qui per cambiare il comportamento del seeder.
     * '*' = tutti i permessi esistenti in catalogo.
     *
     * @var array<string, array<int, string>>
     */
    protected array $matrix = [
        'super-admin' => ['*'],

        'admin' => [
            'users.view',
            'users.create',
            'users.update',
            'users.delete',
            'users.ban',
            'artworks.view',
            'artworks.create',
            'artworks.update',
            'artworks.delete',
            'orders.view',
            'orders.manage',
            'orders.refund',
            'payments.view',
            'reports.view',
        ],

        'moderator' => [
            'reports.view',
            'disputes.manage',
        ],

        'content-reviewer' => [
            'artworks.view',
            'artworks.review',
        ],

        'support' => [
            'orders.view',
            'orders.manage',
            'disputes.manage',
            'users.view',
        ],

        'curator' => [
            'artworks.view',
            'artworks.curate',
            'collections.manage',
        ],

        'gallery-manager' => [
            'galleries.manage',
            'artworks.view',
        ],

        'artist' => [
            'artworks.view',
            'artworks.create',
            'artworks.update',
        ],

        'verified-artist' => [
            'artworks.view',
            'artworks.create',
            'artworks.update',
        ],

        'premium-artist' => [
            'artworks.view',
            'artworks.create',
            'artworks.update',
        ],

        'collector' => [],

        'customer' => [],
    ];

    /**
     * Collega ruoli e permessi esistenti tramite la pivot role_permissions.
     * Idempotente: syncWithoutDetaching non duplica righe e non rimuove
     * eventuali assegnazioni manuali fatte fuori da questa matrice.
     */
    public function run(): void
    {
        $allPermissionIds = Permission::pluck('id', 'slug');

        if ($allPermissionIds->isEmpty()) {
            $this->command?->warn('Nessun permesso trovato: esegui PermissionSeeder prima di questo.');
            return;
        }

        foreach ($this->matrix as $roleSlug => $permissionSlugs) {
            $role = Role::where('slug', $roleSlug)->first();

            if (!$role) {
                $this->command?->warn("Ruolo [{$roleSlug}] non trovato: salto.");
                continue;
            }

            if (empty($permissionSlugs)) {
                continue;
            }

            $isWildcard = $permissionSlugs === ['*'];

            $permissionIds = $isWildcard
                ? $allPermissionIds->values()->all()
                : $allPermissionIds->only($permissionSlugs)->values()->all();

            if (!$isWildcard) {
                $missing = array_diff($permissionSlugs, $allPermissionIds->keys()->all());

                foreach ($missing as $slug) {
                    $this->command?->warn("Permesso [{$slug}] non trovato per il ruolo [{$roleSlug}].");
                }
            }

            $role->permissions()->syncWithoutDetaching($permissionIds);
        }

        $this->command?->info('Associazioni ruolo-permesso sincronizzate.');
    }
}
