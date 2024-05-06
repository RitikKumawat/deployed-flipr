import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../services/operations/authApi';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  return (
    <button onClick={()=>dispatch(logout(navigate))} 
    className='mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
        Logout
    </button>
  )
}
