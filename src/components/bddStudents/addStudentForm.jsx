import { Button, createStyles, Group, LoadingOverlay, SimpleGrid, TextInput } from '@mantine/core';
import { isEmail, isNotEmpty, useForm, hasLength, matches } from '@mantine/form';

import { Form, Formik } from 'formik';
import React from 'react'
import * as Yup from 'yup'
import "yup-phone-lite";
import { useAdminContext } from '../../contexts/adminContext';
import { useStateContext } from '../../contexts/ContextProvider';
import { useTeacherContext } from '../../contexts/teacherContext';
import FormikControl from '../FormControl/FormikControl';
import { useAddStudent } from './connection/sendData/sendData';


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

function AddStudentForm(props) {
    const { classes, cx } = useStyles();



const { mutate: addStudent } = useAddStudent()
    const { selectedSpeciality } = useAdminContext()
    const { selectedYearId } = useStateContext()

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
        },

        validate: {
            name: combineValidators(
                hasLength({ min: 3, max: 26 }, 'Name must be 2-35 characters long'),
                matches(/^[^0-9]*$/gm, 'Name should not contain numbers'),
            ),
            code: combineValidators(
                hasLength({ min: 8, max: 12 }, 'code must be 8-12  long'),
                matches(/[0-9]+$/gm, 'Name should contain at least one number', true),
            ),
        }


    })

    const onSubmit = (values) => {
        // console.log(value);
        const payload = {
            name: values.name,
            code: values.code,
            specialty_id: selectedSpeciality?.id,
            yearId: selectedYearId,
        }
        addStudent(payload);

        props.closeModel()
    };


    return (
        <>
            <LoadingOverlay
                //   visible={}
                overlayBlur={1}
                loaderProps={{ size: 'md', color: 'gold' }}
                overlayOpacity={0.3}
                overlayColor="whitesmoke"
            />


            <div className='box'>
                <form onSubmit={form.onSubmit(onSubmit)}   >
                    <SimpleGrid >
                        <TextInput
                            label='Full name of student'
                            {...form.getInputProps('name')}
                        />

                        <TextInput
                            label='Code'
                            {...form.getInputProps('code')}
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

export default AddStudentForm