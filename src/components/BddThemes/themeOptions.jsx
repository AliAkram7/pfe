import { Menu, Button, Text, Modal, SimpleGrid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconDotsVertical, IconEdit, IconLockOff, IconLockOpen, IconX, IconZoomReset } from '@tabler/icons';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useValidateTheme } from './connetion/fetchData';
import { ThemeDescriptionContent } from './themeDescriptionContent';


function ThemeOption(props) {


    const { mutate: validateTheme } = useValidateTheme()

    const queryClient = useQueryClient()

    const handleAccept = () => {

        const payload = { suggestion_id: props.row.id, response: 1 }
        validateTheme(payload)

        // queryClient.invalidateQueries('fetchListOfTheme');

    }

    const handleRefuse = () => {
        const payload = { suggestion_id: props.row.id, response: 0 }

        validateTheme(payload)
        // queryClient.invalidateQueries('fetchListOfTheme');

    }

    const [description_content, { open:showMore ,   close: hide }] = useDisclosure()

    const [theme_description, setTheme_description] = useState({})



    // const showMore = () => {

    //     setTheme_description({
    //         key: {nanoid} , 
    //         title: props.row.title,
    //         description: props.row.description,
    //         objectives_of_the_project: props.row.objectives_of_the_project,
    //         key_word: props.row.key_word,
    //         work_plan: props.row.work_plan,
    //         research_domain: props.row.research_domain,
    //         teacher: props.row.teacher,
    //         send_at: props.row.send_at,
    //     })
    //     _showMore() ; 
    // }


    return (
        <>
            <Modal
                key={nanoid()}
                opened={description_content} onClose={hide} size='xl'      >
                <SimpleGrid  >
                    <ThemeDescriptionContent row={props.row} />
                </SimpleGrid>
            </Modal>
            <Menu shadow="md" position='left' width={200} closeDelay={10} transition={'scale-x'} zIndex={20}  >
                <Menu.Target>
                    <Button variant='white' ><IconDotsVertical color='teal' /></Button>
                </Menu.Target>
                <Menu.Dropdown   >
                    <Menu.Label>options</Menu.Label>
                    {props.row.status === '0' ?
                        <Menu.Item color='teal' icon={<IconCheck color='teal' size={14} />} onClick={handleAccept}  >Accepted</Menu.Item>
                        :
                        <Menu.Item color='red' icon={<IconX size={14} color='red' />} onClick={handleRefuse}   >cancel</Menu.Item>
                    }
                        <Menu.Item color='teal' icon={<IconZoomReset size={14}  color='teal' />} onClick={showMore}   >show all details</Menu.Item>

                </Menu.Dropdown>
            </Menu>
        </>
    );
}
export default ThemeOption; 