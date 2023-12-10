import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
const ProtectedRoute = ({isAdmin}) => {
  const {loading, isAuthenticated,user} = useSelector((state)=>state.user);
//  console.log(isAdmin,user)
 
    return ( (!loading &&(isAuthenticated===false))?<Navigate to="/login"/>:(
       <Outlet/>))
};

export default ProtectedRoute
