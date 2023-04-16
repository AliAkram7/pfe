import { Button, createStyles, Group, LoadingOverlay, NumberInput, Select, SimpleGrid, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import "yup-phone-lite";
import { useTeacherContext } from '../../contexts/teacherContext';
import FormikControl from '../FormControl/FormikControl';
import { useAddSingleStudentInTeam, useFetchSingleStudents } from './connection/connection';


const useStyles = createStyles((theme) => ({
    outside: {
        opacity: 0,
    },

    weekend: {
        color: `${theme.colors.green[6]} !important`,
    },

    selected: {
        color: `${theme.white} !important`,
        backgroundColor: `${theme.colors.green[6]} !important`
    },

}));

function AddTeamsForm(props) {
    const { classes, cx } = useStyles();

    const { mutate: addSingleStudent , isLoading :addIsLoading } = useAddSingleStudentInTeam()

    const { data: fetchSingleStudents, isLoading } = useFetchSingleStudents();

    const [selectedData, setSelectedData] = useState([])

    // console.log(getStudentWithoutRank?.data?.student_without_rank)







    const form = useForm({
        initialValues: { code: ''  },

        // functions will be used to validate values at corresponding key
        validate: {
            code: isNotEmpty('cannot be empty'),
        },
    });

    // const onSubmit = (value) => {
    //     // console.log(value);
    //     const payload = {
    //         name: value.name,
    //         code: value.code,
    //         specialty_id: selectedSpeciality?.id
    //     }
    //     // addStudent(payload);

    //     
    // };
    const handleSubmit = (values) => {


        const payload = {
            code: values.code
        }

        console.log(payload)

        addSingleStudent(payload)
        // props.closeModel()

    };

    return (
        <>

            <LoadingOverlay
                // visible={addIsLoading}
                overlayBlur={1}
                loaderProps={{ size: 'md', color: 'gold' }}
                overlayOpacity={0.3}
                overlayColor="whitesmoke"
            />
            <form onSubmit={form.onSubmit(handleSubmit)} >
                <SimpleGrid    >
                    <SimpleGrid cols={1} >
                        {fetchSingleStudents?.data.length ? (
                            fetchSingleStudents?.data.length > 0 ?
                                <Select
                                    searchable
                                    data={fetchSingleStudents?.data}
                                    label="single student"
                                    {...form.getInputProps('code')}
                                /> : <Select
                                    data={[]}
                                    placeholder='no students found !'
                                    label="single student"
                                    {...form.getInputProps('code')}
                                />)
                            : null}
                    </SimpleGrid>

                    <Button type='onsubmit' >save</Button>
                </SimpleGrid>
            </form>
        </>
    )
}

export default AddTeamsForm