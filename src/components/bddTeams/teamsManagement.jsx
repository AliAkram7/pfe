import { Button, Drawer, LoadingOverlay, Text, Tooltip, Transition, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArrowLeft, IconBrandTelegram, IconClipboard, IconPlus, IconShare } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import { useTeacherContext } from '../../contexts/teacherContext'
import { useFetchSpecialtyInformation } from '../BddThemes/connetion/fetchData'

import './../bddStudents/StudentsManagement.css'
import AddTeamsForm from './addTeamsForm'
import { TeamsCrud } from './teamsCrud'

function TeamsManagement() {


    // ! fetch specialty information for Specialty manager 



    //** ------------------------------------------------------------------------ teacher context ------------------------------------------------------------------------  */
    const { user, token, setRole } = useStateContext()
    const { teacher, isSpecialtyManager } = useTeacherContext()
    //** ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------  */


    const onSuccess = () => {
    }
    // !! fetch specialty  information 
    const [specialtyInformation, setSpecialtyInformation] = useState({})
    const [contextSet, setContextSet] = useState(false)

    const { data: fetchSpecialtyInformation } = useFetchSpecialtyInformation();



    if (fetchSpecialtyInformation && !contextSet) {
        setSpecialtyInformation(fetchSpecialtyInformation?.data?.specialty_info)
        setContextSet(true)
    }


    const theme = useMantineTheme();
    const [opened, {
        close,
        open
    }
    ] = useDisclosure(false);


    const [DrawerOpened, {
        close: drawerClose,
        open: drawerOpen
    }
    ] = useDisclosure(false);


    // const { mutate: publishListOfTheme , isLoading : publishLoading,  } = usePublishListOfTheme();


    // const handlePublish = () => {

    //     publishListOfTheme()

    // }



    return (
        isSpecialtyManager == true ?
            <>


<Transition mounted={opened} transition="fade" duration={500} timingFunction="ease">
      {(styles) =>   <Drawer
                            style={styles}
                    position={'bottom'}
                    withCloseButton={true}
                    closeOnClickOutside={true}
                    opened={opened}
                    onClose={close}
                    title={<Button variant='light' >help</Button>}
                    closeOnEscape={false}
                    size="lg"
                    zIndex={9999}

                >
                    <div className='add-students' >
                        {/* <div className='xlsx-method' >
                            <UploadRanks closeModel={close} />
                        </div> */}
                        <div className='byStudents'>
                            <AddTeamsForm closeModel={close} />
                        </div>
                    </div>
                    </Drawer>  }
    </Transition>


                <div className='main-page-name'>
                    <h1></h1>
                </div>

                <div className='Student-managment'>

                    <div className='Student-managment-menu'  >

                        {specialtyInformation ?
                            <div className='specialtyName' > <h3>  <Text fz="lg" color='teal' >{specialtyInformation.fullname}</Text> list of teams </h3> </div>
                            : <h3>loading...</h3>
                        }
                        < TeamsCrud />

                        <Tooltip label="create team">
                            <Button color='teal'   onClick={open}  >
                                <IconPlus size={20} />
                            </Button>
                        </Tooltip>
                    </div>

                </div>
            </> : <Navigate to='/teacher' />
    )
}

export default TeamsManagement  ;