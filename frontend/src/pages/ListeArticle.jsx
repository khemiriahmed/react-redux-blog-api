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

  /*
  |--------------------------------------------------------------------------
  | SEARCH STATES
  |--------------------------------------------------------------------------
  */
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  /*
  |--------------------------------------------------------------------------
  | FETCH ARTICLES (ON LOAD / PAGE CHANGE ONLY)
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    dispatch(
      fetchArticles({
        page: currentPage,
        search,
      }),
    );
  }, [dispatch, currentPage]);

  /*
  |--------------------------------------------------------------------------
  | SEARCH HANDLER
  |--------------------------------------------------------------------------
  */
  const handleSearch = () => {
    setSearch(searchInput);

    dispatch(
      fetchArticles({
        page: 1,
        search: searchInput,
      }),
    );
  };

  /*
  |--------------------------------------------------------------------------
  | PAGINATION HANDLERS
  |--------------------------------------------------------------------------
  */
  const handleNextPage = () => {
    if (currentPage < lastPage) {
      dispatch(
        fetchArticles({
          page: currentPage + 1,
          search,
        }),
      );
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(
        fetchArticles({
          page: currentPage - 1,
          search,
        }),
      );
    }
  };

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

  /*
  |--------------------------------------------------------------------------
  | LOADING STATE
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
  | ERROR STATE
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

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */
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

            {/* SEARCH */}
            <div className="flex gap-3 mt-4">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="border border-gray-300 rounded-xl px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
              >
                Search
              </button>
            </div>
          </div>

          {/* CREATE BUTTON */}
          <Link to="/create-article">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md">
              + Create Article
            </button>
          </Link>
        </div>

        {/* EMPTY */}
        {articles.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <p className="text-gray-500 text-lg">No articles found.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {/* LIST */}
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6"
              >
                {/* IMAGE */}
                {article.image && (
                  <img
                    src={`http://127.0.0.1:8000/storage/${article.image}`}
                    alt={article.title}
                    className="w-full h-56 object-cover rounded-xl mb-4"
                  />
                )}

                {/* TITLE */}
                <Link to={`/articles/${article.id}`}>
                  <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600">
                    {article.title}
                  </h2>
                </Link>

                {/* EXCERPT */}
                <p className="text-gray-600 mt-2">{article.excerpt}</p>

                {/* META */}
                <div className="flex gap-3 mt-4 text-sm">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    📂 {article.category?.name}
                  </span>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    👤 {article.author?.name}
                  </span>

                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    👁 {article.view_count}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3 mt-6">
                  <Link
                    to={`/articles/${article.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                  >
                    Read
                  </Link>

                  <Link
                    to={`/edit-article/${article.id}`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-xl"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(article.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        <div className="flex items-center justify-center gap-3 mt-10 flex-wrap">
          {/* PREV */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-xl ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-800 text-white"
            }`}
          >
            Prev
          </button>

          {/* NUMBERS */}
          {[...Array(lastPage)].map((_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                onClick={() =>
                  dispatch(
                    fetchArticles({
                      page,
                      search,
                    }),
                  )
                }
                className={`w-10 h-10 rounded-xl ${
                  currentPage === page ? "bg-blue-600 text-white" : "bg-white"
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
            className={`px-4 py-2 rounded-xl ${
              currentPage === lastPage
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
