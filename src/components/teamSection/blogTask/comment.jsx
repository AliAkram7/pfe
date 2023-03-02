import { createStyles, Text, Avatar, Group, TypographyStylesProvider, Paper } from '@mantine/core';
import { useEffect, useMemo, useRef, useState } from 'react';

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
    minHeight:'100px',
    margin:'16px auto',
    // maxWidth:'100%'
  },

  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.xs,
    fontSize: theme.fontSizes.sm,
  },
}));


export   function Comment(props) {



  const [timeElapsed, setTimeElapsed] = useState('');

  useEffect(() => {
    let date1 = new Date(props.sendDate);
    let date2 = new Date();
    let diff = date2 - date1;
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      setTimeElapsed(`${days} day(s) ago`);
    } else if (hours > 0) {
      setTimeElapsed(`${hours} hour(s) ago`);
    } else if (minutes > 0) {
      setTimeElapsed(`${minutes} minute(s) ago`);
    } else {
      setTimeElapsed('Just now');
    }
  }, []);

   


  const { classes } = useStyles();
  return (
    <Paper withBorder    radius="md"   className={classes.comment}>
      <Group>
        <Avatar   radius="xl" />
        <div>
          <Text size="sm">{props.name}</Text>
          <Text size="xs" color="dimmed">

          {timeElapsed ? timeElapsed : 'time ago' }

          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        {props.body}
      </TypographyStylesProvider>
    </Paper>
  );
}


export default Comment ; 