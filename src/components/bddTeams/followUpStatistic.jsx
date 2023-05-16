import { Indicator, Modal } from '@mantine/core';
import { Calendar, CalendarBase, Month } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks';
import { nanoid } from 'nanoid';
import React, { useState } from 'react'
import AppointmentsRowData from './appointmentsRowData';
import { useGetAppointmentInfo, useGetAppointmentsDates } from './connection/connection';

function FollowUpStatistic(props) {

    const [selectedAppointment_id, setSelectedAppointment_id] = useState()
    const { data: getAppointmentsDates } = useGetAppointmentsDates({
        PID: props.PID,
        team_id: props.team_id,
    })
    const [openedStatistic ,{open , close}] = useDisclosure(false)
  


    

    return (
        <>

        <Modal  
            opened={openedStatistic}
            onClose={close}
            size='100vw'
         >
            <AppointmentsRowData  selectedAppointment_id={selectedAppointment_id}  />
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

                    
                    const appointmentDates = getAppointmentsDates?.data || [];


                    const isAppointmentDay = appointmentDates.some(
                        (appointmentDate) =>
                            new Date(appointmentDate.date).toDateString() === date.toDateString()
                    );

                    if (isAppointmentDay) {
                        const appointmentId = appointmentDates.find(
                            (appointmentDate) =>
                                new Date(appointmentDate.date).toDateString() === date.toDateString()
                        ).id;
                        return (
                            <Indicator
                                key={nanoid()}
                                size={12}
                                color="red"
                                offset={8}
                                disabled={!isAppointmentDay}
                                onClick={() =>{ setSelectedAppointment_id(appointmentId) ; open()}  }
                            >
                                <div key={nanoid()}
                                >
                                    {day}
                                </div>
                            </Indicator>
                        );
                    }
                    return <div>{day}</div>;
                }}
            />
        </>
    )
}

export default FollowUpStatistic