import { Header, Highlight, Indicator, Modal, Text } from '@mantine/core';
import { Calendar, CalendarBase, Month } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks';
import { nanoid } from 'nanoid';
import React, { useState } from 'react'

import { useFetchCalenderEvent } from './connexion';

import { Table } from '@mantine/core'


function AppointmentsRowData(props) {

    console.log(props.selectedAppointmentDate)




    // const listAffectation = 



    const specialties = props.selectedAppointment.filter(
        (specialty) =>
            new Date(specialty?.start_appointments).toDateString() === props.selectedAppointmentDate
    )


    const tables = specialties.map(specialty => {


        return (<>
{
     specialty.method_of_aff == 1 ? 

           <Header   > Designation of the jury members for the Master's degree in  <Highlight color={'teal'} > {specialty.specialty_name}</Highlight> ({specialty.abbreviated_name})</Header>
           : 
           <Header   > Designation of the jury members for the license degree in  <Highlight color={'teal'} > {specialty.specialty_name}</Highlight> ({specialty.abbreviated_name})</Header>
    }

            <Table key={nanoid()} align='left'
                withBorder
                withColumnBorders
                horizontalSpacing="xl" 
                verticalSpacing="xl"
                // captionSide
                sx={{ tableLayout: 'fixed', minWidth: 1200, maxWidth: 1400, minHeight: 260 }}
                mb={50}
                mt={80}
            >
                <thead>
                    <tr>
                        <th colSpan={2}  >jury members</th>
                        <th>students</th>
                        <th>theme</th>
                        <th>presentation date</th>
                        {specialty.method_of_aff == 1 ?
                            <>
                                <th>tester members</th>
                                <th>presentation date</th>
                            </>
                            : null
                        }
                    </tr>
                </thead>
                <tbody>{

                    specialty.affectation.map(item => {
                        return (
                            <tr>
                                <td> <Text>  supervisor </Text>
                                    {specialty.method_of_aff == 1 ? <Text>  president </Text> : null}
                                    <Text>examiner 1</Text>
                                    <Text>examiner 2</Text>
                                    <Text>examiner 3</Text> </td>

                                <td>{item?.supervisor_info.name} .
                                    {item?.teacher_jury.map(teacher => {
                                        return <p> {teacher?.name} .</p>
                                    })}
                                </td>
                                <td>{item?.member_1?.name} {item?.member_2?.name}</td>
                                <td>{item?.theme}</td>
                                <td>{new Date(item?.date_presentation).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                })} </td>
                                {specialty.method_of_aff == 1 ?
                                    <>
                                        <td>{item?.testers_group.map(teacher => {
                                            return <p>{teacher?.name}</p>
                                        })}</td>
                                        <td>  {new Date(item?.test_project_date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "numeric",
                                        })} </td>
                                    </> : null
                                }
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
        )

    })



    return (
        <>
            {tables}
        </>)
}

export default AppointmentsRowData
export function CalendarPresentation(props) {

    const [openedStatistic, { open, close }] = useDisclosure(false)

    const [selectedAppointment, setSelectedAppointment] = useState([])
    const [selectedAppointmentDate, setSelectedAppointmentDate] = useState([])

    const { data: fetchCalenderEvent } = useFetchCalenderEvent()

    // console.log(fetchCalenderEvent?.data[0].date_presentation)

    // console.log(selectedAppointment)

    return (
        <>

            <Modal
                opened={openedStatistic}
                onClose={close}
                size='100vw'
            >
                <AppointmentsRowData selectedAppointment={selectedAppointment} selectedAppointmentDate={selectedAppointmentDate} />
            </Modal>

            <Calendar
                range={props.range}
                fullWidth
                size="xl"

                styles={(theme) => ({
                    cell: {
                        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                            }`,
                    },
                    day: { borderRadius: 0, height: 70, fontSize: theme.fontSizes.lg },
                    weekday: { fontSize: theme.fontSizes.lg },
                    weekdayCell: {
                        fontSize: theme.fontSizes.xl,
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
                        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                            }`,
                        height: 70,
                    },
                })}

                renderDay={(date) => {
                    const day = date.getDate();

                    // console.log(fetchCalenderEvent?.data)

                    const appointmentDates = fetchCalenderEvent?.data || [];



                    const isAppointmentDay = appointmentDates.some(
                        (specialty) =>
                            new Date(specialty?.start_appointments).toDateString() === date.toDateString()
                        // console.log(new Date(specialty?.start_appointments).toDateString() === date.toDateString() )

                    );

                    console.log(appointmentDates)

                    if (isAppointmentDay) {
                        const appointmentInfo = appointmentDates.find(
                            (specialty) =>
                                new Date(specialty?.start_appointments).toDateString() === date.toDateString()
                        );
                        // new Date(appointmentDate.date_presentation).toDateString() === date.toDateString()

                        // console.log(appointmentInfo)
                        return (
                            <Indicator
                                key={nanoid()}
                                size={12}
                                color="red"
                                offset={8}
                                disabled={!isAppointmentDay}
                                onClick={() => { setSelectedAppointment(appointmentDates); setSelectedAppointmentDate(date.toDateString()); open() }}
                            >
                                <div key={nanoid()}
                                >
                                    {day}
                                </div>
                            </Indicator>
                        );
                    }
                    return <div>{day}</div>;
                }
                }
            />
        </>
    )
}
