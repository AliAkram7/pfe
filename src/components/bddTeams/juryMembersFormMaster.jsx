import { Group, ActionIcon, Box, Text, Button, Code, ScrollArea, Select, Stepper, Modal, SimpleGrid } from '@mantine/core';

import { useEffect, useState } from 'react';
import { useSendLicenseJuryMember } from './connection/connection';

export default function MemberMaster(props) {

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

    useEffect(() => {
        const updatedTeachers = teachers.map((teacher) => {
            if (active > 0 && teacher.value != form.values?.groups[0][1].code) {
                return { ...teacher, disabled: 0 };
            } else {
                handleCodeChange(form?.values?.groups[0][1].code, 1, active)
                return teacher;
            }
        });
        setTeachers(updatedTeachers);
    }, [active])






    const fields = form.values?.groups[active]?.map((item, index) => {


        if (active > 0 && item?.isInvite == 1) {
            () => { handleCodeChange(form?.values?.groups[0][1].code, index, active) }
        }
        return (
            <Group key={item?.key} mt="xs"   >
                <Select
                    key={item?.key}
                    data={teachers}
                    placeholder={item?.label}
                    withAsterisk
                    searchable
                    clearable={!(active > 0 && item?.isInvite == 1)}
                    disabled={(active > 0 && item?.isInvite == 1)}
                    value={active > 0 && item?.isInvite == 1 ? form.values?.groups[0][1].code : item?.code}
                    // value={item?.code}


                    sx={{ flex: 1 }}
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
                                                    return item?.value == teacher?.code
                                                }
                                                )
                                                if (result) return <Text>{result?.label}</Text>
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
                            jury members
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
