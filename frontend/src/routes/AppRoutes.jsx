import { Routes, Route } from "react-router-dom";
import ArticleDetails from "../pages/ArticleDetails";
import Home from "../pages/ListeArticle";
import CreateArticle from "../pages/CreateArticle";
import EditArticle from "../pages/EditArticle";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/create-article" element={<CreateArticle />} />

      <Route path="/edit-article/:id" element={<EditArticle />} />

      <Route path="/articles/:id" element={<ArticleDetails />} />
    </Routes>
  );
}

export default AppRoutes;
