<?php

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Role>
 */
class RoleFactory extends Factory
{
    protected $model = Role::class;

    /**
     * Catalogo dei ruoli reali della piattaforma: nome, slug, descrizione
     * e flag is_system coerenti, non generati a caso.
     *
     * @var array<string, array{name: string, slug: string, description: string, is_system: bool}>
     */
    protected static array $catalog = [
        'super_admin' => [
            'name' => 'Super Admin',
            'slug' => 'super-admin',
            'description' => 'Accesso completo e irrevocabile alla piattaforma, incluse configurazioni critiche e gestione degli altri amministratori.',
            'is_system' => true,
        ],
        'admin' => [
            'name' => 'Admin',
            'slug' => 'admin',
            'description' => 'Gestisce utenti, contenuti, pagamenti e configurazioni generali della piattaforma.',
            'is_system' => true,
        ],
        'moderator' => [
            'name' => 'Moderator',
            'slug' => 'moderator',
            'description' => 'Modera opere, commenti e segnalazioni per garantire il rispetto delle linee guida della community.',
            'is_system' => true,
        ],
        'content_reviewer' => [
            'name' => 'Content Reviewer',
            'slug' => 'content-reviewer',
            'description' => 'Revisiona le nuove opere caricate dagli artisti prima della pubblicazione nel marketplace.',
            'is_system' => true,
        ],
        'support' => [
            'name' => 'Support',
            'slug' => 'support',
            'description' => 'Assiste artisti e clienti nella risoluzione di problemi relativi a ordini, pagamenti e account.',
            'is_system' => true,
        ],
        'curator' => [
            'name' => 'Curator',
            'slug' => 'curator',
            'description' => 'Seleziona e organizza collezioni tematiche e opere in evidenza nella piattaforma.',
            'is_system' => true,
        ],
        'gallery_manager' => [
            'name' => 'Gallery Manager',
            'slug' => 'gallery-manager',
            'description' => 'Gestisce le gallerie partner e gli eventi espositivi virtuali organizzati sulla piattaforma.',
            'is_system' => true,
        ],
        'artist' => [
            'name' => 'Artist',
            'slug' => 'artist',
            'description' => 'Artista emergente che pubblica e vende le proprie opere sul marketplace.',
            'is_system' => false,
        ],
        'verified_artist' => [
            'name' => 'Verified Artist',
            'slug' => 'verified-artist',
            'description' => 'Artista con identità e opere verificate dal team editoriale, con badge di fiducia sul profilo.',
            'is_system' => false,
        ],
        'premium_artist' => [
            'name' => 'Premium Artist',
            'slug' => 'premium-artist',
            'description' => 'Artista abbonato al piano premium: commissioni ridotte, statistiche avanzate e maggiore visibilità.',
            'is_system' => false,
        ],
        'collector' => [
            'name' => 'Collector',
            'slug' => 'collector',
            'description' => 'Utente che acquista regolarmente opere e costruisce una collezione personale tracciata sulla piattaforma.',
            'is_system' => false,
        ],
        'customer' => [
            'name' => 'Customer',
            'slug' => 'customer',
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

        return $this->attributesFor($key);
    }

    /**
     * Espone il catalogo in sola lettura ad altri consumer
     * (es. RoleSeeder), senza duplicarlo.
     */
    public static function catalog(): array
    {
        return static::$catalog;
    }

    /**
     * Costruisce l'array di attributi a partire da una voce del catalogo.
     * Statico e pubblico: riutilizzabile da qualunque punto del progetto.
     */
    public static function attributesFor(string $key): array
    {
        if (!array_key_exists($key, static::$catalog)) {
            throw new \InvalidArgumentException("Chiave di ruolo sconosciuta: [{$key}].");
        }

        return static::$catalog[$key];
    }


    /**
     * Marca genericamente il ruolo come ruolo di sistema.
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
        return $this->state(fn() => $this->attributesFor('super_admin'));
    }

    /**
     * Ruolo Admin.
     */
    public function admin(): static
    {
        return $this->state(fn() => $this->attributesFor('admin'));
    }

    /**
     * Ruolo Moderator.
     */
    public function moderator(): static
    {
        return $this->state(fn() => $this->attributesFor('moderator'));
    }

    /**
     * Ruolo Content Reviewer.
     */
    public function contentReviewer(): static
    {
        return $this->state(fn() => $this->attributesFor('content_reviewer'));
    }

    /**
     * Ruolo Support.
     */
    public function support(): static
    {
        return $this->state(fn() => $this->attributesFor('support'));
    }

    /**
     * Ruolo Curator.
     */
    public function curator(): static
    {
        return $this->state(fn() => $this->attributesFor('curator'));
    }

    /**
     * Ruolo Gallery Manager.
     */
    public function galleryManager(): static
    {
        return $this->state(fn() => $this->attributesFor('gallery_manager'));
    }

    /**
     * Ruolo Artist.
     */
    public function artist(): static
    {
        return $this->state(fn() => $this->attributesFor('artist'));
    }

    /**
     * Ruolo Verified Artist.
     */
    public function verifiedArtist(): static
    {
        return $this->state(fn() => $this->attributesFor('verified_artist'));
    }

    /**
     * Ruolo Premium Artist.
     */
    public function premiumArtist(): static
    {
        return $this->state(fn() => $this->attributesFor('premium_artist'));
    }

    /**
     * Ruolo Collector.
     */
    public function collector(): static
    {
        return $this->state(fn() => $this->attributesFor('collector'));
    }

    /**
     * Ruolo Customer.
     */
    public function customer(): static
    {
        return $this->state(fn() => $this->attributesFor('customer'));
    }
}