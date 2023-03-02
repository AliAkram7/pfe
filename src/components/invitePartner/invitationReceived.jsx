import { LoadingOverlay } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router';
import { useStateContext } from '../../contexts/ContextProvider';
import UserAvatar from '../avatar/avatar';
import { useFetchInvitationRecieved } from './connection/receiveData/fetchData';
import { sendResponse } from './connection/sendData/axiosUrl';
import { useResponse } from './connection/sendData/sendData';
// import { sendInvitation } from './connection/sendData/axiosUrl'
// import { useFetchInvitation } from './connection/receiveData/fetchData';

function InvitationReceived() {

    // ! useQuery hook to fetch data 
    const { setIsInTeam } = useStateContext()
    const onSuccess = (data) => {
        // console.log('data fatching seccessfuly ', data.data);   

    }


const onError = (error) => {
    // console.log('data fatching error ', error.message ); 
}






const { data: invitationReceived } = useFetchInvitationRecieved(onSuccess, onError);
// !mutate function to send Response
const { mutate: sendResponse, isLoading, isSuccess } = useResponse();






const [overlayAction, setOverlayAction] = useState(false)

const handleAction = (codeSender, e) => {
    setOverlayAction(true)

    const sendedData = {
        codeSender: codeSender,
        actionValue: e.target.name === "accepted" ? 1 : -1
    }

    console.log(sendedData)

    // ! send Invitation
    sendResponse(sendedData)

    setTimeout(() => {
        setOverlayAction(false);
        showNotification({ title: 'invitation accpted', autoClose: 3000, color: 'green', icon: <IconCheck /> })
    }, 3000);


}



return (
    <>
        <div className='section-invitation-list'>
            <h1>Partners
            </h1>
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
                    invitationReceived?.data.map(item => {
                        return (

                            item.isAccepted != -1 ? (

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

                                    {item.isAccepted === 0 ?
                                        <div className="section-invitation-list-action">
                                            <button className='btn-accept-inv'
                                                name="accepted"
                                                onClick={
                                                    (e) => handleAction(item.code, e)
                                                }>accepted</button>
                                            <button className='btn-refuse-inv'
                                                name="refused"
                                                onClick={
                                                    (e) => handleAction(item.code, e)
                                                }>refused</button>
                                        </div>
                                        : null
                                    }
                                </li>) : null

                        )
                    })
                } </ul>
        </div>
    </>
)
}

export default InvitationReceived
