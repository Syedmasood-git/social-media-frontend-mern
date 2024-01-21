import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getMyInfo = createAsyncThunk("getMyInfo", async (_, thunkAPI) => {
  console.log("inside appConfig");
  try {
    thunkAPI.dispatch(setLoading(true));
    const response = await axiosClient.get("/user/getMyInfo");
    return response.result;
  } catch (error) {
    console.error("API call error", error);
    return Promise.reject(error);
  } finally {
    thunkAPI.dispatch(setLoading(false));
  }
});

export const updateMyProfile = createAsyncThunk(
  "user/updateMyProfile",
  async(body, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true));
    const response = await axiosClient.put('/user',body)
    return response.result
    } catch (error) {
        return Promise.reject(error)
    }
    finally{
        thunkAPI.dispatch(setLoading(false))
    }
  }
);

const appConfigSlice = createSlice({
  name: "appConfigSlice",
  initialState: {
    isLoading: false,
    myProfile: [],
    toastData:{}
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast:(state,action)=>{
      state.toastData=action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMyInfo.fulfilled, (state, action) => {
      state.myProfile = action?.payload?.user;
    });
    builder.addCase(updateMyProfile.fulfilled, (state, action) => {
        state.myProfile = action?.payload?.user;
      });
  },
});
export default appConfigSlice.reducer;

export const { setLoading,showToast } = appConfigSlice.actions;
