import { Button, Drawer, List, LoadingOverlay, Modal, ThemeIcon, Tooltip, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArrowLeft, IconPaperclip, IconPlus } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { Await, Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import { useTeacherContext } from '../../contexts/teacherContext'
import AddStudentForm from './addStudentForm'
import { useFetchDepartmentInfo } from './connection/fetchData/fetchData'
import './StudentsManagement.css'
import UploadFile from './uploadfile'
import UploadHelp from '../../imges/Uploadhelp.png'
function StudentsManagement() {





    const onSuccess = () => {
    }

    const { data: FetchDepartmentInfo } = useFetchDepartmentInfo(onSuccess)
    const {setSelectedSpeciality} = useTeacherContext()
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
        close:helpClose,
        open:helpOpen
    }
    ] = useDisclosure(true);


    const [DrawerOpened, {
        close: drawerClose,
        open: drawerOpen
    }
    ] = useDisclosure(false);

    return (

        <>
            <Modal
                withCloseButton={true}
                closeOnClickOutside={false}
                opened={opened}
                onClose={close}

                title="add students"
                closeOnEscape={false}
                size="calc(100vw - 80px)"
            >
                <div className='add-students' >
                    <div className='xlsx-method' >
                        <UploadFile  closeModel={close}  />
                    </div>
                    <div className='byStudents'>
                        <AddStudentForm  closeModel={close} />
                    </div>
                </div>


        <Modal    title='quick help'  opened={helpOpened}  onClose={helpClose}  size="calc(80vw - 30rem)"  >
            <div  className='upload-help'   >
                <h3>make sure that the file .xlsx  is in the form bellow </h3>
                <div className='upload-help-img' >
                <img src={UploadHelp} alt="help image" />
                </div>
                </div>
                <Button color='teal'  onClick={helpClose}    >
                    i got it 
                </Button>
        </Modal>

            </Modal>

            <div className='main-page-name'>
                <h1>Students Management
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
                        <Button color='teal' onClick={()=>{open() ; helpOpen()}} >
                            <IconPlus size={20} />
                        </Button>
                    </Tooltip>
                </div>



            </div>


        </>
    )
}

export default StudentsManagement