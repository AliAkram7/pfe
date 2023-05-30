import { Button, createStyles, Group, LoadingOverlay, Select, SimpleGrid, TextInput } from '@mantine/core';
import { isEmail, isNotEmpty, useForm, hasLength, matches } from '@mantine/form';

import { Form, Formik } from 'formik';
import React from 'react'
import * as Yup from 'yup'
import "yup-phone-lite";
import { useAdminContext } from '../../contexts/adminContext';
import { useTeacherContext } from '../../contexts/teacherContext';
import FormikControl from '../FormControl/FormikControl';
import { useAdminFetchGradesData } from './connection/fetchData/fetchData';
import { useAddTeacher } from './connection/sendData/sendData';


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

function AddTeacherForm(props) {
    const { classes, cx } = useStyles();



    const { mutate: addTeacher,isLoading:addTeacherLoading  } = useAddTeacher()

    const {data : grades, isLoading, isFetched} = useAdminFetchGradesData()

    const { selectedSpeciality } = useAdminContext()

    function combineValidators(...validators) {
        return (value) => {
            for (let i = 0; i < validators.length; i += 1) {
                const error = validators[i](value);
                if (error) {
                    return error;
                }
            }
            return null;
        };
    }

    const form = useForm({

        initialValues: {
            name: '',
            code: '',
            institutional_email: '',
            grade: ''
        },

        validate: {
            name: combineValidators(
                isNotEmpty('required'),
                hasLength({ min: 3, max: 26 }, 'Name must be 2-35 characters long'),
                matches(/^[^0-9]*$/gm, 'Name should not contain numbers'),
            ),
            code: combineValidators(
                isNotEmpty('required'),
                hasLength({ min: 8, max: 12 }, 'code must be 8-12  long'),
                matches(/[0-9]+$/gm, 'Name should contain at least one number', true),
            ),
            institutional_email: combineValidators(
                isNotEmpty('required'),
                isEmail('invalid email format'),
            ),
            grade: combineValidators(
                isNotEmpty('required')
            )
        }


    })

    const onSubmit = (values) => {

        const payload = {
            name: values.name,
            code: values.code,
            grade : values.grade, 
            institutional_email: values.institutional_email
        }
        addTeacher(payload);
        props.close()
        // props.closeModel()
    };


    return (
        <>
            <LoadingOverlay
                  visible={!isFetched || addTeacherLoading}
                // visible
                overlayBlur={1}
                loaderProps={{ size: 'md', color: 'gold' }}
                overlayOpacity={0.3}
                overlayColor="whitesmoke"
            />


            <div className='box'>
                <form onSubmit={form.onSubmit(onSubmit)}   >
                    <SimpleGrid >
                        <TextInput
                            label='full name of teacher'
                            {...form.getInputProps('name')}
                        /> 
                        {isFetched ?   <Select
                            data={grades?.data}
                            label='grade'
                            {...form.getInputProps('grade')}
                            
                        /> : null 
}
                        <TextInput
                            label='code'
                            {...form.getInputProps('code')}
                        />
                        <TextInput
                            label='institutional_email'
                            {...form.getInputProps('institutional_email')}
                        />
                        <Button
                            type='submit'
                        >
                            save
                        </Button>
                    </SimpleGrid>
                </form>
            </div>

        </>
    )
}

export default AddTeacherForm