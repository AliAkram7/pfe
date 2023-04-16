import React, { useEffect, useState } from "react";
import "./profileNavbar.css";

import { createStyles, Drawer, Modal, ScrollArea, Tabs } from "@mantine/core";

import logo from "../../../imges/1669627809076.png";
import ProfileMenu from "../../profileMenu/profileMenu";
import Logout from "../../logout/logout";
import { Await, Outlet, useLocation, useNavigate, useParams } from "react-router";
// import ProfileFooter from "../../../../build/footers/profileFooter/profileFooter";
import { Link } from "react-router-dom";
import ProfileFooter from "../../footers/profileFooters/profileFooter";
import { completeNavigationProgress, NavigationProgress, startNavigationProgress } from "@mantine/nprogress";
import { useFetchStudentData } from "../../profilePage/connection/receiveData/fetchData";

import { useStateContext } from "../../../contexts/ContextProvider";
// import { useGetStudentTeamInformation } from "../../teamSection/connection/receiveData/fetchData";
// import { useStudentContext } from "../../../contexts/studentContext";
import { useTeacherContext } from "../../../contexts/teacherContext";
import { useFetchTeacherData } from "../../TeacherprofilePage/connection/receiveData/fetchData";
import TeacherProfileMenu from "../../teacherProfileMenu/profileMenu";
import { useDisclosure } from "@mantine/hooks";
import { SideBarTeacher } from "./sidebar";
import { HeaderTeacher } from "./header";
import { useGetTeamsInformation } from "../../TeacherTeamsSection/connection/receiveData/fetchData";
import { IconBulb, IconChartArrowsVertical, IconChartHistogram, IconHome, IconListCheck, IconListDetails, IconPuzzle2, IconReport, IconSchool } from "@tabler/icons";
import TeamInfo from "../../TeacherTeamsSection/teamInfo";
import ChangeInfo from "../../TeacherprofilePage/changeInfo";

const useStyles = createStyles((theme) => ({
    MainPage: {
        // width : '96%', 
        height: '100%',
        width: '100%'
        // position: 'fixed', 
        // right: '0', 
        // bottom: '0', 
        // overflow: 'scroll', 
        // /* padding: 10px; */
        // /* transition: all 0.2s; */
        //     [theme.fn.largerThan('xs')]: {
        //         width: '97%',  
        //     },
        //     [theme.fn.smallerThan('xs')]: {
        //         width : '100%' , 
        //     },
    },


}))

function TeaherProfileNavbar() {
    const { classes } = useStyles();

    const [openSide, setOpenSide] = useState(false);
    const [opened, setOpened] = useState(false);
    const [openedTeamInformation, {open : TMopen , close : TMclose }] = useDisclosure()
    const navigate = useNavigate()
    const chn = useLocation()
    
    useEffect(() => {
        setTimeout(() => {
            startNavigationProgress();
        }, 100);

        setTimeout(() => {
            completeNavigationProgress();
        }, 200);
    }, [chn.pathname]);

    //!! Teacher Function  ------------------------------------------------------------------------------------------------------------------------------------------------------------
    //** ------------------------------------------------------------------------ teacher context ------------------------------------------------------------------------  */
    const { user, token, setRole } = useStateContext()
    const { teacher, setTeacher, setTeacherToken, isDepartmentManager, setIsInTeam, isInTeam, isSpecialtyManager, affectationMethod, } = useTeacherContext()

    const [firstLoginOpened, { close: firstLoginClose, open: firstLoginOpen, }] = useDisclosure(false);
    //** ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------  */
    useEffect(() => {
        setTeacherToken(token);
        setTeacher(user);
    }, [])

    const onSuccess = () => {
        setTeacher(data?.data.user);
        setRole(data?.data.role)
    }

    const onError = () => {
    }
    const { data } = useFetchTeacherData(onSuccess, onError)
    // !!----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // const { data: getStudentTeamInformation } = useGetStudentTeamInformation()



    const { data: getTeamsInformation, error } = useGetTeamsInformation()


    useEffect(() => {

        if (getTeamsInformation?.data.teams_list.length > 0) {
            setIsInTeam(true)
        }
    }, [getTeamsInformation?.data.teams_list])




    const x = (
        <>
            <NavigationProgress color='gold' />
            <Modal opened={opened}
                onClose={
                    () => setOpened(false)
                }
                title='are you sure !'>
                <Logout setOpened={setOpened} />
            </Modal>
            <div className='sidbar--header-main'>
                <div className='header-main'
                    style={
                        !openSide ? {
                            width: "93%"
                        } : null
                    }>
                    <header>
                        <div className='header-content'>
                            <div className='profile-navbar'>
                                <div className='profile-navbar-content'>
                                    <div className='profile-navbar-img'>
                                        <img src={logo}
                                            alt='' />
                                    </div>
                                    <div className='ProfileUniv-name'>
                                        universite
                                        <br />
                                        <h3>mustapha stambouli</h3>
                                    </div>
                                    <hr />
                                </div>
                                <TeacherProfileMenu setOpened={setOpened} />
                            </div>
                        </div>
                    </header>
                    <section className='main'>
                        <Outlet />
                    </section>
                    <ProfileFooter />
                </div>

                <div className='sidebar'>
                    <div className='menu-name'>
                        <div className='menu-btn'
                            onClick={
                                () => {
                                    setOpenSide(!openSide);
                                }
                            }
                            style={
                                openSide ? {
                                    gap: "3px"
                                } : null
                            }>
                            <span style={
                                openSide ? {
                                    transform: "rotate(-41deg)",
                                    width: " 40%"
                                } : null
                            }></span>
                            <span></span>
                            <span style={
                                openSide ? {
                                    transform: "rotate(41deg)",
                                    width: " 40%"
                                } : null
                            }></span>
                        </div>
                        {/* <h3>menu</h3> */}
                    </div>
                    <div className='menu-list'>
                        <ul style={
                            openSide ? {
                                display: "flex"
                            } : null
                        }>

                            {/* //!! special data come from token used here !!    */}
                            <li>
                                <Link to='/teacher'>home</Link>
                            </li>
                            {/* {isDepartmentManager == true ? 
                                <li>
                                    <Link to='/'>section Department Manager</Link>
                                </li> :  null } */}
                            {isDepartmentManager == true ?
                                <li>
                                    <Link to='students_management'>Students Management</Link>
                                </li> : null}

                            {<li>
                                <Link to='teams-section'>teams section</Link>
                            </li>}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );


    const [openedSide, { toggle }] = useDisclosure(false);
    const activeLink = useLocation();


    return (<>
        <NavigationProgress color='gold' />
        <div className="sidbar--header-main" >
            {/* <SideBarTeacher opened={openedSide} toggle={toggle} /> */}
            {/* <ChangeInfo opened={firstLoginOpened}
                close={firstLoginClose} /> */}
            <div className={`${classes.MainPage}`}>

<ChangeInfo opened={firstLoginOpened}
    close={firstLoginClose} />
   

                <HeaderTeacher />
                <section className='main'>

                    <div className='main-page-name'>
                        <Tabs variant="default" orientation="horizontal" defaultValue="home">
                            <Tabs.List>
                                <Tabs.Tab value="home" onClick={() => { navigate('/teacher') }} icon={<IconHome color='teal' size="1.2rem" />}>
                                </Tabs.Tab>
                                <Tabs.Tab value="suggestion_theme" onClick={() => { navigate('suggestion_theme') }} icon={<IconBulb color='teal' size="1.2rem" />}>Suggest topics</Tabs.Tab>
                                {isDepartmentManager == 1 ? <Tabs.Tab value="students_management" onClick={() => { navigate('students_management') }} icon={<IconListCheck color='teal' size="1.2rem" />}>Students</Tabs.Tab> : null}
                                {isSpecialtyManager && affectationMethod != 2 ? <Tabs.Tab value="themes_management" onClick={() => { navigate('themes_management') }} icon={<IconSchool size="1.2rem" color='teal' />}>Themes</Tabs.Tab> : null}
                                {isSpecialtyManager == 1 ? <Tabs.Tab value="rank_management" onClick={() => { navigate('rank_management') }} icon={<IconChartArrowsVertical color='teal' size="1.2rem" />}>Ranking</Tabs.Tab> : null}
                                {isSpecialtyManager == 1 ? <Tabs.Tab value="teams_management" onClick={() => { navigate('teams_management') }} icon={<IconListDetails color='teal' size="1.2rem" />}>Teams</Tabs.Tab> : null}
                                {/* {isSpecialtyManager == 1 ? <Tabs.Tab value="team_follow_up" onClick={() => { navigate('team_follow_up') }} icon={<IconListDetails color='teal' size="1.2rem" />}>teams follow-up</Tabs.Tab> : null}  */}
                                {isSpecialtyManager == 1 && affectationMethod == 2 ? <Tabs.Tab value="framer_management" onClick={() => { navigate('framer_management') }} icon={<IconListDetails color='teal' size="1.2rem" />}>framers</Tabs.Tab> : null}
                                    <Tabs.Tab value="framing_sheet_License" onClick={() => { navigate('framing_sheet_License') }}icon={<IconReport       size="1.2rem" color='teal' />}>License framing sheet</Tabs.Tab> 
                                {isInTeam ? <Tabs.Tab value="teams-section" onClick={() => { navigate('teams-section') }} icon={<IconPuzzle2 size="1.2rem" color='teal' />}>teams section</Tabs.Tab> : null}
                                {activeLink.pathname.match('section') ? <>
                {/* framing_sheet_License */}
                                    {/* <Tabs.Tab value="messages" onClick={() => { navigate('/teacher/team-section/room') }} icon={<IconChartHistogram color='teal' size="1.2rem" />}>state of progress</Tabs.Tab> */}
                                    <Tabs.Tab value="settings" onClick={TMopen} icon={<IconPuzzle2 size="1.2rem" color='teal' />}>team information</Tabs.Tab>
                                    </>
                                     : null}
                            </Tabs.List>
                        </Tabs>
                    </div>
                    <Drawer opened={openedTeamInformation} position='right' onClose={TMclose} size={'xl'}    >
                        <ScrollArea>
                            <TeamInfo />
                        </ScrollArea>
                    </Drawer>
                    <Outlet />

                </section>
                <ProfileFooter />
            </div>
        </div>
    </>)



}

export default TeaherProfileNavbar;
