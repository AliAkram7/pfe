import { setNavigationProgress } from "@mantine/nprogress";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import "./loginTo.css";
function LoginTo() {

  const {setRole} = useStateContext(); 


  return (
    // TODO make variable change went user change



    <div className='group-loginTo'>
      <button>
        <Link to='/login'  onClick={()=>{setRole('student')}}     >
          student
        </Link>
      </button>
      <button>
        <Link to='/login'  onClick={()=>{setRole('teacher')}}    >teacher</Link>
      </button>
      <button>
        <Link to='/login'  onClick={()=>{setRole('admin')}}    >Admin</Link>
      </button>
    </div>
  );
}

export default LoginTo;
