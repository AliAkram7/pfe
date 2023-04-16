import React, { useEffect, useState } from "react";
import "./profileNavbar.css";
import { createStyles, Drawer, Modal, ScrollArea, SimpleGrid, Tabs, Transition } from "@mantine/core";
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
import { useGetStudentTeamInformation } from "../../teamSection/connection/receiveData/fetchData";
import { useStudentContext } from "../../../contexts/studentContext";
import jwt_decode from 'jwt-decode';
import ChangeInfo from "../../profilePage/changeInfo";
import { useDisclosure } from "@mantine/hooks";
import { HeaderStudent } from "./header";
import { SideBarStudent } from "./sidebar";
import { IconChartHistogram, IconHome, IconListCheck, IconPuzzle2 } from "@tabler/icons";
import TeamInfo from "../../teamSection/teamInfo";
import { nanoid } from "nanoid";


const useStyles = createStyles((theme) => ({
    MainPage: {
        // width : '96%', 
        height: '100%',
        position: 'fixed',
        right: '0',
        bottom: '0',
        overflow: 'scroll',

        width: '100%'
    }

}))

function ProfileNavbar() {
    const { classes } = useStyles();
    const [openSide, setOpenSide] = useState(false);
    const [opened, setOpened] = useState(false);

    const [firstLoginOpened, { close: firstLoginClose, open: firstLoginOpen, }] = useDisclosure(false);

    const chn = useLocation()
    useEffect(() => {
        setTimeout(() => {
            startNavigationProgress();
        }, 100);
        setTimeout(() => {
            completeNavigationProgress();
        }, 200);
    }, [chn.pathname]);

    const navigate = useNavigate();


    //** ------------------------------------------------------------------------ student context ------------------------------------------------------------------------  */
    const { user, token, setRole, ndToken, setNdToken } = useStateContext()
    const { student, setStudent, setStudentToken, setIsInTeam, isInTeam, studentToken, setFirstLogin, firstLogin, affMethod } = useStudentContext()
    //** ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------  */


    useEffect(() => {
        setStudentToken(token);
        setStudent(user);
        const decodedToken = jwt_decode(token)
        setFirstLogin(decodedToken.first_login)
    }, [token, user])






    const onSuccess = () => {
        setStudent(data?.data.user);
        setRole(data?.data.role)
        if (getStudentTeamInformation?.data.team_members.length == 2) {
            setIsInTeam(true)
        } else {
            setIsInTeam(false)
        }
    }



    const onError = () => {
    }
    const { data } = useFetchStudentData(onSuccess, onError)

    const { data: getStudentTeamInformation } = useGetStudentTeamInformation()

    useEffect(() => {
        if (getStudentTeamInformation?.data.team_members.length == 2) {
            setIsInTeam(true)
        } else {
            setIsInTeam(false)
        }
    }, [getStudentTeamInformation?.data.team_members.length])




    const x = (
        <>

            <ChangeInfo opened={firstLoginOpened}
                close={firstLoginClose} />
            <NavigationProgress color='gold' />
            const [opened, setOpened] = useState(false);

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
                                <ProfileMenu setOpened={setOpened} />
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
                                <Link to='/student'>home</Link>
                            </li>
                            <li>
                                <Link to='ranking'>ranking</Link>
                            </li>
                            {/* <li>
                                <Link to='list_of_dissertations'>dissertations</Link>
                            </li> */}


                            {isInTeam == true ? <li>
                                <Link to='team-section'>team section</Link>
                            </li> : null}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );


    const [openedSide, { open, close }] = useDisclosure(false)


    const activeLink = useLocation();



    return (<>
        <NavigationProgress color='gold' />

        <div className="sidbar--header-main"  >
            <Drawer opened={openedSide} position='right' onClose={close} size='xl'    >
                <ScrollArea>
                    <TeamInfo />
                </ScrollArea>
            </Drawer>
            {/* <SideBarStudent opened={openedSide} open={open} close={close} isInTeam={isInTeam} /> */}
            {/* <ScrollArea offsetScrollbars={false}   > */}
            <div className={`${classes.MainPage}`}
            >

                <ChangeInfo opened={firstLoginOpened}
                    close={firstLoginClose} />

                <HeaderStudent opened={openedSide} open={open} close={close} />
                <section className='main'>

                    <div className='main-page-name'>
                        <Tabs variant="default" orientation="horizontal" defaultValue="home"   >
                            <Tabs.List>
                                <Tabs.Tab value="home" onClick={() => { navigate('/student') }} icon={<IconHome color='teal' size="1.2rem" />} key={nanoid()} >
                                </Tabs.Tab>
                                <Tabs.Tab value="ranking" onClick={() => { navigate('ranking') }} icon={<IconChartHistogram color='teal' size="1.2rem" />} key={nanoid()} >rank</Tabs.Tab>


                                {
                                    isInTeam ?
                                        <Tabs.Tab value="team-section" onClick={() => { navigate('team-section')  }} icon={<IconPuzzle2 size="1.2rem" color='teal' />} key={nanoid()} >team section</Tabs.Tab>
                                        : <Tabs.Tab value="join-Team" onClick={() => { navigate('join-Team') }} icon={<IconPuzzle2 size="1.2rem" color='teal' />} key={nanoid()} >join team</Tabs.Tab>
                                }

                                {activeLink.pathname.match('team') ? <>
                                    {/* <Tabs.Tab value="choiceList"  onClick={() => { navigate('') }} icon={<IconListCheck color='teal'  size="1.2rem" />}>
                                    {affMethod != 2 ? 'themes list' : 'Framer list'}
                                </Tabs.Tab> */}
                                    <Tabs.Tab value="messages" onClick={() => { navigate('/student/team-section/blog') }} icon={<IconChartHistogram key={nanoid()} color='teal' size="1.2rem" />} key={nanoid()} >state of progress</Tabs.Tab>
                                    <Tabs.Tab value="settings" onClick={open} icon={<IconPuzzle2 size="1.2rem" color='teal' />} key={nanoid()} >team information</Tabs.Tab> 
                                    </> : null}
                            </Tabs.List>
                        </Tabs>

                    </div>
                    <Outlet />
                </section>
                <ProfileFooter />
            </div>
            {/* </ScrollArea> */}
        </div>
    </>)

}

export default ProfileNavbar;
