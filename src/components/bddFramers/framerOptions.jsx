import { Menu, Button, Text } from '@mantine/core';
import { IconDotsVertical, IconEdit, IconX } from '@tabler/icons';
import { useQueryClient } from 'react-query';
import { useDeleteTeacherFarmer } from './connection/connection';

// import { useDeleteStudentRank } from './connection/connection';

function FramerOption(props) {


  const queryClient = useQueryClient();

  const {mutate : deleteTeacherFarmer } = useDeleteTeacherFarmer()

  const onDelete = () => {
    const payload = { code: props.row.code }
    deleteTeacherFarmer(payload) ; 
  }


  return (
    <Menu shadow="md" position='left' width={200} closeDelay={10} transition={'scale-x'} zIndex={20}  >
      <Menu.Target>
        <Button variant='white' ><IconDotsVertical color='teal' /></Button>
      </Menu.Target>
      <Menu.Dropdown   >
        <Menu.Label>options</Menu.Label>
        <Menu.Item color='red' icon={<IconX color='red' size={14} />} onClick={onDelete}  > delete </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
export default FramerOption; 