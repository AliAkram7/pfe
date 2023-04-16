import { useEffect, useState } from 'react';
import { createStyles, Navbar, UnstyledButton, Tooltip, Title, ThemeIcon, Burger, Drawer, Flex, Group, SimpleGrid, ScrollArea, Modal } from '@mantine/core';
import {
    IconHome2,
    IconGauge,
    IconDeviceDesktopAnalytics,
    IconFingerprint,
    IconCalendarStats,
    IconUser,
    IconSettings,
    IconPuzzle2,
    IconSquareArrowUp,
    IconUserPlus,
    IconLogout,
} from '@tabler/icons';
import { Link } from 'react-router-dom';
import { useStudentContext } from '../../../contexts/studentContext';
import { useDisclosure } from '@mantine/hooks';
import Logout from '../../logout/logout';
// import { MantineLogo } from '@mantine/ds';

const useStyles = createStyles((theme) => ({
    Parentnavbar: {
    },
    wrapper: {
        display: 'flex',
        [theme.fn.smallerThan('xs')]: {
        },

        display: 'none',

    },

    aside: {
        flex: `0 0 10px`,
        // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
            }`,
    },

    mainLinks: {
        // flex: 1,
        
        // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[],
        // height: "1200px",
        // overflow: 'scroll'

    },

    mainLink: {
        width: '44px',
        height: '60px',
        borderRadius: theme.radius.xs,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: !theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        '&:hover': {
            backgroundColor: !theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        },


    },

    mainLinkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: "yellow" }).background,
            color: theme.fn.variant({ variant: 'light', color: 'yellow' }).color,
        },


    },

    title: {
        boxSizing: 'border-box',
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        marginBottom: theme.spacing.xl,
        backgroundColor: !theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        padding: theme.spacing.lg,
        paddingTop: '0px',
        height: '40px',
        borderBottom: `1px solid ${!theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
            }`,
    },


    // logo: {
    //     boxSizing: 'border-box',
    //     width: '100%',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     height: '60rem',
    //     paddingTop: theme.spacing.md,
    //     borderBottom: `1rem solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    //         }`,
    //     marginBottom: theme.spacing.xl,
    // },

    link: {
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        textDecoration: 'none',
        borderTopRightRadius: theme.radius.md,
        borderBottomRightRadius: theme.radius.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        // padding: ` ${theme.spacing.lg}`,
        padding: ' 0 15px',
        fontSize: theme.fontSizes.md,
        marginRight: theme.spacing.md,
        fontWeight: 500,
        height: '44px',
        lineHeight: '44px',


        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.violet[1],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    linkActive: {
        '&, &:hover': {
            borderLeftColor: theme.fn.variant({ variant: 'filled', color: "teal" })
                .background,
            backgroundColor: theme.fn.variant({ variant: 'filled', color: 'teal' })
                .background,
            color: theme.white,
        },
    },
    hide: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    }

}));








export function SideBarStudent(props) {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Home');
    const [activeLink, setActiveLink] = useState('student');
    const { isInTeam } = useStudentContext()

    const [ LogoutOpened  ,  {open : openLogout , close :  closeLogout  }] = useDisclosure()

    // const [opened, {toggle}] = useDisclosure(false);
    const mainLinksMockdata = [
        { item: <Burger opened={props.opened} />, label: '' },
    ];

    const linksMockdata = [
        { label: 'home', icon: IconHome2 },
        { label: 'ranking', icon: IconSquareArrowUp },
        !isInTeam ? { label: 'join team', icon: IconUserPlus } : { label: 'team-section', icon: IconPuzzle2 },
    ];










    const mainLinks = mainLinksMockdata.map((link) => (

        <UnstyledButton
            // onClick={() => setActive(link.label)}
            className={cx(classes.mainLink, { [classes.mainLinkActive]: link.label === active })}
            onClick={props.opened ? props.close : props.open} size={20}
        >
            {link.item}
        </UnstyledButton>

    ));

    const links = linksMockdata.map((link, idx) => (

        <Link
            className={cx(classes.link, { [classes.linkActive]: activeLink === link.label })}
            to={link.label === 'home' ? '/student' : link.label === 'join team' ? 'join-Team' : link.label}
            onClick={(event) => {
                // event.preventDefault();

                setActiveLink(link.label);
                setActive(link.label)
            }}
            key={link.label}

        >
            <ThemeIcon variant='filled' color='teal' size={24} >
                <link.icon />
            </ThemeIcon>
            {link.label}
        </Link>

    ));

    return (
        
        <Navbar height={"100vh"} style={{ width: "0%" }} className={classes.Parentnavbar}     >
            <Navbar.Section grow className={classes.wrapper}  >
                <div className={classes.aside}>
                    <div className={classes.logo}>
                        {/* <MantineLogo type="mark" size={30} /> */}
                    </div>
                    {mainLinks}
                </div>
                <Modal opened={LogoutOpened}
                onClose={
                    closeLogout
                }
                >
                <Logout setOpened={openLogout} />
            </Modal>      
                <Drawer opened={props.opened} onClose={props.close} withCloseButton={true}
                    zIndex={99999}
                    // style={{overflow  : 'scroll'}}
                >
                    <ScrollArea>
                    <div className={classes.mainLinks}


                    >
                        <Title order={4} className={classes.title} 

                        >
                            {active}
                        </Title>
                        <ScrollArea  

                        >
                            <SimpleGrid 
                                // h={'100vh'}

                                
                                >
                                <SimpleGrid
                                >
                                    <Link
                                        className={cx(classes.link, { [classes.linkActive]: activeLink === 'profile' })}
                                        to='profile'
                                        onClick={(event) => {
                                            setActiveLink('profile');
                                            setActive('profile')
                                        }}
                                        key={'profile'}
                                    >
                                        <ThemeIcon variant='filled' color='teal' size={24} >
                                            <IconUser />
                                        </ThemeIcon>
                                        profile
                                    </Link>

                                    {links}
              
                                
                                    
                                </SimpleGrid>

                                <Link
                                    className={cx(classes.link)}
                                    onClick={openLogout}
                                >
                                    <ThemeIcon variant='filled' color='red' size={24} >
                                        <IconLogout />
                                    </ThemeIcon>
                                    logout
                                </Link>

                            </SimpleGrid>
                        </ScrollArea>
                    </div>
                    </ScrollArea>
                </Drawer>
            </Navbar.Section>
        </Navbar>
    );
}