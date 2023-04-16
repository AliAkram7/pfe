import {
    createStyles,
    Container,
    Title,
    Text,
    Button,
    Flex
} from '@mantine/core';
import HomeDescription from './HomeDescription';
import heroImg from '../../imges/dep1.jpg'
import { useStateContext } from '../../contexts/ContextProvider';
import { Navigate } from 'react-router';
const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: '#11284b',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `linear-gradient(230deg, rgba(130, 201, 30, 0) 0%, #181a25 100%), url(${heroImg})`,
        paddingTop: theme.spacing.xl * 3,
        paddingBottom: theme.spacing.xl * 3,
        width: '100%',
        height: '80vh',
        [theme.fn.smallerThan('md')]: {
            height: '60vh',
        },
        [theme.fn.smallerThan('sm')]: {
            height: '50vh',
        },
        [theme.fn.smallerThan('xs')]: {
        paddingTop: theme.spacing.xl * 1,
            height: '60vh',
        },
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.fn.smallerThan('md')]: {
            flexDirection: 'column'
        }
    },

    image: {
        [theme.fn.smallerThan('md')]: {
            display: 'none'
        }
    },

    content: {

        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,
        marginRight: theme.spacing.xl * 3,
        [theme.fn.smallerThan('md')]: {
            // marginRight: 0
            marginLeft: theme.spacing.xl * 1,
            paddingTop: theme.spacing.xs,
            // marginTop: theme.spacing.xs ,
            // marginBottom: theme.spacing.xl *2,
        marginRight: theme.spacing.xl * 1,

        },

        // [theme.fn.smallerThan('md')]: {
        //     // height: '60vh',
        // },
        // [theme.fn.smallerThan('sm')]: {
        //     // height: '50vh',
        // },

    },

    title: {
        color: theme.white,

        fontFamily: `Greycliff CF, ${theme.fontFamily
            }`,

        fontWeight: 300,
        lineHeight: 1.05,
        maxWidth: 500,
        fontSize: 48,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            fontSize: 34,
            lineHeight: 1.15
        },
        [theme.fn.smallerThan('sm')]: {
            fontSize: 30
        },
        [theme.fn.smallerThan('xs')]: {
            fontSize: 20
        },
    },

    description: {
        color: theme.white,
        opacity: 0.75,
        maxWidth: 500,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%'
        },

        [theme.fn.smallerThan('sm')]: {
            fontSize: '10px' , 
            maxWidth: 600,

        },
        [theme.fn.smallerThan('xs')]: {
            fontSize: '10px' , 
        }

    },

    control: {
        paddingLeft: 50,
        paddingRight: 50,
        // fontFamily: `Greycliff CF, ${
        //     theme.fontFamily
        // }`,
        fontSize: 22,

        [theme.fn.smallerThan('md')]: {
            width: '100%'
        }
    }
}));

export function HeroSection() {
    const { classes } = useStyles();


    return (


        <>
            <div className={
                classes.root
            }>
                <Container size="lg">
                    <div className={
                        classes.inner
                    }>
                        <div className={
                            classes.content
                        }>
                            <Title className={
                                classes.title
                            }>
                                Empower Your Future in the
                                {" "}
                                <Text component="span" inherit variant="gradient"
                                    gradient={
                                        {
                                            from: 'goldenrod',
                                            to: 'gold'
                                        }
                                    }>
                                    Final Study Project
                                </Text>{" "}
                            </Title>
                            <Text className={
                                classes.description
                            }
                            >
                                The final study project is a crucial part of your academic journey and has the potential to shape your future. Our theme chooser platform is designed to help you find a theme that aligns with your goals and interests. With a comprehensive collection of themes and the ability to connect with other students, you can ensure that your project reflects your best work and showcases your skills. Take control of your future now.
                            </Text>

                        </div>
                    </div>
                </Container>
            </div>
            <Flex direction={'column'} gap='sm' >
                <HomeDescription />
                {/* <HomeFooter /> */}
            </Flex>

        </>

    );
}

export default HeroSection;
