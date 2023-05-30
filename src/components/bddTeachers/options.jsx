import { Menu, Button, Text } from '@mantine/core';
import { Icon123, Icon3dCubeSphere, IconAlertTriangle, IconArrowRotaryFirstLeft, IconArrowUpCircle, IconDotsVertical, IconEdit, IconLockOff, IconLockOpen, IconMessageCircle, IconPanoramaHorizontal, IconPanoramaVertical, IconRecycle, IconRefresh, IconSettings, IconX } from '@tabler/icons';
import { useQueryClient } from 'react-query';
import {  useDeleteTeacher,  useLockTeacherAccount, useResetTeacher, useUnLockTeacherAccount } from './connection/sendData/sendData';
// import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons-react';

function Option(props) {


    const {mutate : deleteTeacher } = useDeleteTeacher() ; 
    const onDelete=()=>{
        const payload ={
            code : props.row.code
        }
        deleteTeacher(payload)    
    }

    const {mutate : resetTeacher } = useResetTeacher() ; 
    const onReset=()=>{
        const payload ={
            code : props.row.code
        }
        resetTeacher(payload)    
    }


    const {mutate : lockTeacherAccount } = useLockTeacherAccount() ; 
    const onLock=()=>{
        const payload ={
            code : props.row.code
        }
        lockTeacherAccount(payload)    
    }    





    const {mutate : unLockTeacherAccount } = useUnLockTeacherAccount() ; 
    const onUnLock=()=>{
        const payload ={
            code : props.row.code
        }
        unLockTeacherAccount(payload)    
    }    





    const queryClient = useQueryClient()
  return (
    <Menu shadow="md"  position='left'  width={200} closeDelay={10}  transition={'scale-x'}  zIndex={20}  >
      <Menu.Target>
        <Button variant='white' ><IconDotsVertical color='teal'/></Button>
      </Menu.Target>
      <Menu.Dropdown   >
        <Menu.Label>options</Menu.Label>
        <Menu.Item icon={<IconEdit size={14} />}   onClick={()=>{props.setEditIndex(props.index)  }}   >edit information </Menu.Item>
    { props.row.account_status !== 'locked' ? 
     <Menu.Item   color='red'  icon={<IconLockOff color='red' size={14}   />} onClick={onLock}  >lock  account</Menu.Item> : 
        <Menu.Item   color='teal'  icon={<IconLockOpen color='teal' size={14} /> } onClick={onUnLock}    > unlock  account</Menu.Item>
        }
        <Menu.Item   color='red'  icon={<IconRefresh color='red' size={14}   /> } onClick={onReset}    >reset account</Menu.Item>
        <Menu.Item   color='red'  icon={<IconX color='red' size={14}   /> } onClick={onDelete}    >delete account</Menu.Item>

      </Menu.Dropdown>
    </Menu>
  );
}
export default Option; 