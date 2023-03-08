import { List, Modal, ThemeIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPaperclip, IconPlus } from '@tabler/icons'
import React from 'react'
import { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import UserAvatar from '../avatar/avatar'
// import { usefetchStudentData } from '../profilePage/connection/receiveData/fetchData'
import { useGetStudentTeamInformation } from './connection/receiveData/fetchData'
import CreateNewRoomForm from './createNewRoomForm'




function TeamInfo() {



    const { data: getStudentTeamInformation } = useGetStudentTeamInformation()


    const team_members = getStudentTeamInformation?.data.team_members.map((student) => {
        return (<UserAvatar key={student.code} username={student?.name}
            userinfo={student?.email} tel={student?.tel} />)

    })

    const [opened, {
        close,
        open
    }
    ] = useDisclosure(false);


    return (

        <>
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
                    <UserAvatar username={getStudentTeamInformation?.data?.supervsorInfo?.name  ?  getStudentTeamInformation?.data?.supervsorInfo?.name : 'supervisor information  '  }
                        userinfo={getStudentTeamInformation?.data?.supervsorInfo?.institutional_email} />
                </div>

                <div className='team-members'>
                    <h3>team members</h3>
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
                        <List.Item><Link to='select_theme'  >themes list</Link></List.Item>
                        <List.Item><Link to='' >rooms</Link></List.Item>

                        <List
                            spacing="xs"
                            size="xl"
                            center
                            icon={
                                <ThemeIcon color="teal" size={30} >
                                    <IconPlus size={20} />
                                </ThemeIcon>
                            }
                            className="team-section-nav"
                        >
                            <List.Item><Link onClick={open}  >create room</Link></List.Item>
                        </List>
                    </List>

                </div>
            </div>
        </>
    )


}

export default TeamInfo
