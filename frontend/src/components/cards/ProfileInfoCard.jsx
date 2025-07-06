import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

function ProfileInfoCard() {
  const {user,clearUser} = useContext(UserContext);
  const navigate= useNavigate();

  const handleLogout=async ()=>{
    await axiosInstance.post(API_PATHS.AUTH.LOGOUT)
      .then((res)=>{
        if(res.status === 200){
          clearUser();
          navigate("/");
        }
      }).catch((err)=>{
        console.error("Logout failed", err);
      })
  }
  return (
   
      <div className="flex items-center ">
      <img
      src={user.avatar}
      alt="user avatar"
      className="w-11 h-11 bg-gray-300 rounded-full mr-3"
      />
      <div>
       <div>{user.fullName }</div> 
        <button
        onClick={handleLogout}
        className="text-sm text-red-500 hover:text-red-700 mr-3 cursor-pointer"    
        >Logout</button>
      </div>

    </div>
    
    
  )
}

export default ProfileInfoCard