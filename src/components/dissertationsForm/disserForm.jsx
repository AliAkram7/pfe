import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import React, { useEffect, useMemo, useState } from "react";
import PageNotUploadedYet from "../errorpages/pageUploadedYet/pageNotUploadedYet";
import "./disserForm.css";
import { Row } from "./sortableRow";
import { useDisclosure } from "@mantine/hooks";
import SendData from "./sendData";
import { useFetchTheme } from "./connection/receiveData/fetchData";
import { Button, createStyles, Group, LoadingOverlay, SegmentedControl, SimpleGrid, Table, Tabs, Text, TransferList, UnstyledButton } from "@mantine/core";
import { IconClick, IconClipboard, IconDragDrop, IconHandClick, IconHandFinger, IconMessageCircle, IconMouse, IconPhoto, IconSettings } from "@tabler/icons";
import { nanoid } from "nanoid";
import { useStudentContext } from "../../contexts/studentContext";
import { useGetStudentTeamInformation } from "../teamSection/connection/receiveData/fetchData";
import { Navigate } from "react-router";
import PageDissertationClosed from "../errorpages/affectationResult/affectationResult";

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
                    <Text weight={300} size="sm"
                        key={nanoid()}

                    >
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


function DisserForm() {





    const { data: fetchedTheme, isLoading } = useFetchTheme()

    let themeTable = fetchedTheme?.data?.list_theme;

    // const [theme, setTheme] = useState(fetchedTheme?.data?.list_theme);

    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState();
    const [sortedData2, setSortedData2] = useState();
    const [contextSet, setContextSet] = useState(false)


    const { setChoiceStatus, choiceStatus, hasSupervisor, setHasSupervisor } = useStudentContext()


    const { data: getStudentTeamInformation } = useGetStudentTeamInformation()

    useEffect(() => {
        if (getStudentTeamInformation?.data?.supervsorInfo?.name) {
            setHasSupervisor(true)
        } else {
            setHasSupervisor(false)
        }
    }, [getStudentTeamInformation?.data?.supervsorInfo?.name])


    let data = [{}]; //* list of theme

    const mapData = () => {
        return fetchedTheme?.data?.list_theme.map((obj, idx) => ({
            value: nanoid(),
            label: obj.title,
            id: obj.id,
            group: ''
        }));
    };
    const mapData2 = () => {
        return fetchedTheme?.data?.list_theme.map((obj) => ({
            key: nanoid(),
            id: obj.id,
            title: obj.title,
        }));
    };



    const [data2, setData2] = useState([
        sortedData,
        [

        ]]
    )

    const memoizedData = useMemo(() => {
        return mapData();
    }, [fetchedTheme?.data?.list_theme]);


    const memoizedData2 = useMemo(() => {
        return mapData2();
    }, [fetchedTheme?.data?.list_theme]);


    useEffect(() => {
        setSortedData(memoizedData);
    }, [memoizedData]);

    useEffect(() => {
        setSortedData2(memoizedData2);
    }, [memoizedData2]);

    useEffect(() => {

        if ((sortedData?.length == 0) && !isLoading) {
            setChoiceStatus(false)
        } else {
            setChoiceStatus(true)
        }
    }, [sortedData])





    if (sortedData && !contextSet) {
        setData2([memoizedData, []]);
        setContextSet(true)
    }







    const rows = sortedData2?.map((row, idx) => {


        return (<>
            <Row key={nanoid()}
                id={
                    row?.id
                }
                name={
                    row?.title
                }
                index={idx} />
        </>
        )
    }
    );

    const [opened, {
        close,
        open
    }
    ] = useDisclosure(false);

    // if(!choiceStatus)  return   <PageNotUploadedYet/>  

    if (hasSupervisor) return <PageDissertationClosed data={data2[1].length > 0 && data2[0].length == 0 ? data2[1] : sortedData2} />
    return (

        <>
            {sortedData ?
                (
                    <>
                        {
                            sortedData ?
                                <SendData
                                    key={nanoid()}
                                    opened={opened}
                                    close={close}
                                    data={data2[1].length > 0 && data2[0].length == 0 ? data2[1] : sortedData2} /> : null}

                        <div className='disser-section'>
                            <Group  grow    >
                                <SimpleGrid spacing='xl' verticalSpacing="xl"  >
                                    <Tabs defaultValue="drag" onTabChange={() => { setData2([memoizedData, []]) }}  >
                                        <Tabs.List>
                                            {/* <Tabs.Tab value="drag" icon={<IconHandClick size="0.8rem" />} key={nanoid()} >drag method</Tabs.Tab> */}
                                            <Tabs.Tab value="select" icon={<IconClick size="0.8rem" />} key={nanoid()} >click to change list</Tabs.Tab>
                                        </Tabs.List>

                                        <Tabs.Panel value="drag" pt="xs">

                                            <DndContext collisionDetection={closestCenter}
                                                onDragEnd={handleDragEnd}>
                                                {
                                                    sortedData ?
                                                        <SortableContext items={sortedData2}
                                                            strategy={verticalListSortingStrategy}>
                                                            <Table
                                                                withColumnBorders
                                                                withBorder
                                                                highlightOnHover
                                                                striped
                                                                horizontalSpacing="sm"
                                                                verticalSpacing="sm"
                                                                sx={{ tableLayout: 'revert', width: '99%', minHeight: 360 }}
                                                                key={nanoid()}
                                                            >

                                                                <thead ><tr key={nanoid()} ><Th
                                                                    key={nanoid()}

                                                                /><Th
                                                                        children='name'
                                                                        key={nanoid()}

                                                                    /><Th
                                                                        children='rank'
                                                                        key={nanoid()}
                                                                    /></tr>
                                                                </thead>
                                                                <tbody key={nanoid()} >
                                                                    {rows?.length > 0 ? (
                                                                        rows
                                                                    ) : (
                                                                        <tr key={nanoid()} >
                                                                            <td key={nanoid()} >
                                                                                <Text key={nanoid()} weight={500} align="center">
                                                                                    Nothing found
                                                                                </Text>
                                                                            </td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </Table>
                                                        </SortableContext> : 'loading...'}
                                            </DndContext>

                                        </Tabs.Panel>

                                        <Tabs.Panel value="select" pt="xl"   >

                                            <SimpleGrid spacing={30}     >
                                                {sortedData && data2[0] ?
                                                    <TransferList
                                                        key={nanoid()}
                                                        value={data2}
                                                        onChange={setData2}
                                                        searchPlaceholder="Search..."
                                                        nothingFound="Nothing here"
                                                        titles={['Current choice list', 'New choice list']}
                                                        style={{ width: '99%', height: 450 }}
                                                        breakpoint='lg'
                                                        listHeight={250}
                                                    /> : null}
                                                <Button onClick={open}
                                                    variant='light' style={{ width: '10%' }}
                                                    disabled={data2[1].length > 0 && !data2[0].length == 0 || rows?.length == 0}
                                                    key={nanoid()}

                                                >send</Button>
                                            </SimpleGrid>
                                        </Tabs.Panel>


                                    </Tabs>

                                    {/* <Overlay opacity={0.2} color="white" zIndex={1} /> */}

                                </SimpleGrid>

                            </Group>


                        </div>
                    </>
                )
                : "loading..."}
        </>
    );

    function handleDragEnd(event) { // console.log("drag ended called");

        const { active, over } = event;

        if (over == null) {
            return null
        }
        if (active.id !== over.id) {
            setSortedData2((items) => {
                const activeIndex = items.map(e => e.id).indexOf(active.id);;

                const overIndex = items.map(e => e.id).indexOf(over.id);;
                // console.log(activeIndex, overIndex);

                // console.log(activeIndex, overIndex);
                return arrayMove(items, activeIndex, overIndex);
            });
        }
    }
}

export default DisserForm;
