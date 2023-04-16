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
            <Group key={item.key} mt="xs"   >
                <Select
                    key={item.key}
                    data={teachers}
                    placeholder="jury member"
                    withAsterisk
                    searchable
                    clearable
                    sx={{ flex: 1 }}
                    // defaultValue={defaultSelected[index].active  == active + 1  ? defaultSelected[index].value : null}
                    
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


            <Box sx={{ maxWidth: 500, minHeight: 300 }} mx="auto"    >
                {fields.length > 0 ? (
                    <Group mb="xs">
                        <Text weight={500} size="sm" sx={{ flex: 1 }}>
                            Name
                        </Text>
                    </Group>
                ) : (
                    <Text color="dimmed" align="center">
                        No one here...
                    </Text>
                )}

                {fields}


            </Box>
        </ScrollArea>
    );
}
