import { useState } from 'react';
import { createStyles, Navbar, UnstyledButton, Tooltip, Title } from '@mantine/core';
import {
    IconHome2,
    IconGauge,
    IconDeviceDesktopAnalytics,
    IconFingerprint,
    IconCalendarStats,
    IconUser,
    IconSettings,
} from '@tabler/icons';
import { Link } from 'react-router-dom';
// import { MantineLogo } from '@mantine/ds';

const useStyles = createStyles((theme) => ({
    Parentnavbar:{
    },
    wrapper: {
        display: 'flex',
    },

    aside: {
        flex: `0 0 10px`,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
            }`,
    },

    mainLinks: {
        flex: 1,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    mainLink: {
        width: '44px',
        height: '60px',
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
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
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        padding: theme.spacing.lg,
        paddingTop: '25px',
        height: '70px',
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
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
        display: 'block',
        textDecoration: 'none',
        borderTopRightRadius: theme.radius.md,
        borderBottomRightRadius: theme.radius.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        // padding: ` ${theme.spacing.lg}`,
        padding:' 0 15px' , 

        fontSize: theme.fontSizes.sm,
        marginRight: theme.spacing.md,
        fontWeight: 500,
        height: '44px',
        lineHeight: '44px',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
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
}));

const mainLinksMockdata = [
    { icon: IconHome2, label: 'Home' },
    { icon: IconGauge, label: 'Dashboard' },
    { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
    { icon: IconCalendarStats, label: 'Releases' },
    { icon: IconUser, label: 'Account' },
    { icon: IconFingerprint, label: 'Security' },
    { icon: IconSettings, label: 'Settings' },
];

const linksMockdata = [
    'profile',
    'Settings',
    'Dashboard',
    'Releases',
    'Account',
    'Orders',

];

export function SideBarStudent() {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Releases');
    const [activeLink, setActiveLink] = useState('Settings');

    const mainLinks = mainLinksMockdata.map((link) => (
        <Tooltip
            label={link.label}
            position="right"
            withArrow
            transitionProps={{ duration: 0 }}
            key={link.label}
        >
            <UnstyledButton
                onClick={() => setActive(link.label)}
                className={cx(classes.mainLink, { [classes.mainLinkActive]: link.label === active })}
            >
                <link.icon size="1.4rem" stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    ));

    const links = linksMockdata.map((link) => (
        <Link
            className={cx(classes.link, { [classes.linkActive]: activeLink === link })}
            to={`${link}`}
            // onClick={(event) => {
            //     event.preventDefault();
            //     setActiveLink(link);
            // }}
            key={link}
        >
            {link}
        </Link>
    ));

    return (
        <Navbar height={750} width={{ sm: 260 }} className={classes.Parentnavbar}  >
            <Navbar.Section grow className={classes.wrapper}>
                <div className={classes.aside}>
                    <div className={classes.logo}>
                        {/* <MantineLogo type="mark" size={30} /> */}
                    </div>
                    {mainLinks}
                    </div> 
                <div className={classes.mainLinks}>
                    <Title order={4} className={classes.title}>
                        {active}
                    </Title>
                    {links}
                </div>
            </Navbar.Section>
        </Navbar>
    );
}