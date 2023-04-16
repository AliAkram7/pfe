import React, { useEffect } from "react";
import { Paper, Title, Button, TextInput, PasswordInput, SimpleGrid, createStyles, Flex } from "@mantine/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "../FormControl/FormikControl";



import "./login.css";
import { Link, Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import { completeNavigationProgress, startNavigationProgress } from "@mantine/nprogress";
import { axiosClient } from "../../axois-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { showNotification } from "@mantine/notifications";
import { IconArrowBack, IconArrowLeft, IconAt, IconLock, IconX } from "@tabler/icons";
import { useStudentContext } from "../../contexts/studentContext";
import { useQueryClient } from "react-query";
import jwt_decode from 'jwt-decode';
import { isEmail, isNotEmpty, matches, useForm } from "@mantine/form";

import heroImg from '../../../src/imges/dep1.jpg'
import { combineValidators } from "../TeacherprofilePage/changeInfo";



function Login() {

  const navigate = useNavigate()


  let location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      startNavigationProgress();
    }, 500);

    setTimeout(() => {
      completeNavigationProgress();
    }, 500);
  }, [location]);




  const form = useForm({
    initialValues: { code: "", password: "" , },
      validate: {
      code: combineValidators(isNotEmpty('code is required'), matches(/^([\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,})|([0-9]{8})$/, 'invalid format')), 
      password: (value) => (value.length < 8 ? 'password is required !' : null),
    },
  });

  const { setToken, role, setUser } = useStateContext()

  if (role === '') {
    return <Navigate to='/' />
  }

  const queryClient = useQueryClient()

  const handleSubmit = async (values) => {

  let logged = false  ; 

    let payload = {
      code: values.code,
      password: values.password
    }

    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if ( emailPattern.test(values.code))
    {

      payload = {
        ...payload, institutional_email : values.code 
      }


      payload = {
        ...payload, email : values.code 
      }
      payload.code = '' ; 

    }



    if (!logged) {
      await axiosClient.post('/student/login', payload)
        .then(({ data }) => {
          setToken(data.token)
          setUser(data.user);

          queryClient.invalidateQueries('fetchStudentData')
          queryClient.invalidateQueries('getStudentTeamInformation')
          queryClient.invalidateQueries('getAllRooms')
          logged = true ; 
          return <Navigate to='student' />
        }).catch((err) => {
          const response = err.response;
          if (response && response.status === 422 || response.status === 401) {
          
          }
        })

    }
     if (!logged) {
      await axiosClient.post('/teacher/login', payload)
        .then(({ data }) => {
          setToken(data.token)
          setUser(data.user)
          logged = true  ;
          return <Navigate to='/teacher' />

        }).catch((err) => {
          const response = err.response;
          if (response && response.status === 422 || response.status === 401) {
          
          }
        })
      }
       if (!logged) {

    await axiosClient.post('/admin/login', payload)
      .then(({ data }) => {
        setToken(data.token)
        setUser(data.user)
        logged = true
        return <Navigate to='/admin' />
      }).catch((err) => {
        const response = err.response;
        if (response && response.status === 422 || response.status === 401) {
    
        }
      })

    }

    if(!logged){
      showNotification({
        title: `can't access`,  message: `code or password is incorrect `, color: 'red',
        autoClose: true,
        disallowClose: true, 
        })
      }

    }
  

  return (

    <div className={`wrapper`}   >

      <Paper className='form' radius={0} p={25}>


        <div className='box'>

          <form onSubmit={form.onSubmit(handleSubmit)} >


            <SimpleGrid spacing={20} >


              <TextInput
                label='code or email'
                placeholder="code or email"
                size='md'
                icon={<IconAt size="1rem" />}

                  { ...form.getInputProps('code')} 
                  // pattern={"^([\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,})|(code-[0-9]{6})$"}
              />

              <PasswordInput
                label='password'
                placeholder="your password"
                size='md'
                icon={<IconLock size="1rem" />}
                {...form.getInputProps('password')}
              />

              <Button color='teal' size='md'
                type='submit'
              >
                login
              </Button>
            </SimpleGrid>


          </form>
        </div>




        <Button fullWidth mt="xl" size="sm"  variant="white" color='teal'   >
          <NavLink to='/'  style={{textDecoration:'none' , color:'black'}} > <Flex align={'center'}  gap='md'   >  <IconArrowLeft size={15} /> back to home </Flex>  </NavLink>
        </Button>


      </Paper>
    </div>
  );
}

export default Login 
