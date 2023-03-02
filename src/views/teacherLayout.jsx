import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation, useParams } from 'react-router'
import { useStateContext } from '../contexts/ContextProvider'
import { TeacherContextProvider } from '../contexts/teacherContext'
import jwt_decode from 'jwt-decode';
import { Transition } from '@mantine/core';

function TeacherLayout() {

  const { setToken, token, role } = useStateContext()
  const [opned, setOpned] = useState(false)
  const chn = useLocation()
  console.log(chn.pathname)

  useEffect(() => {
    setOpned(true)
    setOpned(false)
  }, [chn.pathname])



  if (!token) {
    return <Navigate to='/' />
  } else {
    const decodedToken = jwt_decode(token)
    if (decodedToken.role !== 'teacher') {
      return <Navigate to='/' />
    }
  }

  // !! refresh token logic 
  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
    }, 300000); // 5 minutes in milliseconds
    return () => clearInterval(interval);
  }, []);

  function refreshToken() {
    const decodedToken = jwt_decode(token);
    const expTime = decodedToken.exp;
    //* Get the current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);
    //* Refresh the token if it is close to expiring
    if (expTime - currentTime < 60) { //* Refresh the token if less than 60 seconds left before expiration
      axiosClient.post("/teacher/refreshToken")
        .then(({ data }) => {
          if (data.token) {
            setToken(data.token);
            console.log(data.token);
          }
        })
        .catch(error => {
          console.error("Error refreshing token:", error);
        });
    }
  }


  return (
    <>
      <TeacherContextProvider>
        <Outlet />
      </TeacherContextProvider >
    </>
  )
}

export default TeacherLayout; 