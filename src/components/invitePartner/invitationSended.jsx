import {  LoadingOverlay, ScrollArea } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons';
import React, { useEffect, useState } from 'react'
import UserAvatar from '../avatar/avatar';
import { useFetchInvitationSended } from './connection/receiveData/fetchData';
import { sendResponse } from './connection/sendData/axiosUrl';
import { useResponse } from './connection/sendData/sendData';

function InvitationSended() {

    // ! useQuery hook to fetch data 
    const onSuccess = (data) => {
        // console.log('data fatching seccessfuly ', data.data); 
    }
    const onError = (error) => {
        // console.log('data fatching error ', error.message ); 
    }

    const { data: InvitationSended } = useFetchInvitationSended(onSuccess, onError);
    // !mutate function to send Response
    const { mutate: sendResponse, isLoading, isSuccess } = useResponse();


    const [overlayAction, setOverlayAction] = useState(false)

    const handleAction = (codeSender, e) => {
        setOverlayAction(true)

        const sendedData = {
            codeSender: codeSender,
            actionValue: -1
        }

        console.log(sendedData)

        // ! send Invitation
        sendResponse(sendedData)

        setTimeout(() => {
            setOverlayAction(false);
            // showNotification({ title: 'invitaion cancled', autoClose: 3000, color: 'yellow', icon: <IconX   /> })
        }, 3000);


    }





    return (
        <>
            <div className='section-invitation-sended-list'>
                {InvitationSended?.data.length > 0   &&  <h1>invitation sended
                </h1> }
                <ScrollArea   offsetScrollbars={false}  scrollHideDelay={1000} >
                <ul>
                    <LoadingOverlay visible={overlayAction}
                        overlayBlur={1}
                        loaderProps={
                            {
                                size: 'md', 
                                color: 'gold'
                            }
                        }
                        overlayOpacity={0.3}
                        overlayColor="whitesmoke" /> {
                            InvitationSended?.data.map(item => {
                            return (

                                item.isAccepted == 0  ? (

                                    <li key={
                                        item.code
                                    }>

                                        <UserAvatar username={item.name}
                                            userinfo={item.code}
                                            email={item.email}
                                            tel={item.tel}

                                            date={new Date(item.created_at).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "numeric",
                                                minute: "numeric"
                                            })}
                                        />

                                        {item.isAccepted !=1 ?
                                            <div className="section-invitation-list-action">
                                                <button className='btn-refuse-inv'
                                                    name="annuler"
                                                    onClick={
                                                        (e) => handleAction(item.code, e)
                                                    }>annuler</button>
                                            </div>
                                            : null
                                        }
                                    </li>) : null

                            )
                        })
                    } </ul>
                    </ScrollArea>
            </div>
        </>
    )
}

export default InvitationSended
