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

        DB::statement('CREATE EXTENSION IF NOT EXISTS pgcrypto');

        //STORICO RICHIESTE DI DIVENTARE ARTIST
        Schema::create('artist_applications', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('previous_application_id')->nullable(); // per tenere traccia delle richieste passate da uwesto utente
            $table->string('status')->default('pending');
            $table->text('statement');
            $table->foreignUuid('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('review_notes')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();

            $table->index(['user_id']);
            $table->index('status');
        });

        // 2. AGGIUNTA DEL VINCOLO DI FOREIGN KEY AUTO-REFERENZIALE
        Schema::table('artist_applications', function (Blueprint $table) {
            $table->foreign('previous_application_id')
                ->references('id')
                ->on('artist_applications')
                ->nullOnDelete();
        });

        // Una sola candidatura pending per utente
        DB::statement("CREATE UNIQUE INDEX uniq_pending_application
            ON artist_applications (user_id) WHERE status = 'pending'");

        //  INSERIMENTO CONSTAIN PER STATUS
        DB::statement("ALTER TABLE artist_applications
            ADD CONSTRAINT chk_application_status
            CHECK (status IN ('pending','needs_changes','approved','rejected'))");


        // TABELLA PER IMMAGINI PORTFOLIO PER CANDIDATURA 
        Schema::create('artist_application_portfolio_items', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->foreignUuid('application_id')
                ->constrained('artist_applications')->cascadeOnDelete();
            $table->string('title')->nullable();
            $table->string('medium')->nullable();
            $table->unsignedSmallInteger('year')->nullable();
            $table->string('image_url');
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index('application_id');
        });




        //PROFILO ARTISTA(VENDITORE) PUBBLICO (DOPO SUCCESSO APPROVAZIONE)
        Schema::create('artist_profiles', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->foreignUuid('user_id')->unique()->constrained('users')->cascadeOnDelete(); // relazione 1->1
            $table->string('slug')->unique(); //slug del prfilo per indirizzamento
            $table->string('display_name'); // nome d'arte differente da username
            $table->longText('bio')->nullable(); // bio artista
            $table->text('statement')->nullable(); //statemant artistico (cosa fa,perchè lo fa,ecc.)
            //luogo artista
            $table->string('city')->nullable();
            $table->string('region')->nullable();
            $table->char('country_code', 2)->nullable();
            //info digitali artisytya
            $table->string('website_url', 2048)->nullable();
            $table->jsonb('social_links')->nullable();
            //media per profilo artista
            $table->foreignUuid('avatar_media_id')->nullable()->constrained('media')->nullOnDelete();
            $table->foreignUuid('banner_media_id')->nullable()->constrained('media')->nullOnDelete();
            //status
            $table->string('status')->default('active');
            //commissioni di vendita
            $table->decimal('commission_rate', 5, 2)->nullable(); //commissioni
            //utente in evidenza
            $table->boolean('featured')->default(false);
            $table->timestamp('featured_at')->nullable();
            //utente verificato (diverso da rewived) per richiesta badge di verifica
            $table->timestamp('verified_at')->nullable();
            $table->foreignUuid('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index('status');
            $table->index('featured');
        });


        DB::statement("ALTER TABLE artist_profiles
            ADD CONSTRAINT chk_profile_status
            CHECK (status IN ('active','suspended','archived'))");

        //STORICO COMMISSIONI ARTISTA
        Schema::create('artist_commission_rate_history', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->foreignUuid('artist_profile_id')
                ->constrained('artist_profiles')->cascadeOnDelete();
            $table->decimal('commission_rate', 5, 2);
            $table->foreignUuid('changed_by')->nullable()
                ->constrained('users')->nullOnDelete();
            $table->text('reason')->nullable();
            $table->timestamp('effective_from');
            $table->timestamps();

            $table->index(['artist_profile_id', 'effective_from']);
        });
    }



    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artist_commission_rate_history');
        Schema::dropIfExists('artist_profiles');
        Schema::dropIfExists('artist_application_portfolio_items');
        Schema::dropIfExists('artist_applications');
    }
};
