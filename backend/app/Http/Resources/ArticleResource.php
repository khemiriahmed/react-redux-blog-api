<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'title' => $this->title,

            'slug' => $this->slug,

            'content' => $this->content,

            'excerpt' => $this->excerpt,

            'image' => $this->image
                ? asset('storage/' . $this->image)
                : null,

            'view_count' => $this->view_count,

            'is_published' => $this->is_published,

            'published_at' => $this->published_at,

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,

            // 👤 Auteur (User)
            'author' => [
                'id' => $this->user?->id,
                'name' => $this->user?->name,
                'email' => $this->user?->email,
            ],

            // 📂 Category
            'category' => [
                'id' => $this->category?->id,
                'name' => $this->category?->name,
                'slug' => $this->category?->slug,
            ],

            // 💬 Comments
            'comments' => CommentResource::collection(
                $this->whenLoaded('comments')
            ),

            'user_liked' => auth()->check()
                ? $this->likes()->where('user_id', auth()->id())->exists()
                : false,

            'likes_count' => $this->likes()->count(),
        ];
    }
}