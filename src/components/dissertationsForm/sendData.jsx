import {LoadingOverlay, Modal} from '@mantine/core'
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import React from 'react'
// import { useSendChoice } from './connection/sendData/sendData';

function SendData(props) {

    // # const {mutate:sendChoice } = useSendChoice()


    const sendData = () => {
        let sendedData = props.data.map(({id}) => id);
        // sendedData [1, 2, 3, 4]
        console.log(sendedData)
        // * sended data tested and ready to post
        // # sendChoice(sendedData);
        // console.log(props.data)
    }
    return (

        <Modal withCloseButton={true}
            opened={
                props.opened
            }
            onClose={
                props.close
            }
            closeOnClickOutside={false}
            size={600}>

            <LoadingOverlay overlayBlur={1}
                loaderProps={
                    {
                        size: 'md',
                        color: 'gold'
                    }
                }
                overlayOpacity={0.3}
                overlayColor="whitesmoke"/>
            <div className="conformation-form">
                <h3>are you sure you want the list :
                </h3>

                <div className="final-list">
                    <ul> {

                        props.data.map((item, idx) => {
                            return <li key={
                                item.id
                            }>
                                <span> {
                                    idx + 1
                                } </span>
                                - {
                                item.id
                            }: {
                                item.name
                            } </li>

                    })
                    } </ul>
                </div>
                <h3>
                    as your final choice?</h3>
                {/*  TODO this button will send data   ''theme '' to server  */}
                <button className="btn-conf"
                    onClick={
                        () => {
                            sendData
                            showNotification({
                                title: 'change information secces', message: '', color: 'green',
                                // loading: true,
                                icon: <IconCheck size={20}/>
                            });
                        }
                }>complete operation
                </button>

            </div>
        </Modal>

    )
}

export default SendData
