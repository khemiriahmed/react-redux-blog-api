<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'content' => $this->content,

            'is_approved' => $this->is_approved,

            'created_at' => $this->created_at,

            'author' => [
                'id' => $this->user?->id,
                'name' => $this->user?->name,
            ],

            'replies' => CommentResource::collection(
                $this->whenLoaded('replies')
            ),
        ];
    }
}