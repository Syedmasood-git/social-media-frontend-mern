import React, { useEffect, useState } from 'react'
import './profile.scss'
import Post from '../post/Post'
import userImg from '../../Assets/user.png'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CreatePost from '../createPost/CreatePost'
import { getUserProfile } from '../../redux/slices/postSlice'
import { followUnfollowUser } from '../../redux/slices/feedSlice'

const Profile = () => {
  const params = useParams()
  const [isFollowing,setIsFollowing] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(state=>state.postsReducer.userProfile)
  const myProfile = useSelector(state=>state.appConfigReducer.myProfile)
  const [isMyProfile,setIsMyProfile] = useState(false)
  const feedData = useSelector(state=>state.feedDataReducer.feedData)


  useEffect(()=>{
    dispatch(getUserProfile({
      userId:params.userId
    }))
    setIsFollowing(feedData?.followings?.find((item)=>item._id===params.userId))
    setIsMyProfile(myProfile?._id===params.userId)
  },[myProfile,params.userId,feedData])

  function handleUserFollow(){
    dispatch(followUnfollowUser({
      userIdToFollow:params.userId
    }))
  }

  return (
    <div className='profile'> 
        <div className="container">
          <div className="left">
            { isMyProfile&&<CreatePost/>}
            {userProfile?.posts?.map(post=><Post key={post._id} post={post}/>)}
          </div>
          <div className="right">
            <div className="profile-card">
              <div className="user">
              <img className='user-img' src={userProfile?.avatar?.url?userProfile?.avatar?.url:userImg} alt="user" />
              <h3 className='user-name'>{userProfile?.name}</h3>
              </div>
              <div className="follower-info">
                <h4>{userProfile?.followers?.length} Followers</h4>
                <h4>{userProfile?.followings?.length} Following</h4>
              </div>
              {
                !isMyProfile&&<h5
                onClick={handleUserFollow}
                className={
                  isFollowing ? "hover-link follow-link" : "btn-primary hover-link"
                }
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </h5>
              }
              {
                isMyProfile && <button className='update-btn btn-secondary' onClick={()=>navigate('/updateProfile')} >Update Profile</button>
              }
              
            </div>
          </div>
        </div>
    </div>
  )
}

export default Profile