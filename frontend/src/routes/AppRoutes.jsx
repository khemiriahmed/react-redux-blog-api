import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import CreateArticle from "../pages/CreateArticle";
import EditArticle from "../pages/EditArticle";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/create-article"
        element={<CreateArticle />}
      />

      <Route
        path="/edit-article/:id"
        element={<EditArticle />}
      />
    </Routes>
  );
}

export default AppRoutes;