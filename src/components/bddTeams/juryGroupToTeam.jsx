import { Button, Flex, Group, LoadingOverlay, Select, SimpleGrid, Textarea, TextInput, Title } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconBrandTelegram } from '@tabler/icons';
import React from 'react'
import { useTeacherContext } from '../../contexts/teacherContext';
// import { useCreateAppointments } from './connection/sendData/sendData';

function CreateAppointmentPresentation() {

    const { teamSelected, setIsInTeam } = useTeacherContext();


    const form = useForm({
        initialValues: {
            dateApp: '',
            timeApp: '',
            stateOfProgress: '',
            requiredWork: '',
            typeOfSession: '',
            observation: '',
        },


        // functions will be used to validate values at corresponding key
        validate: {
            dateApp: isNotEmpty('cannot be empty'),
            timeApp: isNotEmpty('cannot be empty'),
            stateOfProgress: isNotEmpty('cannot be empty'),
            requiredWork: isNotEmpty('cannot be empty'),
            typeOfSession: isNotEmpty('cannot be empty'),
            observation: isNotEmpty('cannot be empty'),
        },
    });


    //   const { mutate: createAppointments } = useCreateAppointments()

    const onSubmit = (values) => {



        const dateTime = new Date(
            values.dateApp.getFullYear(),
            values.dateApp.getMonth(),
            values.dateApp.getDate(),
            values.timeApp.getHours(),
            values.timeApp.getMinutes(),
            values.timeApp.getSeconds(),
        );

        console.log(dateTime)


        let payload = {
            team_id: teamSelected,
            dateApp: dateTime,
            stateOfProgress: values.stateOfProgress,
            requiredWork: values.requiredWork,
            typeOfSession: values.typeOfSession,
            observation: values.observation,
        };


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
                                format="24"
                                {...form.getInputProps('timeApp')}
                            />
                        </Group>
                        {/* <Group grow > */}

                            <Select
                                data={[]}
                                label='group of jury'
                            />
                            <Select
                                data={[]}
                                label='tester examiner 1'
                            />
                            <Select
                                data={[]}
                                label='tester examiner 2'
                            />


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