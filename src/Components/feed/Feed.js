import React, { useEffect } from 'react'
import './feed.scss'
import Post from '../post/Post'
import Follower from '../follower/Follower'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedData } from '../../redux/slices/feedSlice'

const Feed = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getFeedData())
  },[dispatch])
  const feedData = useSelector(state=>state?.feedDataReducer?.feedData)
  return (
    <div className='feed'>
      <div className='container'>
        <div className="left">
        {feedData?.posts?.map(post=><Post key={post._id} post={post}/>)}
        </div>
        <div className="right">
          <div className="following">
            <h3 className='title'>You Are Following</h3>
            {feedData?.followings?.map(user=><Follower key={user._id} user={user}/>)}
          </div>
          <div className="following">
            <h3 className='title'>Suggested for You</h3>
            {feedData?.suggestions?.map(user=><Follower key={user._id} user={user}/>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed