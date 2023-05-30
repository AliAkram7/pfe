import React, { useEffect } from "react";
import "./homeNav.css";
// import logo from "../../../imges/univ-logo.png";
import logo from "../../../imges/1668930505521.png";
import { Modal } from "@mantine/core";
import { useState } from "react";
import LoginTo from "../../loginTo/loginTo";
import { Link, useLocation } from "react-router-dom";
import {
  completeNavigationProgress,
  startNavigationProgress,
} from "@mantine/nprogress";







function HomeNav() {
  const [opened, setOpened] = useState(false);

  let location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      startNavigationProgress();
    }, 500);

    setTimeout(() => {
      completeNavigationProgress();
    }, 1000);
  }, [location]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title='Introduce yourself!'
      >
        <LoginTo />
      </Modal>

      <header className='main-header'>
        <div className='yellow-color'></div>
        <div className='nav-container'>
          <div className='MainLogo'>
            <div className='MainLogo-img'>
              <img src={logo} alt='' />
            </div>
            <h1 className='MainUniv-name'>
              <span>universite</span>
              <br />
              mustpha stambouli <span className='univ-sp-fac'></span> faculte de
              science exacte
            </h1>
          </div>
          <div className='gest-action'>
            <button 
            // className='btn login-btn' 
            // onClick={() => setOpened(true)}
            >
              <Link to='login' >login</Link>
            </button>
          </div>
        </div>
      </header>

    



    </>
  );
}

export default HomeNav;
