import {
    createStyles,
    Container,
    Title,
    Text,
    Button,
    SimpleGrid,
    Group,
    Flex
} from '@mantine/core';
import HomeSectionDescription from './HomeSectionDescription';
import heroImg from '../../../imges/dep1.jpg'
import HomeFooter from '../../footers/homeFooter/homeFooter';
const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: '#11284b',
        backgroundSize: 'center',
        backgroundPosition: 'center',
        backgroundImage: `linear-gradient(230deg, rgba(130, 201, 30, 0) 0%, #181a25 100%), url(${heroImg})`,
        paddingTop: theme.spacing.xl * 3,
        paddingBottom: theme.spacing.xl * 3,
        width: '100%',
        height: '88vh',
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
        // fontFamily: `Greycliff CF, ${
        //     theme.fontFamily
        // }`,
        fontSize: 22,

        [theme.fn.smallerThan('md')]: {
            width: '100%'
        }
    }, 


}));

export function HomeHeroSection() {
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
                                  Faculty of Exact Sciences 
                                {" "}
                                <Text component="span" inherit variant="gradient"
                                    gradient={
                                        {
                                            from: 'goldenrod',
                                            to: 'gold'
                                        }
                                }
                            
                         >
                                  Final Study Project platform
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
            <Flex direction={'column'} gap='sm' >
                <HomeSectionDescription />
                <HomeFooter />
            </Flex>
        </>
    );
}

export default HomeHeroSection;
