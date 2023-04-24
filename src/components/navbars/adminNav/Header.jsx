import { createStyles, Header, Menu, Group, Center, Burger, Container, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Outlet } from 'react-router';
// import { MantineLogo } from '@mantine/ds';
import logo from "../../../imges/1669627809076.png";
import Logout from '../../logout/logout';
import ProfileMenu from '../../profileMenu/profileMenu';
import ProfileMenuAdmin from '../../profileMenuAdmin/profileMenu';
// import { SideBarStudent } from './sidebar';


const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: theme.fn.variant({ variant: 'filled', color: 'teal' }).background,
        borderBottom: 0,

    },

    inner: {
        height: (70),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '98%',
        padding:' 0 10px'
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    sideMenuFlex: {
        display: 'flex'
    },
    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${(8)} ${(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.white,
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
                0.1
            ),
        },
    },

    linkLabel: {
        marginRight: (54),
    },
}));

const links = [
    { link: 'link name', label: 'label name', links: [{ link: 'sub link ', label: 'sub label' }] },
    { link: 'link name', label: 'label name', links: [{ link: 'sub link ', label: 'sub label' }] },
    { link: 'link name', label: 'label name', links: [{ link: 'sub link ', label: 'sub label' }] },
    { link: 'link name', label: 'label name', links: [{ link: 'sub link ', label: 'sub label' }] },
];


export function HeaderAdmin(props) {
    // const [opened, { toggle }] = useDisclosure(false);
    const [openedLogout, setOpenedLogout] = useState(false);

    // const [openedMenu, props.setOpenedMenu] = useState(false);
    const { classes } = useStyles();



    return (
        <>

            <Modal opened={openedLogout}
                onClose={
                    () => setOpenedLogout(false)
                }
                >
                <Logout setOpened={setOpenedLogout} />
            </Modal>

            <Header height={70} className={classes.header} color='teal'  >
                <Container fluid={true} >
                    <div className={classes.inner}>
                        <div className='profile-navbar-content'>
                            <div className='profile-navbar-img'>
                                <img src={logo}
                                    alt='' />
                            </div>
                            <div className='ProfileUniv-name'>
                                universite
                                <br />
                                <h5>mustapha stambouli</h5>
                            </div>
                            <hr  className={`ProfileUniv-name-diviser ${classes.links}`} />
                        </div>
                        <Group spacing={5} className={classes.links}>
                            {/* {items} */}
                            <ProfileMenuAdmin setOpened={setOpenedLogout}   key={nanoid()} />
                        </Group>
                        <Burger
                            opened={props.opened}
                            onClick={props.open}
                            className={classes.burger}
                            size="sm"
                            color="#fff"
                        />
                    </div>
                </Container>
            </Header>

            {/* <Outlet /> */}

        </>

    );
}