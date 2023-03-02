import React from 'react'
import { useEffect } from 'react'
import { Navigate, Outlet, Routes } from 'react-router'
import { useStudentContext } from '../../contexts/studentContext'

import TeamInfo from './teamInfo'
import './teamSection.css'
function TeamsSection() {

    return (

        <>
            <div className='main-page-name'>
                <h1>Teams Section</h1>

            </div>
            <div className='container-blog-section'>

                <Outlet  />
                <span className='separator'></span>

                <TeamInfo />

            </div>
        </>


    )
}

export default TeamsSection; 
