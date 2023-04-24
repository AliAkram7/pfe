import { forwardRef, useState } from 'react';
import { Group, SimpleGrid, ScrollArea, Box, Select } from '@mantine/core';
import { nanoid } from 'nanoid';

import { Progress, PasswordInput, Text, Center } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { IconCheck, IconPlus, IconUser, IconX } from '@tabler/icons-react';
import { GroupMember } from './juryMemberSelectOption';

function ThemeRequirement({ meets, label }
    // : { meets: boolean; label: string }
) {
    return (
        <Text color={meets ? 'teal' : 'red'} mt={5} size="sm">
            <Center inline>
                {meets ? <IconCheck size="0.9rem" stroke={1.5} /> : <IconX size="0.9rem" stroke={1.5} />}
                <Box ml={7}>{label}</Box>
            </Center>
        </Text>
    );
}

// const requirements = [
//     { re: /[0-9]/, label: 'Includes number' },
//     { re: /[a-z]/, label: 'Includes lowercase letter' },
//     { re: /[A-Z]/, label: 'Includes uppercase letter' },
//     { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
// ];

function getStrength(profiles, requirements
    // : string
) {
    let multiplier = 0;


    // console.log(requirements)
    let test = [];

    profiles.forEach(item => {
        item.label.forEach(label => {
            test.push(label.label);
        });
    });




    requirements.forEach((requirement) => {
        const searchValue = requirement.re;

        // console.log(test)

        const valueExists = test.includes(searchValue);

        if (!valueExists) {
            // console.log(`The value '${searchValue}' exists in the array.`);
            multiplier += 1;
        } else {
            // console.log(`The value '${searchValue}' does not exist in the array.`);
        }

    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export function ThemeStrength(props) {

    const { profiles, ThemeRe } = props

    const re = JSON.parse(ThemeRe).map(obj => { return { re: obj.key, label: "include " + obj.key } })

    const [requirements, setRequirements] = useState(re)


    // console.log(requirements)


    // console.log(requirement)

    const [value, setValue] = useInputState('');

    const strength = getStrength(profiles, requirements);

    let test = [];

    profiles.forEach(item => {
        item.label.forEach(label => {
            test.push(label.label);
        });
    });



    const checks = requirements.map((requirement, index) => (
        <ThemeRequirement key={index} label={requirement.label}
            meets={test.includes(requirement.re)}
        />
    ));

    const bars = Array(requirements.length)
        .fill(0)
        .map((_, index) => (
            <Progress
                styles={{ bar: { transitionDuration: '0ms' } }}
                value={
                    strength >= ((index + 1) / requirements.length) * 100 ? 100 : 0
                }
                color={strength > 50 ? 'teal' : 'yellow'}
                key={index}
                size={3}
            />
        ));

    return (
        <div>

            <Group spacing={5} grow mt="xs" mb="md">
                {bars}
            </Group>

            {/* <ThemeRequirement label="Has at least 6 characters" meets={value.length > 5} /> */}
            {checks}
        </div>
    );
}

const SelectItem = forwardRef(({ image, label, subLabel, ...others } = data, ref) => (

    <div ref={ref} {...others}>
        <GroupMember icon={IconUser} label={label}
            initiallyOpened={true} links={subLabel}
        />
    </div>
));


export default function JuryMembersMasterForm(props) {

    const { form, ThemeRe } = props;



    const [teachers, setTeachers] = useState(props.teachers)
    const [profiles, setProfiles] = useState([]);


    // console.log(teachers)

    return (
        <>

            <SimpleGrid key={nanoid()}  >
                <Group grow
                    key={nanoid()}
                >

                    <ScrollArea>
                        <Box sx={{ maxWidth: 600 }} mx="auto"    >

                            {/* <Group key={nanoid()} mt="xs"   > */}
                            <>
                                <Select
                                    name='president'
                                    data={teachers}
                                    placeholder={"president"}
                                    itemComponent={SelectItem}
                                    label={"president"}
                                    withAsterisk
                                    searchable
                                    sx={{ flex: 1 }}
                                    value={form.values.president}
                                    onChange={(value) => {

                                        form.setValues({ "president": value });

                                        const temp = form.values.president

                                        let index = profiles.findIndex(obj => obj.code === temp);
                                        if (index !== -1 && temp !== '') {
                                            setProfiles(profiles.splice(index, 1))
                                        }
                                        const newTeacherProfile = profiles.filter(obj => String(obj.code) !== temp)

                                        setProfiles(newTeacherProfile)


                                        const updatedTeachers = teachers.map((teacher) => {
                                            if (teacher.value === value) {
                                                const teacherProfile = JSON.parse(teacher.Axes_and_themes_of_recherche)
                                                setProfiles([...profiles, { code: teacher.value, label: teacherProfile }])
                                                return { ...teacher, disabled: 1 };
                                            } if (teacher.value === temp) {
                                                return { ...teacher, disabled: 0 };
                                            }
                                            else {
                                                return teacher;
                                            }
                                        });
                                        setTeachers(updatedTeachers);
                                    }}


                                // {...form.getInputProps('president')}
                                />
                                <Select
                                    name='ex1'
                                    data={teachers}
                                    placeholder={"examiner 1"}
                                    label={"examiner 1"}
                                    itemComponent={SelectItem}
                                    withAsterisk
                                    searchable
                                    sx={{ flex: 1 }}
                                    value={form.values.ex1}
                                    onChange={(value) => {
                                        form.setValues({ "ex1": value });
                                        let temp = form.values.ex1
                                        let index = profiles.findIndex(obj => obj.code === temp);
                                        if (index !== -1 && temp !== '') {
                                            setProfiles(profiles.splice(index, 1))
                                        }
                                        const updatedTeachers = teachers.map((teacher) => {
                                            if (teacher.value === value) {
                                                let teacherProfile = JSON.parse(teacher.Axes_and_themes_of_recherche)
                                                setProfiles([...profiles, { code: teacher.value, label: teacherProfile }])
                                                return { ...teacher, disabled: 1 };
                                            } if (teacher.value === temp) {

                                                return { ...teacher, disabled: 0 };
                                            }
                                            else {
                                                return teacher;
                                            }
                                        });
                                        setTeachers(updatedTeachers);
                                    }}
                                // {...form.getInputProps('ex1')}
                                />
                                <Select
                                    name='ex2'
                                    key={nanoid}
                                    data={teachers}
                                    placeholder={"examiner 2"}
                                    itemComponent={SelectItem}
                                    label={"examiner 2"}
                                    withAsterisk
                                    searchable
                                    sx={{ flex: 1 }}
                                    value={form.values.ex2}
                                    onChange={(value) => {
                                        form.setValues({ "ex2": value });

                                        let temp = form.values.ex2
                                        let index = profiles.findIndex(obj => obj.code === temp);
                                        if (index !== -1 && temp !== '') {
                                            setProfiles(profiles.splice(index, 1))
                                        }
                                        const updatedTeachers = teachers.map((teacher) => {
                                            if (teacher.value === value) {
                                                let teacherProfile = JSON.parse(teacher.Axes_and_themes_of_recherche)
                                                setProfiles([...profiles, { code: teacher.value, label: teacherProfile }])
                                                return { ...teacher, disabled: 1 };
                                            } if (teacher.value === temp) {

                                                return { ...teacher, disabled: 0 };
                                            }
                                            else {
                                                return teacher;
                                            }
                                        });
                                        setTeachers(updatedTeachers);
                                    }}
                                // {...form.getInputProps('ex2')}
                                />
                                <Select
                                    name='ex3'
                                    data={teachers}
                                    placeholder={"examiner 3"}
                                    itemComponent={SelectItem}
                                    label={"examiner 3"}
                                    withAsterisk
                                    searchable
                                    sx={{ flex: 1 }}
                                    value={form.values.ex3}
                                    onChange={(value) => {
                                        form.setValues({ "ex3": value });
                                        let temp = form.values.ex3
                                        let index = profiles.findIndex(obj => obj.code === temp);
                                        if (index !== -1 && temp !== '') {
                                            setProfiles(profiles.splice(index, 1))
                                        }
                                        const updatedTeachers = teachers.map((teacher) => {
                                            if (teacher.value === value) {
                                                let teacherProfile = JSON.parse(teacher.Axes_and_themes_of_recherche)
                                                setProfiles([...profiles, { code: teacher.value, label: teacherProfile }])
                                                return { ...teacher, disabled: 1 };
                                            } if (teacher.value === temp) {
                                                let teacherProfile = profiles.filter(obj => !obj.code !== teacher.value)
                                                setProfiles(teacherProfile)
                                                return { ...teacher, disabled: 0 };
                                            }
                                            else {
                                                return teacher;
                                            }
                                        });
                                        setTeachers(updatedTeachers);
                                    }}
                                // {...form.getInputProps('ex3')}
                                />
                                <ThemeStrength profiles={profiles} ThemeRe={ThemeRe} />
                            </>

                            {/* </Group> */}


                        </Box>
                    </ScrollArea>


                </Group>
            </SimpleGrid>

        </>
    );
} 
