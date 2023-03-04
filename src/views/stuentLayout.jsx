import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router'
import { useStateContext } from '../contexts/ContextProvider';
import jwt_decode from 'jwt-decode';
import { StudentContextProvider } from '../contexts/studentContext';
import axiosClient from '../axois-client';



function StuentLayout() {

    const { token, role, setToken } = useStateContext();


    if (!token) {
        return <Navigate to='/' />
    }else{
        const decodedToken  = jwt_decode(token)
        if (decodedToken.role !== 'student') {
            return <Navigate to='/' />
        }
    }
    







    useEffect(() => {
        const interval = setInterval(() => {
            RefreshToken();
        }, 300000); // 5 minutes in milliseconds
        return () => clearInterval(interval);
    }, []);

     function RefreshToken() {
        const { token, role, setToken } = useStateContext();
        const decodedToken = jwt_decode(token);
        const expTime = decodedToken.exp;
        //* Get the current time in seconds
        const currentTime = Math.floor(Date.now() / 1000);
        //* Refresh the token if it is close to expiring
        if (expTime - currentTime < 60) { //* Refresh the token if less than 60 seconds left before expiration
            axiosClient.post("/student/refreshToken")
                .then(({ data }) => {
                    if (data.token) {
                        setToken(data.token);
                    }
                })
                .catch(error => {
                    console.error("Error refreshing token:", error);
                });
        }
    }
       



    return (
        <>
            <StudentContextProvider>
                <Outlet />
            </StudentContextProvider>
        </>
    )
}


export default StuentLayout;
