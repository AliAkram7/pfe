import { Badge, Flex, List, LoadingOverlay, Modal, Tabs, Text, ThemeIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPaperclip, IconPhoto, IconPlus, IconUsers } from '@tabler/icons'
import React, { memo, useState } from 'react'
import { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import { useTeacherContext } from '../../contexts/teacherContext'
import UserAvatar from '../avatar/avatar'
// import { usefetchStudentData } from '../profilePage/connection/receiveData/fetchData'
import { useGetTeamsInformation } from './connection/receiveData/fetchData'
import CreateAppointment from './createAppointment'
import CreateNewRoomForm from './createNewRoomForm'




function TeamInfo() {



    const { teacher, setTeamSelected, teamSelected, setIsInTeam } = useTeacherContext();
    const { data: getTeamsInformation, error } = useGetTeamsInformation()
    const [createAppointmentFormOpened, { open: openCreateApp, close: closeCreateApp }] = useDisclosure()





    let list_of_Team = null

    if (getTeamsInformation?.data?.teams_list?.length > 0) {
        list_of_Team = getTeamsInformation?.data.teams_list?.map((team, idx) => {
            return (
                <>



                    {team[0].length > 0 &&
                        <>
                            <Tabs.Tab value={`team${idx}`} icon={<IconUsers size="1.3rem" />} onClick={() => { setTeamSelected(team.team_id) }} >
                                <Flex gap={4}   >
                                    {team[0]?.map((member) => {
                                        return <><Text> {member?.name + " "} </Text></>
                                    })}
                                    <Badge onClick={openCreateApp}  > <Flex align={'center'} gap={2}  ><IconPlus size={10} /> <Text> create a appointment</Text></Flex></Badge>
                                </Flex>
                            </Tabs.Tab>

                        </>
                    }



                </>
            )
        })
    }








    let team_members = null

    if (teamSelected && !error) {
        getTeamsInformation?.data.teams_list.map((team) => {
            if (team.team_id === teamSelected) {
                team_members = team[0].map((student) => {
                    return (student?.name && <UserAvatar key={student?.code} username={student?.name}
                        userinfo={student?.email} tel={student?.tel} />)
                })
            }
        })
    } else if (!error && getTeamsInformation?.data?.teams_list[0][0].length > 0) {

        team_members = getTeamsInformation?.data.teams_list[0][0]?.map((student) => {
            return (student?.name && <UserAvatar key={student?.code} username={student?.name}
                userinfo={student?.email} tel={student?.tel} />)

        })


    }



    const [opened, {
        close,
        open
    }
    ] = useDisclosure(false);



    return (

        <>
            <Modal
                opened={createAppointmentFormOpened}
                onClose={closeCreateApp}
                size={'xl'}
                title="Create Appointment"
            >
                <CreateAppointment />
            </Modal>
            <Modal
                withCloseButton={true}
                closeOnClickOutside={false}
                opened={opened}
                onClose={close}
                size={600}
                title="create new room"
                closeOnEscape={false}
            >
                <CreateNewRoomForm />
            </Modal>

            <div className='team-info'>

                <div className='team-supervisor'>
                    <h3>supervisor</h3>
                    <UserAvatar username={teacher?.name}
                        userinfo={teacher?.institutional_email} />
                </div>

                <div className='team-members'>
                    <h3>team</h3>
                    {team_members}

                </div>


                <div className='team-more-info'>
                    <List
                        spacing="xs"
                        size="xl"
                        center
                        icon={
                            <ThemeIcon color="teal" size={30} >
                                <IconPaperclip size={20} />
                            </ThemeIcon>
                        }
                        className="team-section-nav"
                    >
                        {/* <List.Item><Link to='select_theme'  >themes list</Link></List.Item> */}

                        {/* <List
                            spacing="xs"
                            size="xl"
                            center
                            icon={
                                <ThemeIcon color="teal" size={30} >
                                    <IconPaperclip size={20} />
                                </ThemeIcon>
                            }
                            className="team-section-nav"
                        > */}

                        <Tabs defaultValue='team0' variant='outline' orientation='vertical' >
                            <Tabs.List>
                                {list_of_Team}
                            </Tabs.List>
                        </Tabs>
                        {/* <List.Item><Link to='/teacher/teams-section/' >rooms</Link></List.Item>
                            <List.Item><Link onClick={open}  >create room</Link></List.Item>
                             */}
                        {/* </List> */}
                    </List>

                </div>
            </div>
        </>
    )


}

export default TeamInfo
