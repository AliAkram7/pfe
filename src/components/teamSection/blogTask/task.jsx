import { Accordion, createStyles, List, ThemeIcon } from '@mantine/core'
import { IconHash, IconPaperclip } from '@tabler/icons';
import { nanoid } from 'nanoid';
import React from 'react'
import { Link } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';
import { useStudentContext } from '../../../contexts/studentContext';
import { useTeacherContext } from '../../../contexts/teacherContext';



const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    minHeight: 650,
  },

  title: {
    fontSize: '19px',
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    width: '100%',

    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
  },
  createrName: {
    // textAlign:'left'
    display: 'flex',
    justifyContent: "flex-end",
    font: 'caption'
  }
}));



function Task(props) {


  const { setRoomDiscription, setRoomName, setRoomId } = useStateContext();



  const gotoRoom = () => {
    setRoomName(props.title);
    setRoomDiscription(props.description);
    setRoomId(props.id);
  }

  const { classes } = useStyles();
  return (
    <Accordion.Item className={
      classes.item
    }
    
      value={nanoid()}
      >
      <Accordion.Control className={classes.title}    ><List
        spacing="xs"
        size="xl"
        center
        icon={
          <ThemeIcon color="teal" size={30} >
            <IconHash size={20} />
          </ThemeIcon>
        }
        className="team-section-nav"
      >
        <List.Item><Link to="/student/team-section/room" onClick={gotoRoom}  >{props.title}</Link></List.Item>

      </List></Accordion.Control>
      <Accordion.Panel>
        {props.description}
        <Accordion.Item  className={classes.createrName}>created by {props.creater} on {new Date(props.timeAgo).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
        })} </Accordion.Item>
      </Accordion.Panel>
    </Accordion.Item>
  )
}

export default Task
