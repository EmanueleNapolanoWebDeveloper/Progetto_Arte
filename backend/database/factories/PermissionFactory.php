<?php

namespace Database\Factories;

use App\Models\Permission;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Permission>
 */
class PermissionFactory extends Factory
{
    protected $model = Permission::class;

    /**
     * Catalogo dei permessi reali della piattaforma.
     * Chiave = slug (formato "group.action"), valore = descrizione.
     * Il gruppo e il nome vengono derivati automaticamente dallo slug,
     * così non c'è mai disallineamento tra slug / name / permission_group.
     *
     * @var array<string, string>
     */
    protected static array $catalog = [
        // Utenti (Admin, Super Admin)
        'users.view' => 'Consente di visualizzare l\'elenco e i dettagli degli utenti registrati.',
        'users.create' => 'Consente di creare nuovi account utente manualmente.',
        'users.update' => 'Consente di modificare i dati di un account utente esistente.',
        'users.delete' => 'Consente di eliminare definitivamente un account utente.',
        'users.ban' => 'Consente di sospendere o bannare un utente dalla piattaforma.',

        // Ruoli e permessi (Super Admin)
        'roles.view' => 'Consente di visualizzare i ruoli disponibili sulla piattaforma.',
        'roles.manage' => 'Consente di creare, modificare ed eliminare i ruoli della piattaforma.',
        'permissions.manage' => 'Consente di assegnare o revocare permessi ai ruoli.',

        // Opere (Artist, Content Reviewer, Curator)
        'artworks.view' => 'Consente di visualizzare le opere pubblicate, incluse quelle non ancora approvate.',
        'artworks.create' => 'Consente di caricare nuove opere sul marketplace.',
        'artworks.update' => 'Consente di modificare i metadati di un\'opera già pubblicata.',
        'artworks.delete' => 'Consente di rimuovere un\'opera dal marketplace.',
        'artworks.review' => 'Consente di approvare o rifiutare le opere in attesa di revisione editoriale.',
        'artworks.curate' => 'Consente di selezionare opere per collezioni tematiche e sezioni in evidenza.',

        // Collezioni e gallerie (Curator, Gallery Manager)
        'collections.manage' => 'Consente di creare e organizzare collezioni tematiche di opere.',
        'galleries.manage' => 'Consente di gestire le gallerie partner e gli eventi espositivi virtuali.',

        // Ordini e pagamenti (Support, Admin)
        'orders.view' => 'Consente di visualizzare lo stato e i dettagli degli ordini effettuati.',
        'orders.manage' => 'Consente di modificare o annullare un ordine in corso.',
        'orders.refund' => 'Consente di elaborare un rimborso per un ordine.',
        'payments.view' => 'Consente di visualizzare le transazioni economiche della piattaforma.',
        'payments.manage' => 'Consente di gestire commissioni, payout agli artisti e riconciliazioni contabili.',

        // Assistenza e segnalazioni (Support, Moderator)
        'disputes.manage' => 'Consente di gestire e risolvere le controversie tra acquirenti e artisti.',
        'reports.view' => 'Consente di consultare le statistiche e i report aggregati della piattaforma.',
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $slug = fake()->randomElement(array_keys(static::$catalog));

        return $this->fromSlug($slug);
    }

    /**
     * Costruisce l'array di attributi coerenti a partire da uno slug del catalogo.
     */
    protected function fromSlug(string $slug): array
    {
        return [
            'name' => Str::headline(str_replace('.', ' ', $slug)),
            'slug' => $slug,
            'permission_group' => explode('.', $slug)[0],
            'description' => static::$catalog[$slug],
        ];
    }

    /**
     * Restituisce uno slug casuale appartenente a un dato gruppo.
     */
    protected function randomSlugForGroup(string $group): string
    {
        $slugs = array_filter(
            array_keys(static::$catalog),
            fn(string $slug) => str_starts_with($slug, "{$group}.")
        );

        return fake()->randomElement($slugs);
    }

    /**
     * Permesso specifico, per riferirsi in modo esplicito a uno slug del catalogo
     * (utile nei test: Permission::factory()->specific('users.ban')->create()).
     */
    public function specific(string $slug): static
    {
        return $this->state(fn() => $this->fromSlug($slug));
    }

    /**
     * Permessi relativi alla gestione utenti.
     */
    public function users(): static
    {
        return $this->state(fn() => $this->fromSlug($this->randomSlugForGroup('users')));
    }

    /**
     * Permessi relativi a ruoli e permessi (area Super Admin).
     */
    public function roles(): static
    {
        return $this->state(fn() => $this->fromSlug($this->randomSlugForGroup('roles')));
    }

    /**
     * Permessi relativi alle opere.
     */
    public function artworks(): static
    {
        return $this->state(fn() => $this->fromSlug($this->randomSlugForGroup('artworks')));
    }

    /**
     * Permessi relativi a collezioni e gallerie (Curator, Gallery Manager).
     */
    public function galleries(): static
    {
        return $this->state(fn() => $this->fromSlug($this->randomSlugForGroup('galleries')));
    }

    /**
     * Permessi relativi a ordini e pagamenti.
     */
    public function orders(): static
    {
        return $this->state(fn() => $this->fromSlug($this->randomSlugForGroup('orders')));
    }

    /**
     * Permessi relativi a controversie e assistenza clienti.
     */
    public function disputes(): static
    {
        return $this->state(fn() => $this->fromSlug($this->randomSlugForGroup('disputes')));
    }

    /**
     * Permessi amministrativi generali (utenti + ruoli + permessi).
     */
    public function admin(): static
    {
        return $this->state(function () {
            $adminGroups = ['users', 'roles', 'permissions', 'payments', 'reports'];
            $group = fake()->randomElement($adminGroups);

            return $this->fromSlug($this->randomSlugForGroup($group));
        });
    }
}