import { Routes, Route } from "react-router-dom";

/*
|--------------------------------------------------------------------------
| PAGES
|--------------------------------------------------------------------------
*/
import Home from "../pages/ListeArticle";

import ArticleDetails from "../pages/ArticleDetails";

import CreateArticle from "../pages/CreateArticle";

import EditArticle from "../pages/EditArticle";

import Login from "../pages/Login";

import Register from "../pages/Register";

import Profile from "../pages/Profile";

import AdminDashboard from "../pages/AdminDashboard";

/*
|--------------------------------------------------------------------------
| ROUTE GUARDS
|--------------------------------------------------------------------------
*/
import ProtectedRoute from "../components/ProtectedRoute";

import AdminRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}

      <Route path="/" element={<Home />} />

      <Route path="/articles/:id" element={<ArticleDetails />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* ================= USER (AUTH REQUIRED) ================= */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ================= ARTICLES PROTECTED ================= */}

      <Route
        path="/create-article"
        element={
          <ProtectedRoute>
            <CreateArticle />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-article/:id"
        element={
          <ProtectedRoute>
            <EditArticle />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ONLY ================= */}

      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;