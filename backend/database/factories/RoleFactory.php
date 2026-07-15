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
    protected $model = Role::class;

    /**
     * Catalogo dei ruoli reali della piattaforma: nome, descrizione
     * e flag is_system coerenti, non generati a caso.
     *
     * @var array<string, array{name: string, description: string, is_system: bool}>
     */
    protected static array $catalog = [
        'super_admin' => [
            'name' => 'Super Admin',
            'description' => 'Accesso completo e irrevocabile alla piattaforma, incluse configurazioni critiche e gestione degli altri amministratori.',
            'is_system' => true,
        ],
        'admin' => [
            'name' => 'Admin',
            'description' => 'Gestisce utenti, contenuti, pagamenti e configurazioni generali della piattaforma.',
            'is_system' => true,
        ],
        'moderator' => [
            'name' => 'Moderator',
            'description' => 'Modera opere, commenti e segnalazioni per garantire il rispetto delle linee guida della community.',
            'is_system' => true,
        ],
        'content_reviewer' => [
            'name' => 'Content Reviewer',
            'description' => 'Revisiona le nuove opere caricate dagli artisti prima della pubblicazione nel marketplace.',
            'is_system' => true,
        ],
        'support' => [
            'name' => 'Support',
            'description' => 'Assiste artisti e clienti nella risoluzione di problemi relativi a ordini, pagamenti e account.',
            'is_system' => true,
        ],
        'curator' => [
            'name' => 'Curator',
            'description' => 'Seleziona e organizza collezioni tematiche e opere in evidenza nella piattaforma.',
            'is_system' => true,
        ],
        'gallery_manager' => [
            'name' => 'Gallery Manager',
            'description' => 'Gestisce le gallerie partner e gli eventi espositivi virtuali organizzati sulla piattaforma.',
            'is_system' => true,
        ],
        'artist' => [
            'name' => 'Artist',
            'description' => 'Artista emergente che pubblica e vende le proprie opere sul marketplace.',
            'is_system' => false,
        ],
        'verified_artist' => [
            'name' => 'Verified Artist',
            'description' => 'Artista con identità e opere verificate dal team editoriale, con badge di fiducia sul profilo.',
            'is_system' => false,
        ],
        'premium_artist' => [
            'name' => 'Premium Artist',
            'description' => 'Artista abbonato al piano premium: commissioni ridotte, statistiche avanzate e maggiore visibilità.',
            'is_system' => false,
        ],
        'collector' => [
            'name' => 'Collector',
            'description' => 'Utente che acquista regolarmente opere e costruisce una collezione personale tracciata sulla piattaforma.',
            'is_system' => false,
        ],
        'customer' => [
            'name' => 'Customer',
            'description' => 'Account cliente standard, con possibilità di acquistare opere occasionalmente.',
            'is_system' => false,
        ],
    ];

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $key = fake()->randomElement(array_keys(static::$catalog));

        return $this->fromCatalog($key);
    }

    /**
     * Costruisce l'array di attributi a partire da una voce del catalogo.
     */
    protected function fromCatalog(string $key): array
    {
        $entry = static::$catalog[$key];

        return [
            'name' => $entry['name'],
            'slug' => Str::slug($entry['name']),
            'description' => $entry['description'],
            'is_system' => $entry['is_system'],
        ];
    }

    /**
     * Marca genericamente il ruolo come ruolo di sistema.
     * Utile se vuoi forzare il flag su uno state custom.
     */
    public function system(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_system' => true,
        ]);
    }

    /**
     * Ruolo Super Admin.
     */
    public function superAdmin(): static
    {
        return $this->state(fn() => $this->fromCatalog('super_admin'));
    }

    /**
     * Ruolo Admin.
     */
    public function admin(): static
    {
        return $this->state(fn() => $this->fromCatalog('admin'));
    }

    /**
     * Ruolo Moderator.
     */
    public function moderator(): static
    {
        return $this->state(fn() => $this->fromCatalog('moderator'));
    }

    /**
     * Ruolo Content Reviewer.
     */
    public function contentReviewer(): static
    {
        return $this->state(fn() => $this->fromCatalog('content_reviewer'));
    }

    /**
     * Ruolo Support.
     */
    public function support(): static
    {
        return $this->state(fn() => $this->fromCatalog('support'));
    }

    /**
     * Ruolo Curator.
     */
    public function curator(): static
    {
        return $this->state(fn() => $this->fromCatalog('curator'));
    }

    /**
     * Ruolo Gallery Manager.
     */
    public function galleryManager(): static
    {
        return $this->state(fn() => $this->fromCatalog('gallery_manager'));
    }

    /**
     * Ruolo Artist.
     */
    public function artist(): static
    {
        return $this->state(fn() => $this->fromCatalog('artist'));
    }

    /**
     * Ruolo Verified Artist.
     */
    public function verifiedArtist(): static
    {
        return $this->state(fn() => $this->fromCatalog('verified_artist'));
    }

    /**
     * Ruolo Premium Artist.
     */
    public function premiumArtist(): static
    {
        return $this->state(fn() => $this->fromCatalog('premium_artist'));
    }

    /**
     * Ruolo Collector.
     */
    public function collector(): static
    {
        return $this->state(fn() => $this->fromCatalog('collector'));
    }

    /**
     * Ruolo Customer.
     */
    public function customer(): static
    {
        return $this->state(fn() => $this->fromCatalog('customer'));
    }
}