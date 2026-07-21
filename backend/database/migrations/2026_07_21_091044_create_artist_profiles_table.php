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

        //PROFILO ARTISTA(VENDITORE)
        Schema::create('artist_profiles', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->foreignUuid('user_id')->unique()->constrained('users')->cascadeOnDelete(); // relazione 1->1
            $table->string('display_name'); // nome d'arte differente da username
            $table->longText('bio')->nullable();
            $table->text('statement')->nullable(); //statemant artistico (cosa fa,perchè lo fa,ecc.)
            $table->string('studio_location')->nullable();
            $table->string('website_url')->nullable();
            $table->jsonb('social_links')->nullable();
            $table->enum('status', ['active', 'suspended'])->default('active');
            $table->decimal('commission_rate' , 5, 2)->nullable(); //commissioni
            $table->boolean('featured')->default(false);
            $table->timestamps();
        });

        //STORICO RICHIESTE DI DIVENTARE ARTIST
        Schema::create('artist_applications', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('statement');
            $table->jsonb('portfolio_samples');
            $table->jsonb('specialties');
            $table->foreignUuid('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('review_notes')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();

            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artist_applications');
        Schema::dropIfExists('artist_profiles');
    }
};
