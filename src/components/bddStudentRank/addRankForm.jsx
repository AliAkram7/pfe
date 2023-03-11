import { Button, createStyles, LoadingOverlay, NumberInput, Select, SimpleGrid, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import "yup-phone-lite";
import { useTeacherContext } from '../../contexts/teacherContext';
import FormikControl from '../FormControl/FormikControl';
import { useAddRankStudent, useGetStudentsWithoutRank } from './connection/connection';

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

function AddRankForm(props) {
    const { classes, cx } = useStyles();

    const { mutate: addRank , isLoading :addIsLoading } = useAddRankStudent()

    const { data: getStudentWithoutRank, isLoading } = useGetStudentsWithoutRank()

    const [selectedData, setSelectedData] = useState([])

    console.log(getStudentWithoutRank?.data?.student_without_rank)

    useEffect(() => {


    }, [])





    const form = useForm({
        initialValues: { code: '', ms1: 0, ms2: 0, mgc: 0, },

        // functions will be used to validate values at corresponding key
        validate: {
            code: isNotEmpty('cannot be empty'),
            ms2: (value) => (value > 20 ? 'note maximum is 20'
                : value < 0 ? 'note minimum is 0' : null
            ),
            ms2: isNotEmpty('cannot be empty'),

            ms1: (value) => (value > 20 ? 'note maximum is 20'
                : value < 0 ? 'note minimum is 0' : null
            ),
            ms1: isNotEmpty('cannot be empty'),

            mgc: (value) => (value > 20 ? 'note maximum is 20'
                : value < 0 ? 'note minimum is 0' : (form.getInputProps('ms1').value + form.getInputProps('ms2').value) / 2 != value ?
                    'value is incorrect' : null
            ),
            obs: isNotEmpty('cannot be empty'),
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
            code: values.code,
            ms1: values.ms1,
            ms2: values.ms2,
            mgc: values.mgc,
            obs: values.obs
        }

        console.log(payload)


        console.log(payload)

        addRank(payload)
        props.closeModel()

    };

    return (
        <>

            <LoadingOverlay
                visible={addIsLoading}
                overlayBlur={1}
                loaderProps={{ size: 'md', color: 'gold' }}
                overlayOpacity={0.3}
                overlayColor="whitesmoke"
            />
            <form onSubmit={form.onSubmit(handleSubmit)} >
                <SimpleGrid cols={1} >
                    {getStudentWithoutRank?.data?.student_without_rank.length > 0 ?
                        <Select
                            data={getStudentWithoutRank?.data?.student_without_rank}
                            allowDeselect={true}
                            label='note for'
                            {...form.getInputProps('code')}
                            searchable
                        /> : <Select
                                    placeholder='no student found !'
                                data={[]}
                                // allowDeselect={true}
                                label='note for'
                                searchable
                            />
                        }
                    <SimpleGrid cols={3} >
                        <NumberInput
                            label="ms1"
                            defaultValue={0.00}
                            precision={2}
                            min={0}
                            step={0.01}
                            max={20}
                            stepHoldDelay={500}
                            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                            {...form.getInputProps('ms1')}
                        />   <NumberInput
                            label="ms2"
                            defaultValue={0.00}
                            precision={2}
                            min={0}
                            step={0.01}
                            max={20}
                            stepHoldDelay={500}
                            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                            {...form.getInputProps('ms2')}
                        /><NumberInput
                            label="mgc"
                            defaultValue={0.00}
                            precision={2}
                            min={0}
                            step={0.01}
                            max={20}
                            stepHoldDelay={500}
                            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                            {...form.getInputProps('mgc')}
                        />

                    </SimpleGrid>
                    <Select data={[{ label: 'accept/s1', value: 1 }, { label: 'dette', value: 2 }]} label='observation'
                        {...form.getInputProps('obs')}
                    ></Select>
                    <Button type='onsubmit'  >save</Button>
                </SimpleGrid>
            </form>
        </>
    )
}

export default AddRankForm