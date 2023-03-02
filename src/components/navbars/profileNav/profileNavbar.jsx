import React, { useEffect, useState } from "react";
import "./profileNavbar.css";

import { Modal } from "@mantine/core";

import logo from "../../../imges/1669627809076.png";
import ProfileMenu from "../../profileMenu/profileMenu";
import Logout from "../../logout/logout";
import { Await, Outlet, useLocation, useParams } from "react-router";
// import ProfileFooter from "../../../../build/footers/profileFooter/profileFooter";
import { Link } from "react-router-dom";
import ProfileFooter from "../../footers/profileFooters/profileFooter";
import { completeNavigationProgress, NavigationProgress, startNavigationProgress } from "@mantine/nprogress";
import { useFetchStudentData } from "../../profilePage/connection/receiveData/fetchData";


import { useStateContext } from "../../../contexts/ContextProvider";
import { useGetStudentTeamInformation } from "../../teamSection/connection/receiveData/fetchData";
import { useStudentContext } from "../../../contexts/studentContext";
function ProfileNavbar() {
    const [openSide, setOpenSide] = useState(false);
    const [opened, setOpened] = useState(false);


    const chn = useLocation()
    useEffect(() => {
        setTimeout(() => {
            startNavigationProgress();
        }, 100);

        setTimeout(() => {
            completeNavigationProgress();
        }, 200);
    }, [chn.pathname]);



    //** ------------------------------------------------------------------------ student context ------------------------------------------------------------------------  */
    const { user, token, setRole } = useStateContext()
    const { student, setStudent, setStudentToken, setIsInTeam, isInTeam } = useStudentContext()
    //** ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------  */

    useEffect(() => {
        setStudentToken(token);
        setStudent(user);
    }, [])


    const onSuccess = () => {
        setStudent(data?.data.user);
        setRole(data?.data.role)
        if (getStudentTeamInformation?.data.length == 2) {
            setIsInTeam(true)
        }
    }

    const onError = () => {

    }
    const { data } = useFetchStudentData(onSuccess, onError)


    const { data: getStudentTeamInformation } = useGetStudentTeamInformation()


    //** check  if students enter in team  */




    return (
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

                            {isInTeam == false ? <li>
                                <Link to='join-Team'>join team</Link>
                            </li> : null}
                            {isInTeam == true ? <li>
                                <Link to='team-section'>team section</Link>
                            </li> : null}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileNavbar;
