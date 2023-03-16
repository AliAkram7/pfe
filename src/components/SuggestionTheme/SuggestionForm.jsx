import { TextInput, Textarea, SimpleGrid, Group, Title, Button, Select, Flex, Menu, MultiSelect } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconBrandTelegram, IconDotsVertical, IconKey, IconPlus, IconX } from '@tabler/icons';
import { useRef, useState } from 'react';
import { useSendSuggestion } from './connection/sendSuggestion';
import { Text } from '@mantine/core';


function KeyWord(props) {

    const { form } = props

    const fields = form.values.keyWords.map((_, index) => (
        <Group grow>
            <MultiSelect creatable placeholder="-" getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => {
                    const item = { value: query, label: query };
                    setData((current) => [...current, item]);
                    return item;
                }} data={[]} {...form.getInputProps(`keyWords.${index}.key`)} />
        </Group>
    ))



    return (

        <>


            {fields}
            <Group mt="sm">
                <Button size='sm' onClick={() => { form.getInputProps(`keyWords`).value.length < 10 ? form.insertListItem('keyWords', { key: '' }) : null }}  >
                    <IconPlus />
                </Button>
            </Group>
        </>

    );
}


function WorkPlan(props) {

    const { form } = props

    const fields = form.values.workPlan.map((_, index) => (

        <Group grow>
            <TextInput placeholder="-" {...form.getInputProps(`workPlan.${index}.workPlan`)} />

        </Group>
    ))



    return (

        <>


            {fields}
            <Group mt="md">
                <Button onClick={() => { form.getInputProps(`workPlan`).value.length < 10 ? form.insertListItem('workPlan', { workPlan: '' }) : null }}>
                    <IconPlus />
                </Button>
            </Group>
        </>

    );
}



export function SuggestionTheme() {

    const specialty_name = useRef()

    const department = [
        {
            dep: 'Chemistry Department',
            specialtyAvailable: [
                { value: 'AC', label: 'Analytical Chemistry', group: 'Chemistry Department' },
                { value: 'IC', label: 'Inorganic Chemistry', group: 'Chemistry Department' },
                { value: 'OC', label: 'Organic Chemistry', group: 'Chemistry Department' },
                { value: 'PhC', label: 'Physical Chemistry', group: 'Chemistry Department' },
                { value: 'PC', label: 'Polymer Chemistry', group: 'Chemistry Department' },
            ]

        },
        {
            dep: 'department of computer science',
            specialtyAvailable: [{ value: 'RSD', label: 'networks and distributed system', group: 'Computer Science department' },
            { value: 'ISI', label: 'computer systems engineer', group: 'Computer Science department' },
            { value: 'SITW', label: 'Information systems and web technology', group: 'Computer Science department' },
            { value: 'CS', label: 'Computer systems', group: 'Computer Science department' },]
        },
        {
            dep: 'Physics Department',
            specialtyAvailable: [
                { value: 'MP', label: 'Materials Physics', group: 'Physics Department' },
                { value: 'NP', label: 'Nuclear Physics', group: 'Physics Department' },
                { value: 'SSP', label: 'Solid State Physics', group: 'Physics Department' },
                { value: 'OP', label: 'Optics and Photonics', group: 'Physics Department' },
                { value: 'ThP', label: 'Theoretical Physics', group: 'Physics Department' },
                { value: 'REP', label: 'Renewable Energy Physics', group: 'Physics Department' },
                { value: 'EP', label: 'Environmental Physics:', group: 'Physics Department' },
            ]
        }

    ]





    const [selectedDep, setSelectedDep] = useState(department[1].dep)
    const [specialtyAv, setSpecialtyAv] = useState(department[1].specialtyAvailable)






    const chooseDep = department.map((dep) => {
        return (<Menu.Item onClick={() => { setSelectedDep(dep.dep); setSpecialtyAv(dep.specialtyAvailable) }}    >{dep.dep}</Menu.Item>)
    })



    const form = useForm({
        initialValues: {
            title: '',
            specialty: '',
            searchDomain: '',
            keyWords: [
                // { value: '', label : '' },
            ],
            description: '',
            objectives: '',
            workPlan: [
                // { workPlan: '' },
                // { workPlan: '' }
            ],
        },


        // functions will be used to validate values at corresponding key
        validate: {
            title: isNotEmpty('cannot be empty'),
            specialty: isNotEmpty('cannot be empty'),
            searchDomain: isNotEmpty('cannot be empty'),
            keyWords: (value) => (value.length < 3 ? 'at least insert 4 key word ' : null),
            description: (value) => (value.length < 10 ? 'too short description' : null),
            objectives: isNotEmpty('cannot be empty'),
            workPlan: isNotEmpty('cannot be empty')
        },
    });

    const [keys, setKeys] = useState([])



    const { mutate: sendSuggestion } = useSendSuggestion()

    const onSubmit = (values) => {
        console.log(values)

        let payload = {
            title: values.title,
            specialty: values.specialty,
            searchDomain: values.searchDomain,
            description: values.description,
            objectives: values.objectives,
            keyWords: [],
            workPlan: []
        };

        values.keyWords.map((value) => {
            if (value !== '') {
                payload.keyWords = [...payload.keyWords, { key: value }]
            }


        })

        values.workPlan.map((plan) => {
            if (plan !== '') {
                payload.workPlan = [...payload.workPlan, { plan: plan }]
            }
        })

        console.log(payload)
        sendSuggestion(payload);







    }




    return (
        <>
            <div className='main-page-name'>
                    <h1></h1>
                </div>
            <SimpleGrid w='85%'  >
                <Flex justify='flex-start' align='center' >




                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <Button variant='white'>
                                <IconDotsVertical />
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>change department</Menu.Label>

                            {chooseDep}

                        </Menu.Dropdown>
                    </Menu>

                    <Title m={30} order={3} >
                        MUSTAPHA STAMBOULI UNIVERSITY <br />
                        FACULTY OF EXACT SCIENCES <br />
                        {selectedDep.toUpperCase()}
                    </Title>
                </Flex>
                <Title m={15} order={4}  >
                    proposal for a final study project
                </Title>
            </SimpleGrid>
            <Group spacing={10} w='90%' position='center' grow   >
                <form onSubmit={form.onSubmit(onSubmit)} >
                    <SimpleGrid cols={1} mt="xl" breakpoints={[{ minWidth: '100%' }]}>


                        <SimpleGrid cols={2} spacing={20} >
                            <TextInput
                                withAsterisk
                                label='theme title'
                                placeholder='theme title'
                                name='themeTitle'
                                {...form.getInputProps('title')}
                            />
                            <Select
                                withAsterisk
                                label="specialty"
                                variant='default'
                                placeholder="specialty"
                                searchable
                                nothingFound="No options"
                                // required={true}  
                                ref={specialty_name}
                                data={specialtyAv}
                                {...form.getInputProps('specialty')}
                            />
                            <Textarea
                                withAsterisk
                                label='research domain'
                                placeholder='research domain'
                                name='searchDomain'
                                minRows={2}
                                {...form.getInputProps('searchDomain')}

                            />

                            <SimpleGrid  >
                                {/* <Text size='sm'   >key words</Text> */}
                                <SimpleGrid cols={1}    >
                                    {/* <KeyWord form={form} /> */}

                                    <MultiSelect
                                        withAsterisk
                                        label='key words'
                                        placeholder='key words'
                                        data={form.getInputProps('keyWords').value}
                                        searchable
                                        creatable
                                        getCreateLabel={(query) => `+ Create ${query}`}
                                        onCreate={(query) => {
                                            const item = { value: query, label: query };
                                            // setKeys((current) => [...current, item]);
                                            form.insertListItem('keyWords', { item })
                                            return item;
                                        }}
                                        {...form.getInputProps(`keyWords`)}

                                    />


                                </SimpleGrid>
                            </SimpleGrid>
                        </SimpleGrid>
                        <Textarea
                            withAsterisk
                            placeholder='description'
                            label='description'
                            minRows={2}
                            {...form.getInputProps('description')}
                        />
                        <Textarea
                            withAsterisk
                            placeholder='Project Objectives'
                            label='Project Objectives'
                            minRows={2}
                            {...form.getInputProps('objectives')}
                        />

                        <MultiSelect
                            withAsterisk
                            label='Work plan'
                            placeholder='Work plan'
                            data={form.getInputProps('workPlan').value}
                            searchable
                            creatable
                            getCreateLabel={(query) => `+ Create ${query}`}
                            onCreate={(query) => {
                                const item = { value: query, label: query };
                                // setKeys((current) => [...current, item]);
                                form.insertListItem('workPlan', { item })
                                return item;
                            }}
                            {...form.getInputProps(`workPlan`)}

                        />
                    </SimpleGrid>



                    <Group position="center"
                        mt="lg"   >
                        <Button size='md'
                            type='submit'

                        >send<IconBrandTelegram />
                        </Button>
                    </Group>
                </form>
            </Group>


        </>
    );
}