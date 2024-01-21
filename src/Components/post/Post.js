import React, { useEffect } from 'react'
import Avatar from '../avatar/Avatar'
import './post.scss'
import postimg from '../../Assets/postImg.jpg'
import {AiOutlineHeart ,AiFillHeart} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { likeandUnlikePost } from '../../redux/slices/postSlice'
import {useNavigate} from 'react-router-dom'
import { showToast } from '../../redux/slices/appConfigSlice'
import { TOAST_SUCCESS } from '../../App'
 
const Post = ({post}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handlePostLike=async()=>{
        dispatch(likeandUnlikePost({
            postId:post._id
        }))
    }
  return (
    <div className='post'>
        <div className="heading" onClick={()=>navigate(`/profile/${post.owner._id}`)}>
            <Avatar src={post?.owner?.avatar?.url}/>
            <h4>{post?.owner?.name}</h4>
        </div>
        <div className="content">
            <img src={post?.image?.url} alt='post'/>
        </div>
        <div className="footer">
            <div className="like" onClick={handlePostLike}>
                {post.isLiked?<AiFillHeart style={{color:"red"}} className='icon'/>:<AiOutlineHeart className='icon'/>}
                
                <h4>{post.likesCount} likes</h4>
            </div>
            <p className='caption'>{post.caption}</p>
            <h6 className='time-ago'>{post.timeAgo}</h6>
        </div>
    </div>
  )
}

export default Post