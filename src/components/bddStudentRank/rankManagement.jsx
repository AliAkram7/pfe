import { Button, Drawer, Flex, Grid, Group, LoadingOverlay, Modal, SimpleGrid, Text, Tooltip, Transition, useMantineTheme } from '@mantine/core'
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

import uploadRankHelp from '../../imges/uploadRankHelp.png'
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

    const [helpOpened, {open : helpOpen ,close : helpClose  }] =  useDisclosure()

    const [opened, {
        close,
        open
    }
    ] = useDisclosure(false);




    // const { mutate: publishListOfTheme , isLoading : publishLoading,  } = usePublishListOfTheme();




    return (
        isSpecialtyManager == true ?
            <>

                <Transition mounted={opened} transition="fade" duration={500} timingFunction="ease">
                    {(styles) => <Drawer
                        style={styles}
                        position={'bottom'}
                        withCloseButton={true}
                        closeOnClickOutside={true}
                        opened={opened}
                        onClose={close}
                        title={<Button  onClick={helpOpen}  variant='light' >help</Button>}
                        closeOnEscape={false}
                        size="lg"
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
                    </Drawer>}
                </Transition>
                <Modal title='quick help' opened={helpOpened} onClose={helpClose} size="calc(80vw - 30rem)" overlayBlur={3}
                    overlayOpacity={0.55}
                    zIndex={10000}
                >
                    <div className='upload-help'   >
                        <h3>make sure that the file .xlsx  is in the form bellow </h3>
                        <div className='upload-help-img' >
                            <img src={uploadRankHelp} alt="help image" />
                        </div>
                    </div>
                    <Button color='teal' onClick={helpClose}    >
                        i got it
                    </Button>
                </Modal>

                <div className='Student-managment'>

                    <div className='Student-managment-menu'  >

                        {specialtyInformation ?
                            <div className='specialtyName' ><h3 style={{ textTransform: 'capitalize' }} ><Text fz="lg" color='teal' >{specialtyInformation.fullname}</Text> list of ranking </h3> </div>
                            : <h3>loading...</h3>
                        }
                        <Group spacing={20} >
                            <Tooltip label="add student ranking">
                                <Button color='teal' onClick={open}  >
                                    <Flex align={'center'} gap={8} >
                                        <IconPlus size={20} />
                                        <Text>add student ranking</Text>
                                    </Flex>
                                </Button>
                            </Tooltip>
                            {/* <Tooltip label="publish the list of rankings for students">
                            <Button color='teal'    >
                            <IconShare size={20} />
                            </Button>
                        </Tooltip> */}
                            <RankCrud />
                        </Group>
                    </div>

                </div>
            </> : <Navigate to='/teacher' />
    )
}

export default RankManagement; 