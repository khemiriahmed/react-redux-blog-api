import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { updateArticle } from "../features/articles/articleSlice";

function EditArticle() {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { articles } = useSelector(
    (state) => state.articles
  );

  const article = articles.find(
    (article) => article.id === Number(id)
  );

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category_id: "",
  });

  /*
  |--------------------------------------------------------------------------
  | LOAD ARTICLE DATA
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || "",
        content: article.content || "",
        excerpt: article.excerpt || "",
        category_id:
          article.category?.id || "",
      });
    }
  }, [article]);

  /*
  |--------------------------------------------------------------------------
  | HANDLE CHANGE
  |--------------------------------------------------------------------------
  */
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  /*
  |--------------------------------------------------------------------------
  | HANDLE SUBMIT
  |--------------------------------------------------------------------------
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      updateArticle({
        id,
        articleData: formData,
      })
    );

    alert("Article updated successfully!");

    navigate("/");
  };

  if (!article) {
    return <h2>Article not found</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Article</h1>

      <form onSubmit={handleSubmit}>
        {/* TITLE */}
        <div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <br />

        {/* CONTENT */}
        <div>
          <textarea
            name="content"
            rows="8"
            cols="50"
            value={formData.content}
            onChange={handleChange}
          />
        </div>

        <br />

        {/* EXCERPT */}
        <div>
          <textarea
            name="excerpt"
            rows="4"
            cols="50"
            value={formData.excerpt}
            onChange={handleChange}
          />
        </div>

        <br />

        {/* CATEGORY */}
        <div>
          <input
            type="number"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit">
          Update Article
        </button>
      </form>
    </div>
  );
}

export default EditArticle;