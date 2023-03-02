import { createStyles, Container, Title, Text, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
const useStyles = createStyles((theme) => ({
  content: {
    paddingTop: 220,
    position: 'relative',
    zIndex: 1,

    [theme.fn.smallerThan('sm')]: {
      paddingTop: 120,
    },
  },

  title: {
    // fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 540,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

function PageNotFound() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text color="dimmed" size="lg" align="center" className={classes.description}>
            Page you are trying to open page does not exist. You may have mistyped the address, or the
            page has been moved to another URL.
          </Text>
          <Group position="center">
            <Link to='/' > go back   </Link>
          </Group>
        </div>
      </div>
    </Container>
  );
}
export default PageNotFound ; 