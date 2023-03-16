import { Button, Drawer, Grid, Group, LoadingOverlay, Modal, SimpleGrid, Text, Tooltip, Transition, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArrowLeft, IconBrandTelegram, IconClipboard, IconPlus, IconShare } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import { useTeacherContext } from '../../contexts/teacherContext'   

import { useFetchSpecialtyInformation } from '../BddThemes/connetion/fetchData'

import './../bddStudents/StudentsManagement.css'
import AddFramerFrom from './addFramerForm'
import { usePublishListOfFarmers } from './connection/connection'
import { FramerCrud } from './framerCrud'
// import AddRankForm from './addRankForm'
// import { FramerCrud } from './framerCrud'
// import {  } from './connetion/fetchData'
// import { RankCrud } from './rankCrud'
// import UploadRanks from './uploadRanks'


function FramerManagement() {


    // ! fetch specialty information for Specialty manager 



    //** ------------------------------------------------------------------------ teacher context ------------------------------------------------------------------------  */
    const { user, token, setRole } = useStateContext()
    const { teacher, isSpecialtyManager, affectationMethod } = useTeacherContext()
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




    const { mutate: publishListOfFramer , isLoading : publishLoading,  } = usePublishListOfFarmers();

const handlePublishing=()=>{
    publishListOfFramer() ; 
}


    return (
        isSpecialtyManager == true  &&  affectationMethod==2   ?
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
           
                        <div className='byStudents'>
                            <AddFramerFrom closeModel={close} />
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
                            <div className='specialtyName' ><h3 style={{textTransform : 'capitalize'}} ><Text fz="lg" color='teal' >{specialtyInformation.fullname}</Text> list of framer teacher </h3> </div>
                            : <h3>loading...</h3>
                        }
                        <Group spacing={20} >
                        <FramerCrud  publishLoading={publishLoading}  />
                        <Tooltip label="add teacher framer">
                            <Button color='teal' onClick={open}   >
                                <IconPlus size={20} />
                            </Button>
                        </Tooltip>
                        <Tooltip label="publish the list of framer for students">
                            <Button color='teal'  onClick={handlePublishing}  >
                                <IconShare size={20} />
                            </Button>
                        </Tooltip>
                        </Group>
                    </div>

                </div>
            </> : <Navigate to='/teacher' />
    )
}

export default FramerManagement ; 