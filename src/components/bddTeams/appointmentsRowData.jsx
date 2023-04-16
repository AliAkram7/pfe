import { Table } from '@mantine/core'
import { nanoid } from 'nanoid'
import React from 'react'
import { useGetAppointmentInfo } from './connection/connection'

function AppointmentsRowData(props) {
    const { data: getAppointmentInfo } = useGetAppointmentInfo({ appointment_id: props.selectedAppointment_id })



    return (
        <Table key={nanoid()} align='center' withBorder withColumnBorders
            horizontalSpacing="lg" verticalSpacing="xl"
            captionSide
        >
            <thead>
                <tr>
                    <th>date</th>
                    <th>state of progress</th>
                    <th>required work</th>
                    <th>session type</th>
                    <th>observation</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{getAppointmentInfo?.data?.date}</td>
                    <td>{getAppointmentInfo?.data?.state_of_progress}</td>
                    <td>{getAppointmentInfo?.data?.Required_work}</td>
                    <td>{getAppointmentInfo?.data?.type_of_session}</td>
                    <td>{getAppointmentInfo?.data?.observation}</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default AppointmentsRowData