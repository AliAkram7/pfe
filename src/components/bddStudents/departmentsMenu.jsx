import { useState } from 'react';
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
  Button,

} from '@mantine/core';
import { IconCalendarStats, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useAdminFetchYearScholar } from './connection/fetchData/fetchData';
import { IconPlus } from '@tabler/icons';
import { useAdminContext } from '../../contexts/adminContext';
import { useStateContext } from '../../contexts/ContextProvider';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: ("81px"),
    marginLeft: ('30px'),
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `${('1px')} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));

// interface LinksGroupProps {
//   icon: React.FC<any>;
//   label: string;
//   initiallyOpened?: boolean;
//   links?: { label: string; link: string }[];
// }


function Specialties({ icon: Icon, label, initiallyOpened, links, setSelectedSpecialty }) {


  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;

  const { setSelectedYearId, setSelectedYearString } = useStateContext()


  const items = (hasLinks ? links : []).map((link) => (
    <Button
      component="a"
      className={classes.link}
      key={link.label}
      onClick={() => { setSelectedYearId(link.value) ; setSelectedYearString(link.label) }}
      variant='light'
    >

      {link.label}


    </Button>
  ));

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size="1.1rem" />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size="1rem"
              stroke={1.5}
              style={{
                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}


export function DepartmentMenu({ icon: Icon, label, initiallyOpened, links, setSelectedSpecialty }) {


  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;


  const { data: yearScholar, isLoading: yearScholarIsLoading } = useAdminFetchYearScholar()


  const years = yearScholar?.data?.map((year) => {
    return {
      label: `${year.start_date} - ${year.end_date}`,
      value: year.id,
    }
  })

  const items = (hasLinks ? links : []).map((link) => (
    <Text
      component="a"
      className={classes.link}
      key={link.label}
      onClick={() => { setSelectedSpecialty(link.specialty) }}
    >

      {/* {link.label} */}
      {
        !yearScholarIsLoading ?
          <Specialties icon={IconPlus} initiallyOpened={false} setSelectedSpecialty={setSelectedSpecialty} label={link.label} links={years} />
          
          :
          null}

    </Text>
  ));

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size="1.1rem" />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size="1rem"
              stroke={1.5}
              style={{
                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

const mockdata = {
  label: 'Releases',
  icon: IconCalendarStats,
  links: [
    { label: 'Upcoming releases', link: '/' },
    { label: 'Previous releases', link: '/' },
    { label: 'Releases schedule', link: '/' },
  ],
};

export function NavbarLinksGroup() {
  return (
    <Box
      sx={(theme) => ({
        minHeight: ("220rem"),
        padding: theme.spacing.md,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
      })}
    >
      <LinksGroup {...mockdata} />
    </Box>
  );
}