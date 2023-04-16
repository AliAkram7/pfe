import { Drawer, ScrollArea, Tabs } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChartHistogram, IconListCheck, IconPuzzle, IconPuzzle2, IconUsers } from '@tabler/icons'
import React from 'react'
import { useEffect } from 'react'
import { Navigate, Outlet, Routes, useNavigate } from 'react-router'
import { useStudentContext } from '../../contexts/studentContext'
import { useTeacherContext } from '../../contexts/teacherContext'

import TeamInfo from './teamInfo'
import './teamSection.css'
function TeamsSection() {

   const {isInTeam}  =  useTeacherContext()
    const navigate = useNavigate() ;
    const [opened , {close, open}] = useDisclosure(false)
    return (
        isInTeam ? 
        <>
{/*        
                <Tabs variant="default" orientation="horizontal" defaultValue="choiceList">
                    <Tabs.List>
                        <Tabs.Tab value="settings" onClick={open} icon={<IconUsers size="1.4rem" color='teal' />}>teams information</Tabs.Tab>
                    </Tabs.List> 
                </Tabs> */}

        <div className='container-blog-section'>
            <Outlet />
        </div>
    </> :  <Navigate to='/teacher'/>



    )
}

export default TeamsSection; 
