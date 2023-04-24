import { useDisclosure } from "@mantine/hooks";
import React, { useEffect } from "react";
import "./profilePage.css";
import ChangeInfo from "./changeInfo";
import { useStateContext } from "../../contexts/ContextProvider";

import { useFetchStudentData } from "./connection/receiveData/fetchData";
import { Button, LoadingOverlay } from "@mantine/core";
import { useStudentContext } from "../../contexts/studentContext";




function ProfilePage() {
    const [opened, {
        close,
        open
    }
    ] = useDisclosure(false);


    const { student, setStudent } = useStudentContext();
    const { setRole } = useStateContext();

    const onSuccess = () => {
        setStudent(studentData?.data.user);
    }
    const onError = () => {
        console.log(error)
    }


    const { data: studentData, isLoading, isError, error } = useFetchStudentData(onSuccess, onError)



    useEffect(() => {
        setStudent(studentData?.data.user);
        setRole(studentData?.data.role)
        console.log(studentData?.data.role)
    }, [studentData?.data])





    if (isLoading) return <LoadingOverlay loaderProps={{ size: 'xl', color: 'gold', variant: 'rotate', }} />;
    if (isError) return <p>Error :(</p>;

    return  (


        <>
            <ChangeInfo opened={opened}
                close={close} />
   
            <div className="pageWrapper">
                <div className='person-card'>
                    <div className='circle-name'>
                        <h1   >{student?.name?.toUpperCase().charAt(0)}</h1>
                    </div>


                    <div className='person-info'>
                        <h2 className='person-name'>{student?.name}</h2>
                        <h3 className='person-email'>{student?.email}</h3>
                        <h3 className='person-code'>{student?.tel}</h3>
                        <h5 className='person-code'>(N){student?.code}</h5>
                 

                        <h3 className='person-info-change'>
                            <Button 
                            color='teal' size="sm"
                            // className="btn-change-info"
                                onClick={open}
                                >
                                change information</Button>
                        </h3>
                    </div>



                </div>

            </div>
        </>
    );



      


}



export default ProfilePage;
