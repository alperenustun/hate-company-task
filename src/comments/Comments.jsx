import { useState, useEffect } from "react";
import { getComments as getCommentsApi, createComment as createCommentApi } from "../utils/api";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = ({currentUserId}) => {
  const [backEndComments, setBackEndComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backEndComments.filter(item => {
    return item.parentId === null;
  })
  const getReplies = commentId => {
    return backEndComments.filter(backendComment => backendComment.parentId === commentId)
    .sort(
      (a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  }

  const addComment = (text, parentId) => {
    console.log(text, parentId);
    createCommentApi(text, parentId).then(comment => {
      setBackEndComments([comment, ...backEndComments]);
      setActiveComment(null);
    })
  }

  useEffect(() => {
    getCommentsApi().then(data => {
      setBackEndComments(data);
    })
  }, [])
  
    return(
      <div className="comments">
        <h3 className="comments-title">Hate Company Task</h3>
        <div className="comment-form-title">Enter your comment</div>
        <CommentForm submitLabel="Write" handleSubmit={addComment} />
        <div className="comments-container">
          {rootComments.map(rootComment => {
            return (
              <Comment
                key={rootComment.id}
                comment={rootComment}
                replies={getReplies(rootComment.id)}
                currentUserId={currentUserId}
                likes={rootComment.likes}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                addComment={addComment}
              />
            );
          })}
        </div>
      </div>
    )
  }
  
  export default Comments;
  