import { Button, Divider, Drawer, Flex, Group, List, ScrollArea, Tabs, Text, ThemeIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChartHistogram, IconDotsVertical, IconListCheck, IconMessageCircle, IconPaperclip, IconPhoto, IconPlus, IconPuzzle2, IconSettings } from '@tabler/icons'
import React from 'react'
import { useEffect } from 'react'
import { Navigate, Outlet, Routes, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useStudentContext } from '../../contexts/studentContext'

import TeamInfo from './teamInfo'
import './teamSection.css'
function TeamSection() {


    const { isInTeam, affMethod } = useStudentContext();

    const [opened, { close, open }] = useDisclosure(false)
    const navigate = useNavigate()
    return (
        isInTeam == true ? (
            <>
                

                        <Tabs variant="default" orientation="horizontal" defaultValue="choiceList">
                            <Tabs.List>
                                {/* <Tabs.Tab value="choiceList"  onClick={() => { navigate('') }} icon={<IconListCheck color='teal'  size="1.2rem" />}>
                                    {affMethod != 2 ? 'themes list' : 'Framer list'}

                                </Tabs.Tab>
                                <Tabs.Tab value="messages" onClick={() => { navigate('blog') }} icon={<IconChartHistogram  color='teal' size="1.2rem" />}>state of progress</Tabs.Tab>
                                <Tabs.Tab value="settings" onClick={open} icon={<IconPuzzle2 size="1.2rem" color='teal' />}>team information</Tabs.Tab> */}
                            </Tabs.List> 
                        </Tabs>

          
                <div className='container-blog-section'>
      
        
                    <Outlet />
        

                    {/* <Drawer opened={opened} position='top' onClose={close} size='xl'    >
                        <ScrollArea>
                            <TeamInfo />
                        </ScrollArea>
                    </Drawer> */}
                </div>
            </>) : <Navigate to='/student/join-Team' />


    )
}

export default TeamSection
