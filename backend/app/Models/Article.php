<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'image',
        'user_id',
        'category_id',
        'view_count',
        'reading_time',
        'is_published',
        'published_at',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
        'view_count' => 'integer',
        'reading_time' => 'integer',
    ];

    /**
     * Relations
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // public function likes()
    // {
    //     return $this->belongsToMany(User::class, 'likes')->withTimestamps();
    // }

    public function likes()
    {
        return $this->hasMany(ArticleLike::class);
    }

    /**
     * Accesseurs
     */
    public function getLikesCountAttribute()
    {
        return $this->likes()->count();
    }

    public function getCommentsCountAttribute()
    {
        return $this->comments()->where('is_approved', true)->count();
    }

    public function getIsLikedAttribute()
    {
        return $this->likes()->where('user_id', auth()->id())->exists();
    }

    /**
     * Mutateurs
     */
    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    public function setContentAttribute($value)
    {
        $this->attributes['content'] = $value;

        // Calculer le temps de lecture (moyenne 200 mots/min)
        $wordCount = str_word_count(strip_tags($value));
        $this->attributes['reading_time'] = ceil($wordCount / 200);
    }

    /**
     * Scopes
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    public function scopeLatest($query)
    {
        return $query->orderBy('published_at', 'desc');
    }

    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
                ->orWhere('content', 'like', "%{$search}%")
                ->orWhere('excerpt', 'like', "%{$search}%");
        });
    }

    public function scopeWithRelations($query)
    {
        return $query->with(['user:id,name', 'category:id,name,slug,color'])
            ->withCount([
                'comments' => function ($q) {
                    $q->where('is_approved', true);
                },
                'likes'
            ]);
    }

    /**
     * Méthodes personnalisées
     */
    public function incrementViewCount()
    {
        $this->increment('view_count');
    }

    public function toggleLike()
    {
        if ($this->isLikedByUser(auth()->id())) {
            $this->likes()->detach(auth()->id());
            return false;
        } else {
            $this->likes()->attach(auth()->id());
            return true;
        }
    }

    public function isLikedByUser($userId)
    {
        return $this->likes()->where('user_id', $userId)->exists();
    }
}