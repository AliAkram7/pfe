import { Fragment, useEffect, useRef, useState } from 'react';
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
  Select,
  HoverCard,
  Flex,
  MultiSelect,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSearch, IconLockOff, IconLockOpen } from '@tabler/icons';
import { useAdminFetchRolesData, useAdminFetchTeachersData, useFetchResearchFocus } from './connection/fetchData/fetchData';

import { useUpdateTeacher } from './connection/sendData/sendData';
import { useQueryClient } from 'react-query';
import { useAdminContext } from '../../contexts/adminContext';
import { nanoid } from 'nanoid';
import Option from './options';
import { useAdminFetchGradesData } from './connection/fetchData/fetchData';
import { useForm } from '@mantine/form';

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
export function TeacherCrud() {


  // *  -------------------------- fetch Students data     ----------------------------------------- *
  const { selectedSpeciality } = useAdminContext()
  const { data: fetchTeachersData, isLoading } = useAdminFetchTeachersData()
  // *  ---------------------------------------------------------------------------------------------------- *


  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState();
  const [contextSet, setContextSet] = useState(false)



  let data = [{}];

  useEffect(() => {
    data = data = fetchTeachersData?.data.list_accounts.map(obj => ({
      code: String(obj.code),
      name: String(obj.name),
      institutional_email: String(obj.institutional_email),
      department_name: String(obj.department_name),
      specialty_name: String(obj.specialty_name),
      abbreviated_name: String(obj.abbreviated_name),
      logged: obj.logged == 0 ? 'not yet' : 'logged',
      logged_at: String(obj.logged_at),
      account_status: obj.account_status == 0 ? 'locked' : 'unlocked',
      Axes_and_themes_of_recherche: obj.Axes_and_themes_of_recherche ? JSON.parse(obj.Axes_and_themes_of_recherche) : [],
      Edit: 'false'
    }));
    setSortedData(data)

  }, [fetchTeachersData?.data?.list_accounts])

  // "code": "987654321",
  //           "name": "mahi faiza",
  //           "institutional_email": "soulimanali2323@gmail.com",
  //           "account_status": 1,
  //           "logged": 0,
  //           "logged_at": "2023-03-28",
  //           "grade": 3,
  //           "id_department": null,
  //           "department_name": null,
  //           "specialty_id": null,
  //           "specialty_name": null,
  //           "gradeName": "Maitre de conférence classe B",
  //           "abbreviated_name": "MCB"

  if (fetchTeachersData && !contextSet) {


    data = fetchTeachersData?.data.list_accounts.map(obj => ({

      code: String(obj.code),
      name: String(obj.name),
      institutional_email: String(obj.institutional_email),
      department_name: String(obj.department_name),
      specialty_name: String(obj.specialty_name),
      abbreviated_name: String(obj.abbreviated_name),
      logged: obj.logged == 0 ? 'not yet' : 'logged',
      logged_at: String(obj.logged_at),
      account_status: obj.account_status == 0 ? 'locked' : 'unlocked',
      Axes_and_themes_of_recherche: obj.Axes_and_themes_of_recherche ? JSON.parse(obj.Axes_and_themes_of_recherche) : [],

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
    data = fetchTeachersData?.data.list_accounts.map(obj => ({
      code: String(obj.code),
      name: String(obj.name),
      institutional_email: String(obj.institutional_email),
      department_name: String(obj.department_name),
      specialty_name: String(obj.specialty_name),
      abbreviated_name: String(obj.abbreviated_name),
      logged: obj.logged == 0 ? 'not yet' : 'logged',
      logged_at: String(obj.logged_at),
      account_status: obj.account_status == 0 ? 'locked' : 'unlocked',
      Axes_and_themes_of_recherche: obj.Axes_and_themes_of_recherche ? JSON.parse(obj.Axes_and_themes_of_recherche) : [],

      Edit: 'false'
    }));
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };


  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);

    data = fetchTeachersData?.data.list_accounts.map(obj => ({
      code: String(obj.code),
      name: String(obj.name),
      institutional_email: String(obj.institutional_email),
      department_name: String(obj.department_name),
      specialty_name: String(obj.specialty_name),
      abbreviated_name: String(obj.abbreviated_name),
      logged: obj.logged == 0 ? 'not yet' : 'logged',
      logged_at: String(obj.logged_at),
      account_status: obj.account_status == 0 ? 'locked' : 'unlocked',
      Axes_and_themes_of_recherche: obj.Axes_and_themes_of_recherche ? JSON.parse(obj.Axes_and_themes_of_recherche) : [],
      Edit: 'false'
    }));

    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };




  function RenderUpdateRow(props) {

    const [name, setName] = useState(props.row.name)
    const [code, setCode] = useState(props.row.code)
    const [institutional_email, setInstitutional_email] = useState(props.row.institutional_email)
    const [SGrade, setSGrade] = useState([])
    const [SRole, setSRole] = useState([])
    const [SSearchFoci, setSSearchFoci] = useState([])
    const default_value = { name: props.row.name, code: props.row.code, institutional_email: props.row.institutional_email }
    const { mutate: updateTeacher } = useUpdateTeacher()
    const queryClient = useQueryClient();
    const { data: grades, isFetched } = useAdminFetchGradesData()
    const { data: roles, isFetched: rolesIsFetched } = useAdminFetchRolesData()
    const { data: researchFoci, isFetched: researchFociIsFetched } = useFetchResearchFocus()

    const handleSGradeChange = (value) => {
      setSGrade(value);
    };

    const handleSSearchFociChange = (value) => {
      setSSearchFoci(value);
    };

    const handleSRoleChange = (value) => {
      setSRole(value);
    }



    const onUpdate = () => {
      let payload = {}

      props.row.Edit = 'false'

      if (name !== props.row.name) {
        payload = { ...payload, name: name }
      }
      if (code !== props.row.code) {
        payload = { ...payload, updated_code: Number(code) }
      }
      if (institutional_email !== props.row.institutional_email) {
        payload = { ...payload, institutional_email: institutional_email }
      }
      if (SGrade[0] != null) {
        payload = { ...payload, sGrade: SGrade[0] }
      }


      if (SSearchFoci.length > 0) {
        payload = { ...payload, SSearchFoci: SSearchFoci }
      }


      if (SRole[0] != null) {
        payload = { ...payload, sRole: { id: SRole[0].charAt(0), type: SRole[0].charAt(1) } }
      }


      if (payload.name || payload.updated_code || payload.institutional_email || payload.sGrade || payload.sRole || payload.SSearchFoci.length > 0) {
        payload = { ...payload, code: Number(props.row.code) }

        console.log(payload)

        updateTeacher(payload)
      }

      queryClient.invalidateQueries('fetchTeachersData')

    }

    return (<>
      <td><TextInput type='text' value={code} onChange={(e) => { setCode(e.target.value) }}     ></TextInput >
        <Button value='save' variant='outline' color='teal' my={5} onClick={() => { setCode(default_value.code) }}   >reset</Button>
      </td>
      <td><TextInput type='text' value={name} onChange={(e) => { setName(e.target.value) }} ></TextInput>
        <Button value='save' variant='outline' my={5} color='teal' onClick={() => { setName(default_value.name) }}   >reset</Button>
      </td>
      <td><TextInput type='text' value={institutional_email} onChange={(e) => { setInstitutional_email(e.target.value) }} ></TextInput>
        <Flex justify={'space-between'} my={5} >
          <Button value='save' variant='outline' color='teal' onClick={() => { setInstitutional_email(default_value.institutional_email) }}  >reset</Button>
          <Button value='save' variant='filled' color='teal' onClick={onUpdate}>save</Button>
        </Flex>
      </td>
      <td> {isFetched ? <MultiSelect mb={46}
        searchable
        data={grades?.data}
        placeholder={props.row.abbreviated_name}
        onChange={handleSGradeChange}
        maxSelectedValues={1}
        zIndex={3000}

      /> : null
      }</td>
      <td>      {rolesIsFetched ? <MultiSelect mb={46}
        data={roles?.data}
        // dropdownPosition={'flip'}
        searchable
        maxSelectedValues={1}
        onChange={handleSRoleChange}
        placeholder={props.row?.department_name != 'null' ?
          props.row?.department_name :
          props.row?.specialty_name != 'null'
            ? props.row?.specialty_name
            : null}
      /> : null
      }</td>
      <td> {researchFociIsFetched ? <MultiSelect mb={46}
        searchable
        data={researchFoci?.data}

        onChange={handleSSearchFociChange}
        // maxSelectedValues={1}
        zIndex={3000}

      /> : null
      }</td>


    </>)
  }



  const rows = sortedData?.map((row) => {
    const k = nanoid();

    const setEdit = () => {
      row.Edit = 'true'
    }

    return (
      <tr key={k}>



        <td><Option row={row} setEdit={setEdit} /></td>
        {row.Edit === 'false' ?
          (<>
            <td>{row.code}</td>
            <td>{row.name}</td>
            <td>{row.institutional_email}</td>
            <td><Badge>{row.abbreviated_name}</Badge>  </td>
            <td>

              {row?.department_name != 'null' ?
                <HoverCard>
                  <HoverCard.Target>
                    <Badge color='violet'> department manager  </Badge>
                  </HoverCard.Target>
                  <HoverCard.Dropdown >
                    <Text size={15} >
                      {row?.department_name}
                    </Text>
                  </HoverCard.Dropdown>
                </HoverCard>
                :
                row?.specialty_name != 'null' ?
                  <HoverCard>
                    <HoverCard.Target>
                      <Badge color='blue'> specialty manager  </Badge>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                      <Text size={15} >
                        {row?.specialty_name}
                      </Text>
                    </HoverCard.Dropdown>
                  </HoverCard>
                  : <Badge color='yellow' > no role </Badge>}
            </td>
            <td>

              {row.Axes_and_themes_of_recherche.length > 0 ?
                row.Axes_and_themes_of_recherche.map((item) => {
                  return <Badge key={nanoid()} >{item.label}</Badge>

                }) : <Badge key={nanoid()}  >no information</Badge>
              }
            </td>


          </>) :
          <RenderUpdateRow row={row} />}

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
    isLoading ? <p>loading...</p> :
      (<>
        <ScrollArea scrollbarSize={0} striped >
          {/* <TextInput
            placeholder="Search by any field"
            mb="lg"
            icon={<IconSearch size={14} stroke={1.5} />}
            value={search}
            variant='default'
            onChange={handleSearchChange}
          /> */}
          <Table
            // withColumnBorders={true}

            horizontalSpacing="lg"
            verticalSpacing="lg"
            sx={{ tableLayout: 'revert', minWidth: 1700, maxWidth: 2000, minHeight: 260, zIndex: '1' }}

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
                /><Th sorted={sortBy === 'institutional_email'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('institutional_email')}
                  children='institutional email'
                /><Th sorted={sortBy === 'abbreviated_name'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('abbreviated_name')}
                  children='grade'
                /><Th sorted={sortBy === 'role'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('role')}
                  children='role'
                /><Th
                  // sorted={sortBy === 'Research_axes_and_themes'}
                  // reversed={reverseSortDirection}
                  // onSort={() => setSorting('Research_axes_and_themes')}
                  children='Research axes and themes'
                /><Th sorted={sortBy === 'logged_at'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('logged_at')}
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