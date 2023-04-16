import { TextInput, Textarea, SimpleGrid, Group, Title, Button, Select, Flex, Menu, MultiSelect, Tabs, Transition, LoadingOverlay } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconBrandTelegram, IconDotsVertical, IconKey, IconPlus, IconX } from '@tabler/icons';
import { useEffect, useRef, useState } from 'react';
import { useFetchLicenseTeams, useSendLicenseTheme, useSendSuggestion } from './connection/sendSuggestion';
import { Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';



export function SuggestionThemeLicense() {

    const specialty_name = useRef()






    const [selectedDep, setSelectedDep] = useState("")
    const [specialtyAv, setSpecialtyAv] = useState("")


    const [opened, { open, close }] = useDisclosure(false)


    const { data: fetchLicenseStudents, isLoading } = useFetchLicenseTeams();


    const mapFetchLicenseStudents = fetchLicenseStudents?.data.teams_list.map((team) => {
        return {
            value: team.team_id,
            label: team?.team_info[0]?.name && team?.team_info[1]?.name
                ? (team?.team_info[0]?.name +
                    " and " + team?.team_info[1]?.name) : team?.team_info[0]?.name ?
                    team?.team_info[0]?.name :
                    team?.team_info[1]?.name ?
                        team?.team_info[1]?.name : null,
            group: team.specialty_name,
            dep_name: team.dep_name,
            specialty_id: team.specialty_id
        }
    })



    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            team_id: '',
        },


        // functions will be used to validate values at corresponding key
        validate: {
            title: isNotEmpty('cannot be empty'),
            description: (value) => (value.length < 10 ? 'too short description' : null),
            // specialty: isNotEmpty('cannot be empty'),
            team_id: isNotEmpty('cannot be empty'),
        },
    });


    const { mutate: sendLicenseTheme, isLoading: sendLicenseThemeLoading } = useSendLicenseTheme()

    const [specialty_id, setSpecialty_id] = useState('');


    useEffect(() => {
        const result = mapFetchLicenseStudents?.find(item => item.value === form.values.team_id);

        if (result) {
            setSelectedDep(result?.dep_name);
            setSpecialtyAv(result?.group)
            setSpecialty_id(result?.specialty_id)
        }
    }, [form.values.team_id])


    const onSubmit = (values) => {


        let payload = {
            title: values.title,
            description: values.description,
            team_id: values.team_id,
            specialty_id: specialty_id
        };



        sendLicenseTheme(payload);

    }

    return (
        <>
            <LoadingOverlay visible= {sendLicenseThemeLoading} />
            <SimpleGrid w='80%' mt={50} >
                <SimpleGrid w='100%'  >
                    <Flex justify='flex-start' align='center' >
                        <Title m={10} order={3} >
                            MUSTAPHA STAMBOULI UNIVERSITY <br />
                            FACULTY OF EXACT SCIENCES <br />
                            {selectedDep.toUpperCase()} <br />
                            {specialtyAv.toUpperCase()}
                            <Title m={15} order={4}  >
                                proposal for a final study project
                            </Title>
                        </Title>
                    </Flex>
                </SimpleGrid>
                {/* <Group spacing={10} w='100%' position='center' grow   > */}
                <SimpleGrid breakpoints={[{ minWidth: '100%' }]}>
                    <form onSubmit={form.onSubmit(onSubmit)} >
                        <SimpleGrid>

                            {!isLoading ? (
                                <Select
                                    label='for team'
                                    data={mapFetchLicenseStudents}

                                    {...form.getInputProps('team_id')}
                                />
                            ) : null}

                            <Group w='50%' grow>
                                <TextInput
                                    withAsterisk
                                    label='theme title'
                                    placeholder='theme title'
                                    name='themeTitle'
                                    {...form.getInputProps('title')}
                                />
                            </Group>
                        </SimpleGrid>


                        <Textarea
                            withAsterisk
                            placeholder='description'
                            label='description'
                            minRows={6}
                            {...form.getInputProps('description')}
                        />

                        <Group position="left"

                            mt="xl"   >
                            <Button size='md'
                                type='submit'
                            >send<IconBrandTelegram />
                            </Button>
                        </Group>

                    </form>
                </SimpleGrid>
                {/* </Group> */}
            </SimpleGrid>

        </>
    );
}