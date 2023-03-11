import { useEffect, useState } from 'react';
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
    Spoiler,
    Modal,
    SimpleGrid,
    MantineProvider,
    LoadingOverlay,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSearch } from '@tabler/icons';

import { useTeacherContext } from '../../contexts/teacherContext';


import { useQueryClient } from 'react-query';
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
export function ThemeCrud(props) {



    // *  -------------------------- fetch Students data ----------------------------------------------------------- *
    const { data: fetchListTheme } = userFetchListTheme()
    // *  ------------------------------------------------------------------------------------------------------------------ *

    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState();
    const [contextSet, setContextSet] = useState(false)



    let data = [{}]; //* list of theme 
    useEffect(() => {

        data = data = fetchListTheme?.data.map(obj => ({
            id: obj.id,
            title: String(obj.title),
            description: String(obj.description),
            status: obj.specialty_manager_validation == 0 ? '0' : '1',
            teacher: String(obj.name),
            send_at: new Date(obj.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                hour: "numeric",
            })
        }));

        setSortedData(data)
        // setContextSet(false)
    }, [fetchListTheme?.data])


    if (fetchListTheme && !contextSet) { //*  data complete fetching when 

        data = fetchListTheme.data.map(obj => ({
            id: obj.id,
            title: String(obj.title),
            description: String(obj.description),
            status: obj.specialty_manager_validation == 0 ? '0' : '1',
            teacher: String(obj.name),
            send_at: new Date(obj.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                hour: "numeric",
            })
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
        data = fetchListTheme?.data.map(obj => ({
            title: String(obj.title),
            description: String(obj.description),
            status: obj.specialty_manager_validation == 0 ? '0' : '1',
            teacher: String(obj.name),
            send_at: new Date(obj.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                hour: "numeric",
            })
        }));
        setSortedData(sortData(data, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event) => {
        const { value } = event.currentTarget;
        setSearch(value);
        data = fetchListTheme?.data.map(obj => ({
            title: String(obj.title),
            description: String(obj.description),
            status: obj.specialty_manager_validation == 0 ? '0' : '1',
            teacher: String(obj.name),
            send_at: new Date(obj.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                hour: "numeric",
            })
        }));
        setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    };


    const [description_content, { open: _showMore, close: hide }] = useDisclosure()

    const [theme_description, setTheme_description] = useState({})


    const showMore = (row) => {

        setTheme_description({
            title: row.title,
            description: row.description,
            teacher: row.teacher,
            send_at: row.send_at
        })
        _showMore()
    }



    const rows = sortedData?.map((row) => {
        const k = Math.random();

        return (<>  

            <tr key={k}>
                <td><ThemeOption row={row} /></td>
                <td>{row.title}</td>
                <td>
                    <Spoiler maxHeight={20} showLabel="Show more" hideLabel="Hide" onClick={() => (showMore(row))}   >{row.description}</Spoiler>
                </td>
                <td>{row.teacher}</td>
                <td>{row.send_at}</td>
                <td>{row.status === '1' ? <Badge color='teal'  >Accepted</Badge> : null}</td>
            </tr>
        </>
        )
    }
    );
    return (
        <>

            <Modal opened={description_content} onClose={hide} size='lg'  >
                <SimpleGrid  >

                    <ThemeDescriptionContent row={theme_description} />
                </SimpleGrid>
            </Modal>
            <ScrollArea scrollbarSize={1} >
                <TextInput
                    placeholder="Search by any field"
                    mb="lg"
                    icon={<IconSearch size={14} stroke={1.5} />}
                    value={search}
                    variant='unstyled'
                    onChange={handleSearchChange}
                />
                <Table
                    horizontalSpacing="lg"
                    verticalSpacing="lg"
                    sx={{ tableLayout: 'fixed', minWidth: 1200, maxWidth: 1300, minHeight: 260 }}
                ><thead>
                        <LoadingOverlay visible= {props.publishLoading} />  
                        <tr><Th /><Th sorted={sortBy === 'title'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('title')}
                            children='Title'
                        /><Th sorted={sortBy === 'description'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('description')}
                            children='description'
                            /><Th sorted={sortBy === 'teacher'}
                                reversed={reverseSortDirection}
                                onSort={() => setSorting('teacher')}
                                children='teacher'
                            /><Th sorted={sortBy === 'send_at'}
                                reversed={reverseSortDirection}
                                onSort={() => setSorting('send_at')}
                                children='send at'
                            /><Th sorted={sortBy === 'status'}
                                reversed={reverseSortDirection}
                                onSort={() => setSorting('status')}
                                children='status'
                            /></tr>
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