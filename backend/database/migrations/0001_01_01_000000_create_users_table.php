<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        // per gen_random_uuid
        DB::statement('CREATE EXTENSION IF NOT EXISTS pgcrypto');

        // ==============================
        // tabella utente
        // ==============================

        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->string('name');
            $table->string('username', 50)->unique(); // username unico
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('status', 20)->default('pending'); // stato utente
            $table->string('locale', 10)->default('it'); // lingua preferita dall'utente
            $table->timestamp('last_login_at')->nullable();
            $table->ipAddress('last_login_ip')->nullable(); // ip dell'ultimo accesso
            $table->smallInteger('failed_login_attempts')->default(0); // contatore per quante volte un utente ha sbagliato accesso
            $table->timestamp('locked_until')->nullable(); // tempo di blocco dell'utente anche se inserisce password corretta
            $table->softDeletes(); // soft delete di un utente
            $table->rememberToken();
            $table->timestamps();

            $table->index('status');
        });

        DB::statement('CREATE UNIQUE INDEX users_username_unique_active ON users (username) WHERE deleted_at IS NULL');
        DB::statement('CREATE UNIQUE INDEX users_email_unique_active ON users (email) WHERE deleted_at IS NULL');



        // ==============================
        // tabella sessioni utente
        // ==============================
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignUuid('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->ipAddress('ip_address')->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();

            $table->index('user_id');
        });

        // ==============================
        // tabella storico dei login
        // ==============================
        Schema::create('login_histories', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->foreignUuid('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('email_attempted')->nullable(); // quante volte ha avuto accesso conquesta mail
            $table->ipAddress('ip_address'); //indirizzo ip (utile per bloccare id sospetti)
            $table->string('status', 20);
            $table->text('user_agent')->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->index('user_id');
            $table->index('email_attempted');
            $table->index('ip_address');
            $table->index('status');
            $table->index('created_at');
        });

        // ==============================
        // tabella utenti bannati
        // ==============================
        Schema::create('user_bans', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->uuid('banned_by')->nullable()->constrained('users')->nullOnDelete(); //uuid dell'utente che l'ha bannato
            $table->longText('reason'); // motivo
            $table->boolean('is_permanent')->default(true); //se il ban è permanente
            $table->timestamp('expires_at')->nullable(); // scadenza del ban
            $table->timestamp('lifted_at')->nullable();
            $table->uuid('lifted_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('created_at')->useCurrent();

            $table->index('user_id');
        });


        DB::statement('
            ALTER TABLE user_bans
            ADD CONSTRAINT chk_user_bans_permanent_expiry
            CHECK (
                (is_permanent = true AND expires_at IS NULL)
                OR
                (is_permanent = false AND expires_at IS NOT NULL)
            )
        ');


        // ==============================
        // tabella utenti sospesi
        // ==============================
        Schema::create('user_suspensions', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->uuid('suspended_by')->nullable()->constrained('users')->nullOnDelete();
            $table->longText('reason'); //motivo
            $table->timestamp('starts_at')->useCurrent(); // inizio sospensione
            $table->timestamp('ends_at'); //  fine sospensione
            $table->timestamp('lifted_at')->nullable(); // tempo sospesa revocata 
            $table->uuid('lifted_by')->nullable()->constrained('users')->nullOnDelete(); // utente che ha revocato sospensione
            $table->timestamp('created_at')->useCurrent();

            $table->index('user_id');
            $table->index('ends_at');
        });

        DB::statement('
            ALTER TABLE user_suspensions
            ADD CONSTRAINT chk_user_suspensions_dates
            CHECK (ends_at > starts_at)
        ');

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_suspensions');
        Schema::dropIfExists('user_bans');
        Schema::dropIfExists('login_history');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('users');
    }
};
