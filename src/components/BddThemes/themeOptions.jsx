import { Menu, Button, Text } from '@mantine/core';
import { IconCheck, IconDotsVertical, IconEdit, IconLockOff, IconLockOpen, IconX } from '@tabler/icons';
import { useQueryClient } from 'react-query';
import { useValidateTheme } from './connetion/fetchData';


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

    return (
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

            </Menu.Dropdown>
        </Menu>
    );
}
export default ThemeOption; 