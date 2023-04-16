import { Button, LoadingOverlay, Text, Tooltip, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArrowLeft, IconBrandTelegram, IconClipboard, IconShare } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import { useTeacherContext } from '../../contexts/teacherContext'

import './../bddStudents/StudentsManagement.css'
import { useAffectThemeToStudents, useFetchSpecialtyInformation, usePublishListOfTheme } from './connetion/fetchData'
import { ThemeCrud } from './ThemesCrud'

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


    const { mutate: publishListOfTheme , isLoading : publishLoading,  } = usePublishListOfTheme();
    

    const handlePublish = () => {
        publishListOfTheme()
    }

 



    return (
        isSpecialtyManager == true  && affectationMethod !=2   ?
            <>


              

                <div className='Student-managment'>

                    <div className='Student-managment-menu'  >

                        {specialtyInformation ?
                            <div className='specialtyName' > <h3>  <Text fz="lg" color='teal' >{specialtyInformation.fullname}</Text> list of theme suggested </h3> </div>
                            : <h3>loading...</h3>
                        }
                        <ThemeCrud  publishLoading={publishLoading}  />

                        <Tooltip label="Provide access to themes for academic exploration">
                            <Button color='teal' onClick={handlePublish}   >
                                <IconShare size={20} />
                            </Button>
                        </Tooltip>
               
                    </div>

                </div>
            </> : <Navigate to='/teacher' />
    )
}

export default ThemeManagement