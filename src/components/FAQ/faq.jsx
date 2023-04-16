import { Container, Title, Accordion, createStyles } from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    minHeight: 650,
  },

  title: {
    marginBottom: theme.spacing.xl * 1.5,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,

    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const placeholder =
  "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.";

export function Faq() {
  const { classes } = useStyles();
  return (
    <Container size='sm' className={classes.wrapper}>
      <Title align='center' className={classes.title}>
        help
      </Title>

      <Accordion variant='separated'>
        <Accordion.Item className={classes.item} value='reset-password'>
          <Accordion.Control>How can I reset my password?</Accordion.Control>
          <Accordion.Panel>
            yes ! , you can go for <Link to='/student/profile'  >my profile</Link> &gt;   change information  and rest
            your password, make sure that your password contain 8 character at
            at least a one number and one uppercase
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value='theme-info'>
          <Accordion.Control>
            How i can find more information about the theme?
          </Accordion.Control>
          <Accordion.Panel>
            once the page of dissertations is available you can see more
            information about all themes available and sort them according your
            choice
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item className={classes.item} value='partner-info'>
          <Accordion.Control>
            How i can i choose my partner and who can choose me as partner?
          </Accordion.Control>
          <Accordion.Panel>
            Once the partner invitation page is available, all students have a
            limited time to choose one partner, the partner should select each
            other to complete this task,all student have possibility of choose
            you as partner if you have no partner
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item className={classes.item} value='no-partner-info'>
          <Accordion.Control>
            What happens if I don't have a partner or I miss the time to invite
            my partner?
          </Accordion.Control>
          <Accordion.Panel>
            if you decline all invitations to become a partner or are running
            out of time try to contact the specialty manager
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default Faq;
