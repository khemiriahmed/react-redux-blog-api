<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

use App\Models\ArticleLike;

class ArticleController extends Controller
{
    /**
     * Display a listing of articles
     */
    public function index(Request $request)
    {
        $userId = auth()->id();

        $query = Article::with([
            'user:id,name,email',
            'category:id,name,slug',
        ])
            ->withCount('likes')
            ->withExists([
                'likes as user_liked' => fn($q) => $q->when($userId, fn($q) => $q->where('user_id', $userId)),
            ]);

        if ($request->filled('search')) {

            $search = $request->search;

            $query->where(function ($q) use ($search) {

                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        $articles = $query
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

        return new ArticleResource(
            $article->load(['user:id,name,email', 'category:id,name,slug'])
        );
    }

    /**
     * Display the specified article
     */
    public function show(string $id)
    {
        $userId = auth()->id();

        $article = Article::with([
            'user:id,name,email',
            'category:id,name,slug',
            'comments.user',
        ])
            ->withCount('likes')
            ->withExists([
                'likes as user_liked' => fn($q) => $q->when($userId, fn($q) => $q->where('user_id', $userId)),
            ])
            ->where(function ($q) use ($id) {
                $q->where('id', $id)->orWhere('slug', $id);
            })
            ->firstOrFail();

        $article->increment('view_count');

        return new ArticleResource($article);
    }

    /**
     * Update the specified article
     */
    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);

        if ($article->user_id !== Auth::id() && Auth::user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {

            if ($article->image) {
                Storage::disk('public')->delete($article->image);
            }

            $article->image = $request
                ->file('image')
                ->store('articles', 'public');
        }

        $article->update([
            'title' => $request->title,
            'content' => $request->content,
            'excerpt' => $request->excerpt,
            'category_id' => $request->category_id,
            'image' => $article->image,
        ]);

        return new ArticleResource($article->fresh([
            'user:id,name,email',
            'category:id,name,slug',
        ]));
    }

    /**
     * Remove the specified article
     */
    public function destroy(string $id)
    {
        $article = Article::findOrFail($id);

        // check ownership
        if ($article->user_id !== Auth::id() && Auth::user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        if ($article->image) {
            Storage::disk('public')->delete($article->image);
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

        $like = ArticleLike::where('article_id', $article->id)
            ->where('user_id', Auth::id())
            ->first();

        if ($like) {
            $like->delete();

            return response()->json([
                'liked' => false,
                'likes_count' => ArticleLike::where('article_id', $article->id)->count(),
                'message' => 'Unliked',
            ]);
        }

        ArticleLike::create([
            'article_id' => $article->id,
            'user_id' => Auth::id(),
        ]);

        return response()->json([
            'liked' => true,
            'likes_count' => ArticleLike::where('article_id', $article->id)->count(),
            'message' => 'Liked',
        ]);
    }

    public function likesCount($id)
    {
        $count = ArticleLike::where('article_id', $id)->count();

        return response()->json([
            'likes' => $count
        ]);
    }
}