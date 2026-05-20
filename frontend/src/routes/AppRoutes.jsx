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

/*
|--------------------------------------------------------------------------
| COMPONENTS
|--------------------------------------------------------------------------
*/
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* ARTICLE DETAILS */}
      <Route
        path="/articles/:id"
        element={<ArticleDetails />}
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* REGISTER */}
      <Route
        path="/register"
        element={<Register />}
      />

      {/* CREATE ARTICLE */}
      <Route
        path="/create-article"
        element={
          <ProtectedRoute>
            <CreateArticle />
          </ProtectedRoute>
        }
      />

      {/* EDIT ARTICLE */}
      <Route
        path="/edit-article/:id"
        element={
          <ProtectedRoute>
            <EditArticle />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;