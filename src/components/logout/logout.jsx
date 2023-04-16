import { Button, LoadingOverlay, Overlay } from "@mantine/core";
import { useContext } from "react";
import { useQueryClient } from "react-query";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { axiosClient } from "../../axois-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { useStudentContext } from "../../contexts/studentContext";
import './logout.css'

function Logout(props) {

  
  const {setToken, setRole, setUser } = useStateContext()
  const {setIsInTeam} = useStudentContext()
  const queryClient = useQueryClient()

  const handleLogout =   async () => {

     return await axiosClient(axiosClient.post('/studentLogout')).then(()=>{

     }).catch(()=>{
      setUser(null)
      setIsInTeam(false);
      setRole('')
      setToken(null);
      window.location.reload();
     })
   
    
  }
  return (
    <div className='group-Logout'>
      <Button  color='teal' variant="outline"  size="lg" >
        <Link onClick={() => props.setOpened(false)} to='/'>keep me here </Link>
      </Button>
      <Button  color='red'  variant='outline'  onClick={handleLogout}   size="lg">
        <Link to='/'>log me out </Link>
      </Button>
    </div>
  );
}

export default Logout;
