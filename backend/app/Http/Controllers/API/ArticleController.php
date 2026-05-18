<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    /**
     * Display a listing of articles
     */
    public function index()
    {
        $articles = Article::with([
            'user',
            'category',
            'comments'
        ])
        ->latest()
        ->paginate(10);

        return ArticleResource::collection($articles);
    }

    /**
     * Store a newly created article
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'excerpt' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'category_id' => 'required|exists:categories,id',
            'is_published' => 'nullable|boolean',
        ]);

        $imagePath = null;

        // Upload image
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')
                ->store('articles', 'public');
        }

        $article = Article::create([
            'title' => $request->title,

            'slug' => Str::slug($request->title . '-' . time()),

            'content' => $request->content,

            'excerpt' => $request->excerpt,

            'image' => $imagePath,

            'user_id' => Auth::id(),

            'category_id' => $request->category_id,

            'view_count' => 0,

            'is_published' => $request->is_published ?? true,

            'published_at' => now(),
        ]);

        return new ArticleResource($article);
    }

    /**
     * Display the specified article
     */
    public function show(string $slug)
    {
        $article = Article::with([
            'user',
            'category',
            'comments.user'
        ])
        //->where('slug', $slug)
        ->firstOrFail();

        // increment views
        $article->increment('view_count');

        return new ArticleResource($article);
    }

    /**
     * Update the specified article
     */
    public function update(Request $request, string $id)
    {
        $article = Article::findOrFail($id);

        // check ownership
        if ($article->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'excerpt' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'category_id' => 'required|exists:categories,id',
            'is_published' => 'nullable|boolean',
        ]);

        $imagePath = $article->image;

        // upload new image
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')
                ->store('articles', 'public');
        }

        $article->update([
            'title' => $request->title,

            'slug' => Str::slug($request->title . '-' . time()),

            'content' => $request->content,

            'excerpt' => $request->excerpt,

            'image' => $imagePath,

            'category_id' => $request->category_id,

            'is_published' => $request->is_published ?? true,
        ]);

        return new ArticleResource($article);
    }

    /**
     * Remove the specified article
     */
    public function destroy(string $id)
    {
        $article = Article::findOrFail($id);

        // check ownership
        if ($article->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $article->delete();

        return response()->json([
            'message' => 'Article deleted successfully'
        ]);
    }

    /**
     * Like article
     */
    public function like($id)
    {
        $article = Article::findOrFail($id);

        $article->increment('view_count');

        return response()->json([
            'message' => 'Article liked successfully',
            'views' => $article->view_count
        ]);
    }
}