import React, { useState } from "react";
import "./createPost.scss";
import Avatar from "../avatar/Avatar";
import backgroundImg from "../../Assets/postImg.jpg";
import { BsCardImage } from "react-icons/bs";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { getUserProfile } from "../../redux/slices/postSlice";

const CreatePost = () => {
  const [postImg, setPostImg] = useState("");
  const [caption,setCaption]=useState('')
  const dispatch = useDispatch();
  const myProfile = useSelector(state=>state.appConfigReducer.myProfile)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setPostImg(fileReader.result);
      }
    };
  };

  const handlePostSubmit = async()=>{
    try {
        dispatch(setLoading(true))
        const result = await axiosClient.post('/posts',{
        caption,postImg
    });
    console.log("post done",result)
    dispatch(getUserProfile({
      userId:myProfile._id
    }))
    } catch (err) {
        console.log("Error",err)
    }
    finally{
        dispatch(setLoading(false))
        setCaption('')
        setPostImg('')
    }
    
  }

  return (
    <div className="createPost">
      <div className="left-post">
        <Avatar />
      </div>
      <div className="right-post">
        <input
          type="text"
          value={caption}
          onChange={(e)=>setCaption(e.target.value)}
          placeholder="What's on your mind"
          className="captionInput"
        />
        {
            postImg&&<div className="img-container">
          <img src={postImg} className="post-img" alt="Postimg" />
        </div>
        }
        
        <div className="bottom">
          <div className="input-post-img">
            <label htmlFor="inputImg" className="label-img">
              <BsCardImage />
            </label>
            <input
              className="inputImg"
              type="file"
              id="inputImg"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button onClick={handlePostSubmit} className="post-btn btn-primary">Post</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
