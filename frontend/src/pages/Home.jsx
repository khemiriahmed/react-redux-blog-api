import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchArticles } from "../features/articles/articleSlice";

function Home() {
  const dispatch = useDispatch();

  const { articles, loading, error } = useSelector((state) => state.articles);

  // FETCH ARTICLES
  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  // LOADING
  if (loading) {
    return <h2>Loading articles...</h2>;
  }

  // ERROR
  if (error) {
    return <h2>Error loading articles</h2>;
  }

  return (
    <div>
      <h1>Blog Articles</h1>

      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        articles.map((article) => (
          <div
            key={article.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "20px",
            }}
          >
            <h2>{article.title}</h2>

            <p>{article.excerpt}</p>

            <p>
              <strong>Category:</strong> {article.category?.name}
            </p>

            <p>
              <strong>Author:</strong> {article.author?.name}
            </p>

            <p>
              <strong>Views:</strong> {article.view_count}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
