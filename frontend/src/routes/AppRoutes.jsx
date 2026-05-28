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

import Categories from "../pages/categorie/ListeCategories";
// import CreateCategory from "../pages/categorie/CreateCategory";
// import CategoryDetails from "../pages/categorie/DetailsCategory";

/*
|--------------------------------------------------------------------------
| ROUTE GUARDS
|--------------------------------------------------------------------------
*/
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}

      <Route path="/" element={<Home />} />

      <Route
        path="/articles/:id"
        element={<ArticleDetails />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* ================= USER ================= */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ================= ARTICLES ================= */}

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

      {/* ================= CATEGORIES ================= */}

      <Route
        path="/categories"
        element={<Categories />}
      />



      {/* ================= ADMIN ================= */}

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