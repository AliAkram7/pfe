import { Fragment, useEffect, useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  TextInput,
  Badge,
  Input,
  Button,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSearch, IconLockOff, IconLockOpen } from '@tabler/icons';
import { useFetchStudentsData } from './connection/fetchData/fetchData';
import { useTeacherContext } from '../../contexts/teacherContext';
import StudentOption from './studentOptions';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
  searchField: {
    outline: 'green'
  }

}));



function Th(props) {
  const { classes } = useStyles();
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={props.onSort} className={classes.control}>
        <Group position="left">
          <Text weight={300} size="sm">
            {props.children}
          </Text>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data, search) {
  // const query = search.toLowerCase().trim();
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data,
  payload
) {
  const { sortBy } = payload;


  if (!sortBy) {

    return filterData(data, payload.search);

  }

  return filterData([...data].sort((a, b) => {
    if (payload.reversed) {
      // console.log(b[sortBy])
      return b[sortBy].localeCompare(a[sortBy]);
    }
    // console.log(a[sortBy])
    return a[sortBy].localeCompare(b[sortBy]);
  }),
    payload.search
  );
}
export function StudentsCrud() {


  // *  -------------------------- fetch Students data     ----------------------------------------- *
  const { selectedSpeciality } = useTeacherContext()
  const { data: fetchStudentsData } = useFetchStudentsData(selectedSpeciality?.id)
  // *  ------------------------------------------------------------------- *


  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState();
  const [contextSet, setContextSet] = useState(false)

  let data = [{}];

  useEffect(() => {
    data = data = fetchStudentsData?.data.list_accounts.map(obj => ({
      code: String(obj.code),
      name: String(obj.name),
      default_password: String(obj.default_password),
      logged: obj.logged == 0 ? 'not yet' : 'logged',
      logged_at: String(obj.logged_at),
      account_status: obj.account_status == 0 ? 'locked' : 'unlocked',
      Edit: 'false'

    }));
    setSortedData(data)

  }, [fetchStudentsData?.data?.list_accounts])



  if (fetchStudentsData && !contextSet) {


    data = fetchStudentsData?.data.list_accounts.map(obj => ({
      code: String(obj.code),
      name: String(obj.name),
      default_password: String(obj.default_password),
      logged: obj.logged == 0 ? 'not yet' : 'logged',
      logged_at: String(obj.logged_at),
      account_status: obj.account_status == 0 ? 'locked' : 'unlocked',
      Edit: 'false'
    }));


    setSortedData(data)
    setContextSet(true)
  }


  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const classes = useStyles()

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    data = fetchStudentsData?.data.list_accounts.map(obj => ({
      code: String(obj.code),
      name: String(obj.name),
      default_password: String(obj.default_password),
      logged: obj.logged == 0 ? 'not yet' : 'logged',
      logged_at: String(obj.logged_at),
      account_status: obj.account_status == 0 ? 'locked' : 'unlocked',
      Edit: 'false'
    }));
    console.log(data)
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };


  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    data = fetchStudentsData?.data.list_accounts.map(obj => ({
      code: String(obj.code),
      name: String(obj.name),
      default_password: String(obj.default_password),
      logged: obj.logged == 0 ? 'not yet' : 'logged',
      logged_at: String(obj.logged_at),
      account_status: obj.account_status == 0 ? 'locked' : 'unlocked',
      Edit: 'false'
    }));
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };


  

  function  RenderUpdateRow (props)  {


    const onUpdate =()=>{
      
    }

      const default_value = {name : props.row.name , code : props.row.code}
      const [code, setCode] = useState( props.row.code)
      const [name, setName] = useState( props.row.name)

    return (<>
      
      <td><Input type='text'   value={code} onChange={(e)=>{setCode(e.target.value) }}     ></Input >
      <Button value='save' variant='outline' color='teal'  onClick={()=>{setCode(default_value.code)}}   >reset code</Button>
      </td>
      <td><Input type='text'  value={name}  onChange={(e)=>{setName(e.target.value)  }} ></Input>
        <Button value='save' variant='outline' color='teal' onClick={()=>{setName(default_value.name) }}   >reset name</Button>
        <Button value='save' variant='filled' color='teal'   onClick={onUpdate}      >save</Button>
      </td>
    </>)
  }



  const rows = sortedData?.map((row) => {
    const k = Math.random();

    const setEdit = () => {
      row.Edit = 'true'
    }

    return (
      <tr key={k}>



        <td><StudentOption row={row} setEdit={setEdit} /></td>
        {row.Edit === 'false' ?
          (<>
            <td>{row.code}</td>
            <td>{row.name}</td>
          </>) :
          <RenderUpdateRow  row={row}  />}

        <td>{row.email}</td>
        <td>{row.tel}</td>
        <td>{row.default_password}</td>
        <td>{row.logged === 'logged' ? <Badge variant="filled" color='teal' fullWidth>
          logged
        </Badge> : <Badge variant="filled" color='red' fullWidth>
          not yet
        </Badge>}</td>
        <td>{row.logged_at !== 'null' ? row.logged_at : <Badge variant="outline" color='red' fullWidth>
          not yet
        </Badge>}</td>
        <td>{row.account_status === 'locked' ? <IconLockOff color='red' /> : <IconLockOpen color='green' />}</td>
      </tr>)
  }
  );



  return (
    !selectedSpeciality ? <p>loading...</p> :
      (<>
        <ScrollArea>
          <TextInput
            placeholder="Search by any field"
            mb="lg"
            icon={<IconSearch size={14} stroke={1.5} />}
            value={search}
            variant='unstyled'
            onChange={handleSearchChange}
          />
          <Table
            horizontalSpacing="xs"
            verticalSpacing="lg"
            sx={{ tableLayout: 'revert', minWidth: 1200, maxWidth:1600 ,   minHeight: 260 }}

          >
            <thead>
              <tr>
                <Th /><Th sorted={sortBy === 'code'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('code')}
                  children='Code'
                /><Th sorted={sortBy === 'name'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('name')}
                  children='Name'
                /><Th sorted={sortBy === 'email'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('email')}
                  children='Email'
                /><Th sorted={sortBy === 'tel'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('tel')}
                  children='Phone number'
                /><Th sorted={sortBy === 'default_password'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('default_password')}
                  children='Default password'
                /><Th sorted={sortBy === 'logged'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('logged')}
                  children='Logged'
                /><Th sorted={sortBy === 'logged_at'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('logged_at')}
                  children='Logged at'
                /><Th sorted={sortBy === 'account_status'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('account_status')}
                  children='Account status'
                />
              </tr>
            </thead>
            <tbody>
              {rows?.length > 0 ? (
                rows
              ) : (
                <tr>
                  <td >
                    <Text weight={500} align="center">
                      Nothing found
                    </Text>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </ScrollArea>
      </>)
  );
}