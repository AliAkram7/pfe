import { Button, Grid, Group, LoadingOverlay, Modal, SimpleGrid, Text, Tooltip, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArrowLeft, IconBrandTelegram, IconClipboard, IconPlus, IconShare } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import { useTeacherContext } from '../../contexts/teacherContext'   
import AddStudentForm from '../bddStudents/addStudentForm'
import UploadFile from '../bddStudents/uploadfile'
import { useFetchSpecialtyInformation } from '../BddThemes/connetion/fetchData'

import './../bddStudents/StudentsManagement.css'
import AddRankForm from './addRankForm'
// import {  } from './connetion/fetchData'
import { RankCrud } from './rankCrud'
import UploadRanks from './uploadRanks'


function RankManagement() {


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




    // const { mutate: publishListOfTheme , isLoading : publishLoading,  } = usePublishListOfTheme();




    return (
        isSpecialtyManager == true ?
            <>
                            <Modal
                    position={'bottom'}
                    withCloseButton={true}
                    closeOnClickOutside={false}
                    opened={opened}
                    onClose={close}
                    title="add students"
                    closeOnEscape={false}
                    size="calc(100vw - 80px)"
                    zIndex={9999}
                >
                    <div className='add-students' >
                        <div className='xlsx-method' >
                            <UploadRanks closeModel={close} />
                        </div>
                        <div className='byStudents'>
                            <AddRankForm closeModel={close} />
                        </div>
                    </div>
                    </Modal>
                <div className='main-page-name'>
                    <h1></h1>
                </div>

                <div className='Student-managment'>

                    <div className='Student-managment-menu'  >

                        {specialtyInformation ?
                            <div className='specialtyName' ><h3><Text fz="lg" color='teal' >{specialtyInformation.fullname}</Text> list of theme suggested </h3> </div>
                            : <h3>loading...</h3>
                        }
                        <Group spacing={20} >
                        <RankCrud   />
                        <Tooltip label="add student">
                            <Button color='teal' onClick={open}   >
                                <IconPlus size={20} />
                            </Button>
                        </Tooltip>
                        <Tooltip label="publish the list of rankings for students">
                            <Button color='teal'    >
                                <IconShare size={20} />
                            </Button>
                        </Tooltip>
                        </Group>
                    </div>

                </div>
            </> : <Navigate to='/teacher' />
    )
}

export default RankManagement ; 