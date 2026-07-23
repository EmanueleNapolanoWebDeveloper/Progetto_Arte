<?php

namespace Database\Seeders;

use App\Models\Admin\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Catalogo ruoli — unica fonte di verità.
     * is_system = true → ruoli staff, non assegnabili liberamente dagli utenti.
     */
    private const CATALOG = [
        // Ruoli staff
        ['slug' => 'super-admin', 'name' => 'Super Admin', 'is_system' => true, 'description' => 'Accesso completo alla piattaforma'],
        ['slug' => 'admin', 'name' => 'Admin', 'is_system' => true, 'description' => 'Gestione generale della piattaforma'],
        ['slug' => 'moderator', 'name' => 'Moderator', 'is_system' => true, 'description' => 'Moderazione contenuti e utenti'],
        ['slug' => 'content-reviewer', 'name' => 'Content Reviewer', 'is_system' => true, 'description' => 'Review di candidature e contenuti'],
        ['slug' => 'support', 'name' => 'Support', 'is_system' => true, 'description' => 'Assistenza utenti'],
        ['slug' => 'curator', 'name' => 'Curator', 'is_system' => true, 'description' => 'Curatela artisti ed opere in evidenza'],
        ['slug' => 'gallery-manager', 'name' => 'Gallery Manager', 'is_system' => true, 'description' => 'Gestione gallerie e collezioni'],

        // Ruoli utente piattaforma
        ['slug' => 'artist', 'name' => 'Artist', 'is_system' => false, 'description' => 'Artista con profilo attivo'],
        ['slug' => 'verified-artist', 'name' => 'Verified Artist', 'is_system' => false, 'description' => 'Artista con identità verificata'],
        ['slug' => 'premium-artist', 'name' => 'Premium Artist', 'is_system' => false, 'description' => 'Artista con abbonamento premium'],
        ['slug' => 'collector', 'name' => 'Collector', 'is_system' => false, 'description' => 'Collezionista che acquista opere'],
        ['slug' => 'customer', 'name' => 'Customer', 'is_system' => false, 'description' => 'Utente registrato standard'],
    ];

    /**
     * Popola/aggiorna i ruoli a partire dal catalogo sopra.
     * Idempotente: eseguibile più volte senza duplicati né side-effect.
     */
    public function run(): void
    {
        DB::transaction(function (): void {
            collect(self::CATALOG)->each(
                fn(array $attributes) => Role::updateOrCreate(
                    ['slug' => $attributes['slug']],
                    $attributes
                )
            );
        });

        $this->command?->info(sprintf('%d ruoli sincronizzati.', count(self::CATALOG)));
    }
}