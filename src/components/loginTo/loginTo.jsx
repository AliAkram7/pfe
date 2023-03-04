import { Button, Group } from "@mantine/core";
import { setNavigationProgress } from "@mantine/nprogress";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import "./loginTo.css";
function LoginTo() {

  const { setRole } = useStateContext();


  return (
    // TODO make variable change went user change



    <div className='group-loginTo'>

        <Button size="md" color='teal' >
      <Link to='/login' onClick={() => { setRole('student') }}  >
          student
      </Link>
        </Button>
      <Button size="md" color='teal' >
        <Link to='/login' onClick={() => { setRole('teacher') }}    >
          teacher
        </Link>
      </Button>
      <Button size="md" color='teal' >
        <Link to='/login' onClick={() => { setRole('admin') }}>
          Admin
          </Link>
      </Button>

    </div>
  );
}

export default LoginTo;
