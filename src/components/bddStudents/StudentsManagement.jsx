import { Button, Drawer, Flex, List, LoadingOverlay, Modal, SimpleGrid, ThemeIcon, Tooltip, Transition, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArrowLeft, IconPaperclip, IconPlus } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { Await, Navigate, Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import { useTeacherContext } from '../../contexts/teacherContext'
import AddStudentForm from './addStudentForm'
import { useAdminfetchDepartmentsInfo, useFetchDepartmentInfo } from './connection/fetchData/fetchData'
import './StudentsManagement.css'
import UploadFile from './uploadfile'
import UploadHelp from '../../imges/Uploadhelp.png'
import { IconDotsVertical } from '@tabler/icons-react'
import { DepartmentMenu } from './departmentsMenu'
import { useAdminContext } from '../../contexts/adminContext'
function StudentsManagement() {



    //** ------------------------------------------------------------------------ teacher context ------------------------------------------------------------------------  */
    const { user, token, setRole } = useStateContext()
    const { teacher, isDepartmentManager } = useTeacherContext()
    //** ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------  */


    const onSuccess = () => {
    }
    const { data: AdminFetchDepartmentsInfo } = useAdminfetchDepartmentsInfo(onSuccess)
    const { setSelectedSpeciality } = useAdminContext()
    const [_selectedSpeciality, _setSelectedSpeciality] = useState(AdminFetchDepartmentsInfo?.data[0].speciality_info[0])
    const [contextSet, setContextSet] = useState(false)


    if (AdminFetchDepartmentsInfo && !contextSet) {
        _setSelectedSpeciality(AdminFetchDepartmentsInfo?.data[0].speciality_info[0])
        setContextSet(true)
    }


    useEffect(() => {
        setSelectedSpeciality(_selectedSpeciality)
    }, [_selectedSpeciality])



    const specialties_list = AdminFetchDepartmentsInfo?.data[0]?.speciality_info.map((specialty) => {

        return <List.Item key={specialty.fullname} ><Link onClick={() => { _setSelectedSpeciality(specialty) }} >

            {specialty.fullname} ({specialty.abbreviated_name})</Link></List.Item>
    })

    // interface LinksGroupProps {
    //   icon: React.FC<any>;
    //   label: string;
    //   initiallyOpened?: boolean;
    //   links?: { label: string; link: string }[];
    // }

    const department_menu = AdminFetchDepartmentsInfo?.data?.map((dep) => {


        const links = dep?.speciality_info?.map((specialty) => {
            return {
                label: `${specialty.fullname} (${specialty.abbreviated_name})`,
                specialty: specialty,
            }
        })
        return <DepartmentMenu icon={IconPlus} label={dep.department}

            initiallyOpened={false} links={links} setSelectedSpecialty={_setSelectedSpeciality} />


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

        <>
            <Transition mounted={opened} transition="fade" duration={500} timingFunction="ease">
                {(styles) => <Drawer
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
                </Drawer>}
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
                        <SimpleGrid cols={1} spacing='md' >
                            {department_menu}
                        </SimpleGrid>

                    </div>

                </Drawer>



                <div className='Student-managment-menu'  >
                    <div className='specialtyName' ><Flex  align={'center'} >  <Tooltip label={'all departments'}>
                        <Button color='teal' variant='white' onClick={drawerOpen} >
                            <IconDotsVertical size={20} />
                        </Button>
                    </Tooltip>   <h3> {_selectedSpeciality?.fullname}</h3> </Flex></div>

                    <Outlet />
                    <Tooltip label="add students">
                        <Button color='teal' onClick={open}   >
                            <IconPlus size={20} />
                        </Button>
                    </Tooltip>
                </div>



            </div>


        </>
    )
}

export default StudentsManagement