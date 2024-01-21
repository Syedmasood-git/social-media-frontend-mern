import React, { useEffect, useState } from "react";
import "./updateProfile.scss";
import userImgg from "../../Assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { updateMyProfile } from "../../redux/slices/appConfigSlice";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState("");

  useEffect(() => {
    setName(myProfile?.name || "");
    setBio(myProfile?.bio || "");
    setUserImg(myProfile?.avatar?.url || "");
  }, [myProfile]);

  const handleImageChange = (e) => {
    if(userImg){
        const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setUserImg(fileReader.result);
      }
    };
  }
  else{
    console.log("No image selected")
  }
    }
    
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateMyProfile({
        name,
        bio,
        userImg,
      })
    );
  };

  return (
    <div className="updateProfile">
      <div className="container">
        <div className="left">
          <div className="input-user-img">
            <label htmlFor="inputImg" className="label-img">
              <img
                src={userImg?userImg:userImgg}
                alt=""
              />
            </label>
            <input
              className="inputImg"
              type="file"
              id="inputImg"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Your Bio"
            />
            <input type="submit" className="btn-primary" />
          </form>
          <button className="delete-account btn-primary">Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
