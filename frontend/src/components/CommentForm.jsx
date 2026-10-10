import { useState } from "react";

import { Link } from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { addComment } from "../features/comments/commentSlice";

function CommentForm({
  articleId,
  parentId = null,
}) {
  const dispatch = useDispatch();

  const token = useSelector(
    (state) => state.auth.token
  );

  const [content, setContent] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | HANDLE SUBMIT
  |--------------------------------------------------------------------------
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    await dispatch(
      addComment({
        articleId,

        commentData: {
          content,

          parent_id: parentId,
        },
      })
    );

    setContent("");
  };

  if (!token) {
    return (
      <p className="mb-6 text-gray-500">
        <Link
          to="/login"
          className="text-blue-600 hover:underline"
        >
          Login
        </Link>{" "}
        to post a comment.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6"
    >
      <textarea
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        placeholder="Write a comment..."
        rows="4"
        className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />

      <button
        type="submit"
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition duration-300"
      >
        Post Comment
      </button>
    </form>
  );
}

export default CommentForm;