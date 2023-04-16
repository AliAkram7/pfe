import React from "react";
// import './homeFooter.css'
import mapimg from '../../../imges/Screenshot_20221126_202006.png'
import univImg from '../../../imges/univPic.png'
import { IconBrandFacebook, IconBrandGoogleDrive, IconBrandLinkedin, IconLayersLinked } from "@tabler/icons";
import { createStyles, Text, Container, ActionIcon, Group, Image, Divider, SimpleGrid, Title, Highlight } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
import univPic from "../../../imges/univPic.png"
import univMap from "../../../imges/Screenshot_20221126_202006.png"
import { Link, useNavigate } from "react-router-dom";
// import { MantineLogo } from '@mantine/ds';

const useStyles = createStyles((theme) => ({
  footer: {
    // marginTop: ("19rem"),
    width: '100vw',
    height : '100%', 
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    // paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.dark[6],
    borderTop: `${(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.dark[6]
      }`,

    

  },

  logo: {
    // maxWidth: (200),

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

  },

  description: {
    marginTop: (5),

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    width: "100%",
    padding: '30px',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.dark[6],
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  groups: {
    display: 'flex',
    flexDirection: "column",
    flexWrap: 'wrap',
    width: '100%',
    gap: '10px',
    backgroundColor: "dark",
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  wrapper: {
    width: '100%',

  },

  link: {
    display: 'block',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: (3),
    paddingBottom: (3),

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  afterFooter: {

    display: 'flex',
    width : '100%' , 
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.dark[2],
    // marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xl,
    borderTop: `${(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
    },
  },
}));

// interface FooterLinksProps {
//   data: {
//     title: string;
//     links: { label: string; link: string }[];
//   }[];
// }

//   data: {
//     title: string;
//     links: { label: string; link: string }[];
//   }[];

 function HomeFooter() {
  const { classes } = useStyles();

  const navigate  = useNavigate() ; 


  return (
    <footer className={classes.footer}>

      <Container className={classes.inner} fluid >
          <SimpleGrid cols={2} spacing="xl"     >
            <div className={classes.groups}>
              <Image width={250} height={120} fit="cover" src={univPic} />
              <Image width={250} height={120} fit="cover" src={univMap} />
            </div>
            <SimpleGrid cols={1} spacing="xs"  >
              <Title order={4} color="white">mustapha  stambouli  university</Title>
              <Title order={4} color="white"><Highlight color='teal'>Faculty of Exact Sciences</Highlight></Title>
              <Title order={6} color='white'>Cheikh El Khaldi, Mascara 29000</Title>
              <Title order={6} color='white'  display='flex'  >
                Telephone : <Highlight color='teal'>045716689</Highlight>
              </Title>

              <Title order={6}><Highlight color='teal'>univ.mascara.dz</Highlight></Title>
            </SimpleGrid>
          </SimpleGrid>

      </Container>



      <Container className={classes.afterFooter}  fluid>
        <Text color="dark.6" size="xs">
          © 2023  All rights reserved.
        </Text>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg" color="dark.6" >
            <IconBrandFacebook   stroke={1.5}  />
          </ActionIcon>
          <ActionIcon size="lg" color="dark.6" >
            <IconBrandYoutube  stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="dark.6" >
            <IconBrandLinkedin  stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}

export default HomeFooter;
