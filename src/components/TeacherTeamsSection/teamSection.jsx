import React from 'react'
import { useEffect } from 'react'
import { Navigate, Outlet, Routes } from 'react-router'
import { useStudentContext } from '../../contexts/studentContext'
import { useTeacherContext } from '../../contexts/teacherContext'

import TeamInfo from './teamInfo'
import './teamSection.css'
function TeamsSection() {

   const {isInTeam}  =  useTeacherContext()

    return (
        isInTeam ? 
        <>
            <div className='container-blog-section'>

                <Outlet  />
                <span className='separator'></span>

                <TeamInfo />

            </div>
        </> :  <Navigate to='/teacher'/>


    )
}

export default TeamsSection; 
