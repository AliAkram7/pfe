import { Button, Flex, Group, LoadingOverlay, Select, SimpleGrid, Textarea, TextInput, Title } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconBrandTelegram } from '@tabler/icons';
import React, { useEffect } from 'react'
import { useTeacherContext } from '../../contexts/teacherContext';
import { useCreatePresentation, useFetchTeachers } from './connection/connection';
import JuryMemberSelectOption from './juryMemberSelectOption';
import JuryMembersMasterForm from './juryMembersLayoutMaster';
// import { useCreateAppointments } from './connection/sendData/sendData';

function CreateAppointmentPresentation(props) {


    const { ThemeRequirement, row } = props;

    const { affectationMethod } = useTeacherContext();


    const { mutate: createPresentation } = useCreatePresentation()

    const { data: fetchTeachers, isLoading } = useFetchTeachers()

    let teachersDomain = []
    teachersDomain = fetchTeachers?.data.map(teacher => {
        return { ...teacher, subLabel: teacher.Axes_and_themes_of_recherche ? JSON.parse(teacher.Axes_and_themes_of_recherche) : [] }
    })

    useEffect(() => {


    }, [])


    // console.log(teachersDomain)


    const form = useForm({
        initialValues: {
            president: '',
            ex1: '',
            ex2: '',
            ex3: '',
            dateApp: '',
            timeApp: '',
            dateTest: '',
            timeTest: '',
            group_number: '',
            examiner_1: '',
            examiner_2: ''
        },


        // functions will be used to validate values at corresponding key
        validate: {

            dateApp: isNotEmpty('cannot be empty'),
            timeApp: isNotEmpty('cannot be empty'),
            // group_number: isNotEmpty('cannot be empty'),
            // requiredWork: isNotEmpty('cannot be empty'),
            examiner_1: isNotEmpty('cannot be empty'),
            examiner_2: isNotEmpty('cannot be empty'),
        },
    });


    //   const { mutate: createAppointments } = useCreateAppointments()

    const onSubmit = (values) => {



        const dateApp = new Date(
            values.dateApp.getFullYear(),
            values.dateApp.getMonth(),
            values.dateApp.getDate(),
            values.timeApp.getHours(),
            values.timeApp.getMinutes(),
            values.timeApp.getSeconds(),
        );


        const dateTest = new Date(
            values.dateTest.getFullYear(),
            values.dateTest.getMonth(),
            values.dateTest.getDate(),
            values.timeTest.getHours(),
            values.timeTest.getMinutes(),
            values.timeTest.getSeconds(),
        );




        let payload = {
            team_id: props.row.team_id,
            dateApp: dateApp,
            dateTest: dateTest,
            president: values.president,
            ex1: values.ex1,
            ex2: values.ex2,
            ex3: values.ex3,
            tester_1: values.examiner_1,
            tester_2: values.examiner_2,
        };




        console.log(payload)


        createPresentation(payload)

        // createAppointments(payload)



    }

    return (
        <>
            {/* <LoadingOverlay  /> */}

            {/* <Group spacing={10} w='100%' position='center' grow   > */}
            <SimpleGrid breakpoints={[{ minWidth: '100%' }]}>
                <form onSubmit={form.onSubmit(onSubmit)} >
                    <SimpleGrid>

                        <Group w='100%' grow>
                            <DatePicker
                                withAsterisk
                                type="multiple"
                                label="date"
                                placeholder="Pick date"
                                mx="auto"
                                maw={400}
                                minDate={new Date()}
                                {...form.getInputProps('dateApp')}
                            />
                            <TimeInput
                                withAsterisk
                                label="Pick time"
                                format="12"
                                {...form.getInputProps('timeApp')}
                            />
                        </Group>
                        {/* <Group grow > */}



                        {affectationMethod == 1 && !isLoading ?

                            <>

                                <JuryMembersMasterForm form={form}
                                    teachers={teachersDomain}
                                    ThemeRe={ThemeRequirement}
                                />
                                <Group w='100%' grow>
                                    <DatePicker
                                        withAsterisk
                                        type="multiple"
                                        label="date test project"
                                        placeholder="date test project"
                                        mx="auto"
                                        maw={400}
                                        minDate={new Date()}
                                        {...form.getInputProps('dateTest')}
                                    />
                                    <TimeInput
                                        withAsterisk
                                        label="Pick time"
                                        format="12"
                                        {...form.getInputProps('timeTest')}
                                    />
                                </Group>
                                <Select
                                    data={fetchTeachers?.data}
                                    label='tester project 1'
                                    placeholder='tester project 1'
                                    {...form.getInputProps('examiner_1')}
                                />

                                <Select
                                    data={fetchTeachers?.data}
                                    label='tester project 2'
                                    placeholder='tester project 2'
                                    {...form.getInputProps('examiner_2')}
                                />

                            </>
                            : <JuryMemberSelectOption form={form} />
                        }


                        {/* </Group> */}
                    </SimpleGrid>


                    <Group position="left"
                        mt="xl">
                        <Button size='xs'
                            type='submit'
                        >Submit
                        </Button>
                    </Group>

                </form>
            </SimpleGrid>
            {/* </Group> */}


        </>
    );
}


export default CreateAppointmentPresentation