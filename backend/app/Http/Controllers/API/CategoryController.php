<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * GET /categories
     */
    public function index(Request $request)
    {
        $query = Category::withCount('articles')
            ->latest();

        if ($request->boolean('all')) {
            return CategoryResource::collection($query->get());
        }

        return CategoryResource::collection($query->paginate(5));
    }


    public function edit($id)
    {
        $category =Category::findOrFail($id);

        return new CategoryResource($category);
    }
    /**
     * POST /categories
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
        ]);

        $category = Category::create([
            'name' => $request->name,
        ]);

        return new CategoryResource($category);
    }

    /**
     * GET /categories/{slug}
     */
    public function show(string $slug)
    {
        $category = Category::with([
            'articles.user',
            'articles.comments'
        ])
            ->where('slug', $slug)
            ->firstOrFail();

        return new CategoryResource($category);
    }

    /**
     * PUT /categories/{id}
     */
    public function update(Request $request, string $id)
    {
        $category = Category::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
        ]);

        $category->update([
            'name' => $request->name,
        ]);

        return new CategoryResource($category);
    }

    /**
     * DELETE /categories/{id}
     */
    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);

        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully'
        ]);
    }
}