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
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            // Relations
            $table->foreignId('article_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Contenu
            $table->text('content');

            // Modération
            $table->boolean('is_approved')->default(false);

            // Support pour commentaires imbriqués (optionnel)
            $table->foreignId('parent_id')->nullable()->constrained('comments')->onDelete('cascade');

            // Index
            $table->index('article_id');
            $table->index('is_approved');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
