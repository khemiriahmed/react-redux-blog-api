import { useState } from "react";

import CommentForm from "./CommentForm";

function CommentItem({
  comment,
  articleId,
}) {
  const [showReply, setShowReply] =
    useState(false);

  return (
    <div className="bg-white rounded-2xl shadow p-5 mb-4">

      {/* USER */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
          {comment.user?.name?.charAt(0)}
        </div>

        <div>
          <h4 className="font-semibold text-gray-800">
            {comment.user?.name}
          </h4>
        </div>
      </div>

      {/* CONTENT */}
      <p className="text-gray-700 leading-7">
        {comment.content}
      </p>

      {/* REPLY BUTTON */}
      <button
        onClick={() =>
          setShowReply(!showReply)
        }
        className="mt-3 text-blue-600 hover:text-blue-800 font-medium"
      >
        Reply
      </button>

      {/* REPLY FORM */}
      {showReply && (
        <div className="mt-4">
          <CommentForm
            articleId={articleId}
            parentId={comment.id}
          />
        </div>
      )}

      {/* NESTED REPLIES */}
      {comment.replies &&
        comment.replies.length > 0 && (
          <div className="ml-10 mt-5 border-l-2 border-gray-200 pl-5">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                articleId={articleId}
              />
            ))}
          </div>
        )}
    </div>
  );
}

export default CommentItem;