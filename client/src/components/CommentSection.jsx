import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Button, Textarea } from "flowbite-react";
import { useState } from "react";

const CommentSection = ({postId}) => {

  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const { currentUser } = useSelector(state => state.user);
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
        <form>
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
    </div>
  )
}

export default CommentSection