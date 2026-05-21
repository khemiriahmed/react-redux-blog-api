import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { updateArticle } from "../features/articles/articleSlice";

function EditArticle() {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  /*
  |--------------------------------------------------------------------------
  | REDUX STATE
  |--------------------------------------------------------------------------
  */
  const { articles } = useSelector((state) => state.articles);

  /*
  |--------------------------------------------------------------------------
  | FIND ARTICLE
  |--------------------------------------------------------------------------
  */
  const article = articles.find((article) => article.id === Number(id));

  /*
  |--------------------------------------------------------------------------
  | FORM STATE
  |--------------------------------------------------------------------------
  */
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
        category_id: article.category?.id || "",
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
      }),
    );

    alert("Article updated successfully!");

    navigate("/");
  };

  /*
  |--------------------------------------------------------------------------
  | ARTICLE NOT FOUND
  |--------------------------------------------------------------------------
  */
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-semibold text-red-500">
          Article not found
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto px-4">
        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Edit Article</h1>

            <p className="text-gray-500 mt-2">
              Update your article information
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TITLE */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Article Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Article title"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* CONTENT */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Article Content
              </label>

              <textarea
                name="content"
                rows="10"
                value={formData.content}
                onChange={handleChange}
                placeholder="Update article content..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* EXCERPT */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Excerpt
              </label>

              <textarea
                name="excerpt"
                rows="4"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Short article summary..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                value={formData.category_id}
                onChange={handleChange}
                placeholder="Category ID"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 pt-4">
              {/* UPDATE */}
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl shadow-md transition duration-300"
              >
                Update Article
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

export default EditArticle;
