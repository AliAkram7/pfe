import { List, Modal, ScrollArea, ThemeIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPaperclip, IconPlus } from '@tabler/icons'
import React from 'react'
import { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import { useStudentContext } from '../../contexts/studentContext'
import UserAvatar from '../avatar/avatar'
// import { usefetchStudentData } from '../profilePage/connection/receiveData/fetchData'
import { useGetStudentTeamInformation } from './connection/receiveData/fetchData'
import CreateNewRoomForm from './createNewRoomForm'




function TeamInfo() {

    const {affMethod , setHasSupervisor} =useStudentContext()

    const { data: getStudentTeamInformation } = useGetStudentTeamInformation()

    useEffect(() => {
        if(getStudentTeamInformation?.data?.supervsorInfo?.name){
            setHasSupervisor(true)
        }else{  
            setHasSupervisor(false)
        }
    }, [getStudentTeamInformation?.data?.supervsorInfo?.name])
    


    const team_members = getStudentTeamInformation?.data.team_members.map((student) => {
        return ( student?.name &&   <UserAvatar key={student?.code} username={student?.name}
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
                    { getStudentTeamInformation?.data?.supervsorInfo?.name ? 
                    <>
                    <h3>supervisor</h3>
                    <UserAvatar username={getStudentTeamInformation?.data?.supervsorInfo?.name  ?  getStudentTeamInformation?.data?.supervsorInfo?.name : 'supervisor information  '  }
                        userinfo={getStudentTeamInformation?.data?.supervsorInfo?.institutional_email} />
                        </> : null
                    }

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
                                    <IconPlus size={20} />
                                </ThemeIcon>
                            }
                            className="team-section-nav"
                        >
                            <List.Item><Link onClick={open}  >create new chat room</Link></List.Item>
                        </List>


                </div>
            </div>
        </>
    )


}

export default TeamInfo
