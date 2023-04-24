import { useForm } from '@mantine/form';
import { TextInput, Switch, Group, ActionIcon, Box, Text, Button, Code, ScrollArea, Select, Stepper, Modal, SimpleGrid } from '@mantine/core';
import { randomId, useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useSendLicenseJuryMember } from './connection/connection';

export default function Member(props) {

    let { form, active } = props;
    const [teachers, setTeachers] = useState(props.teachers);


    const handleCodeChange = (value, index, active) => {

        const groups = [...form.values.groups];
        let temp = groups[active][index].code
        groups[active][index].code = value;


        form.setValues({ groups });


        const updatedTeachers = teachers.map((teacher) => {
            if (teacher.value === value) {
                return { ...teacher, disabled: 1 };
            }
            else if (teacher.value === temp) {
                return { ...teacher, disabled: 0 };
            } else {
                return teacher;
            }
        });

        setTeachers(updatedTeachers);



    };

    const fields = form.values?.groups[active]?.map((item, index) => {

        return (
            <Group key={item.key} mt="xs" grow      >
                <Select
                    key={item.key}
                    data={teachers}
                    placeholder={item.label}
                    label={item.label}
                    withAsterisk
                    searchable
                    clearable
                    sx={{ flex: 1 }}
                    defaultValue={item.code}
                    minDropdownHeight={1000}
                    onChange={(value) => { handleCodeChange(value, index, active) }}

                />
            </Group>)
    });

    return (

        <ScrollArea>

            <Modal
                opened={props.conformationModalOpened}
                onClose={props.close}
                size='xl'
            >

                <>
                    <Group>
                        {
                            form.values?.groups.map((group, idx) => {
                                return (<>
                                    <Text size={20} color="teal"  >group of  jury members number  {idx + 1}:</Text>

                                    <SimpleGrid spacing={10} mt={15} >
                                        {
                                            group.map((teacher) => {
                                                const result = teachers.find(item => {
                                                    return item.value == teacher.code
                                                }
                                                )
                                                if (result) return <Text>{result.label}</Text>
                                                else return null
                                            })

                                        }
                                    </SimpleGrid>
                                </>
                                )
                            })
                        }
                        <Button onClick={props.handleConfirm}> confirm  </Button>
                    </Group>
                </>
            </Modal>


            <Box sx={{ maxWidth: 500, minHeight: 380 }} mx="auto"    >

                {fields}


            </Box>
        </ScrollArea>
    );
}
