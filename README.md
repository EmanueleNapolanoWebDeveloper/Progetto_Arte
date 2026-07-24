# 🎨 ProgettoArte

**Marketplace per Artisti Emergenti** — Una piattaforma web moderna per la promozione, scoperta e vendita di opere d'arte di artisti emergenti.

[![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?logo=laravel&logoColor=white)](https://laravel.com)
[![Next.js](https://img.shields.io/badge/Next.js-16.x-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![MinIO](https://img.shields.io/badge/MinIO-S3%20Storage-72C3B2?logo=minio&logoColor=white)](https://min.io)
[![Sanctum](https://img.shields.io/badge/Sanctum-Auth-4B32C3?logo=laravel&logoColor=white)](https://laravel.com/docs/sanctum)

---

## 📋 Panoramica

ProgettoArte è un marketplace completo che connette artisti emergenti con appassionati d'arte e collezionisti. La piattaforma offre:

- **Profili artista** con portfolio, bio e statement artistico
- **Sistema di candidatura** per diventare artista sulla piattaforma
- **Marketplace** per la scoperta e l'acquisto di opere d'arte
- **Autenticazione sicura** con verifica email, reset password e protezione CSRF
- **RBAC** (Role-Based Access Control) con ruoli granulari per staff e utenti
- **Storage esterno** per file multimediali tramite presigned URL su MinIO/S3

---

## 🏗️ Architettura

ProgettoArte adotta un'architettura **SPA (Single Page Application)** con backend API-first e frontend disaccoppiato:

```
┌─────────────────────────────────────────────────┐
│              Frontend (Next.js 16)               │
│  RSC + Client Components · Zustand · Tailwind    │
└──────────────────┬──────────────────────────────┘
                   │ HTTP + CSRF + Cookie Session
┌──────────────────▼──────────────────────────────┐
│              Backend (Laravel 12)                │
│  Sanctum Auth · RBAC · Queue · Actions/Services  │
└──────┬──────────────┬────────────────────┬──────┘
       │              │                    │
       ▼              ▼                    ▼
┌──────────┐  ┌──────────────┐  ┌────────────────┐
│PostgreSQL│  │ MinIO / S3   │  │ Mailtrap (SMTP) │
│ Database │  │ Object Store │  │ Email Testing   │
└──────────┘  └──────────────┘  └────────────────┘
```

### Modello di Storage (Presigned URLs)

I file multimediali (portfolio, avatar, banner) vengono caricati **direttamente** dal browser allo storage S3/MinIO tramite **presigned URL**, senza transitare dal server Laravel:

1. Il frontend richiede URL presignati al backend
2. Il backend genera URL validi 15 minuti (via AWS SDK S3)
3. Il frontend carica i file direttamente allo storage tramite `PUT`
4. Il frontend conferma l'avvenuto upload al backend

Questo approccio elimina il bottleneck del server applicativo durante gli upload e garantisce scalabilità orizzontale.

---

## 🚀 Tech Stack

### Backend

| Tecnologia | Utilizzo |
|---|---|
| **Laravel 12** | Framework API RESTful |
| **PHP 8.2+** | Linguaggio runtime |
| **PostgreSQL 16+** | Database relazionale |
| **Laravel Sanctum** | Autenticazione SPA (cookie-based) |
| **MinIO / AWS S3** | Object storage per file multimediali |
| **Argon2id** | Hashing password |
| **Mailtrap** | SMTP per test email in sviluppo |
| **Redis** | Cache / code (opzionale) |
| **Flysystem S3** | Astrazione filesystem |

### Frontend

| Tecnologia | Utilizzo |
|---|---|
| **Next.js 16** | Framework React full-stack |
| **React 19** | Libreria UI |
| **TypeScript 5** | Tipizzazione statica |
| **Tailwind CSS 4** | Utility-first CSS |
| **CSS Modules** | Stili scoped per componenti |
| **Zustand 5** | State management leggero |
| **React Hook Form 7** | Gestione form performante |
| **Zod 4** | Validazione schema lato client |
| **Lucide React** | Icone SVG |

---

## 📦 Struttura del Progetto

```
progetto-arte/
├── backend/                    # API Laravel 12
│   ├── app/
│   │   ├── Actions/            # Azioni di business logic
│   │   ├── Http/Controllers/   # Controller API
│   │   ├── Http/Requests/      # Form Request validation
│   │   ├── Mail/               # Mailable (Email)
│   │   ├── Models/             # Eloquent Models
│   │   └── Services/           # Servizi (Auth, etc.)
│   ├── database/migrations/    # Migrazioni database
│   ├── routes/api.php          # Definizione rotte API
│   └── minio                   # Binario MinIO locale
│
├── frontend/                   # Applicazione Next.js 16
│   ├── app/                    # Pages Router (App Router)
│   ├── src/
│   │   ├── components/         # Componenti UI e Pages
│   │   ├── features/           # Feature modules
│   │   ├── lib/                # Lib (API client, services)
│   │   ├── schemas/            # Zod validation schemas
│   │   ├── store/              # Zustand stores
│   │   └── types/              # TypeScript definitions
│   ├── proxy.ts                # Next.js Middleware (auth)
│   └── next.config.ts          # Configurazione Next.js
│
└── ProgettoArteDocumentazione.md  # Documentazione tecnica
```

---

## ⚙️ Guida all'Installazione (Getting Started)

### Prerequisiti

- PHP ≥ 8.2 con estensioni richieste (`pgsql`, `bcmath`, `ctype`, `json`, `mbstring`, `openssl`, `pdo`, `tokenizer`, `xml`, `gd`)
- [Composer](https://getcomposer.org/) (ultima versione stabile)
- Node.js ≥ 18 + npm o pnpm
- PostgreSQL ≥ 16
- Redis (opzionale, per cache/code)

### 1. Clona il Repository

```bash
git clone <repository-url>
cd progetto-arte
```

### 2. Configurazione Storage Locale (MinIO)

```bash
cd backend

# Rendi eseguibile il binario MinIO
chmod +x minio

# Avvia MinIO
./minio server ./minio-data --console-address :9001
```

1. Apri `http://localhost:9001` (credenziali: `minioadmin` / `minioadmin`)
2. Crea un bucket chiamato `progetto-arte-portfolios`
3. Imposta la policy del bucket su **"Private"**

### 3. Configurazione Backend (Laravel)

```bash
cd backend

# Installa dipendenze PHP
composer install

# Configura ambiente
cp .env.example .env
php artisan key:generate

# Modifica .env con le tue credenziali (database, MinIO, mail)
# Assicurati di configurare FRONTEND_URL e SANCTUM_STATEFUL_DOMAINS

# Crea database PostgreSQL
sudo -u postgres psql -c "CREATE DATABASE progetto_arte;"
sudo -u postgres psql -c "CREATE USER arte_user WITH PASSWORD 'arte_root';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE progetto_arte TO arte_user;"

# Esegui migrazioni
php artisan migrate

# (Opzionale) Popola con dati di test
php artisan db:seed

# Avvia il server di sviluppo
php artisan serve
```

### 4. Configurazione Frontend (Next.js)

```bash
cd frontend

# Installa dipendenze
npm install
# oppure: pnpm install

# Configura ambiente
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local
echo "NEXT_PUBLIC_APP_URL=http://localhost:8000" >> .env.local

# Avvia il server di sviluppo
npm run dev
```

### 5. Avvio del Queue Worker

Le email (verifica, reset password) vengono inviate in modo asincrono:

```bash
cd backend
php artisan queue:work
```

---

## 🔌 API e Funzionalità Principali

### Autenticazione

| Metodo | Endpoint | Descrizione |
|---|---|---|
| `POST` | `/api/auth/register` | Registrazione nuovo utente |
| `POST` | `/api/auth/login` | Login (sessione SPA) |
| `POST` | `/api/auth/logout` | Logout |
| `POST` | `/api/auth/verify-email` | Verifica email |
| `POST` | `/api/auth/forgot-password` | Richiesta reset password |
| `POST` | `/api/auth/reset-password` | Reset password |
| `GET` | `/api/user` | Profilo utente corrente |

### Artisti e Portfolio

| Metodo | Endpoint | Descrizione |
|---|---|---|
| `POST` | `/api/artist-application` | Invia candidatura artista |
| `POST` | `/api/artist-application/{id}/presigned-urls` | Genera URL presignati per upload |
| `POST` | `/api/artist-application/{id}/confirm-portfolio` | Conferma upload portfolio |
| `GET` | `/api/categories/specialties` | Elenco specialità/categorie |

### Admin

| Metodo | Endpoint | Descrizione |
|---|---|---|
| `CRUD` | `/api/admin/categories` | Gestione categorie |
| `CRUD` | `/api/admin/roles` | Gestione ruoli |
| `CRUD` | `/api/admin/permissions` | Gestione permessi |

### Funzionalità Implementate

- ✅ Autenticazione completa (registrazione, login, logout)
- ✅ Verifica email con email asincrona
- ✅ Reset password con token temporaneo
- ✅ Protezione CSRF (Sanctum SPA)
- ✅ Rate limiting su rotte sensibili
- ✅ Candidatura artista con upload portfolio (presigned URL)
- ✅ RBAC (7 ruoli staff + 5 ruoli utente + permessi granulari)
- ✅ Gestione categorie gerarchiche
- ✅ Middleware frontend per protezione rotte
- ✅ Homepage marketing (Hero, Categorie, Opere, Artisti, Editoriale)
- ✅ Hashing password Argon2id
- ✅ Soft delete e storico utenti
- ✅ Tracciamento login history

---

## 🔐 Sicurezza

- **CSRF:** Protezione tramite cookie `XSRF-TOKEN` (Sanctum SPA)
- **Password:** Hash Argon2id con fallback bcrypt (12 rounds)
- **Rate Limiting:** Su registrazione, verifica email e login
- **Account Lockout:** Blocco temporaneo dopo tentativi falliti
- **Verifica Email:** Obbligatoria per attivazione account
- **Soft Delete:** Preservazione dati utente (`deleted_at`)
- **CORS:** Whitelist domini consentiti
- **Input Validation:** Lato server (Form Request) + lato client (Zod)
- **RBAC:** Controllo accessi granulare basato su ruoli e permessi

---

## 📖 Documentazione

Per una documentazione tecnica dettagliata, consulta:

- [`ProgettoArteDocumentazione.md`](./ProgettoArteDocumentazione.md) — Documentazione completa del progetto (architettura, modelli, flussi, API, setup)

---

## 🧪 Sviluppo

### Test

```bash
# Backend
cd backend
php artisan test

# Frontend
cd frontend
npm run lint
```

### Comandi Utili

```bash
# Backend — avvio sviluppo completo
cd backend && php artisan serve

# Frontend — avvio sviluppo
cd frontend && npm run dev

# Queue worker (email asincrone)
cd backend && php artisan queue:work

# MinIO storage locale
cd backend && ./minio server ./minio-data --console-address :9001
```

---

## 🤝 Contribuire

1. Fai un fork del repository
2. Crea un branch per la tua feature (`git checkout -b feature/nome-feature`)
3. Committa le modifiche (`git commit -m 'Aggiunta nuova feature'`)
4. Pusha il branch (`git push origin feature/nome-feature`)
5. Apri una Pull Request

---

## 📄 Licenza

Questo progetto è distribuito sotto licenza **MIT**.

---

## 👨‍💻 Sviluppatore

**Emanuele Napolano** — Full Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-EmanueleNapolanoWebDeveloper-181717?logo=github)](https://github.com/EmanueleNapolanoWebDeveloper)

---

<div align="center">
  <sub>Built with ❤️ using Laravel, Next.js, and PostgreSQL</sub>
</div>