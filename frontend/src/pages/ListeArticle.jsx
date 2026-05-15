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
  } = useSelector((state) => state.articles);

  /*
  |--------------------------------------------------------------------------
  | FETCH ARTICLES
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

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
      <div style={{ padding: "20px" }}>
        <h2>Loading articles...</h2>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */
  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Error loading articles</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>Blog Articles</h1>

        <Link to="/create-article">
          <button>
            Create Article
          </button>
        </Link>
      </div>

      {/* EMPTY */}
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        articles.map((article) => (
          <div
            key={article.id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            {/* TITLE */}
            <h2>{article.title}</h2>

            {/* EXCERPT */}
            <p>{article.excerpt}</p>

            {/* CATEGORY */}
            <p>
              <strong>Category:</strong>{" "}
              {article.category?.name}
            </p>

            {/* AUTHOR */}
            <p>
              <strong>Author:</strong>{" "}
              {article.author?.name}
            </p>

            {/* VIEWS */}
            <p>
              <strong>Views:</strong>{" "}
              {article.view_count}
            </p>

            {/* ACTIONS */}
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                gap: "10px",
              }}
            >
              {/* EDIT */}
              <Link
                to={`/edit-article/${article.id}`}
              >
                <button>
                  Edit
                </button>
              </Link>

              {/* DELETE */}
              <button
                onClick={() =>
                  handleDelete(article.id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;