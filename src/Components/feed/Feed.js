import React, { useEffect } from "react";
import "./feed.scss";
import Post from "../post/Post";
import Follower from "../follower/Follower";
import { useDispatch, useSelector } from "react-redux";
import { getFeedData } from "../../redux/slices/feedSlice";
import hello from '../../Assets/welcome.jpg'

const Feed = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeedData());
  }, [dispatch]);
  const feedData = useSelector((state) => state?.feedDataReducer?.feedData);
  return (
    <div className="feed">
      <div className="container">
        <div className="left">
          {feedData?.followings?.length === 0 ? (
            <>
              <h1>Follow users to see thier posts</h1>
              <img width={500} className="dummy-img" height={400} style={{borderRadius:'5px',marginTop:'20px',marginBottom:'20px'}} src={hello} alt="hello"/>
            </>
          ) : (
            feedData?.posts?.map((post) => <Post key={post._id} post={post} />)
          )}
        </div>
        <div className="right">
          <div className="following">
            <h3 className="title">You Are Following</h3>
            {feedData?.followings?.map((user) => (
              <Follower key={user._id} user={user} />
            ))}
          </div>
          <div className="following">
            <h3 className="title">Suggested for You</h3>
            {feedData?.suggestions?.map((user) => (
              <Follower key={user._id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;