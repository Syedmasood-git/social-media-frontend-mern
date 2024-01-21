import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";

export const getUserProfile = createAsyncThunk("getUserProfile", async (body, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    const response = await axiosClient.post("/user/getUserProfile",body);
    console.log(response.result)
    return response.result;
  } catch (error) {
    console.error("API call error", error);
    return Promise.reject(error);
  } finally {
    thunkAPI.dispatch(setLoading(false));
  }
});
export const likeandUnlikePost=createAsyncThunk('post/likeAndUnlike',async(body,thunkAPI)=>{
  try {
    thunkAPI.dispatch(setLoading(true));
    const response = await axiosClient.post('/posts/like',body);
    return response.result.post
  } catch (err) {
    return Promise.reject(err)
  }
  finally{
    thunkAPI.dispatch(setLoading(false))
  }
})

const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    isLoading: false,
    userProfile: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload;
    })
    .addCase(likeandUnlikePost.fulfilled,(state,action)=>{
      const post = action.payload;
      console.log("received post",post)
      const index =state?.userProfile?.posts?.findIndex(item=>item._id===post._id)
      console.log("Liked ",post,index)
      if(index!==undefined && index!==-1){
        state.userProfile.posts[index] =post;
      };
      console.log("posts>>>>>>>>>",state)
    })
  },
});
export default postSlice.reducer;
