<?php

use App\Http\Controllers\API\ArticleController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

// 📄 Articles (public)
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{slug}', [ArticleController::class, 'show']);

// 📂 Categories (public)
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{slug}', [CategoryController::class, 'show']);

// 💬 Comments (public read)
Route::get('/articles/{articleId}/comments', [CommentController::class, 'index']);


/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES (LOGIN REQUIRED)
|--------------------------------------------------------------------------
*/


    // 📝 Articles
    Route::post('/articles', [ArticleController::class, 'store']);
    Route::put('/articles/{id}', [ArticleController::class, 'update']);
    Route::delete('/articles/{id}', [ArticleController::class, 'destroy']);
    Route::post('/articles/{id}/like', [ArticleController::class, 'like']);

    // 💬 Comments
    Route::post('/articles/{article}/comments', [CommentController::class, 'store']);
    Route::put('/comments/{id}', [CommentController::class, 'update']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);

    // 📂 Categories (admin only normalement)
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
