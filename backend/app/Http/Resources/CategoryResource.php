<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'name' => $this->name,

            'slug' => $this->slug,

            'created_at' => $this->created_at,

            // 📊 nombre d’articles
            'articles_count' => $this->when(
                isset($this->articles_count),
                $this->articles_count
            ),

            // 📰 articles (optionnel si chargé)
            'articles' => ArticleResource::collection(
                $this->whenLoaded('articles')
            ),
        ];
    }
}