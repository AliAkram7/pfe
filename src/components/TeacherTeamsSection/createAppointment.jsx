import { Button, Flex, Group, LoadingOverlay, Select, SimpleGrid, Textarea, TextInput, Title } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconBrandTelegram } from '@tabler/icons';
import React from 'react'
import { useTeacherContext } from '../../contexts/teacherContext';
import { useCreateAppointments } from './connection/sendData/sendData';

function CreateAppointment() {

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


  const { mutate: createAppointments } = useCreateAppointments()

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

    console.log(payload)

    createAppointments(payload)


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
                placeholder="Pick dates"
                // value={value}
                // onChange={setValue}
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
            <Group grow >
              <Textarea
                withAsterisk
                label='state of progress'
                placeholder='state of progress'
                minRows={2}
                {...form.getInputProps('stateOfProgress')}
              />
            </Group>
          </SimpleGrid>
          <Textarea
            withAsterisk
            placeholder='required work'
            label='required work'
            minRows={2}
            {...form.getInputProps('requiredWork')}
          />
          <TextInput
            withAsterisk
            label="type of session"
            placeholder='virtual or face-to-face'
            {...form.getInputProps('typeOfSession')}
          />
          <Textarea
            withAsterisk
            placeholder='observation'
            label='observation'
            minRows={2}
            {...form.getInputProps('observation')}
          />

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


export default CreateAppointment