import {
    createStyles,
    Header,
    Group,
    Button,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    Modal,
} from '@mantine/core';
import logo from "../../../imges/1668930505521.png";
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import LoginTo from '../../loginTo/loginTo';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan('sm')]: {
            height: 42,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },

    subLink: {
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        }),

        '&:active': theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: -theme.spacing.md,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
            }`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));



function HomeHeader() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    // const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { classes, theme } = useStyles();

  const [opened, setOpened] = useState(false);



    return (<>
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title='Introduce yourself!'
        >
            <LoginTo />
        </Modal>
        <Box >
            <Header height={85} px="xl">
                <Group position="apart" >

                    <div className='MainLogo-img'>
                        <img src={logo} alt='' />
                    </div>


                    <Group className={classes.hiddenMobile}>
                        <Button variant='light' color='green' size='lg' onClick={() => setOpened(true)}    >Log in</Button>
                        {/* <Button>Sign up</Button> */}
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
                </Group>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="80%"
                padding="xl"
                // title="Navigation"
                className={classes.hiddenDesktop}
                zIndex={1}
            >
                <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />



                    <Group position="left" grow pb="xl" px="md">
                        <Button variant='light' color='green' size='lg'  onClick={() => setOpened(true)}  > Log in    </Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    </>
    );
}

export default HomeHeader; 