import { showNotification } from '@mantine/notifications';
import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import FormikControl from '../FormControl/FormikControl';
import * as Yup from 'yup'
import { IconCheck } from '@tabler/icons';
import { useSendInvitation } from './connection/sendData/sendData';
import { Button } from '@mantine/core';
// import { useSendInvitation } from './connection/sendData/sendData';
// import { Code } from '@mantine/core';
function InvitePartnerForm() {

  const initialValues = {
    code: ""
  };

  // ! mutate the code of invitation
  const { mutate: sendInvitation } = useSendInvitation()

  const [Overlay, setOverlay] = useState(false)





  const validationSchema = Yup.object({
    code: Yup.string().required('required !').matches(
      /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
      "not valid"
    ).min(8, 'code must be at least 8 digit')
  });
  const onSubmit = (value) => {
    // console.log(value);

    const sendedData = {
      code: value.code,
    };
    // * api call 
    sendInvitation(sendedData)







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
                  <Button
                    type='submit'
                    className='SubmitBtn'
                    disabled={!Formik.isValid}
                    variant="outline"
                    color='teal'
                    onClick={() => {
                      onSubmit

                      setOverlay(true)
                    }
                    }

                  >
                    send 
                  </Button>
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
