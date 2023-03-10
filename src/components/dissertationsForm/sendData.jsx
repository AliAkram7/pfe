import {Button, List, LoadingOverlay, Modal, ThemeIcon} from '@mantine/core'
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconCircleDashed } from '@tabler/icons';
import React from 'react'
import { useSendChoice } from './connection/sendData/sendData';

function sendData(props) {

     const {mutate:sendChoice, isLoading , isSuccess } = useSendChoice()


    const onSubmit = () => {
        let sendedData = props.data.map(({id}) => id);
        // sendedData [1, 2, 3, 4]

        let payload   =  { theme_list  : sendedData } ; 

        payload =   payload


        
        sendChoice(payload)


    }
    return (
        <>
        <LoadingOverlay  visible = {isLoading}  />
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
                    <List size={20} > {

                        props?.data?.map((item, idx) => {
                            return <List.Item
                            
                            icon={
                                <ThemeIcon  size={24} radius="xl">
                                  <IconCheck size="1rem" />
                                </ThemeIcon>
                              }
                            key={
                                item.id
                            }>
                                <span> {
                                    idx + 1
                                } </span>
                                - {
                                // item.id
                            } {
                                item.title
                            } </List.Item>

                    })
                    } </List>
                </div>
                <h3>     </h3>
                {/*  // TODO this button will send data   ''theme '' to server  */}
                <Button variant='outline'
                    size='md'
                    onClick={
                        onSubmit 
                }>complete operation
                </Button>

            </div>
        </Modal>
        </>

    )
}

export default sendData ; 
