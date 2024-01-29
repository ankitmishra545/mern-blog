import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import Comment from "./Comment";

const CommentSection = ({postId}) => {

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const fetchComments = async() => {
      try {
        const res = await fetch(`/api/comment/getpostcomments/${postId}`);
        if(res.ok){
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        setCommentError(error);
      }
    };

    fetchComments();
  },[postId]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setCommentError(null);
    if(comment.length > 200){
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id
        })
      });
      const data = await res.json();
      if(res.ok){
        setCommentError(null);
        setComment('');
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  return (
    <div>
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-sm text-gray-500">
          <p>Signed In as:</p>
          <img src={currentUser.profilePicture} className="h-5 w-5 object-cover rounded-full" alt="" />
          <Link to={'/dashboard?tab=profile'}>
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link to={'/sign-in'} className="text-blue-700 hover:underline">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form onSubmit={handleSubmit}>
          <Textarea placeholder="Add a comment..." rows='3' maxLength='200' onChange={e => setComment(e.target.value)} value={comment} />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">{200 - comment.length} characters remaining</p>
            <Button type="submit" outline gradientDuoTone='purpleToBlue'>Submit</Button>
          </div>
          {commentError && (
            <Alert className="mt-5" color='failure'>{commentError}</Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments!</p>
      ) : (
        <>
          <div className="flex items-center gap-1 text-sm my-5">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map(comment => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </>
      )
      }
    </div>
  )
}

export default CommentSection