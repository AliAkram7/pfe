import { useEffect, useMemo, useState } from 'react';
import {
    createStyles,
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Badge,
    Spoiler,
    LoadingOverlay,
    HoverCard,
    Highlight,
} from '@mantine/core';
import { keys } from '@mantine/utils';


import TeamOption from './teamsOptions';

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
            return b[sortBy].localeCompare(a[sortBy]);
        }
        return a[sortBy].localeCompare(b[sortBy]);
    }),
        payload.search
    );
}
export function TeamsFollowUpCrud(props) {



    // *  -------------------------- fetch Students data ----------------------------------------------------------- *
    // const { data: fetchListTeams } = userFetchListTeams()
    // *  ------------------------------------------------------------------------------------------------------------------ *

    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState();
    const [contextSet, setContextSet] = useState(false)



    let data = [{}]; //* list of theme

    const mapData = () => {
        return fetchListTeams?.data.map((obj) => ({

            supervisor_info: {
                name: obj.supervisor_info?.name,
                institutional_email: obj.supervisor_info?.institutional_email,
                grad_abName: obj.supervisor_info?.abbreviated_name,
                grad_fName: obj.supervisor_info?.fullname,
            },
            member_1: {
                name: obj.member_1?.name,
                code: obj.member_1?.code,
            },
            member_2: {
                name: obj.member_2?.name,
                code: obj.member_2?.code,
            },

            list_theme: obj.list_theme,

            theme_workOn: obj.theme_workOn

        }));
    };
    const memoizedData = useMemo(() => {
        return mapData();
    }, [fetchListTeams?.data]);





    useEffect(() => {
        setSortedData(memoizedData);
    }, [memoizedData]);



    const [sortBy, setSortBy] = useState(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const classes = useStyles()

    const rows = sortedData?.map((row) => {
        const k = Math.random();
        return (<>

            <tr key={k}>
                <td><TeamOption row={row} /></td>

                <td>
                    <HoverCard width={300} shadow="md">
                        <HoverCard.Target>
                            <Text>
                                {row.member_1.name}, {row.member_2.name}
                            </Text>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Text > <Highlight color='teal'>  student : </Highlight>
                                {row.member_1?.name} <Highlight color='teal'>  with code : </Highlight>  {row.member_1?.code}
                            </Text>
                            {row.member_2.name != null && row.member_2.name != undefined ? (<Text  > <Highlight color='teal'>  student : </Highlight> {row.member_2?.name}  <Highlight color='teal'>  with code : </Highlight> {row.member_2?.code} </Text>) : null}
                        </HoverCard.Dropdown>
                    </HoverCard>
                </td>


                <td>

                    <HoverCard width={280} shadow="md">
                        <HoverCard.Target>
                            {/* <Spoiler maxHeight={60} showLabel="Show more" hideLabel="Hide" onClick={() => (showMore(row))}   > */}
                            {row.supervisor_info?.name ? (<Text>
                                {row.supervisor_info?.name}
                            </Text>) :
                                <Badge color='red'   >without</Badge>}
                            {/* </Spoiler> */}
                        </HoverCard.Target>
                        {row.supervisor_info.name ? (
                            <HoverCard.Dropdown>
                                <><Text display='flex' >
                                    <Highlight color='teal'  >teacher :  </Highlight>
                                    {row.supervisor_info?.name}</Text>
                                    <Text display='flex' >
                                        <Highlight color='teal'  >email : </Highlight>
                                        {row.supervisor_info?.institutional_email}
                                    </Text>
                                    <Text display='flex' >
                                        <Highlight color='teal' >Grade : </Highlight>
                                        {row.supervisor_info?.grad_abName}
                                    </Text>
                                </>
                            </HoverCard.Dropdown>
                        ) : null
                        }
                    </HoverCard>
                </td>

                {/* //!! themes */}
                {/* list_theme: obj.list_theme.map((theme) => {
                theme = {
                    id: theme?.id,
                    title: theme?.title,
                    description: theme?.description,
                }
            }) */}
                <td>
                    <HoverCard width={280} shadow="md">
                        <HoverCard.Target>
                            <Spoiler maxHeight={40} showLabel="Show more" hideLabel="Hide"   >
                                <Text>
                                    {/* { row.list_theme ?  */}
                                    {row.list_theme?.map((theme, idx) => {
                                        return (<><Text display='flex' >
                                            <Highlight color='green' >{idx + 1}</Highlight> - {theme?.title}
                                        </Text><br /> </>)
                                    })}

                                    {/* //  : <Badge color='red'   >without</Badge> } */}
                                </Text>
                            </Spoiler>
                        </HoverCard.Target>

                    </HoverCard>
                </td>
                <td>
                    <HoverCard width={280} shadow="md">
                        <HoverCard.Target>
                            <Text>{row.theme_workOn?.title.length > 30 ? row.theme_workOn?.title.slice(0, 30) + "..." : row.theme_workOn?.title}</Text>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            {row.theme_workOn?.title}
                        </HoverCard.Dropdown>
                    </HoverCard>
                </td>

            </tr>
        </>
        )
    }
    );
    return (
        <>

            {/* <Modal opened={description_content} onClose={hide} size='xl'    >
                <SimpleGrid  >
                    <ThemeDescriptionContent row={theme_description} />
                </SimpleGrid>
            </Modal> */}
            <ScrollArea scrollbarSize={1} >
                {/* <TextInput
                    placeholder="Search by any field"
                    mb="lg"
                    icon={<IconSearch size={14} stroke={1.5} />}
                    value={search}
                    variant='filled'
                    onChange={handleSearchChange}
                /> */}
                <Table
                    horizontalSpacing="xl"
                    verticalSpacing="xl"
                    sx={{ tableLayout: 'fixed', minWidth: 1000, maxWidth: 1600, minHeight: 260 }}
                ><thead>
                        <LoadingOverlay visible={props.publishLoading} />
                        <tr><Th
                            children='members'
                        /><Th
                                children='teacher supervisor'
                            /><Th
                                children='list of choice'
                            />
                            <Th
                                children='theme work on'
                            />
                        </tr>
                    </thead>
                    <tbody>
                        {rows?.length > 0 ? (
                            rows
                        ) : (
                            <tr>
                                <td >
                                    <Text weight={500} align="center"  >
                                        Nothing found
                                    </Text>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </ScrollArea>
        </>)

}