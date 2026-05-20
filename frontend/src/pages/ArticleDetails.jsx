import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { fetchComments } from "../features/comments/commentSlice";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { fetchSingleArticle } from "../features/articles/articleSlice";

function ArticleDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  /*
  |--------------------------------------------------------------------------
  | REDUX STATE
  |--------------------------------------------------------------------------
  */
  const {
    singleArticle,
    loading,
    error,
  } = useSelector((state) => state.articles);

  const { comments } = useSelector(
  (state) => state.comments
);
  /*
  |--------------------------------------------------------------------------
  | FETCH ARTICLE
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    dispatch(fetchSingleArticle(id));
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-semibold text-gray-700">
          Loading article...
        </h2>
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-semibold text-red-500">
          Error loading article
        </h2>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ARTICLE NOT FOUND
  |--------------------------------------------------------------------------
  */
  if (!singleArticle) {
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
      <div className="max-w-4xl mx-auto px-4">

        {/* BACK BUTTON */}
        <Link to="/">
          <button className="mb-6 bg-gray-800 hover:bg-black text-white px-5 py-2 rounded-xl transition duration-300">
            ← Back
          </button>
        </Link>

        {/* ARTICLE CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          {/* TITLE */}
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            {singleArticle.title}
          </h1>

          {/* META */}
          <div className="flex flex-wrap gap-4 mb-8">

            {/* CATEGORY */}
            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              📂 {singleArticle.category?.name}
            </div>

            {/* AUTHOR */}
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              👤 {singleArticle.author?.name}
            </div>

            {/* VIEWS */}
            <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
              👁 {singleArticle.view_count} views
            </div>

          </div>

          {/* EXCERPT */}
          <div className="bg-gray-50 border-l-4 border-blue-500 p-5 rounded-xl mb-8">
            <p className="text-lg italic text-gray-700">
              {singleArticle.excerpt}
            </p>
          </div>

          {/* CONTENT */}
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-8 text-lg whitespace-pre-line">
              {singleArticle.content}
            </p>
          </div>

          {/* COMMENTS */}
<div className="mt-14">

  <h2 className="text-3xl font-bold text-gray-800 mb-8">
    Comments
  </h2>

  {/* ADD COMMENT */}
  <CommentForm articleId={id} />

  {/* COMMENTS LIST */}
  <CommentList
    comments={comments}
    articleId={id}
  />
</div>

        </div>
      </div>
    </div>
  );
}

export default ArticleDetails;