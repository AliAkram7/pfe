import { useEffect, useMemo, useState } from 'react';
import {
    createStyles,
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    TextInput,
    Badge,

    Modal,
    SimpleGrid,
    LoadingOverlay,
    HoverCard,
    Button,

} from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSearch } from '@tabler/icons';

import { nanoid } from 'nanoid';

import { userFetchListTheme } from './connetion/fetchData';
import ThemeOption from './themeOptions';
import { useDisclosure } from '@mantine/hooks';
import { ThemeDescriptionContent } from './themeDescriptionContent';

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
            <UnstyledButton   className={classes.control}>
                <Group position="left">
                    <Text  key={nanoid()}  weight={300} size="sm">
                        {props.children}
                    </Text>
                </Group>
            </UnstyledButton>
        </th>
    );
}

export function ThemeCrud(props) {



    // *  -------------------------- fetch Students data ----------------------------------------------------------- *
    const { data: fetchListTheme } = userFetchListTheme()
    // *  ------------------------------------------------------------------------------------------------------------------ *

    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState();
    const [contextSet, setContextSet] = useState(false)



    let data = [{}]; //* list of theme
    let fullData  = [{}] ; 
    const mapData = () => {
        return fetchListTheme?.data.map((obj) => ({
            key: nanoid(),
            id: obj.id,
            title: String(obj.title),
            description: String(obj.description),
            objectives_of_the_project: obj.objectives_of_the_project,
            key_word: obj.key_word,
            work_plan: obj.work_plan,
            research_domain: String(obj.research_domain),
            status: String(obj.specialty_manager_validation),
            teacher: String(obj.name),
            send_at: new Date(obj.created_at).toLocaleDateString(
                "en-US",
                {
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                }
            ),
        }));
    };
    const memoizedData = useMemo(() => {
        return mapData();
    }, [fetchListTheme?.data]);

    useEffect(() => {
        setSortedData(memoizedData);
    }, [memoizedData]);


    const [sortBy, setSortBy] = useState(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const classes = useStyles()





    const rows = sortedData?.map((row) => {

        return (<>

            <tr key={row.key}>
                <td><ThemeOption key={row.key} row={row} /></td>
                <td>

                    <HoverCard key={row.key} width={280} shadow="md">
                        <HoverCard.Target>
                            <Text key={row.key}  >{row.title.length > 40 ? row.title.slice(0, 40) + "..." : row.title}</Text>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            {row.title}
                        </HoverCard.Dropdown>
                    </HoverCard>
                </td>
                <td    >

                    <HoverCard key={row.key}  width={280} shadow="md"   >
                        <HoverCard.Target>
                            <Text key={row.key}  >{row.description.length > 40 ? row.description.slice(0, 40) + " ..." : row.title}</Text>
                            {/* <Button  onClick={() => { showMore(row) }}  >showMore</Button> */}
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            {row.title}
                        </HoverCard.Dropdown>
                    </HoverCard>
                </td>

                <td><Text key={row.key} >{row.teacher}</Text></td>
                <td><Text key={row.key} >{row.send_at}</Text></td>
                <td> {row.status === '1' ? <Badge color='teal'  >Accepted</Badge> : null}</td>
            </tr>
        </>
        )
    }
    );
    return (
        <>




            {/* <ScrollArea scrollbarSize={1} > */}
            {/* <TextInput
                // key={nanoid()}
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
                    <tr><Th /><Th
                        //  sorted={sortBy === 'title'}
                        //     reversed={reverseSortDirection}
                        //     onSort={() => setSorting('title')}
                        key={nanoid()}
                        children='Title'
                    /><Th
                            // sorted={sortBy === ''}
                            // reversed={reverseSortDirection}
                            // onSort={() => setSorting('')}
                            key={nanoid()}

                            children='description'
                        /><Th 
                        // sorted={sortBy === 'teacher'}
                        //     reversed={reverseSortDirection}
                        //     onSort={() => setSorting('teacher')}
                            children='teacher'
                        key={nanoid()}

                        /><Th
                        //  sorted={sortBy === 'send_at'}
                        //     reversed={reverseSortDirection}
                        //     onSort={() => setSorting('send_at')}
                            children='send at'
                        key={nanoid()}

                        /><Th
                        //  sorted={sortBy === 'status'}
                        //     reversed={reverseSortDirection}
                        //     onSort={() => setSorting('status')}
                            children='status'
                        key={nanoid()}

                        /></tr></thead><tbody>
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
            {/* </ScrollArea> */}
        </>)

}