import { Button, Drawer, Flex, Group, LoadingOverlay, Modal, SimpleGrid, Text, Tooltip, Transition, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArrowLeft, IconBrandTelegram, IconCalendar, IconClipboard, IconPlus, IconShare } from '@tabler/icons'
import { IconDotsVertical } from '@tabler/icons-react'
import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import { useTeacherContext } from '../../contexts/teacherContext'
import { useTeacherFetchYearScholar } from '../bddStudentRank/connection/connection'
import { SpecialtiesInfo } from '../bddStudentRank/specialty'
import { useAffectFramerToStudents, useAffectThemeToStudents, useFetchSpecialtyInformation } from '../BddThemes/connetion/fetchData'

import './../bddStudents/StudentsManagement.css'
import AddFollowUpForm from './addPeriodForm'
import AddTeamsForm from './addTeamsForm'
import JuryMembersForm from './juryMembersLayout'
import JuryMembersMasterForm from './juryMembersLayoutMaster'
import PresentationForm from './PresentationForm'
import { TeamsCrud } from './teamsCrud'

function TeamsManagement() {


    // ! fetch specialty information for Specialty manager 



    //** ------------------------------------------------------------------------ teacher context ------------------------------------------------------------------------  */
    const { user, token, setRole } = useStateContext()
    const { teacher, isSpecialtyManager, affectationMethod } = useTeacherContext()
    const {selectedYearString} = useStateContext()

    //** ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------  */


    const onSuccess = () => {
    }
    // !! fetch specialty  information 
    const [specialtyInformation, setSpecialtyInformation] = useState({})
    const [contextSet, setContextSet] = useState(false)

    const { data: fetchSpecialtyInformation } = useFetchSpecialtyInformation();


    const [currentGroupOpened, { open: openCurrentGroup, close: closeCurrentGroup }] = useDisclosure()


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


    const [followUpFormOpened, {
        close: followUpFormClose,
        open: followUpFormOpen
    }
    ] = useDisclosure(false);

    const [presentationFormOpened, {
        close: presentationFormClose,
        open: presentationFormOpen
    }
    ] = useDisclosure(false);
    const [juryMemberFormOpened, {
        close: juryMemberFormClose,
        open: juryMemberFormOpen
    }
    ] = useDisclosure(false);

    const [juryMemberMasterFormOpened, {
        close: juryMemberMasterFormClose,
        open: juryMemberMasterFormOpen
    }
    ] = useDisclosure(false);



    const { mutate: affectThemeToStudents } = useAffectThemeToStudents();
    const { mutate: affectAffectToStudents } = useAffectFramerToStudents();

    // const { mutate: publishListOfTheme , isLoading : publishLoading,  } = usePublishListOfTheme();


    // const handlePublish = () => {

    //     publishListOfTheme()

    // }

    const handleAffectThemeToStudents = () => {

        if (affectationMethod == 1) {
            affectThemeToStudents()
        } else {
            affectAffectToStudents()
        }


    }


    const [openYearScholar, {
        close: yearScholarClose,
        open: yearScholarOpen,
    }
    ] = useDisclosure(false);


    const { data: teacherFetchYearScholar, isLoading: teacherFetchYearScholarIsLoading } = useTeacherFetchYearScholar()

    const years = teacherFetchYearScholar?.data?.map((year) => {
        return {
            label: `${year.start_date} - ${year.end_date}`,
            value: year.id,
        }
    })



    return (
        isSpecialtyManager == true ?
            <>

                <Drawer
                    key={nanoid()}
                    position={'bottom'}
                    withCloseButton={true}
                    closeOnClickOutside={true}
                    opened={opened}
                    onClose={close}
                    title={<Button variant='light' >help</Button>}
                    closeOnEscape={false}
                    size="md"
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
                </Drawer>


                <Drawer
                    key={nanoid()}
                    position={'bottom'}
                    withCloseButton={true}
                    closeOnClickOutside={true}
                    opened={followUpFormOpened}
                    onClose={followUpFormClose}
                    title={<Button variant='light' >help</Button>}
                    closeOnEscape={false}
                    size="lg"
                    zIndex={9999}

                >
                    <div className='add-students' >

                        <div className='byStudents'>
                            <AddFollowUpForm closeModel={close} />
                        </div>
                    </div>
                </Drawer>

                <Drawer
                    key={nanoid()}
                    position={'bottom'}
                    withCloseButton={true}
                    closeOnClickOutside={true}
                    opened={presentationFormOpened}
                    onClose={presentationFormClose}
                    title={<Button variant='light' >help</Button>}
                    closeOnEscape={false}
                    size="lg"
                    zIndex={9999}

                >
                    <div className='add-students' >

                        <div className='byStudents'>
                            <PresentationForm />
                        </div>
                    </div>
                </Drawer>


                <Modal
                    key={nanoid()}
                    position={'bottom'}
                    withCloseButton={true}
                    closeOnClickOutside={true}
                    opened={juryMemberFormOpened}
                    onClose={juryMemberFormClose}
                    title={<Button variant='light' onClick={openCurrentGroup} >current groups</Button>}
                    closeOnEscape={false}
                    fullScreen
                    zIndex={9}

                >
                    {affectationMethod == 2 ?
                        <JuryMembersForm currentGroupOpened={currentGroupOpened} closeCurrentGroup={closeCurrentGroup} />
                        : null
                        // <JuryMembersMasterForm currentGroupOpened={currentGroupOpened} closeCurrentGroup={closeCurrentGroup} />


                    }


                </Modal>

                <Drawer
                    opened={openYearScholar}
                    onClose={yearScholarClose}
                    overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                    overlayOpacity={0.3}
                    overlayBlur={3}
                    position='right'
                    size="xl"
                >
                    <div className='Student-managment-nav'>
                        <SimpleGrid cols={1} spacing='md' >
                            {/* {department_menu} */}
                            <SpecialtiesInfo icon={IconPlus} label={specialtyInformation?.fullname}
                                initiallyOpened={false}
                                links={years}

                            />
                        </SimpleGrid>

                    </div>

                </Drawer>


                <div className='Student-managment'>

                    <div className='Student-managment-menu'  >

                        {specialtyInformation ?
                            <div className='specialtyName' >


                                <Flex>
                                    <Button variant='white' onClick={yearScholarOpen} ><IconDotsVertical /></Button> <h3>  <Text fz="lg" color='teal' >{specialtyInformation.fullname}  {selectedYearString}  </Text> list of teams </h3>
                                </Flex>


                            </div>
                            : <h3>loading...</h3>
                        }
                        <Group spacing={'20px'} mb={30} >
                            <Tooltip label="create team">
                                <Button color='teal' onClick={open}  >
                                    <Flex gap={10}>
                                        <Text>create team</Text>
                                        <IconPlus size={20} />
                                    </Flex>
                                </Button>
                            </Tooltip>
                            <Tooltip label="affect themes to students">
                                <Button color='teal' onClick={handleAffectThemeToStudents}   >
                                    <Flex gap={10} >
                                        {affectationMethod == 1 ?
                                            <Text>affect themes</Text>
                                            :
                                            <Text>affect supervisors</Text>
                                        }
                                        <IconShare size={20} />
                                    </Flex>
                                </Button>
                            </Tooltip>
                            <Tooltip label="create a follow up sheet">
                                <Button color='teal' onClick={followUpFormOpen}  >
                                    <Flex align={'center'} justify='space-between' gap={10} >
                                        <Text> follow up sheet </Text><IconPlus size={20} />
                                    </Flex>
                                </Button>
                            </Tooltip>
                            {affectationMethod == 2 ?
                                <>
                                    <Tooltip label="jury members">
                                        <Button color='teal' onClick={juryMemberFormOpen}  >
                                            <Flex align={'center'} justify='space-between' gap={10} >
                                                <Text> jury  members </Text><IconPlus size={20} />
                                            </Flex>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip label="Presentation Date">
                                        <Button color='teal' onClick={presentationFormOpen}  >
                                            <Flex align={'center'} justify='space-between' gap={10} >
                                                <Text> Presentation Date</Text><IconCalendar size={20} />
                                            </Flex>
                                        </Button>
                                    </Tooltip>
                                </>
                                : null
                            }


                        </Group>
                        < TeamsCrud />

                    </div>

                </div>
            </> : <Navigate to='/teacher' />
    )
}

export default TeamsManagement;