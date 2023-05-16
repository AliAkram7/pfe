
import * as Yup from 'yup'
import "yup-phone-lite";
import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik';
import { Button, Highlight, LoadingOverlay, Modal, TextInput } from '@mantine/core';
import FormikControl from '../FormControl/FormikControl';

import { useSendStudentUpdatedData } from './connection/sendData/sendData';
import { useStudentContext } from '../../contexts/studentContext';
import axiosClient from '../../axois-client';
import { useStateContext } from '../../contexts/ContextProvider';
import jwt_decode from 'jwt-decode';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { combineValidators, isPasswordValid, isPhoneNumber } from '../TeacherprofilePage/changeInfo';
import { IconAt, IconDeviceMobile, IconKey } from '@tabler/icons';

function ChangeInfo(props) {

  const { student, firstLogin, setFirstLogin, setStudentToken } = useStudentContext();
  const { token, role, setToken, setNdToken } = useStateContext();

  const [Overlay, setOverlay] = useState(false)
  const initialValues = {
    email: student?.email,
    tel: student?.tel,
    prPassword: "",
    newPassword: "",
    confirm: "",
  };
  
  const update = useForm({
    initialValues: {
      email: student?.email,
      tel: student?.tel,
      prPassword: "",
      newPassword: "",
      confirm: ""
    },

    validate: {
      code: (value) => (value.length == 0 ? 'email is required !' : null),
      password: (value) => (value.length < 8 ? 'password is required !' : null),

    },
  });


  const changInfoForm = useForm({
    initialValues: {
      personal_email: student?.email ?  student?.email : "",
      tel: student?.tel ? student?.tel : "",
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


  const validationSchema = Yup.object({
    email: Yup.string().email("invalid email format !"),
    // TODO make the password validation require number and small case
    tel: Yup.string()
      .phone("DZ", "Please enter a valid phone number")
      .required("A phone number is required"),
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
  const notLoggedValidationSchema = Yup.object({
    email: Yup.string().required("required !").email("invalid email format !"),

    tel: Yup.string()
      .phone("DZ", "Please enter a valid phone number")
      .required("A phone number is required"),

    newPassword: Yup.string().required('change password is required !')
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
  const { mutate: updateInfo, isLoading, isSuccess } = useSendStudentUpdatedData()
  const onSubmit = (values) => {
    // console.log(value);

    //   personal_email: student?.email ?  student?.email : "",
      // tel: student?.tel ? student?.tel : "",
      // newPassword: "",
      // prPassword: '',
      // confirm: "",
    let sendData = {}
    if (values.personal_email !== student.email) {
      sendData = {
        email: values.personal_email
      }
    }
    if (values.tel !== student?.tel) {
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

    if (sendData.prPassword && (sendData.email || sendData.newPassword || sendData.tel)) {
      updateInfo(sendData)
    }
    else if (firstLogin && sendData.newPassword && sendData.email && sendData.newPassword && sendData.tel) {
      updateInfo(sendData)
    }

    props.close();

  };



  

  useEffect(() => {

    if (isSuccess && firstLogin) {

      axiosClient.post("/student/refreshToken")
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



return ( <Modal
  position='bottom'
  withCloseButton={true}
  closeOnClickOutside={false}
  opened={props.opened || firstLogin}
  onClose={props.close}
  size={600}icon
  title={  "change information"}
  closeOnEscape={false}
>
  <LoadingOverlay
    visible={isLoading}
    overlayBlur={1}
    loaderProps={{ size: 'md', color: 'gold' }}
    overlayOpacity={0.3}
    overlayColor="whitesmoke"
  />
    <h3> hello {student?.name} </h3> 
    {firstLogin ? <h4><Highlight color='teal'>this is your First Login</Highlight></h4> : null}
  <h4>strong password required. Enter 8-16 characters, Do not include common words or names, Combine uppercase letters, lowercase letters and numbers <br /> <br />
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

</Modal>)

  const y =  (
    <Modal
      withCloseButton={true}
      closeOnClickOutside={false}
      opened={props.opened || firstLogin}
      onClose={props.close}
      size={600}
      title="change information"
      closeOnEscape={false}
    >
      <LoadingOverlay
        visible={isSuccess}
        overlayBlur={1}
        loaderProps={{ size: 'md', color: 'gold' }}
        overlayOpacity={0.3}
        overlayColor="whitesmoke"
      />
      <h3>- strong password required. Enter 8-16 characters, Do not include common words or names, Combine uppercase letters, lowercase letters and numbers <br /> <br />
      </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={!firstLogin ? validationSchema : notLoggedValidationSchema}
        onSubmit={onSubmit}
      >
        {(Formik) => {
          return (
            <div className='box'>
              <Form>
                <TextInput
                  control='input'
                  type='text'
                  label='email'
                  name='email'
                />
                <TextInput
                  control='input'
                  type='text'
                  label='phone number'
                  name='tel'
                />

                {firstLogin == false ?
                  <TextInput
                    control='input'
                    type='password'
                    label='previos password'
                    name='prPassword'
                  /> : null
                }

                <TextInput
                  control='input'
                  type='password'
                  label='set new password'
                  name='newPassword'
                />
                <TextInput
                  control='input'
                  type='password'
                  label='confirm '
                  name='confirm'
                />
                <Button color='teal' size='lg'
                  type='submit'
                  className='SubmitBtn'
                  disabled={!Formik.isValid}
                // onClick={() => {onSubmit}
                // }

                >
                  confirm change
                </Button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </Modal>
  )
}

export default ChangeInfo