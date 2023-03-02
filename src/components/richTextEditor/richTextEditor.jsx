import { Form, Formik } from 'formik';
import React from 'react'
import FormikControl from '../FormControl/FormikControl';
import * as Yup from 'yup'
import { IconBrandTelegram, IconPlane } from '@tabler/icons';
function RichTextEditor(props) {


  const initialValues = {
    textContent: "",
  };
  const validationSchema = Yup.object({

  });

  const onSubmit = (value) => {
    const payload = {
      textContent: value.textContent,
      room_id:props.room_id
    };

    // console.log(payload)
    props.action(payload)
  }

  return (
    <div>
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
                  control='textarea'
                  type='text'
                  label='send message'
                  name='textContent'
                />
                <button
                  type='submit'
                  className='SubmitBtn'
                  disabled={!Formik.isValid}
                >
                  send <IconBrandTelegram />
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  )
}

export default RichTextEditor
