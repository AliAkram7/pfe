import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import "./teacherProfilePage.css";
import ChangeInfo from "./changeInfo";
import { useStateContext } from "../../contexts/ContextProvider";

import { useFetchTeacherData } from "./connection/receiveData/fetchData";
import { Button, Flex, Group, Highlight, Indicator, LoadingOverlay, SimpleGrid, Text, Transition } from "@mantine/core";
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

    let profile = <h2>hello</h2>

    if (teacher?.Axes_and_themes_of_recherche) {

        profile = (JSON.parse(teacher?.Axes_and_themes_of_recherche)).map((item) => {

            return <Text>+ {item?.label}</Text>

        })
    }




    if (isLoading) return <LoadingOverlay loaderProps={{ size: 'xl', color: 'gold', variant: 'rotate', }} />;
    if (isError) return <p>Error :(</p>;

    return (


        <>

            <ChangeInfo opened={opened}
                close={close} />

            <div className="pageWrapper">
                <Group className='person-card'>
                    <div className='circle-name'>
                        <h1>{teacher?.name.toUpperCase().charAt(0)}</h1>
                    </div>


                    <div className='person-info'>
                        <h2 className='person-name'>Teacher : {teacher?.name}</h2>
                        <h3 className='person-email'><Flex gap={5} ><Highlight color={'teal'} > Personal Email :</Highlight> {teacher?.personal_email} </Flex>  </h3>
                        <h3 className='person-email'><Flex gap={5} ><Highlight color={'teal'} >Institutional Email :</Highlight> {teacher?.institutional_email} </Flex>  </h3>
                        <h3 className='person-code'><Flex gap={5} ><Highlight color={'teal'} > Phone Number :</Highlight> {teacher?.tel}</Flex></h3>
                        <h5 className='person-code'><Flex gap={5} ><Highlight color={'teal'} > Code : </Highlight> {teacher?.code}</Flex> </h5>
                        <h5 className='person-code'><Flex gap={5} ><Highlight color={'teal'} >  Grade: </Highlight>{teacher?.abbreviated_name}</Flex></h5>
                        <Flex gap={10} >
                            <h5 className='person-code'><Flex gap={5} ><Highlight color={'teal'} > Axes and themes of recherche : </Highlight></Flex></h5>

                            <SimpleGrid cols={1}  >
                                {teacher?.Axes_and_themes_of_recherche ? profile : null}
                            </SimpleGrid>
                        </Flex>

                        <h3 className='person-info-change'>
                            <Button variant="filled"
                                onClick={open}>
                                change information</Button>
                        </h3>

                    </div>



                </Group>


            </div>

        </>

    );
}

export default TeacherProfilePage;
