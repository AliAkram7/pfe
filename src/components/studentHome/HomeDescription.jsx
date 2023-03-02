import {
    createStyles,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
  } from '@mantine/core';
  import {   IconUserSearch,  IconCompass, IconPuzzle2 } from '@tabler/icons';
  
  const mockdata = [
    {
      title: 'Project Partner Finder',
      description:
        ' Connecting Students with Shared Goals',
      icon: IconCompass,
    },
    {
      title: 'The Theme Hub',
      description:
        'Finding the Perfect Fit for Your Final Study Project',
      icon: IconUserSearch,
    },
    {
      title: 'Study Squad',
      description:'Building Teams for Successful Final Projects',
      icon: IconPuzzle2,
    },

  ];
  
  const useStyles = createStyles((theme) => ({
    title: {
      fontSize: 34,
      fontWeight: 900,
      [theme.fn.smallerThan('sm')]: {
        fontSize: 24,
      },
    },
  
    description: {
      maxWidth: 600,
      margin: 'auto',
  
      '&::after': {
        content: '""',
        display: 'block',
        backgroundColor: '#21d121',
        width: 45,
        height: 2,
        marginTop: theme.spacing.sm,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
  
    card: {
      border: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
    },
  
    cardTitle: {
      '&::after': {
        content: '""',
        display: 'block',
        backgroundColor: '#21d121',
        width: 45,
        height: 2,
        marginTop: theme.spacing.sm,
      },
    },
  }));
  
  export    function HomeDescription() {
    const { classes, theme } = useStyles();
    const features = mockdata.map((feature) => (
      <Card key={feature.title} shadow="md" radius="md" className={classes.card} p="xl">
        <feature.icon size={50} stroke={2} color="#21d121" />
        <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
          {feature.title}
        </Text>
        <Text size="sm" color="dimmed" mt="sm">
          {feature.description}
        </Text>
      </Card>
    ));
    return (
  
      <Container size="lg" py="xl"    >

        <Title order={2} className={classes.title} align="center" mt="sm">
          this website provide student this functionality 
        </Title>
  
        <Text color="dimmed" className={classes.description} align="center" mt="md">

        </Text>
  
        <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          {features}
        </SimpleGrid>
      </Container>
  
    );
  }

  export default  HomeDescription ;