
import { useEffect, useMemo, useState } from 'react';
import {
    createStyles,
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,

    Spoiler,

    LoadingOverlay,
    HoverCard,
    Highlight,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSearch } from '@tabler/icons';



import { useQueryClient } from 'react-query';
// import { userFetchListTheme } from './connetion/fetchData';
import { useDisclosure } from '@mantine/hooks';
import { useFetchAffectationResult } from './connection';
import { nanoid } from 'nanoid';

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
            <HoverCard width={300} shadow="md">
                <HoverCard.Target>
                    <UnstyledButton onClick={props.onSort} className={classes.control}>
                        <Group position="apart">
                            <Text weight={300} size="sm">
                                {props.children}
                            </Text>
                        </Group>
                    </UnstyledButton>
                </HoverCard.Target>
                {props.title ?
                    <HoverCard.Dropdown>
                        <Text weight={300} size="sm">
                            {props.title}
                        </Text>

                    </HoverCard.Dropdown> : null}
            </HoverCard>
        </th>
    );
}


export function ResultTable(props) {



    // *  -------------------------- fetch Students data ----------------------------------------------------------- *
    const { data: fetchAffectationResult } = useFetchAffectationResult()
    // *  ------------------------------------------------------------------------------------------------------------------ *

    console.log(fetchAffectationResult?.data.not_sorted_list)

    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState();
    const [contextSet, setContextSet] = useState(false)



    let data = [{}]; //* list of theme

    const mapData = () => {
        return fetchAffectationResult?.data?.response.map((obj) => ({

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
    }, [fetchAffectationResult?.data]);





    useEffect(() => {
        setSortedData(memoizedData);
    }, [memoizedData]);



    const [sortBy, setSortBy] = useState(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const classes = useStyles()

    const rows = sortedData?.map((row) => {
        const k = nanoid();
        return (<>

            <tr key={k}>
                {/* <td><ThemeOption row={row} /></td> */}
                <td>
                    <HoverCard width={300} shadow="md">
                        <HoverCard.Target>
                            <Text>
                                {row.member_1.name} <br />
                                {row.member_2.name}
                            </Text>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Text > <Highlight color='teal'>  student : </Highlight>
                                {row.member_1?.name}
                            </Text>
                            {row.member_2.name != null && row.member_2.name != undefined ? (<Text  > <Highlight color='teal'>  student : </Highlight> {row.member_2?.name}</Text>) : null}
                        </HoverCard.Dropdown>
                    </HoverCard>
                </td>


                {row.list_theme?.map((theme, idx) => {

                    return (<td>
                        <HoverCard width={280} shadow="md">
                            <HoverCard.Target>
                                <Text display='flex' >
                                    <Highlight color='green' >{idx + 1}</Highlight>
                                </Text>
                            </HoverCard.Target>
                            {theme.title ?
                                <HoverCard.Dropdown>
                                    <Text weight={300} size="sm">
                                        {theme.title}
                                    </Text>
                                </HoverCard.Dropdown> : null}
                        </HoverCard>
                    </td>)
                })}
            </tr>
        </>
        )
    }
    );

    const columns = fetchAffectationResult?.data?.not_sorted_list.map((item, idx) => {

        return (<Th
            key={nanoid()}
            children={`${idx+1}`}
            title={item.title}
        />)
    })


    return (
        <>


            <ScrollArea scrollbarSize={1} >

                <Table
                    horizontalSpacing="xs"
                    verticalSpacing="xl"
                    sx={{ tableLayout: 'revert', minWidth: 1000, maxWidth: 1600, minHeight: 260 }}
                ><thead>
                        {/* <LoadingOverlay visible={props.publishLoading} /> */}
                        <tr><Th
                            children='team'
                        />
                            {columns}
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