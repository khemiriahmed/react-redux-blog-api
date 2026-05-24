import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchArticles,
  deleteArticle,
} from "../features/articles/articleSlice";

function Home() {
  const dispatch = useDispatch();

  /*
  |--------------------------------------------------------------------------
  | REDUX STATE
  |--------------------------------------------------------------------------
  */
  const { articles, loading, error, currentPage, lastPage } = useSelector(
    (state) => state.articles,
  );
  const [search, setSearch] = useState("");

  /*
  |--------------------------------------------------------------------------
  | FETCH ARTICLES
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    dispatch(fetchArticles(
      {
        page: currentPage,
        search,
      }
    ));
  }, [dispatch, currentPage,search]);

  /*
  |--------------------------------------------------------------------------
  | DELETE ARTICLE
  |--------------------------------------------------------------------------
  */
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?",
    );

    if (confirmDelete) {
      dispatch(deleteArticle(id));
    }
  };


  const filteredArticles = articles.filter((article) =>
  article.title.toLowerCase().includes(search.toLowerCase())
);

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-semibold text-gray-700">
          Loading articles...
        </h2>
      </div>
    );
  }

  /*
|--------------------------------------------------------------------------
| PAGINATION
|--------------------------------------------------------------------------
*/
  const handleNextPage = () => {
    if (currentPage < lastPage) {
      dispatch(fetchArticles(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(fetchArticles(currentPage - 1));
    }
  };

  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-semibold text-red-500">
          Error loading articles
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Blog Articles</h1>

            <p className="text-gray-500 mt-2">
              Manage your blog articles with React + Laravel API
            </p>

             <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Link to="/create-article">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition duration-300">
              + Create Article
            </button>
          </Link>
        </div>

        {/* EMPTY */}
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <p className="text-gray-500 text-lg">No articles found.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 border border-gray-100"
              >
                {/* TOP */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {/* IMAGE */}
                    {article.image && (
                      <img
                        src={`${article.image}`}
                        alt={article.title}
                        className="w-full h-56 object-cover"
                      />
                    )}
                    {/* TITLE */}
                    <Link to={`/articles/${article.id}`}>
                      <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition duration-300 cursor-pointer">
                        {article.title}
                      </h2>
                    </Link>

                    {/* EXCERPT */}
                    <p className="text-gray-600 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* VIEWS */}
                  <div className="bg-gray-100 px-4 py-2 rounded-xl text-sm text-gray-600 whitespace-nowrap">
                    👁 {article.view_count} views
                  </div>
                </div>

                {/* META */}
                <div className="flex flex-wrap gap-4 mt-6">
                  {/* CATEGORY */}
                  <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                    📂 {article.category?.name || "No Category"}
                  </div>

                  {/* AUTHOR */}
                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                    👤 {article.author?.name || "Unknown"}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-4 mt-8">
                  {/* EDIT */}
                  <Link
                    to={`/articles/${article.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                  >
                    Read More
                  </Link>
                  <Link to={`/edit-article/${article.id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl transition duration-300">
                      Edit
                    </button>
                  </Link>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
        {/* PREVIOUS */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-xl transition duration-300 ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-800 hover:bg-black text-white"
          }`}
        >
          Previous
        </button>

        {/* PAGE NUMBERS */}
        {[...Array(lastPage)].map((_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              onClick={() => dispatch(fetchArticles(page))}
              className={`w-10 h-10 rounded-xl font-semibold transition duration-300 ${
                currentPage === page
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* NEXT */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === lastPage}
          className={`px-4 py-2 rounded-xl transition duration-300 ${
            currentPage === lastPage
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
