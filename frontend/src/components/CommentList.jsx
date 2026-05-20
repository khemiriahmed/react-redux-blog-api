import CommentItem from "./CommentItem";

function CommentList({
  comments,
  articleId,
}) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          articleId={articleId}
        />
      ))}
    </div>
  );
}

export default CommentList;