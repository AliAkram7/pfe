import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import "./teacherProfilePage.css";
import ChangeInfo from "./changeInfo";
import { useStateContext } from "../../contexts/ContextProvider";

import { useFetchTeacherData } from "./connection/receiveData/fetchData";
import { LoadingOverlay, Transition } from "@mantine/core";
import { useTeacherContext } from "../../contexts/teacherContext";


function TeacherProfilePage(props) {
    const [opened, {
        close,
        open
    }
    ] = useDisclosure(false);


    const { teacher, setTeacher } = useTeacherContext();
    const { setRole } = useStateContext()


    const onSuccess = () => {
        setTeacher(data?.data.user);
        setRole(data?.data.role)
    }
    const onError = () => {
    }

    const { data, isLoading, isError, isSuccess } = useFetchTeacherData(onSuccess)
    // console.log(data?.data)

    useEffect(() => {
        setTeacher(data?.data.user);
    }, [data?.data])


    const [loaded, setLoaded] = useState(false)
        useEffect(() => {
            setTimeout(setLoaded(true), 2000)
            

        }, [])
        




    if (isLoading) return <LoadingOverlay loaderProps={{ size: 'xl', color: 'gold', variant: 'rotate', }} />;
    if (isError) return <p>Error :(</p>;

    return (


        <>   

            <ChangeInfo opened={opened}
                close={close} />
            <div   className='main-page-name'>
                <h1>profile</h1>
            </div>
            <div    className="pageWrapper">
                <div className='person-card'>
                    <div className='circle-name'>
                        <h1   >{teacher?.name.toUpperCase().charAt(0)}</h1>
                    </div>


                    <div className='person-info'>
                        <h2 className='person-name'>{teacher?.name}</h2>
                        <h3 className='person-email'>{teacher?.personal_email}</h3>
                        <h3 className='person-email'>{teacher?.institutional_email}</h3>
                        <h3 className='person-code'>{teacher?.tel}</h3>
                        <h5 className='person-code'>(N){teacher?.code}</h5>

                        <h3 className='person-info-change'>
                            <button className="btn-change-info"
                                onClick={open}>
                                change information</button>
                        </h3>
                    </div>



                </div>


            </div>

        </>

    );
}

export default TeacherProfilePage;
