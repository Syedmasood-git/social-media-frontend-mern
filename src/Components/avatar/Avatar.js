import React from 'react'
import './avatar.scss'
import userImg from '../../Assets/user.png'

const Avatar = ({src}) => {
  return (
    <div className='avatar'>
        <img src={src?src:userImg} alt='user-avatar'/>
    </div>
  )
}

export default Avatar