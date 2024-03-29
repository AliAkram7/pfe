import { useEffect, useMemo, useState } from 'react';
import {
    createStyles,
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    TextInput,

    Input,
    Button,

    LoadingOverlay,
    NumberInput,
    SimpleGrid,
    Badge,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSearch } from '@tabler/icons';

import { useTeacherContext } from '../../contexts/teacherContext';


import { useQueryClient } from 'react-query';

import { useGetRanking, useUpdateRank } from './connection/connection';
import RankOption from './rankOption';
import { isNotEmpty, useForm } from '@mantine/form';
import { useStateContext } from '../../contexts/ContextProvider';
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

function RenderUpdateRow(props) {

    const [ms1, setMs1] = useState(props?.row?.ms1)

    const [ms2, setMs2] = useState(props?.row?.ms2)

    const [mgc, setMgc] = useState(props?.row?.mgc)

    const [obs, setObs] = useState(props.row.observation)

    const { mutate: updateRank } = useUpdateRank()
    const queryClient = useQueryClient();
    const onUpdate = () => {
        let payload = { code: Number(props.row.code) }

        props.row.Edit = "false"

        if (ms1 !== props.row.ms1) {
            payload = { ...payload, ms1: Number(ms1) }
        }
        if (ms2 !== props.row.ms2) {
            payload = { ...payload, ms2: Number(ms2) }
        }
        if (mgc !== props.row.mgc) {
            payload = { ...payload, mgc: Number(mgc) }
        }
        if (obs !== props.row.observation) {
            payload = { ...payload, obs: Number(obs) }
        }
        if (payload.ms1 || payload.ms2 || payload.mgc || payload.obs) {

            updateRank(payload)
        }

        console.log(payload)

        queryClient.invalidateQueries('MSFetchRanking')

    }

    return (<>

        <td><NumberInput

            defaultValue={Number(obs)}
            value={Number(obs)}

        />
        </td>
        <td>< NumberInput
            type='number'
            defaultValue={Number(ms1)}
            precision={2}
            min={0}
            step={0.01}
            max={20}
            stepHoldDelay={500}
            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            value={ms1}
            onChange={(value) => {
                setMs1(value)
            }
            }
        />

        </td>
        <td><NumberInput

            defaultValue={Number(ms2)}
            precision={2}
            min={0}
            step={0.01}
            max={20}
            stepHoldDelay={500}
            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            onChange={(value) => {
                setMs2(value)
            } } 

        />

        </td>
        <td>
            <SimpleGrid cols={2}>
                <NumberInput

                    defaultValue={Number(mgc)}
                    precision={2}
                    min={0}
                    step={0.01}
                    max={20}
                    stepHoldDelay={500}
                    stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                    onChange={(value) => {
                        setMgc(value)
                    } } 

                />

                <Button value='save' variant='filled' color='teal' onClick={onUpdate}   >save</Button></SimpleGrid>
        </td>


    </>)
}


export function RankCrud() {



    const {selectedYearId, selectedSpeciality} = useStateContext()

    console.log(selectedYearId)

    // *  -------------------------- fetch ranking  data ----------------------------------------------------------- *
    const { data: getRanking } = useGetRanking(selectedYearId)
    // *  ------------------------------------------------------------------------------------------------------------------ *

    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState();
    const [contextSet, setContextSet] = useState(false)

    let data = [{}]; //* list of theme 


    const mapData = () => {
      return   data = data = getRanking?.data?.student_rank.map(obj => ({
            code: obj.code,
            student_name: obj.student_name,
            ms1: String(obj.ms1),
            ms2: String(obj.ms2),
            mgc: String(obj.mgc),
            observation: String(obj.observation),
            Edit: 'false' ,
        }));
    };

    const memoizedData = useMemo(() => {
        return mapData();
    }, [getRanking?.data]);

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
        data = data = getRanking?.data?.student_rank.map(obj => ({
            code: String(obj.code),

            student_name: String(obj.student_name),
            ms1: String(obj.ms1),
            ms2: String(obj.ms2),
            mgc: String(obj.mgc),
            observation: String(obj.observation),
            Edit: 'false'
        }));
        setSortedData(sortData(data, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event) => {
        const { value } = event.currentTarget;
        setSearch(value);
        data = data = getRanking?.data?.student_rank.map(obj => ({
            code: String(obj.code),
            student_name: String(obj.student_name),
            ms1: String(obj.ms1),
            ms2: String(obj.ms2),
            mgc: String(obj.mgc),
            observation: String(obj.observation),
            Edit: 'false'
        }));
        setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    };



    const rows = sortedData?.map((row) => {
        const k = Math.random();
   
        return (<>
            <tr key={k}>
                <td  ><RankOption row={row} setEdit={row.setEdit} /></td>
                <td>{row.student_name}</td>

                {row.Edit === 'false' ?
                    (<>
                        {/* <td>{row.observation}</td> */}
                        <td key={nanoid()} > 
                
                {
                row.observation == 1 ? <Badge>Allowed/S1</Badge> : 
                row.observation == 2 ? <Badge>Allowed/S2</Badge> : 
                row.observation == 3 ? <Badge>Allowed/Debts/S2</Badge> : 
                row.observation == 4 ? <Badge>Allowed/Debts/S1</Badge> : null
                }  
                
                </td>
                        <td>{row.ms1}</td>
                        <td>{row.ms2}</td>
                        <td>{row.mgc}</td>
                    </>)
                    : <RenderUpdateRow row={row} />}



            </tr>
        </>
        )
    }
    );
    return (
        <>
            <ScrollArea scrollbarSize={1} >
                <TextInput
                    placeholder="Search by any field"
                    mb="lg"
                    icon={<IconSearch size={14} stroke={1.5} />}
                    value={search}
                    variant='filled'
                    onChange={handleSearchChange}
                />
        
                <Table
                    horizontalSpacing="lg"
                    verticalSpacing="ms"
                    sx={{ tableLayout: 'fixed', minWidth: 1200, maxWidth: 1400, minHeight: 260 }}
                ><thead>
                        <LoadingOverlay />
                        <tr key={nanoid()}  ><th /><Th sorted={sortBy === 'student_name'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('student_name')}
                            children='name'
                        /><Th 
                        // sorted={sortBy === 'observation'}
                        //         reversed={reverseSortDirection}
                        //         onSort={() => setSorting('observation')}
                                children='Observation'
                            /><Th
                            //  sorted={sortBy === 'ms1'}
                                // reversed={reverseSortDirection}

                                // onSort={() => setSorting('ms1')}
                                children='MS1'
                            /><Th 
                            // sorted={sortBy === 'ms2'}
                            //     reversed={reverseSortDirection}
                            //     onSort={() => setSorting('ms2')}
                                children='MS2'
                            /><Th 
                            // sorted={sortBy === 'mgc'}
                            //     reversed={reverseSortDirection}
                            //     onSort={() => setSorting('mgc')}
                                children='MGC'
                            /></tr>
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

}