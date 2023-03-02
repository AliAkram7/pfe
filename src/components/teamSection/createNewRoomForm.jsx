import { LoadingOverlay } from '@mantine/core';
import { Formik } from 'formik';
import React from 'react'
import { Form } from 'formik';
import * as Yup from 'yup'
import FormikControl from '../FormControl/FormikControl';
import { usecreateRoom } from './connection/sendData/sendData';
function CreateNewRoomForm() {

  const initialValues = {
    roomName: '',
    roomDiscription: ''
  };
  const validationSchema = Yup.object({
    roomName: Yup.string().required('please set name to the room').max(255, 'room name  is bigger then expected'),
    roomDiscription: Yup.string()
  });


  const { mutate: createRome } = usecreateRoom();

  const onSubmit = (value) => {
    const sendedData = {
      roomName: value.roomName,
      roomDiscription: value.roomDiscription
    }

    createRome(sendedData);




  }

  return (

    <>
      {/* <LoadingOverlay
    // visible={isLoading}
      overlayBlur={1}
      loaderProps={{ size: 'md', color: 'gold' }}
      overlayOpacity={0.3}
      overlayColor="whitesmoke"
    /> */}

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
                  label='room name'
                  name='roomName'
                />
                <FormikControl
                  control='textarea'
                  type='text'
                  label='discription'
                  name='roomDiscription'

                />

                <button
                  type='submit'
                  className='SubmitBtn'
                  disabled={!Formik.isValid}

                //   onClick={() => {onSubmit}
                //   }

                >
                  create
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </>
  )
}

export default CreateNewRoomForm