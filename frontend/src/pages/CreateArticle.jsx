import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { createArticle } from "../features/articles/articleSlice";

function CreateArticle() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, validationErrors } = useSelector(
    (state) => state.articles,
  );

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
    image: null,
  });

  /*
  |--------------------------------------------------------------------------
  | RESET ERRORS ON MOUNT
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    // optional clean state
  }, []);

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

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  /*
  |--------------------------------------------------------------------------
  | HANDLE SUBMIT
  |--------------------------------------------------------------------------
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("excerpt", formData.excerpt);
    data.append("category_id", formData.category_id);

    if (formData.image) {
      data.append("image", formData.image);
    }

    const result = await dispatch(createArticle(data));

    /*
    |--------------------------------------------------------------------------
    | SUCCESS CHECK PROPER WAY
    |--------------------------------------------------------------------------
    */
    if (createArticle.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* HEADER */}
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Create Article
          </h1>

          <p className="text-gray-500 mb-6">Publish a new blog article</p>

          {/* GLOBAL ERROR */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4">
              {error.message || "Something went wrong"}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TITLE */}
            <div>
              <input
                type="text"
                name="title"
                placeholder="Article title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

              {validationErrors?.title && (
                <p className="text-red-500 text-sm">
                  {validationErrors.title[0]}
                </p>
              )}
            </div>

            {/* CONTENT */}
            <div>
              <textarea
                name="content"
                placeholder="Content"
                rows="8"
                value={formData.content}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

              {validationErrors?.content && (
                <p className="text-red-500 text-sm">
                  {validationErrors.content[0]}
                </p>
              )}
            </div>

            {/* EXCERPT */}
            <div>
              <textarea
                name="excerpt"
                placeholder="Excerpt"
                rows="4"
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

              {validationErrors?.excerpt && (
                <p className="text-red-500 text-sm">
                  {validationErrors.excerpt[0]}
                </p>
              )}
            </div>

            {/* CATEGORY */}
            <div>
              <input
                type="number"
                name="category_id"
                placeholder="Category ID"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

              {validationErrors?.category_id && (
                <p className="text-red-500 text-sm">
                  {validationErrors.category_id[0]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Article Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl"
              >
                {loading ? "Creating..." : "Create Article"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="bg-gray-200 px-6 py-3 rounded-xl"
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
