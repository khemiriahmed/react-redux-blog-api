<?php

namespace Database\Factories;
use App\Models\Category;
use App\Models\User;
use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(6);
        return [
            'title' => $title,

            'slug' => Str::slug($title . '-' . fake()->unique()->numberBetween(1, 9999)),

            'content' => fake()->paragraphs(10, true),

            'excerpt' => fake()->paragraph(),

            'image' => 'https://picsum.photos/800/600',

            'user_id' => User::factory(),

            'category_id' => Category::factory(),

            'view_count' => fake()->numberBetween(0, 1000),

            'is_published' => true,

            'published_at' => now(),
        ];
    }
}
