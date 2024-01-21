import React, { useEffect } from 'react'
import Navbar from '../../Components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMyInfo } from '../../redux/slices/appConfigSlice';


const Home = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getMyInfo()) 
  },[dispatch])
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default Home