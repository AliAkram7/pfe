
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik';
import { Box, Button, Drawer, LoadingOverlay, Modal, NativeSelect, PasswordInput, TextInput } from '@mantine/core';
import FormikControl from '../FormControl/FormikControl';

import { useStateContext } from '../../contexts/ContextProvider';
import { useSendStudentUpdatedData } from './connection/sendData/sendData';
import { useTeacherContext } from '../../contexts/teacherContext';
import { hasLength, isEmail, isNotEmpty, useForm } from '@mantine/form';
import axiosClient from '../../axois-client';
import jwt_decode from 'jwt-decode';
import { IconAt, IconDeviceMobile, IconKey } from '@tabler/icons';

export function combineValidators(...validators) {
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


export function isPasswordValid(errorMessage) {
  return (value) => {
    const hasNumber = /\d/;
    const hasUpperCase = /[A-Z]/;
    if ((!hasNumber.test(value) || !hasUpperCase.test(value)) && value.length > 0) {
      return errorMessage;
    }
    return null;
  };
}
export function isPhoneNumber(errorMessage) {
  return (value) => {
    const algerianNumberRegex = /^(\+213|0)[5-7,9]\d{8}$/;
    if (!algerianNumberRegex.test(value)) {
      return errorMessage;
    }
    return null;
  };
}

function ChangeInfo(props) {
  const [Overlay, setOverlay] = useState(false)

  const { teacher, firstLogin, setFirstLogin, setTeacherToken } = useTeacherContext();
  const { token, role, setToken, setNdToken } = useStateContext();






  const changInfoForm = useForm({
    initialValues: {
      personal_email: teacher?.personal_email,
      tel: teacher?.tel,
      newPassword: "",
      prPassword: '',
      confirm: "",

    },
    validate: {
      personal_email: combineValidators(
        isNotEmpty("field required"),
         isEmail('invalid email format')
      ),
      tel: combineValidators(
        isNotEmpty('field required'),
        isPhoneNumber('invalid number format')

      ),
      prPassword: combineValidators(
        ...(!firstLogin ? [isNotEmpty("field required"), isPasswordValid("Password must contain at least 1 uppercase letter and 1 number")] : [])
      ),
      newPassword: combineValidators(
        isPasswordValid("Password must contain at least 1 uppercase letter and 1 number"),
        ...(firstLogin ? [isNotEmpty("field required"),] : []),
      ),
      confirm: (value, values) =>
        value !== values.newPassword ? 'Passwords did not match' : null,
    }
  })




  const { mutate: updateInfo, isLoading, isSuccess } = useSendStudentUpdatedData()

  const onSubmit = (values) => {
    // console.log(values);
    let sendData = {}
    if (values.personal_email !== teacher?.personal_email) {
      sendData = {
        ...sendData,
        personal_email: values.personal_email
      }
    }


    if (values.tel !== teacher?.tel) {
      sendData = {
        ...sendData,
        tel: values.tel
      }
    }
    if ((values.newPassword !== "" && values.confirm !== "") && values.newPassword !== values.prPassword) {
      sendData = {
        ...sendData,
        newPassword: values.newPassword,
        confirm: values.confirm,
      }
    }
    if (values.prPassword !== "") {
      sendData = {
        ...sendData,
        prPassword: values.prPassword,
      };
    }

    // const {data} = useSendStudentUpdatedData(sendData);

    if (sendData.prPassword && (sendData.institutional_email || sendData.personal_email || sendData.newPassword || sendData.tel)) {
      updateInfo(sendData);
    }
    else if (firstLogin && (sendData.personal_email && sendData.newPassword && sendData.tel)) {
      sendData = {
        ...sendData,
        prPassword: 'garbage value',
      };
      updateInfo(sendData);
    }

    props.close()

  };


  useEffect(() => {

    if (isSuccess && firstLogin) {

      axiosClient.post("/teacher/refreshToken")
        .then(({ data }) => {
          if (data.token) {
            setToken(null)
            setToken(data.token);
            const decodedToken = jwt_decode(data.token);
            setFirstLogin(decodedToken.first_login)
          }
        })
        .catch(error => {
          console.error("Error refreshing token:", error);
        });
    }

  }, [isSuccess]);



  return (
    <Modal
      position='bottom'
      withCloseButton={true}
      closeOnClickOutside={false}
      opened={props.opened || firstLogin}
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


      {/* <div > */}
        <form onSubmit={changInfoForm.onSubmit(onSubmit)} >
          <TextInput

            label='personal email'
            {...changInfoForm.getInputProps('personal_email')}
            icon={<IconAt size={16} />}
          />
          <TextInput

            label='phone number'
            {...changInfoForm.getInputProps('tel')}
            icon={<IconDeviceMobile size={16} />}
          />

          {!firstLogin && <TextInput
            type={'password'}
            label='password'
            {...changInfoForm.getInputProps('prPassword')}
            icon={<IconKey size={16} />}
          />}

          <TextInput
            type={'password'}
            label='new password'
            {...changInfoForm.getInputProps('newPassword')}
            icon={<IconKey size={16} />}

          />


          <TextInput
            type={'password'}
            label='confirm'
            {...changInfoForm.getInputProps('confirm')}
            icon={<IconKey size={16} />}

          />

          <Button
            my={20}
            type='submit'
          >
            confirm change
          </Button>
        </form>
      {/* </div> */}

    </Modal>
  )
}

export default ChangeInfo