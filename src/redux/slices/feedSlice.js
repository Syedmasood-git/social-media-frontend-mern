import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";
import {likeandUnlikePost} from './postSlice'


export const getFeedData=createAsyncThunk('post/getFeedData',async(_,thunkAPI)=>{
  try {
    thunkAPI.dispatch(setLoading(true));
    const response = await axiosClient.get('/user/getFeedData');
    console.log("suggestions",response.result)
    return response.result
  } catch (err) {
    return Promise.reject(err)
  }
  finally{
    thunkAPI.dispatch(setLoading(false))
  }
})
export const followUnfollowUser = createAsyncThunk('user/followUnfollow',async(body,thunkAPI)=>{
    try {
        thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.post('/user/follow',body);
        return response.result.user
      } catch (err) {
        return Promise.reject(err)
      }
      finally{
        thunkAPI.dispatch(setLoading(false))
      }
})

const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    isLoading: false,
    feedData: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedData.fulfilled, (state, action) => {
      state.feedData = action.payload;
    })
    .addCase(likeandUnlikePost.fulfilled,(state,action)=>{
      const post = action.payload;
      console.log("received post",post)
      const index =state?.feedData?.posts?.findIndex(item=>item._id===post._id)
      console.log("Liked ",post,index)
      if(index!==undefined && index!==-1){
        state.feedData.posts[index] =post;
      };
      console.log("posts>>>>>>>>>",state)
    })
    .addCase(followUnfollowUser.fulfilled,(state,action)=>{
        const user = action.payload
        const index = state?.feedData?.followings?.findIndex(item=>item._id===user._id)
        if(index!==undefined && index!==-1){
            state?.feedData?.followings.splice(index,1)
        }
        else{
            state?.feedData?.followings?.push(user)
        }
    })
  },
});
export default feedSlice.reducer;