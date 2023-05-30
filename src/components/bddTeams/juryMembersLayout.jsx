import { useState } from 'react';
import { Stepper, Button, Group, Flex, Text, SimpleGrid, Modal, Highlight, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import Member from './juryMembersForm';
import { IconMinus, IconPlus } from '@tabler/icons';
import { useDisclosure } from '@mantine/hooks';
import { nanoid } from 'nanoid';
import { useFetchJuryMembersGroups, useFetchTeachers, useSendLicenseJuryMember } from './connection/connection';

export default function JuryMembersForm(props) {
    const [active, setActive] = useState(0);
    const [conformationModalOpened, { open: openConformationModal, close: closeConformationModal }] = useDisclosure()


    const { data: fetchTeachers, isLoading, isSuccess } = useFetchTeachers()

    const [isErrorForm, setIsErrorForm] = useState(true)


    const { data: fetchJuryMembersGroups } = useFetchJuryMembersGroups()

    const teacherLists = fetchJuryMembersGroups?.data.map((group) => {
                                                                                                                                                                                                                                                                                                                                                        
        const listOfTeachers = group.subLabel.map((teacher) => {
            if (teacher.isPresident == 1) {
                return <p key={nanoid()}>president : {teacher.teacher}</p>
            }
            return <p key={nanoid()}>examiner : {teacher.teacher}</p>
        })

        return (
                <SimpleGrid>
                    <Text key={nanoid()} size={18}   ><Highlight color={'teal'}    >{group.label}  </Highlight>  </Text>
                    {listOfTeachers}
                </SimpleGrid>

        );
    });

    const form = useForm({
        initialValues: {
            groups: [
                [

                    { code: '', isPresident: 0, isInvite: 0, label: 'examiner 1', key: nanoid() },
                    { code: '', isPresident: 0, isInvite: 0, label: 'examiner 2', key: nanoid() },
                    { code: '', isPresident: 0, isInvite: 0, label: 'examiner 3', key: nanoid() },

                ]
                ,
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



    const { mutate: sendLicenseJuryMember, isLoading : sendLicenseJuryMemberLoading } = useSendLicenseJuryMember()

    const handleConfirm = () => {
        sendLicenseJuryMember(form.values)
    }

    const DynamicStepper = form.values.groups.map((group, idx) => {
        return (
            <Stepper.Step label={`group${idx + 1}`}
                key={nanoid()}
            >
                {
                    !isLoading ?
                        <Member form={form} active={active}
                            teachers={fetchTeachers.data}

                            conformationModalOpened={conformationModalOpened} close={closeConformationModal}
                            handleConfirm={handleConfirm}
                            sendLicenseJuryMemberLoading={sendLicenseJuryMemberLoading}
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

                <SimpleGrid spacing={15}>

                        {teacherLists}

                    </SimpleGrid>
                </>
            </Modal>

            <form >
            <LoadingOverlay visible={sendLicenseJuryMemberLoading} />

                <SimpleGrid  >
                    <Flex align={'center'} gap={8} >
                        <Button variant='subtle' label={"add group"} disabled={form.values.groups.length >= 5} onClick={() =>
                            form.insertListItem(`groups`, [{ code: '', key: nanoid() }, { code: '', key: nanoid() }, { code: '', key: nanoid() }])
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
