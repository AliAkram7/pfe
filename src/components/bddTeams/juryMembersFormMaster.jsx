import { Group, ActionIcon, Box, Text, Button, Code, ScrollArea, Select, Stepper, Modal, SimpleGrid } from '@mantine/core';
import { IconSquareRoundedNumber5Filled } from '@tabler/icons-react';

import { useEffect, useState } from 'react';
import { useFetchTeachers, useSendLicenseJuryMember } from './connection/connection';

export default function MemberMaster(props) {

    let { form, active } = props;
    const [teachers, setTeachers] = useState(props.teachers);



    const handleCodeChange = (value, index) => {

        const groups = [...form.values.groups];
        let temp = groups[index].code

        groups[index].code = value;

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


    return (

        <></>
    );
}
