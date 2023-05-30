import { Menu, Button, Text, Modal, SimpleGrid, HoverCard, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowBarToRight, IconDotsVertical, IconZoomQuestion } from '@tabler/icons';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useTeacherContext } from '../../contexts/teacherContext';

import { ThemeDescriptionContent } from '../BddThemes/themeDescriptionContent';
import CreateAppointment from '../TeacherTeamsSection/createAppointment';
import { useGetAppointmentsDates } from './connection/connection';
import FollowUpStatistic from './followUpStatistic';
import CreateAppointmentPresentation from './juryGroupToTeam';


function TeamOption(props) {


  

    const { affectationMethod } = useTeacherContext()
    const [selectedDate, setSelectedDate] = useState(0)

    const [statisticOpened, { open: openStatistic, close: closeStatistic }] = useDisclosure()

    const [juryOptionOpened, { open: openJuryOption, close: closeJuryOption }] = useDisclosure()



    const [appointmentsDates, setAppointmentsDates] = useState([]);

    const [selectedPID, setSelectedPID] = useState()
    const [periodInfo, setPeriodInfo] = useState()

    const listPeriods = props.row.periods.map((period, idx) => {
        console.log(period)
        return (
            <Menu.Item key={nanoid()} color='teal' icon={<IconZoomQuestion size={14} color='teal' />} onClick={() => { setSelectedDate(idx); openStatistic(); setSelectedPID(period.p_id); setPeriodInfo(period)  }}    >
                <HoverCard width={300} shadow="md" key={nanoid()} >
                    <HoverCard.Target>
                        <Text key={nanoid()} >
                            period number {period.num_period}
                        </Text>
                    </HoverCard.Target>
                </HoverCard>
            </Menu.Item>
        )
    })




    const [description_content, { open: showMore, close: hide }] = useDisclosure()



    return (
        <>


            <Modal
                key={nanoid()}
                opened={statisticOpened}
                onClose={closeStatistic}
                fullScreen
                closeOnClickOutside={false}
            >
                <FollowUpStatistic

                    range={[
                        dayjs(props.row?.periods[selectedDate]?.start_date).toDate(),
                        dayjs(props.row?.periods[selectedDate]?.end_date).toDate(),
                    ]}

                    team_id={props.row.team_id}
                    PID={selectedPID}
                    periodInfo={periodInfo}
                />
            </Modal>
            <Modal
                key={nanoid()}
                opened={description_content} onClose={hide} size='xl'      >
                <SimpleGrid  >
                    <ThemeDescriptionContent row={{
                        title: props?.row?.theme_workOn?.title,
                        description: props?.row?.theme_workOn?.description,
                        teacher: props?.row?.supervisor_info?.name,
                        send_at: new Date(props.row?.theme_workOn?.send_at).toLocaleDateString(
                            "en-US",
                            {
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                            }
                        ),
                    }} />
                </SimpleGrid>
            </Modal>
            <Modal
                key={nanoid()}
                opened={juryOptionOpened}
                onClose={closeJuryOption}
                size={'xl'}
                title="Presentation date"
            >
                <CreateAppointmentPresentation row={props?.row} ThemeRequirement={props?.row?.theme_workOn?.research_domain} 
                    supervisor_code={props?.row?.supervisor_info?.name}
                />
            </Modal>





            <Menu shadow="md" position='left' width={200} closeDelay={10} transition={'scale-x'} zIndex={20}   >
                <Menu.Target>
                    <Button variant='white' ><IconDotsVertical color='teal' /></Button>
                </Menu.Target>
                <Menu.Dropdown   >
                    <Menu.Label>options</Menu.Label>
                    <Menu.Item color='teal' icon={<IconZoomQuestion size={14} color='teal' />} onClick={showMore}   >show all details</Menu.Item>
                    {listPeriods}
                    {affectationMethod == 1 ? <Menu.Item color='teal' icon={<IconZoomQuestion size={14} color='teal' />} onClick={openJuryOption}   >Jury members</Menu.Item> : null}
                </Menu.Dropdown>
            </Menu>
        </>
    );
}
export default TeamOption; 