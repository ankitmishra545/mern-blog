import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FaThumbsUp } from "react-icons/fa"
import { Button, Modal, Textarea } from "flowbite-react"
import moment from "moment"
import { HiOutlineExclamationCircle } from "react-icons/hi"

const Comment = ({comment, onLike, onEdit, onDelete}) => {

    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.content);
    const { currentUser } = useSelector(state => state.user);

    const handleEdit = async() => {
        setIsEditing(true);
        setEditedComment(comment.content);
    };

    const handleSave = async(e) => {
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({content: editedComment})
            });
            if(res.ok){
                setIsEditing(false);
                onEdit(comment, editedComment);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        const getUser = async() => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if(res.ok){
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        getUser();
    },[comment]);

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
        <div className="flex-shrink-0 mr-3">
            <img src={user.profilePicture} alt={user.username} className="w-10 h-10 rounded-full bg-gray-200" />
        </div>
        <div className="flex-1">
            <div className="flex items-center mb-1">
                <span className="font-bold mr-1 text-xs truncate">
                    {user ? `@${user.username}` : 'anonymous user'}
                </span>
                <span className="text-gray-500 text-xs">
                    {moment(comment.createdAt).fromNow()}
                </span>
            </div>
            {isEditing 
            ? (
                <>
                    <Textarea value={editedComment} className="mb-2" onChange={(e) => setEditedComment(e.target.value)}  />
                    <div className="flex justify-end gap-2 text-xs">
                     <Button type="button" onClick={handleSave} gradientDuoTone='purpleToBlue' size='sm'>Save</Button>                
                     <Button type="button" outline gradientDuoTone='purpleToBlue' size='sm' onClick={() => setIsEditing(false)}>Cancel</Button> 
                    </div>               
                </>
            ) 
            : (
                <>
                <p className="text-gray-500 pb-2">{comment.content}</p>
                <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
                    <button className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`} onClick={() => onLike(comment._id)}>
                        <FaThumbsUp className='text-sm' />
                    </button>
                    <p className="text-gray-400">
                        {comment.numberOfLikes > 0 && comment.numberOfLikes + ' ' + (comment.numberOfLikes === 1 ? 'like' : 'likes')}
                    </p>
                    {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                        <div className="flex gap-2">
                        <button type="button" onClick={handleEdit} className="text-gray-400 hover:text-blue-500">Edit</button>
                        <button type="button" 
                        onClick={() => setShowModal(true)}
                        className="text-gray-400 hover:text-red-500">Delete</button>
                        </div>
                    )}
                    <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                        <Modal.Header/>
                        <Modal.Body>
                          <div className="text-center">
                            <HiOutlineExclamationCircle className='w-14 h-14 mb-4 text-gray-400                 dark:text-gray-200 mx-auto'/>
                            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are, you sure you want to delete this comment? </h3>
                            <div className='flex justify-center gap-4'>
                              <Button color='failure' onClick={() => onDelete(comment._id)}>Yes, I'm sure</Button>
                              <Button color='gray' onClick={() => setShowModal(false)}>No, cancel</Button>
                            </div>
                          </div>
                        </Modal.Body>
                    </Modal>
                </div>
                </>
            )}
        </div>
    </div>
  )
}

export default Comment