import { useEffect, useState } from 'react';
import { createStyles, Navbar, UnstyledButton, Tooltip, Title, ThemeIcon, Burger } from '@mantine/core';
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
    IconManualGearbox,
    IconListCheck,
    IconBrandTelegram,
    IconBulb,
    IconSchool,
    IconMilitaryRank,
    IconChartArrowsVertical,
} from '@tabler/icons';
import { Await, Link } from 'react-router-dom';
import { useStudentContext } from '../../../contexts/studentContext';
import { useDisclosure } from '@mantine/hooks';
import { useStateContext } from '../../../contexts/ContextProvider';
import { useTeacherContext } from '../../../contexts/teacherContext';
// import { MantineLogo } from '@mantine/ds';

const useStyles = createStyles((theme) => ({
    Parentnavbar: {
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
        paddingTop: '25px',
        height: '70px',
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








export function SideBarTeacher(props) {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Home');
    const [activeLink, setActiveLink] = useState('/student');


    //** ------------------------------------------------------------------------ teacher context ------------------------------------------------------------------------  */
    const { user, token, setRole } = useStateContext()
    const { teacher, isDepartmentManager, isInTeam , isSpecialtyManager} = useTeacherContext()
    //** ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------  */

    // const [opened, {toggle}] = useDisclosure(false);
    const mainLinksMockdata = [
        { item: <Burger opened={!props.opened} onClick={props.toggle} size={20} />, label: '' },
    ];

    
    let linksMockdata = [
        { label: 'home', icon: IconHome2 },
        {label : 'suggestion_theme', icon : IconBulb  }, 
        isDepartmentManager == 1 ? { label: 'students_management', icon: IconListCheck } : { label: '', icon: IconGauge },
        isInTeam ==true ? { label: 'teams-section', icon: IconPuzzle2 } : { label: '', icon: IconGauge },
        isSpecialtyManager == 1 ? { label: 'themes_management', icon: IconSchool } : { label: '', icon: IconGauge },
        isSpecialtyManager == 1 ? { label: 'rank_management', icon: IconChartArrowsVertical } : { label: '', icon: IconGauge },
    ]

    // debugger

    const mainLinks = mainLinksMockdata.map((link) => (

        <UnstyledButton
            // onClick={() => setActive(link.label)}
            className={cx(classes.mainLink, { [classes.mainLinkActive]: link.label === active })}
        >
            {/* <link.icon size="1.4rem" stroke={1.5} /> */}
            {link.item}
        </UnstyledButton>

    ));

    const links = linksMockdata.map((link) => (
        link.label !== '' ?
            <Link
                className={cx(classes.link, { [classes.linkActive]: activeLink === link.label })}
                to={link.label === 'home' ? '/teacher' : link.label}
                onClick={(event) => {
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
            : null
    ));

    return (

        <Navbar height={"100vh"} width={!props.opened ? { sm: 260 } : { sm: 0 }} className={classes.Parentnavbar}     >
            <Navbar.Section grow className={classes.wrapper}  >
                <div className={classes.aside}>
                    <div className={classes.logo}>
                        {/* <MantineLogo type="mark" size={30} /> */}
                    </div>
                    {mainLinks}
                </div>
                <div className={classes.mainLinks} style={props.opened ? { display: 'none' } : null}  >
                    <Title order={4} className={classes.title}>
                        {active}
                    </Title>
                    {links}
                </div>
            </Navbar.Section>
        </Navbar>
    );
}