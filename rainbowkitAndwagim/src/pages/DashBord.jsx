import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

function DashBord() {
  
  const navigate = useNavigate();

  const { user , loading  , logout , isAuthenticated} = useAuth();

  console.log("user : " , user  , isAuthenticated);

  if (!isAuthenticated) {
      navigate("/walletConnect");
  }


  


  return (
    <div>DashBord

      <button
      onClick={()=>{
       logout();
       navigate("/walletConnect");
      }}
      >logout</button>
    </div>
  )
}

export default DashBord