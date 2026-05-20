<?php

use App\Http\Controllers\API\ArticleController;
use App\Http\Controllers\API\AuthController;

/*
|--------------------------------------------------------------------------
| CONTROLLERS
|--------------------------------------------------------------------------
*/
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\ProfileController;
use App\Models\Article;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;




/*
|--------------------------------------------------------------------------
| AUTH ROUTES (PUBLIC)
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

// 📄 Articles
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{slug}', [ArticleController::class, 'show']);

// 📂 Categories
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{slug}', [CategoryController::class, 'show']);

// 💬 Comments (read only)
Route::get('/articles/{articleId}/comments', [CommentController::class, 'index']);

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES (SANCTUM)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | USER PROFILE
    |--------------------------------------------------------------------------
    */
    //Route::get('/me', [ProfileController::class, 'me']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/avatar', [ProfileController::class, 'uploadAvatar']);

    /*
    |--------------------------------------------------------------------------
    | ARTICLES (AUTH REQUIRED)
    |--------------------------------------------------------------------------
    */
    Route::post('/articles', [ArticleController::class, 'store']);
    Route::put('/articles/{id}', [ArticleController::class, 'update']);
    Route::delete('/articles/{id}', [ArticleController::class, 'destroy']);
    Route::post('/articles/{id}/like', [ArticleController::class, 'like']);

    /*
    |--------------------------------------------------------------------------
    | COMMENTS (AUTH REQUIRED)
    |--------------------------------------------------------------------------
    */
    Route::post('/articles/{article}/comments', [CommentController::class, 'store']);
    Route::put('/comments/{id}', [CommentController::class, 'update']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);

    /*
    |--------------------------------------------------------------------------
    | CATEGORIES (ADMIN LATER)
    |--------------------------------------------------------------------------
    */
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
});

Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {
    Route::get('/admin/dashboard', fn () => [
        'users' => \App\Models\User::count(),
        'articles' => \App\Models\Article::count(),
        'comments' => \App\Models\Comment::count(),
    ]);
});