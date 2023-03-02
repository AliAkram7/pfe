import { createStyles, LoadingOverlay } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import React from 'react'
import * as Yup from 'yup'
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
      backgroundColor:`${theme.colors.green[6]} !important`
    },

  }));

function AddStudentForm(props) {
    const { classes, cx } = useStyles();



    const {mutate:addStudent} = useAddStudent()
    const {selectedSpeciality} = useTeacherContext()
    const initialValues = {
        name: '',
        code: '',
    };
    const validationSchema = Yup.object({
        name: Yup.string().required("required !"),
        code: Yup.string().min(8, 'invalid code format !').max(13, 'invalid code format !')
    });
    const onSubmit = (value) => {
            // console.log(value);
        const payload ={ 
            name:value.name, 
            code :value.code, 
            specialty_id : selectedSpeciality?.id
        }
          addStudent(payload) ; 

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

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(Formik) => {
                    return (
                        <div className='box'>
                            <Form>
                                <FormikControl
                                    control='input'
                                    type='text'
                                    label='full name'
                                    name='name'
                                />
                          
                                <FormikControl
                                    control='input'
                                    type='text'
                                    label='code'
                                    name='code'
                                />



                                <button
                                    type='submit'
                                    className='SubmitBtn'
                                // disabled={!Formik.isValid}

                                // onClick={() => {onSubmit}
                                // }

                                >
                                    save
                                </button>
                            </Form>
                        </div>
                    );
                }}
            </Formik>
        </>
    )
}

export default AddStudentForm