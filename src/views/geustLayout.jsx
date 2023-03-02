import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useStateContext } from '../contexts/ContextProvider'

function GeustLayout() {

    const {token , role} = useStateContext();
    
    if (token) {
        if (role === 'student') {
            return  <Navigate to='/student'  />            
        }
        if(role === 'teacher'){
            return <Navigate to='/teacher'  />
        }


        


    }

    return (<>
        <Outlet/>
    </>)
}

export default GeustLayout