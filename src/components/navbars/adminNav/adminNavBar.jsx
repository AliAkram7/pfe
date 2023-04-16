import React, { useEffect, useState } from "react";
import "./profileNavbar.css";
import { createStyles, Drawer, List, Modal, ScrollArea, SimpleGrid, Tabs, ThemeIcon, Transition } from "@mantine/core";
import logo from "../../../imges/1669627809076.png";
// import ProfileMenu from "../../profileMenu/profileMenu";
import Logout from "../../logout/logout";
import { Await, Outlet, useLocation, useNavigate, useParams } from "react-router";
// import ProfileFooter from "../../../../build/footers/profileFooter/profileFooter";
import { Link } from "react-router-dom";
import ProfileFooter from "../../footers/profileFooters/profileFooter";
import { completeNavigationProgress, NavigationProgress, startNavigationProgress } from "@mantine/nprogress";

import jwt_decode from 'jwt-decode';
import ChangeInfo from "../../profilePage/changeInfo";
import { useDisclosure } from "@mantine/hooks";
import { HeaderAdmin } from "./Header";

import { IconChartHistogram, IconHome, IconListCheck, IconPaperclip, IconPuzzle2, IconUser, IconUsers } from "@tabler/icons";
import TeamInfo from "../../teamSection/teamInfo";
import { nanoid } from "nanoid";
import { useAdminfetchDepartmentsInfo } from "../../bddStudents/connection/fetchData/fetchData";
import { useAdminContext } from "../../../contexts/adminContext";
import { useStateContext } from "../../../contexts/ContextProvider";


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

function AdminNavbar() {
    const { classes } = useStyles();
    const [openSide, setOpenSide] = useState(false);
    const [opened, setOpened] = useState(false);

    const [firstLoginOpened, { close: firstLoginClose, open: firstLoginOpen, }] = useDisclosure(false);

    const [DrawerOpened, {
        close: drawerClose,
        open: drawerOpen
    }
    ] = useDisclosure(false);
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


    //** ------------------------------------------------------------------------ admin context ------------------------------------------------------------------------  */
    const { user, token, setRole, ndToken, setNdToken } = useStateContext()
    const {adminToken, setAdminToken} = useAdminContext()
    //** ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------  */


    useEffect(() => {
        setAdminToken(token);
    }, [])




    const [openedSide, { open, close }] = useDisclosure(false)



    const activeLink = useLocation();

    return (<>
        <NavigationProgress color='gold' />

        <div className="sidbar--header-main"  >
            <div className={`${classes.MainPage}`}
            >
                  
                <HeaderAdmin opened={openedSide} open={open} close={close} />
                <section className='main'>
                    <div className='main-page-name'>
                        <Tabs variant="default" orientation="horizontal" defaultValue="home"   >
                            <Tabs.List>
                                <Tabs.Tab value="home" onClick={() => { navigate('/admin') }} icon={<IconHome color='teal' size="1.2rem" />} key={nanoid()} >
                                </Tabs.Tab>
                                <Tabs.Tab value="students_management" onClick={() => { navigate('students_management') }} icon={<IconUsers color='teal' size="1.2rem" />} key={nanoid()} >students management</Tabs.Tab>
                                <Tabs.Tab value="teacher_management" onClick={() => { navigate('teacher_management') }} icon={<IconUsers size="1.2rem" color='teal' />} key={nanoid()} >teacher management</Tabs.Tab>
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

export default AdminNavbar;
