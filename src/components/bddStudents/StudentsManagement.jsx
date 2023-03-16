import { Button, Drawer, List, LoadingOverlay, Modal, ThemeIcon, Tooltip, Transition, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArrowLeft, IconPaperclip, IconPlus } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { Await, Navigate, Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import { useTeacherContext } from '../../contexts/teacherContext'
import AddStudentForm from './addStudentForm'
import { useFetchDepartmentInfo } from './connection/fetchData/fetchData'
import './StudentsManagement.css'
import UploadFile from './uploadfile'
import UploadHelp from '../../imges/Uploadhelp.png'
function StudentsManagement() {



    //** ------------------------------------------------------------------------ teacher context ------------------------------------------------------------------------  */
    const { user, token, setRole } = useStateContext()
    const { teacher, isDepartmentManager } = useTeacherContext()
    //** ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------  */


    const onSuccess = () => {
    }
    const { data: FetchDepartmentInfo } = useFetchDepartmentInfo(onSuccess)
    const { setSelectedSpeciality } = useTeacherContext()
    const [_selectedSpeciality, _setSelectedSpeciality] = useState(FetchDepartmentInfo?.data.speciality_info[0])
    const [contextSet, setContextSet] = useState(false)


    if (FetchDepartmentInfo && !contextSet) {
        _setSelectedSpeciality(FetchDepartmentInfo?.data.speciality_info[0])
        setContextSet(true)
    }


    useEffect(() => {
        setSelectedSpeciality(_selectedSpeciality)
    }, [_selectedSpeciality])



    const specialties_list = FetchDepartmentInfo?.data?.speciality_info.map((specialty) => {

        return <List.Item key={specialty.fullname} ><Link onClick={() => { _setSelectedSpeciality(specialty) }} >

            {specialty.fullname} ({specialty.abbreviated_name})</Link></List.Item>
    })




    const theme = useMantineTheme();
    const [opened, {
        close,
        open
    }
    ] = useDisclosure(false);

    const [helpOpened, {
        close: helpClose,
        open: helpOpen
    }
    ] = useDisclosure(false);


    const [DrawerOpened, {
        close: drawerClose,
        open: drawerOpen
    }
    ] = useDisclosure(false);

    return (
        isDepartmentManager == 1 ?
            <>
 <Transition mounted={opened} transition="fade" duration={500} timingFunction="ease">
      {(styles) =>   <Drawer
                            style={styles}
                    position={'bottom'}
                    withCloseButton={true}
                    opened={opened}
                    onClose={close}
                    title={<Button variant='light' onClick={helpOpen}   >help</Button>}
                    closeOnEscape={false}
                    size="lg"
                    zIndex={9999}
                >
                    <div className='add-students' >
                        <div className='xlsx-method' >
                            <UploadFile closeModel={close} />
                        </div>
                        <div className='byStudents'>
                            <AddStudentForm closeModel={close} />
                        </div>
                    </div>
                </Drawer> }
                </Transition>
                <Modal title='quick help' opened={helpOpened} onClose={helpClose} size="calc(80vw - 30rem)" overlayBlur={3}
                    overlayOpacity={0.55}
                    zIndex={10000}
                >
                    <div className='upload-help'   >
                        <h3>make sure that the file .xlsx  is in the form bellow </h3>
                        <div className='upload-help-img' >
                            <img src={UploadHelp} alt="help image" />
                        </div>
                    </div>
                    <Button color='teal' onClick={helpClose}    >
                        i got it
                    </Button>
                </Modal>

                <div className='main-page-name'>
                    <h1>
                        <Tooltip label={FetchDepartmentInfo?.data.department_name?.name}>
                            <Button color='teal' onClick={drawerOpen} >
                                <IconArrowLeft size={20} />
                            </Button>
                        </Tooltip>
                    </h1>
                </div>
                <div className='Student-managment'>
                    <Drawer
                        opened={DrawerOpened}
                        onClose={drawerClose}
                        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                        overlayOpacity={0.3}
                        overlayBlur={3}
                        position='right'
                        size="xl"
                    >
                        <div className='Student-managment-nav'>
                            <List
                                spacing="xs"
                                size="md"

                                icon={
                                    <ThemeIcon color="teal" size={30} >
                                        <IconPaperclip size={20} />
                                    </ThemeIcon>
                                }
                                className="team-section-nav"
                            >
                                {/* // ! fetch this links depend the chef department */}
                                {specialties_list}
                            </List>
                        </div>

                    </Drawer>



                    <div className='Student-managment-menu'  >
                        <div className='specialtyName' > <h3> {_selectedSpeciality?.fullname}</h3> </div>

                        <Outlet />
                        <Tooltip label="add students">
                            <Button color='teal' onClick={open}   >
                                <IconPlus size={20} />
                            </Button>
                        </Tooltip>
                    </div>



                </div>


            </> : <Navigate to='/teacher' />
    )
}

export default StudentsManagement