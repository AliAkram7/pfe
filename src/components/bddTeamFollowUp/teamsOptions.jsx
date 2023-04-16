import { Menu, Button, Text, Modal, SimpleGrid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconDotsVertical, IconEdit, IconLockOff, IconLockOpen, IconX, IconZoomReset } from '@tabler/icons';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
// import { useValidateTheme } from './connetion/fetchData';
import { ThemeDescriptionContent } from '../BddThemes/themeDescriptionContent';


function TeamOption(props) {


    // const { mutate: validateTheme } = useValidateTheme()

    // const queryClient = useQueryClient()

    // const handleAccept = () => {

    //     const payload = { suggestion_id: props.row.id, response: 1 }
    //     validateTheme(payload)

    //     // queryClient.invalidateQueries('fetchListOfTheme');

    // }

    // const handleRefuse = () => {
    //     const payload = { suggestion_id: props.row.id, response: 0 }

    //     // validateTheme(payload)
    //     // queryClient.invalidateQueries('fetchListOfTheme');

    // }


    //  * 
    //  * title,
    //  * description,
    //  * send_at,
    //  * objectives_of_the_project,
    //  * key_word,
    //  * work_plan,
    //  * research_domain,


    // supervisor_info: {
    //     name: obj.supervisor_info?.name,
    //     institutional_email: obj.supervisor_info?.institutional_email,
    //     grad_abName: obj.supervisor_info?.abbreviated_name,
    //     grad_fName: obj.supervisor_info?.fullname,
    // },
    // member_1: {
    //     name: obj.member_1?.name,
    //     code: obj.member_1?.code,
    // },
    // member_2: {
    //     name: obj.member_2?.name,
    //     code: obj.member_2?.code,
    // },

    // list_theme: obj.list_theme,

    // theme_workOn: obj.theme_workOn

    const [description_content, { open: showMore, close: hide }] = useDisclosure()

    const [theme_description, setTheme_description] = useState({})


    return (
        <>
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
            <Menu shadow="md" position='left' width={200} closeDelay={10} transition={'scale-x'} zIndex={20}  >
                <Menu.Target>
                    <Button variant='white' ><IconDotsVertical color='teal' /></Button>
                </Menu.Target>
                <Menu.Dropdown   >
                    <Menu.Label>options</Menu.Label>
                    {/* {props.row.status === '0' ?
                        <Menu.Item color='teal' icon={<IconCheck color='teal' size={14} />} onClick={handleAccept}  >Accepted</Menu.Item>
                        :
                        <Menu.Item color='red' icon={<IconX size={14} color='red' />} onClick={handleRefuse}   >cancel</Menu.Item>
                    } */}
                    <Menu.Item color='teal' icon={<IconZoomReset size={14} color='teal' />} onClick={showMore}   >show all details</Menu.Item>

                </Menu.Dropdown>
            </Menu>
        </>
    );
}
export default TeamOption; 