import React from 'react'
import { LogoutButton } from '../components/LogoutButton'
import { useDispatch } from 'react-redux'
import { logout } from '../services/operations/authApi';
import { useNavigate } from 'react-router-dom';

export const User = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    return (

    <div className='bg-black h-screen flex flex-col justify-center items-center '>
        <h1 className=' text-white text-3xl text-center'>This page is for users</h1>   
        <div>
        <LogoutButton/>
        </div>
    </div>
  )
}
