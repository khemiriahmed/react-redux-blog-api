import { useEffect } from "react";

import { Link } from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

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
  const {
    articles,
    loading,
    error,
     currentPage,
  lastPage,
  } = useSelector((state) => state.articles);

  /*
  |--------------------------------------------------------------------------
  | FETCH ARTICLES
  |--------------------------------------------------------------------------
  */
useEffect(() => {
  dispatch(fetchArticles(currentPage));
}, [dispatch, currentPage]);

  /*
  |--------------------------------------------------------------------------
  | DELETE ARTICLE
  |--------------------------------------------------------------------------
  */
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (confirmDelete) {
      dispatch(deleteArticle(id));
    }
  };

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
            <h1 className="text-4xl font-bold text-gray-800">
              Blog Articles
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your blog articles with React + Laravel API
            </p>
          </div>

          <Link to="/create-article">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition duration-300">
              + Create Article
            </button>
          </Link>
        </div>

        {/* EMPTY */}
        {articles.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <p className="text-gray-500 text-lg">
              No articles found.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 border border-gray-100"
              >
                {/* TOP */}
                <div className="flex items-start justify-between gap-4">
                  
                  <div>
                    {/* TITLE */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                      {article.title}
                    </h2>

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
                    to={`/edit-article/${article.id}`}
                  >
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl transition duration-300">
                      Edit
                    </button>
                  </Link>

                  {/* DELETE */}
                  <button
                    onClick={() =>
                      handleDelete(article.id)
                    }
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
<div className="flex items-center justify-center gap-4 mt-10">

  {/* PREVIOUS */}
  <button
    onClick={handlePrevPage}
    disabled={currentPage === 1}
    className={`px-5 py-2 rounded-xl transition duration-300 ${
      currentPage === 1
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-gray-800 hover:bg-black text-white"
    }`}
  >
    Previous
  </button>

  {/* PAGE INFO */}
  <div className="bg-white shadow px-5 py-2 rounded-xl font-semibold text-gray-700">
    Page {currentPage} / {lastPage}
  </div>

  {/* NEXT */}
  <button
    onClick={handleNextPage}
    disabled={currentPage === lastPage}
    className={`px-5 py-2 rounded-xl transition duration-300 ${
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