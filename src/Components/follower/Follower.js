import React, { useEffect, useState } from "react";
import "./follower.scss";
import Avatar from "../avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { followUnfollowUser } from "../../redux/slices/feedSlice";
import { useNavigate } from "react-router-dom";

const Follower = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feedData = useSelector((state) => state.feedDataReducer.feedData);

  const [isFollowing, setIsFollowing] = useState("");
  useEffect(() => {
    setIsFollowing(feedData.followings.find((item) => item._id === user._id));
  }, [feedData]);

  const handleUserFollow = () => {
    dispatch(
      followUnfollowUser({
        userIdToFollow: user._id,
      })
    );
  };

  return (
    <div className="follower">
      <div
        className="user-info"
        onClick={() => navigate(`/profile/${user._id}`)}
      >
        <Avatar src={user?.avatar?.url} />
        <h4 className="name">{user?.name}</h4>
      </div>
      <h5
        onClick={handleUserFollow}
        className={
          isFollowing ? "hover-link follow-link" : "btn-primary hover-link"
        }
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </h5>
    </div>
  );
};

export default Follower;
