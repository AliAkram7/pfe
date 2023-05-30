import { Table } from '@mantine/core'
import { nanoid } from 'nanoid'
import React from 'react'
import { useGetAppointmentInfo } from './connection/connection'
import head from "../../imges/head.png"
function AppointmentsRowData(props) {
    const { data: getAppointmentInfo } = useGetAppointmentInfo({ appointment_id: props.selectedAppointment_id })

    return (
        <>
            <center>
                <img src={head} alt="header"  />
            </center>
                <div>period {props?.periodInfo?.num_period} : from {props?.periodInfo?.start_date } to :  {props?.periodInfo?.end_date }</div>
            <Table key={nanoid()} withBorder withColumnBorders
                horizontalSpacing="sm" verticalSpacing="sm"
                sx={{ tableLayout: 'fixed', minWidth: 1200, maxWidth: 1400, minHeight: 260 }}
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
        </>
    )
}

export default AppointmentsRowData