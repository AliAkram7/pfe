import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation, useParams } from 'react-router'
import { useStateContext } from '../contexts/ContextProvider'
import { AdminContextProvider } from '../contexts/adminContext'
import jwt_decode from 'jwt-decode';
import { Transition } from '@mantine/core';

function AdminLayout() {

  const { setToken, token, role } = useStateContext()




  if (!token) {
    return <Navigate to='/' />
  } else {
    const decodedToken = jwt_decode(token)
    if (decodedToken.role !== 'admin') {
      return <Navigate to='/' />
    }
  }

//   // !! refresh token logic 
//   useEffect(() => {
//     const interval = setInterval(() => {
//       refreshToken();
//     }, 300000); // 5 minutes in milliseconds
//     return () => clearInterval(interval);
//   }, []);

//   function refreshToken() {

//     const decodedToken = jwt_decode(token);

//     const expTime = decodedToken.exp;

//     //* Get the current time in seconds

//     const currentTime = Math.floor(Date.now() / 1000);

//     //* Refresh the token if it is close to expiring
//     if (expTime - currentTime < 60 ) { //* Refresh the token if less than 60 seconds left before 
      
//       axiosClient.post("/teacher/refreshToken")
//         .then(({ data }) => {
//           if (data.token) {
//             setToken(data.token);
//             console.log(data.token);
//           }
//         })
//         .catch(error => {
//           console.error("Error refreshing token:", error);
//         });
//     }
//   }


  return (
    <>
      <AdminContextProvider>
        <Outlet />
      </AdminContextProvider >
    </>
  )
}

export default AdminLayout; 