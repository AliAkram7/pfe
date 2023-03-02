import {showNotification} from '@mantine/notifications';
import {Form, Formik} from 'formik';
import React, {useState} from 'react'
import FormikControl from '../FormControl/FormikControl';
import * as Yup from 'yup'
import {IconCheck} from '@tabler/icons';
import { useSendInvitation } from './connection/sendData/sendData';
// import { useSendInvitation } from './connection/sendData/sendData';
// import { Code } from '@mantine/core';
function InvitePartnerForm() {

    const initialValues = {
        code: ""
    };

    // ! mutate the code of invitation
    const {mutate:sendInvitation } = useSendInvitation()

    const [Overlay, setOverlay] = useState(false)





    const validationSchema = Yup.object({code: Yup.string().required("required !").length(8,'invalid code')   });
    const onSubmit = (value) => {
        // console.log(value);

        const sendedData = {
            code: value.code,
        };
          // * api call 
         sendInvitation(sendedData)




        // console.log(sendData)
        // TODO link WITH API
        // * data of form is tested


    };
    return (
    <>
    <div className='section-invit-binom' >
    <div className='title-invit-binom-form'  >
        <h1>invite your partner using his code </h1>
    </div>
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur={false}
      >
        {(Formik) => {
          return (
            <div className='box'>
              <Form>
                <FormikControl
                  control='input'
                  type='text'
                  label='code student'
                  name='code'
                />
                <button
                  type='submit'
                  className='SubmitBtn'
                  disabled={!Formik.isValid}

                  onClick={() =>{
                    onSubmit 
                  
                    setOverlay(true) 
                  }
                  }

                >
                  send
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>

      </div>
        </>
    )
}


export default InvitePartnerForm
