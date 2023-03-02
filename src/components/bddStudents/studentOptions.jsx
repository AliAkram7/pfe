import { Menu, Button, Text } from '@mantine/core';
import { Icon123, Icon3dCubeSphere, IconAlertTriangle, IconDotsVertical, IconEdit, IconLockOff, IconLockOpen, IconMessageCircle, IconPanoramaHorizontal, IconPanoramaVertical, IconSettings, IconX } from '@tabler/icons';
import { useQueryClient } from 'react-query';
import { useDeleteStudent, useLockStudentAccount, useUnLockStudentAccount } from './connection/sendData/sendData';
// import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons-react';

function StudentOption(props) {



    // * delete # 
    const {mutate : deleteStudent } = useDeleteStudent() ; 
    const onDelete=()=>{
        const payload ={
            code : props.row.code
        }
        deleteStudent(payload)    
    }



    // !! lock 
    const {mutate : lockStudentAccount } = useLockStudentAccount() ; 
    const onLock=()=>{
        const payload ={
            code : props.row.code
        }
        lockStudentAccount(payload)    
    }    

    // !! unlock 

    const {mutate : unLockStudentAccount } = useUnLockStudentAccount() ; 
    const onUnLock=()=>{
        const payload ={
            code : props.row.code
        }
        unLockStudentAccount(payload)    
    }    


    // !! update keep at last 




    const queryClient = useQueryClient()
  return (
    <Menu shadow="md"  position='left'  width={200} closeDelay={10}  transition={'scale-x'}  zIndex={20}  >
      <Menu.Target>
        <Button variant='white' ><IconDotsVertical color='teal'/></Button>
      </Menu.Target>
      <Menu.Dropdown   >
        <Menu.Label>options</Menu.Label>
        <Menu.Item icon={<IconEdit size={14} />}   onClick={()=>{props.setEdit()  ; queryClient.invalidateQueries('fetchStudentsData')}}   >edit information </Menu.Item>
        <Menu.Item   color='red'  icon={<IconLockOff color='red' size={14}   />} onClick={onLock}  >lock  account</Menu.Item>
        <Menu.Item   color='teal'  icon={<IconLockOpen color='teal' size={14} /> } onClick={onUnLock}    > unlock  account</Menu.Item>
        <Menu.Item   color='red'  icon={<IconX color='red' size={14}   /> } onClick={onDelete}    >delete account</Menu.Item>

      </Menu.Dropdown>
    </Menu>
  );
}
export default StudentOption; 