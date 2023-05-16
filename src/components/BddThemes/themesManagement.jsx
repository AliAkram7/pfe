import { Button, Drawer, Flex, Highlight, LoadingOverlay, SimpleGrid, Text, Tooltip, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArrowLeft, IconBrandTelegram, IconClipboard, IconDotsVertical, IconPlus, IconShare } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import { useTeacherContext } from '../../contexts/teacherContext'

import './../bddStudents/StudentsManagement.css'
import { useAffectThemeToStudents, useFetchSpecialtyInformation, usePublishListOfTheme } from './connetion/fetchData'
import { ThemeCrud } from './ThemesCrud'
import { SpecialtiesInfo } from '../bddStudentRank/specialty'
import { useTeacherFetchYearScholar } from '../bddStudentRank/connection/connection'

function ThemeManagement() {


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


    const [DrawerOpened, {
        close: drawerClose,
        open: drawerOpen
    }
    ] = useDisclosure(false);


    const { mutate: publishListOfTheme, isLoading: publishLoading, } = usePublishListOfTheme();


    const handlePublish = () => {
        publishListOfTheme()
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

    const {selectedYearString} = useStateContext()




    return (
        isSpecialtyManager == true && affectationMethod != 2 ?
            <>

<Drawer
                    opened={openYearScholar}
                    onClose={yearScholarClose}
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
                            <div className='specialtyName' >   <Flex  align={'center'} >  <Button variant='white'   onClick={yearScholarOpen}  ><IconDotsVertical/></Button>    <h3>    <Text fz="lg"  >{specialtyInformation.fullname}  <Highlight color='teal'>  {selectedYearString}</Highlight> </Text> <h2> Theme Suggested </h2></h3></Flex> </div>
                            : <h3>loading...</h3>
                        }
                        <Tooltip label="Provide access to themes for academic exploration">
                            <Button color='teal' onClick={handlePublish}   >
                                <Flex  align={'center'}   gap={10} >
                                    <IconShare size={20} /> publish
                                </Flex>
                            </Button>
                        </Tooltip>
                        <ThemeCrud publishLoading={publishLoading} />



                    </div>

                </div>
            </> : <Navigate to='/teacher' />
    )
}

export default ThemeManagement