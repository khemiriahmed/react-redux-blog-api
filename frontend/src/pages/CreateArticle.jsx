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
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto px-4">

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Create Article
            </h1>

            <p className="text-gray-500 mt-2">
              Publish a new blog article with Laravel API + React
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* TITLE */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Article Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Enter article title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* CONTENT */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Article Content
              </label>

              <textarea
                name="content"
                placeholder="Write your article content..."
                rows="10"
                value={formData.content}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* EXCERPT */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Excerpt
              </label>

              <textarea
                name="excerpt"
                placeholder="Short article summary..."
                rows="4"
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Category ID
              </label>

              <input
                type="number"
                name="category_id"
                placeholder="Enter category ID"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 pt-4">

              {/* SUBMIT */}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition duration-300"
              >
                Create Article
              </button>

              {/* CANCEL */}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl transition duration-300"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateArticle;