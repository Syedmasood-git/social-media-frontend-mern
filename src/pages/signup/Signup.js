import React, { useState } from 'react'
import './Signup.scss'
import { Link, useNavigate } from 'react-router-dom'
import { axiosClient } from '../../utils/axiosClient';


const Signup = () => {

    const [email, setEmail] = useState("");
    const [name,setName] = useState('')
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axiosClient.post("/auth/signup", {
        name,
        username: email,
        password,
      });
      navigate('/login')
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
    return (
        <div className='Signup'>
            <div className='signup-box'>
                <h2 className='heading'>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>Name</label>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className='name'id='name'/>
                    <label htmlFor='email'>Email</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='email'id='email'/>
    
                    <label htmlFor='password'>Password</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='password'id='password'/>
                    
                    <input type='submit' className='submit'/>
                </form>
                <p className='subheading'>Already have an account?<Link to='/login'> Login</Link></p>
            </div>
        </div>
      )
}

export default Signup