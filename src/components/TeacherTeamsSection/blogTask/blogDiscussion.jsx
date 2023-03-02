import { List, ThemeIcon } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../../contexts/ContextProvider'
import { useStudentContext } from '../../../contexts/studentContext'
import RichTextEditor from '../../richTextEditor/richTextEditor'
import './blogDiscussion.css'
import Comment from './comment'
import { useGetAllRoomMessages } from './connection/receiveData/fetchData'
import {  useTeachersendMessage } from './connection/sendData/sendData'
function TeacherBlogDiscussion() {

    const { roomDiscription, roomName, roomId } = useStateContext()

    // const paylod = { room_id: roomId }
    const { data: getAllRoomMessages } = useGetAllRoomMessages(roomId)

    // console.log(getAllRoomMessages?.data)



    const getAllMessges = getAllRoomMessages?.data.map((msg) => {
        const k = Math.random()
        return (<Comment key={k} name={msg.student_name ? msg.student_name : msg.teacher_name} body={msg.content} sendDate={msg.created_at} />)
    })



    const { mutate: sendMessage } = useTeachersendMessage()



    return (
        <>
            <List>
                <List.Item><Link to='/teacher/teams-section' >
                    <ThemeIcon color="teal" size={30} >
                        <IconArrowLeft size={30} />
                    </ThemeIcon></Link></List.Item>
            </List>
            <div className='discussion-block'>
                <h1 className='discussion-title'>
                    {roomName}
                </h1>
                <h3 className='discussion-description'>
                    {roomDiscription}
                </h3>
                <div>
                    {getAllMessges}
                </div>
                <RichTextEditor action={sendMessage} room_id={roomId} />
            </div>
        </>
    )
}

export default TeacherBlogDiscussion; 
