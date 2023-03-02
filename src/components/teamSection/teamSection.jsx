import React from 'react'
import { useEffect } from 'react'
import { Navigate, Outlet, Routes } from 'react-router'
import { useStudentContext } from '../../contexts/studentContext'

import TeamInfo from './teamInfo'
import './teamSection.css'
function TeamSection() {


   const {isInTeam} = useStudentContext() ; 
    



    return (
        isInTeam == true ? (
        <>
            <div className='main-page-name'>
                <h1>Team Section</h1>

            </div>
            <div className='container-blog-section'>

                <Outlet/>
                <span className='separator'></span>

                <TeamInfo />

            </div>
        </>) : <Navigate to='/student' />  


    )
}

export default TeamSection
