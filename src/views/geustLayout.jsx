import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useStateContext } from '../contexts/ContextProvider'
import jwt_decode from 'jwt-decode';
import Cookies from "js-cookie"

function GeustLayout() {

    const { token, role } = useStateContext();




    if (token) {
 

        if (role === 'student') {
            return <Navigate to='/student' />
        }
        if (role === 'teacher') {
            return <Navigate to='/teacher' />
        }
        if (role === 'admin') {
            return <Navigate to='/admin' />
        }
    }

    return (<>
        <Outlet />
    </>)
}

export default GeustLayout
