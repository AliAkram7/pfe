import { Button, createStyles, Drawer, Flex, Group, ScrollArea, SimpleGrid, Table, Text, TextInput, UnstyledButton, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons";
import { IconDotsVertical, IconPlus } from "@tabler/icons-react";
import { nanoid } from "nanoid";
import React, { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router";
import { useStateContext } from "../../contexts/ContextProvider";
import { useStudentContext } from "../../contexts/studentContext";
import { SpecialtiesInfo } from "../bddStudentRank/specialty";
import { useFetchInscription, useFetchRanking } from "./connection/receiveData/fetchData";
// import { useFetchRanking } from "./connection/receiveData/fetchData";

import Filter from "./filter";
import "./ranking.css";



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
        <th key={nanoid()} className={classes.th}>
            <UnstyledButton onClick={props.onSort} className={classes.control}>
                <Group position="left">
                    <Text key={nanoid()} weight={300} size="sm">
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

export default function Ranking() {

    const { studentSpecialtyId, setStudentSpecialtyId } = useStudentContext()

    const { data: ranking } = useFetchRanking(studentSpecialtyId)

    const { data: inscription } = useFetchInscription()

    const student_rank = ranking?.data?.student_rank.map((student, rank) => { return { ...student, rank: rank + 1 } })


    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState();
    const [contextSet, setContextSet] = useState(false)

    console.log(student_rank)
    let data = [{}]; //* list of theme 


    const mapData = () => {
        return data = ranking?.data?.student_rank.map(obj => ({

            student_name: String(obj.student_name),
            ms1: String(obj.ms1),
            ms2: String(obj.ms2),
            mgc: String(obj.mgc),
            observation: String(obj.observation),

        }));
    };

    const memoizedData = useMemo(() => {
        return mapData();
    }, [ranking?.data?.student_rank]);

    useEffect(() => {
        setSortedData(memoizedData);
    }, [memoizedData]);



    const [sortBy, setSortBy] = useState(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const classes = useStyles()

    const setSorting = (field) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        data = data = ranking?.data?.student_rank?.map(obj => ({

            student_name: String(obj.student_name),


        }));
        setSortedData(sortData(data, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event) => {
        const { value } = event.currentTarget;
        setSearch(value);
        data = data = ranking?.data?.student_rank?.map(obj => ({

            student_name: String(obj.student_name),


        }));
        setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const theme = useMantineTheme();



    const [openYearScholar, {
        close: yearScholarClose,
        open: yearScholarOpen,
    }
    ] = useDisclosure(false);

    const rows = sortedData?.map((row) => {

        return (<>
            <tr key={nanoid()}>
                <td key={nanoid()} >{row.student_name}</td>
                <td key={nanoid()} >{row.observation}</td>
                <td key={nanoid()} >{row.ms1}</td>
                <td key={nanoid()} >{row.ms2}</td>
                <td key={nanoid()} >{row.mgc}</td>
            </tr>
        </>
        )
    }
    );
    return (
        <>

            <Drawer
                opened={openYearScholar}
                onClose={yearScholarClose}
                overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.3}
                overlayBlur={3}
                position='right'
                size="xl"
            >
                <div className='Student-managment-nav'>
                    <SimpleGrid cols={1} spacing='md' >
                        {/* {department_menu} */}
                        {
                            inscription?.data.map((item) => {
                                return (
                                    <SpecialtiesInfo
                                        icon={IconPlus}
                                        label={item.label}
                                        initiallyOpened={false}
                                        links={item.links}
                                    />)
                            })
                        }
                    </SimpleGrid>

                </div>

            </Drawer>


            <>

                <div className='Student-managment'>

                    <div className='Student-managment-menu'  >


                        <div className='specialtyName' > <Flex   align={'center'} ><Button variant="white"  onClick={yearScholarOpen}   ><IconDotsVertical /></Button> <h3 style={{ textTransform: 'capitalize' }} ><Text fz="lg" color='teal' >{ranking?.data.speciality_name} {ranking?.data.year_scholar}</Text> list of ranking </h3> </Flex></div>

                        <Group spacing={20} >

                            <ScrollArea scrollbarSize={1} key={nanoid()} >

                                <Table
                                    horizontalSpacing="md"
                                    verticalSpacing="md"
                                    sx={{ tableLayout: 'fixed', minWidth: 1000, maxWidth: 1400, minHeight: 260 }}
                                ><thead>
                                        <tr key={nanoid()} ><Th
                                            sorted={sortBy === 'student_name'}
                                            //     reversed={reverseSortDirection}
                                            onSort={() => setSorting('student_name')}
                                            children='name'
                                            key={nanoid()}
                                        /><Th

                                                children='Observation'
                                                key={nanoid()}
                                            /><Th

                                                children='MS1'
                                                key={nanoid()}
                                            /><Th
                                                children='MS2'
                                                key={nanoid()}
                                            /><Th
                                                children='MGC'
                                                key={nanoid()}
                                            /></tr>
                                    </thead>
                                    <tbody key={nanoid} >
                                        {rows?.length > 0 ? rows :
                                            <tr key={nanoid()} >
                                                <td key={nanoid()} >
                                                    <Text weight={500} align="center" key={nanoid()}>
                                                        Nothing found
                                                    </Text>
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </Table>
                            </ScrollArea>
                        </Group>
                    </div></div>
            </>
        </>)

}