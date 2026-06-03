<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'color',
    ];

    /**
     * Relations
     */
    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    /**
     * Accesseurs
     */
    public function getArticlesCountAttribute()
    {
        return $this->articles()->where('is_published', true)->count();
    }

    /**
     * Mutateurs - Génération automatique du slug
     */
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    /**
     * Scopes
     */
    public function scopeWithArticlesCount($query)
    {
        return $query->withCount([
            'articles' => function ($query) {
                $query->where('is_published', true);
            }
        ]);
    }
}