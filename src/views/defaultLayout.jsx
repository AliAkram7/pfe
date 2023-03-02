import { LoadingOverlay } from '@mantine/core';
import React, { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Navigate, Outlet } from 'react-router'
import { axiosClient } from '../axois-client';
import { useFetchStudentData } from '../components/profilePage/connection/receiveData/fetchData';
import { useStateContext } from '../contexts/ContextProvider'


function DefaultLayout() {

    const { token, role } = useStateContext();

    


    if (!token) {
        return <Navigate to='/'/>
    }
    return (<>
        <LoadingOverlay loaderProps={{ size: 'xl', color: 'gold', variant: 'rotate' }} />
        <Outlet />
    </>)
}

export default DefaultLayout
