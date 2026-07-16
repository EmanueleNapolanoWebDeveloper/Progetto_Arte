<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;


return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // per gen_random_uuid
        DB::statement('CREATE EXTENSION IF NOT EXISTS pgcrypto');


        Schema::create('permissions', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->string('name', 100)->unique();
            $table->string('slug',50)->unique();
            $table->string('permission_group', 50)->default('general');
            $table->text('description')->nullable();
            $table->timestamps();

            $table->index('permission_group');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permissions');
    }
};
