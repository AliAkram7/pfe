import React from "react";
import { Link } from "react-router-dom";
import "./profileFooter.css";

import { createStyles, Container, Group, ActionIcon, Text, Highlight, } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
import { nanoid } from "nanoid";
// import { MantineLogo } from '@mantine/ds';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: (40),
    borderTop: `${(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.dark[1]
      }`,

    backgroundColor: 'black',
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function ProfileFooter() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text display={'flex'} color={'white'}>© 2023  All rights reserved.  |<Link to='faq' ><Highlight color={'gold'} >help</Highlight></Link> </Text>
        {/* <MantineLogo size={28} /> */}

        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg" key={nanoid()}

          >
            <IconBrandTwitter  stroke={1.5}

            />
          </ActionIcon>
          <ActionIcon size="lg"

key={nanoid()}

          >
            <IconBrandYoutube  stroke={1.5}


            />
          </ActionIcon>
          <ActionIcon size="lg" key={nanoid()}>
            <IconBrandInstagram  stroke={1.5}


            />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}

// function ProfileFooter() {
//   return (
//     <footer>
//       <div className='copy-right'>
//         <h5> 	&#169; 2023 Université mascara | All rights reserved | <Link to="faq" >FAQ</Link>  </h5>
//       </div>
//     </footer>
//   );
// }

export default ProfileFooter;
