import { Menu, Button, Text } from '@mantine/core';
import { Icon123, Icon3dCubeSphere, IconAlertTriangle, IconArrowRotaryFirstLeft, IconArrowUpCircle, IconDotsVertical, IconEdit, IconLockOff, IconLockOpen, IconMessageCircle, IconPanoramaHorizontal, IconPanoramaVertical, IconRecycle, IconRefresh, IconSettings, IconTrash, IconX } from '@tabler/icons';
import { useQueryClient } from 'react-query';
import { useAdminContext } from '../../contexts/adminContext';
import { useStateContext } from '../../contexts/ContextProvider';
import { useTeacherContext } from '../../contexts/teacherContext';
import { useDeleteInscription, useDeleteStudent, useLockStudentAccount, useResetStudent, useUnLockStudentAccount } from './connection/sendData/sendData';
// import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons-react';

function StudentOption(props) {


  const {selectedYearId} = useStateContext()


  console.log("selected yearID",selectedYearId)

    const {mutate : deleteStudent } = useDeleteStudent() ; 
    const onDelete=()=>{
        const payload ={
            code : props.row.code , 
            yearId: selectedYearId 
        }
        deleteStudent(payload)    
    }

    const {mutate : deleteInscription } = useDeleteInscription() ; 

    const onDeleteInscription=()=>{
      const payload ={
        code : props.row.code , 
        yearId: selectedYearId 
      }
        deleteInscription(payload)    
    }



    const {mutate : resetStudent } = useResetStudent() ; 
    const onReset=()=>{
        const payload ={
            code : props.row.code,
            yearId: selectedYearId 
        }
        resetStudent(payload)    
    }

    const {mutate : lockStudentAccount } = useLockStudentAccount() ; 
    const onLock=()=>{
        const payload ={
            code : props.row.code
        }
        lockStudentAccount(payload)    
    }    



    const {mutate : unLockStudentAccount } = useUnLockStudentAccount() ; 
    const onUnLock=()=>{
        const payload ={
            code : props.row.code
        }
        unLockStudentAccount(payload)    
    }    





    const queryClient = useQueryClient()
  return (
    <Menu shadow="md"  position='left'  width={200} closeDelay={10}  transition={'scale-x'}  zIndex={20}  >
      <Menu.Target>
        <Button variant='white' ><IconDotsVertical color='teal'/></Button>
      </Menu.Target>
      <Menu.Dropdown   >
        <Menu.Label>options  for student {props.row.name} </Menu.Label>
        <Menu.Item icon={<IconEdit size={14} />}   onClick={()=>{props.setEdit()  ; queryClient.invalidateQueries('fetchStudentsData')}}   >edit information </Menu.Item>
    { props.row.account_status !== 'locked' ? 
     <Menu.Item   color='red'  icon={<IconLockOff color='red' size={14}   />} onClick={onLock}  >lock  account</Menu.Item> : 
        <Menu.Item   color='teal'  icon={<IconLockOpen color='teal' size={14} /> } onClick={onUnLock}    > unlock  account</Menu.Item>
        }
        <Menu.Item   color='red'  icon={<IconRefresh color='red' size={14}   /> } onClick={onReset}    >reset account</Menu.Item>
        <Menu.Item   color='red'  icon={<IconTrash color='red' size={14}   /> } onClick={onDelete}    >delete account</Menu.Item>
        <Menu.Item   color='red'  icon={<IconTrash color='red' size={14}   /> } onClick={onDeleteInscription}    >delete  Inscription</Menu.Item>

      </Menu.Dropdown>
    </Menu>
  );
}
export default StudentOption; 