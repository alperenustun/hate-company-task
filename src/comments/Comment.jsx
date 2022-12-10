import CommentForm from "./CommentForm";

const Comment = ({comment, replies, currentUserId, likes, activeComment, addComment, setActiveComment, parentId = null}) => {
    const canReply = Boolean(currentUserId);
    const canUpvote = true;
    // const canEdit = currentUserId === comment.userId;

    const createdAt = new Date(comment.createdAt).toLocaleDateString();
    const isReplying =
      activeComment &&
      activeComment.type === "replying" &&
      activeComment.id === comment.id;
    const isUpvoting =
      activeComment &&
      activeComment.type === "upvoting" &&
      activeComment.id === comment.id;
    const replyId = parentId ? parentId : comment.id;
    return (
      <div className="comment">
        <div className="comment-image-container">
          <img className="author-picture" src="/user1.png" />
        </div>
        <div className="comment-right-part">
          <div className="comment-content">
            <div className="comment-author">{comment.username}</div>
            <div>{createdAt}</div>
          </div>
          <div className="comment-text">{comment.body}</div>
          <div className="comment-actions">
            {canReply && (
              <div
                className="comment-action"
                onClick={() =>
                  setActiveComment({ id: comment.id, type: "replying" })
                }
              >
                Reply
              </div>
            )}
            {canUpvote && (
              <div
                className="comment-action"
                onClick={() =>
                  setActiveComment({ id: comment.id, type: "upvoting" })
                }
              >
                {comment.likes} Upvote🔼
              </div>
            )}
          </div>
          {isReplying && (
            <CommentForm
              submitLabel="Reply"
              handleSubmit={(text) => addComment(text, replyId)}
            />
          )}
          {replies.length > 0 && (
            <div className="replies">
              {replies.map((reply) => {
                return (
                  <Comment
                    comment={reply}
                    key={reply.id}
                    replies={[]}
                    currentUserId={currentUserId}
                    likes={likes}
                    addComment={addComment}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    parentId={comment.id}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default Comment;