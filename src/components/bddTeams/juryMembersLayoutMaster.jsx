import { useState } from 'react';
import { Stepper, Button, Group, TextInput, PasswordInput, Code, Flex, Text, SimpleGrid, Grid, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import Member from './juryMembersForm';
import { IconCircleLetterX, IconCircleX, IconMinus, IconPlus, IconX } from '@tabler/icons';
import { randomId, useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { nanoid } from 'nanoid';
import { useFetchTeachers, useSendLicenseJuryMember } from './connection/connection';
import MemberMaster from './juryMembersFormMaster';

export default function JuryMembersMasterForm(props) {
    const [active, setActive] = useState(0);
    const [conformationModalOpened, { open: openConformationModal, close: closeConformationModal }] = useDisclosure()


    const { data: fetchTeachers, isLoading, isSuccess } = useFetchTeachers()

    const [isErrorForm, setIsErrorForm] = useState(true)


    // Get an array of unique group numbers
    const groupNumbers = [...new Set(fetchTeachers?.data.map((teacher) => teacher.group_number))];

    // Create a separate list of teachers for each group
    const teacherLists = groupNumbers.map((groupNumber) => {
        const groupTeachers = fetchTeachers?.data
            .filter((teacher) => teacher.group_number === groupNumber)
            .map((teacher) => <p key={nanoid()}>{teacher.label}</p>);


        if (groupTeachers.length === 0) {
            return null;
        }
        return (
            groupNumber &&
            <Group key={nanoid()}>
                <SimpleGrid >
                    <Text>Group {groupNumber}</Text>
                    {groupTeachers}
                </SimpleGrid>
            </Group>
        );
    });
    // const filteredLists = teacherLists.filter((list) => list !== null);


    const form = useForm({
        initialValues: {
            groups: [
                [
                    { code: '', isPresident: 1, isInvite: 0, label: 'president', key: nanoid() },
                    { code: '', isPresident: 0, isInvite: 1, label: 'examiner 1 (Invited Specialization Manager)', key: nanoid() },
                    { code: '', isPresident: 0, isInvite: 0, label: 'examiner 2', key: nanoid() },
                    { code: '', isPresident: 0, isInvite: 0, label: 'examiner 3', key: nanoid() }
                ]
            ]
        },
        validate: (values) => {
            const group = values.groups[active];
            const hasEmptyEmployeeName = group.some((employeeObj) => {
                return !employeeObj.code;
            });
            return hasEmptyEmployeeName
                ? ({ groups: `Employee names in group ${active} cannot be empty` })
                : null;
        },
    });


    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {

                return current;
            }
            return current < form.values.groups?.length ? current + 1 : current;
        });
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));



    const { mutate: sendLicenseJuryMember } = useSendLicenseJuryMember()

    const handleConfirm = () => {
        console.log(form.values)
        // sendLicenseJuryMember(form.values)
    }

    const DynamicStepper = form.values.groups.map((group, idx) => {
        return (
            <Stepper.Step label={`group${idx + 1}`}
                key={nanoid()}
            >
                {
                    !isLoading ?
                        <MemberMaster form={form} active={active}
                            teachers={fetchTeachers.data}
                            conformationModalOpened={conformationModalOpened} close={closeConformationModal}
                            handleConfirm={handleConfirm}
                        />
                        : null}
            </Stepper.Step>
        )
    })




    return (
        <>

            <Modal
                opened={props.currentGroupOpened}

                onClose={props.closeCurrentGroup}
                size='xl'
            >
                <>
                    <Group>

                        {teacherLists}

                    </Group>
                </>
            </Modal>

            <form >
                <SimpleGrid  >
                    <Flex align={'center'} gap={8} >
                        <Button variant='subtle' label={"add group"} disabled={form.values.groups.length >= 12} onClick={() =>
                            form.insertListItem(`groups`, [
                                { code: '', isPresident: 1, isInvite: 0, label: 'president', key: nanoid() },
                                { code: form.values.groups[0][1], isPresident: 0, isInvite: 1, label: 'examiner 1 (Invited Specialization Manager)', key: nanoid() },
                                { code: '', isPresident: 0, isInvite: 0, label: 'examiner 2', key: nanoid() },
                                { code: '', isPresident: 0, isInvite: 0, label: 'examiner 3', key: nanoid() }
                            ])
                        }
                            w={'5%'}
                        ><Flex align={'center'} gap={8}><IconPlus size={18} /> </Flex> </Button>

                        <Button variant='subtle' disabled={form.values.groups.length == 1} label={"add group"} onClick={() => {
                            form.removeListItem('groups', form.values.groups.length - 1);
                            prevStep()
                        }

                        }
                            w={'5%'}
                        ><Flex align={'center'} gap={8}><IconMinus size={18} /> </Flex> </Button>
                    </Flex>
                    <Stepper active={active} breakpoint="sm">
                        {DynamicStepper}



                        {/* 
                        <Stepper.Completed>
                        Completed! Form values:
                        <Code block mt="xl">
                            {JSON.stringify(form.values, null, 2)}
                        </Code>
                    </Stepper.Completed> */}
                    </Stepper>
                </SimpleGrid>
                <Group position="right" mt="xl">
                    {(active < form.values.groups?.length && active > 0) && (
                        <Button variant="default" onClick={prevStep}>
                            Back
                        </Button>
                    )}
                    {active < form.values.groups?.length - 1 && <Button disabled={!form.isValid()} onClick={nextStep}>Next</Button>}
                    {active == form.values.groups?.length - 1 && <Button disabled={!form.isValid()} onClick={openConformationModal}>terminate</Button>}
                </Group>
            </form>
        </>
    );
} 
