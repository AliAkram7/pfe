import { Menu ,  Avatar } from "@mantine/core";
import { IconSettings, IconLogout, IconUser } from "@tabler/icons";
import { Link } from "react-router-dom";
import { useStudentContext } from "../../contexts/studentContext";
import './profileMenu.css'
function ProfileMenu(props) {

  const {student} = useStudentContext();

    

  return (
    <Menu shadow='sm' width={240}  position="left-start"   classNames='menu-profile' size={45}  withArrow arrowPosition="center"  >
        <Menu.Target   >
          <Avatar/>
        </Menu.Target>
      <Menu.Dropdown     >
        <Menu.Label     size={50} >{student?.name}</Menu.Label>
        <Link    to='profile'  className='mon_profile' > 
         <Menu.Item      icon={<IconUser size={20} />}>Profile</Menu.Item></Link>
        <Menu.Item   color='red' icon={<IconLogout size={20} />} onClick={()=>{props.setOpened(true)}}  >
          log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ProfileMenu;
