import { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { createArticle } from "../features/articles/articleSlice";

function CreateArticle() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category_id: "",
  });

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

    await dispatch(createArticle(formData));

    alert("Article created successfully!");

    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Article</h1>

      <form onSubmit={handleSubmit}>
        {/* TITLE */}
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <br />

        {/* CONTENT */}
        <div>
          <textarea
            name="content"
            placeholder="Content"
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
            placeholder="Excerpt"
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
            placeholder="Category ID"
            value={formData.category_id}
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit">
          Create Article
        </button>
      </form>
    </div>
  );
}

export default CreateArticle;