# Arte

**Arte** è una piattaforma web dedicata alla promozione e alla scoperta di artisti emergenti e opere d'arte. L'applicazione consente agli utenti di registrarsi, esplorare profili artistici e interagire con i contenuti in un ambiente sicuro e protetto.

Il progetto è attualmente in fase di sviluppo: il modulo di autenticazione è stato completato, mentre le restanti funzionalità sono in via di implementazione.

## Installazione

Segui i passaggi seguenti per configurare il progetto in ambiente locale.

### Prerequisiti

- PHP ≥ 8.2
- Composer
- Node.js ≥ 18
- NPM
- Database (MySQL / PostgreSQL / SQLite)
- Queue driver (database / Redis)

### Passaggi

1. **Clona il repository**

   ```bash
   git clone <repository-url>
   ```

2. **Accedi alla cartella del progetto**

   ```bash
   cd progetto-arte
   ```

3. **Configura il backend (Laravel)**

   ```bash
   cd backend
   composer install
   ```

   Copia il file `.env.example` in `.env` e configura le credenziali del database e del servizio di posta elettronica.

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

   Esegui le migrazioni del database:

   ```bash
   php artisan migrate
   ```

4. **Configura il frontend (Next.js)**

   ```bash
   cd frontend
   npm install
   ```

## Avvio del progetto

Per avviare l'applicazione in locale, avvia i seguenti servizi in terminali separati.

### Frontend

```bash
cd frontend
npm run dev
```

Il frontend sarà disponibile all'indirizzo `http://localhost:3000`.

### Backend

```bash
cd backend
php artisan serve
```

Il backend sarà disponibile all'indirizzo `http://localhost:8000`.

### Queue worker (invio email)

```bash
cd backend
php artisan queue:work
```

Il queue worker è necessario per processare in modo asincrono l'invio delle email (notifiche di reset password, verifica email, etc.).

## Sistema di autenticazione

Il modulo di autenticazione gestisce in modo completo la sicurezza degli accessi alla piattaforma. Le funzionalità attualmente implementate includono:

- **Registrazione utenti** — Creazione di un nuovo account con validazione dei dati in ingresso.
- **Login e logout** — Accesso e uscita dalla piattaforma tramite API protette.
- **Gestione sessioni** — Utilizzo di token Sanctum per la gestione sicura delle sessioni.
- **Recupero password** — Invio di un'email per il reset della password dimenticata.
- **Reset password** — Reimpostazione della password tramite token temporaneo sicuro.
- **Verifica email** — Conferma dell'indirizzo email al momento della registrazione tramite link di verifica.
- **Protezione delle rotte riservate** — Middleware di autenticazione che limita l'accesso alle sole utenti autenticati.
- **Validazione dei dati in ingresso** — Controllo lato server dei campi inviati tramite form request personalizzate.
- **Hashing sicuro delle password** — Le password sono protette tramite algoritmo bcrypt.
- **Protezione CSRF** — Prevenzione degli attacchi cross-site request forgery.
- **Rate limiting** — Limitazione del numero di richieste su rotte sensibili (registrazione, verifica email).
- **Invio email** — Notifiche asincrone inviate tramite il sistema Laravel Queue e Mailable per reset password e verifica email.
- **Controlli di sicurezza aggiuntivi** — Monitoraggio dei tentativi di accesso, verifica dello stato dell'account e gestione di sospensioni e ban.

---

Sviluppato da **Emanuele Napolano**