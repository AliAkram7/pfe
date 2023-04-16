import { createStyles, Container, Title, Text, Group, List, ThemeIcon } from "@mantine/core";
import { IconCheck, IconCircle } from "@tabler/icons";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
const useStyles = createStyles((theme) => ({
  content: {
    paddingTop: 20,
    position: "relative",
    zIndex: 1,

    [theme.fn.smallerThan("sm")]: {
      paddingTop: 20,
    },
  },

  title: {
    // fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 600,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 540,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

function PageDissertationClosed(props) {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            final list of choice
          </Title>
          <Text
            color='dimmed'
            size='lg'
            align='center'
            className={classes.description}
          >

<div className="conformation-form">
                {/* <h3>are you sure you want the list :
                </h3> */}

                <div className="final-list">
                    <List size={20} > {
                    
                        props?.data?.map((item, idx) => {
                            return <>
                            <List.Item
                            icon={
                                // <ThemeIcon  size={24} radius="xl">
                                  <IconCircle size="1rem" />
                                // </ThemeIcon>
                              }
                                key={nanoid()}
                            >
                                <span> {
                                    idx + 1
                                } </span>
                                - {
                                // item.id
                            } {
                                item.title ? item.title : item.label
                            } </List.Item> <br /> </>
                            

                    })
                    
                    }   </List>
                </div>
                </div>

            {/* this section is closed good luck */}
          </Text>
          <Group position='center'>
            {/* <Link to='/'> go back </Link> */}
          </Group>
        </div>
      </div>
    </Container>
  );
}
export default PageDissertationClosed;