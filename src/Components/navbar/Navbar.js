import React, { useState } from "react";
import "./navbar.scss";
import Avatar from "../avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStoragemanager";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="navbar">
      <div className="container">
        <h2 className="banner hover-link" onClick={() => navigate("/")}>
          {" "}
          Social Media
        </h2>
        <div className="right-side">
          <div
            className="profile hover-link"
            onClick={() => navigate(`/profile/${myProfile._id}`)}
          >
            <Avatar src={myProfile?.avatar?.url} />
          </div>
          <div className="logout hover-link" onClick={handleLogout}>
            <AiOutlineLogout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
