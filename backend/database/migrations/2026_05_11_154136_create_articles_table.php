<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt')->nullable(); // Résumé court
            $table->longText('content');
            $table->string('image')->nullable(); // Chemin de l'image

            // Relations
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');


            // Métadonnées
            $table->integer('view_count')->default(0);
            $table->integer('reading_time')->nullable(); // En minutes
            $table->boolean('is_published')->default(false);
            $table->timestamp('published_at')->nullable();


            $table->timestamps();

            // Index pour améliorer les performances
            $table->index('slug');
            $table->index('is_published');
            $table->index('published_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
