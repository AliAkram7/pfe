
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik';
import { LoadingOverlay, Modal } from '@mantine/core';
import FormikControl from '../FormControl/FormikControl';

import { useStateContext } from '../../contexts/ContextProvider';
import { useSendStudentUpdatedData } from './connection/sendData/sendData';
import { useTeacherContext } from '../../contexts/teacherContext';

function ChangeInfo(props) {
  const { teacher } = useTeacherContext();
  const [Overlay, setOverlay] = useState(false)
  const initialValues = {
    personal_email: teacher?.personal_email,
    institutional_email: teacher?.institutional_email,
    tel: teacher?.tel,
    prPassword: "",
    newPassword: "",
    confirm: "",
  };
  const validationSchema = Yup.object({
    personal_email: Yup.string().email("invalid email format !"),
    institutional_email: Yup.string().email("invalid email format !"),

    // TODO make the password validation require number and small case
    prPassword: Yup.string()
      .required("Please Enter your password")
      .min(
        8,
        "password must contain 8 or more characters with at least one of each: lowercase , number "
      )
      .max(16, "password more long than its alowd [8-16] "),
    newPassword: Yup.string()
      .matches(

        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "Must Contain at least  one Uppercase, One Lowercase and one Number "
      )
      .min(
        8,
        "password must contain 8 or more characters with at least one of each: lowercase , number "
      )
      .max(16, "password more long than its alowd [8-16] "),
    confirm: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    ,
  });


  // !! chage this 
  const { mutate: updateInfo, isLoading, isSuccess } = useSendStudentUpdatedData()


  const onSubmit = (value) => {
    // console.log(value);
    let sendData = {}
    if (value.personal_email !== teacher?.personal_email) {
      sendData = {
        ...sendData, 
        personal_email: value.personal_email
      }
    }
    if (value.institutional_email !== teacher?.institutional_email) {
      sendData = {
        ...sendData, 
        institutional_email: value.institutional_email
      }
    }
    if (value.tel !== teacher?.tel) {
      sendData = {
        ...sendData,
        tel: value.tel
      }
    }
    if ((value.newPassword !== "" && value.confirm !== "") && value.newPassword !== value.prPassword) {
      sendData = {
        ...sendData,
        newPassword: value.newPassword,
        confirm: value.confirm,
      }
    }
    if (value.prPassword !== "") {
      sendData = {
        ...sendData,
        prPassword: value.prPassword,
      };
    }

    // const {data} = useSendStudentUpdatedData(sendData);

    if (sendData.prPassword && (sendData.institutional_email || sendData.personal_email || sendData.newPassword || sendData.tel)) {
      updateInfo(sendData);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      props.close();
    }
  }, [isSuccess]);
  return (
    <Modal
      withCloseButton={true}
      closeOnClickOutside={false}
      opened={props.opened}
      onClose={props.close}
      size={600}
      title="change information"
      closeOnEscape={false}
    >
      <LoadingOverlay
        visible={isLoading}
        overlayBlur={1}
        loaderProps={{ size: 'md', color: 'gold' }}
        overlayOpacity={0.3}
        overlayColor="whitesmoke"
      />
      <h4>- strong password required. Enter 8-16 characters, Do not include common words or names, Combine uppercase letters, lowercase letters and numbers <br /> <br />
      </h4>
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
                  label='personal email'
                  name='personal_email'
                />
                <FormikControl
                  control='input'
                  type='text'
                  label='institutional email'
                  name='institutional_email'
                />
                <FormikControl
                  control='input'
                  type='text'
                  label='phone number'
                  name='tel'
                />
                <FormikControl
                  control='input'
                  type='password'
                  label='previos password'
                  name='prPassword'
                />

                <FormikControl
                  control='input'
                  type='password'
                  label='set new password'
                  name='newPassword'
                />
                <FormikControl
                  control='input'
                  type='password'
                  label='confirm '
                  name='confirm'
                />
                <button
                  type='submit'
                  className='SubmitBtn'
                // disabled={!Formik.isValid}

                // onClick={() => {onSubmit}
                // }

                >
                  confirm change
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </Modal>
  )
}

export default ChangeInfo