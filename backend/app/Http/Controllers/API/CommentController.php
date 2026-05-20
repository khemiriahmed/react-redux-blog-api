<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Store a new comment
     */
    public function store(Request $request, Article $article)
    {
        $request->validate([
            'content' => 'required|string',
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        $comment = Comment::create([
            'article_id' => $article->id,

            // 'user_id' => 1

            'content' => $request->content,

            'is_approved' => true,

            'parent_id' => $request->parent_id,
        ]);

        // $comment->load('user');
           $comment->load( 'replies');

        return new CommentResource($comment);
    }

    /**
     * Display comments for article
     */
    public function index($articleId)
    {
        $comments = Comment::with([
            'user',
            'replies.user'
        ])
        ->where('article_id', $articleId)
        ->whereNull('parent_id')
        ->latest()
        ->get();

        return CommentResource::collection($comments);
    }
    

    /**
     * Update comment
     */
    public function update(Request $request, string $id)
    {
        $comment = Comment::findOrFail($id);

        // Check ownership
        if ($comment->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $request->validate([
            'content' => 'required|string',
        ]);

        $comment->update([
            'content' => $request->content,
        ]);

        return new CommentResource($comment);
    }

    /**
     * Delete comment
     */
    public function destroy(string $id)
    {
        $comment = Comment::findOrFail($id);

        // Check ownership
        if ($comment->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $comment->delete();

        return response()->json([
            'message' => 'Comment deleted successfully'
        ]);
    }
}