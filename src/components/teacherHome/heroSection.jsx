import {
    createStyles,
    Container,
    Title,
    Text,
    Button
} from '@mantine/core';
import  TeacherHomeDescription  from './HomeDescription';
import heroImg from '../../imges/dep1.jpg'

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: '#11284b',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `linear-gradient(230deg, rgba(130, 201, 30, 0) 0%, #181a25 100%), url(${heroImg})`,
        paddingTop: theme.spacing.xl * 3,
        paddingBottom: theme.spacing.xl * 3,
        width: '100%',
        height: '91vh'
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
            marginRight: 0
        },
    },

    title: {
        color: theme.white,
        fontFamily: `Greycliff CF, ${theme.fontFamily
            }`,
        fontWeight: 900,
        lineHeight: 1.05,
        maxWidth: 500,
        fontSize: 48,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            fontSize: 34,
            lineHeight: 1.15
        }
    },

    description: {
        color: theme.white,
        opacity: 0.75,
        maxWidth: 500,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%'
        }
    },

    control: {
        paddingLeft: 50,
        paddingRight: 50,
        fontSize: 22,

        [theme.fn.smallerThan('md')]: {
            width: '100%'
        }
    }
}));

function TeacherHeroSection() {
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
                                    mt={30}>
                                    The final study project is a crucial part of your academic journey and has the potential to shape your future. Our theme chooser platform is designed to help you find a theme that aligns with your goals and interests. With a comprehensive collection of themes and the ability to connect with other students, you can ensure that your project reflects your best work and showcases your skills. Take control of your future now.
                                </Text>

                            </div>
                        </div>
                    </Container>
                </div>
                <TeacherHomeDescription />
            </>

    );
}

export default TeacherHeroSection;
