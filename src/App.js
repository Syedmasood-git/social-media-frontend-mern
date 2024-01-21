import React, { useEffect, useRef } from "react";
import "./App.css";
import Login from "./pages/login/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Home from "./pages/Home/Home";
import RequireUser from "./Components/RequireUser";
import Feed from "./Components/feed/Feed";
import Profile from "./Components/profile/Profile";
import UpdateProfile from "./Components/updateProfile/UpdateProfile";
import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import OnlyIfNotLoggedIn from "./Components/OnlyIfNotLoggedIn";
import toast, { Toaster } from "react-hot-toast";
export const TOAST_SUCCESS = "toast-success";
export const TOAST_ERROR = "toast-failure";

const App = () => {
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
  const toastData = useSelector((state) => state.appConfigReducer.toastData);
  const loadingRef = useRef(null);
  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);
  useEffect(() => {
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message);
        break;
      case TOAST_ERROR:
        toast.error(toastData.message);
        break;
    }
  }, [toastData]);

  return (
    <div className="App">
      <LoadingBar color="#000" ref={loadingRef} />
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
          </Route>
        </Route>
        <Route element={<OnlyIfNotLoggedIn />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
