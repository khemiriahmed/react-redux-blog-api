# React Redux Blog

> **Statut** : ✅ Projet terminé et fonctionnel

Blog personnel fullstack moderne avec **React 19 + Redux Toolkit** (frontend) et une **API REST Laravel 13 + Sanctum** (backend).

## Fonctionnalités
-  Authentification API (inscription, connexion, déconnexion) via Laravel Sanctum
-  CRUD complet des articles (avec image, catégorie, publication)
-  CRUD des catégories (réservé aux administrateurs)
-  Commentaires (avec réponses imbriquées)
-  Système de likes (toggle par utilisateur)
-  Profil utilisateur (nom, email, avatar)
-  Recherche + pagination des articles
-  Rôles (utilisateur / administrateur) et tableau de bord admin
-  Règles d'autorisation (propriétaire ou admin) sur articles et catégories
-  Icônes Font Awesome

## Stack Technique

### Frontend
- **React** 19.x
- **Redux Toolkit** (+ Entity Adapter pour la normalisation)
- **React Router** 7.x
- **Axios** pour les requêtes HTTP
- **Tailwind CSS** 4.x
- **Font Awesome** (react-fontawesome) pour les icônes
- **Vite** comme bundler

### Backend
- **Laravel** 13.x
- **Laravel Sanctum** pour l'authentification API
- **MySQL** pour la base de données
- **API Resources** pour le formatage des réponses

## Structure du Projet

```
react-redux-blog-api/
├── backend/              # API Laravel
│   ├── app/Http/Controllers/API/
│   ├── app/Http/Resources/
│   ├── app/Models/
│   ├── database/migrations/
│   ├── database/seeders/
│   └── routes/api.php
└── frontend/             # Application React + Redux
    ├── src/components/
    ├── src/features/     # Slices Redux (auth, articles, categories)
    ├── src/pages/
    └── src/routes/
```

## Installation

### Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Configurer la base de données MySQL dans .env (DB_DATABASE=blog_api)
php artisan migrate --seed
php artisan serve
```

L'API sera disponible sur `http://127.0.0.1:8000`.

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

L'application sera disponible sur `http://localhost:3000`.

> Le frontend consomme l'API via `http://127.0.0.1:8000/api`.

## Comptes de démonstration

| Rôle          | Email             | Mot de passe |
| ------------- | ----------------- | ------------ |
| Administrateur| admin@blog.com    | admin123     |
| Utilisateur   | ahmed@gmail.com   | 123456       |

## Principales routes API

| Méthode | Route                          | Accès        |
| ------- | ------------------------------ | ------------ |
| POST    | `/api/register`                | Public       |
| POST    | `/api/login`                   | Public       |
| POST    | `/api/logout`                  | Authentifié  |
| GET     | `/api/me`                      | Authentifié  |
| PUT     | `/api/profile`                 | Authentifié  |
| POST    | `/api/profile/avatar`          | Authentifié  |
| GET     | `/api/articles`                | Public       |
| GET     | `/api/articles/{id\|slug}`     | Public       |
| POST    | `/api/articles`                | Authentifié  |
| PUT     | `/api/articles/{id}`           | Propriétaire |
| DELETE  | `/api/articles/{id}`           | Propriétaire |
| POST    | `/api/articles/{id}/like`      | Authentifié  |
| GET     | `/api/articles/{id}/comments`  | Public       |
| POST    | `/api/articles/{id}/comments`  | Authentifié  |
| GET     | `/api/categories`              | Public       |
| POST    | `/api/categories`              | Admin        |
| PUT     | `/api/categories/{id}`         | Admin        |
| DELETE  | `/api/categories/{id}`         | Admin        |
| GET     | `/api/admin/dashboard`         | Admin        |
