import { List, LoadingOverlay, Modal, ThemeIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPaperclip, IconPlus } from '@tabler/icons'
import React, { memo } from 'react'
import { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import { useTeacherContext } from '../../contexts/teacherContext'
import UserAvatar from '../avatar/avatar'
// import { usefetchStudentData } from '../profilePage/connection/receiveData/fetchData'
import { useGetTeamsInformation } from './connection/receiveData/fetchData'
import CreateNewRoomForm from './createNewRoomForm'




function TeamInfo() {



    const { teacher, setTeamSelected, teamSelected } = useTeacherContext();

  
    
    const { data: getTeamsInformation , error} = useGetTeamsInformation()


    

    const list_of_Team = getTeamsInformation?.data.teams_list?.map((team) => {
        return (
            <>
                <List.Item><Link key={team.team_id} onClick={() => { setTeamSelected(team.team_id) }}  >
                    {team[0].map((member) => {
                        return member.name + ", "
                    })}
                </Link></List.Item>
            </>
        )
    })


  


    let team_members = null

    if (teamSelected  && !error  ) {
        getTeamsInformation?.data.teams_list.map((team) => {
            if (team.team_id === teamSelected) {
                team_members = team[0].map((student) => {
                    return (<UserAvatar key={student.code} username={student?.name}
                        userinfo={student?.email} tel={student?.tel} />)
                })
            }
        })
    } else if(!error) {
        team_members = getTeamsInformation?.data.teams_list[0][0]?.map((student) => {
            return (<UserAvatar key={student.code} username={student?.name}
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
                            {list_of_Team}
                            <List.Item><Link to='/teacher/teams-section/' >rooms</Link></List.Item>
                            {/* <List.Item><Link onClick={open}  >create room</Link></List.Item> */}
                            
                        </List>
                    </List>

                </div>
            </div>
        </>
    )


}

export default TeamInfo
