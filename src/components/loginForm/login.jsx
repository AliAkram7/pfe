import React, { useEffect } from "react";
import { Paper, Title, Button, TextInput, PasswordInput, SimpleGrid } from "@mantine/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "../FormControl/FormikControl";



import "./login.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { completeNavigationProgress, startNavigationProgress } from "@mantine/nprogress";
import { axiosClient } from "../../axois-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { showNotification } from "@mantine/notifications";
import { IconArrowBack, IconArrowLeft, IconAt, IconLock, IconX } from "@tabler/icons";
import { useStudentContext } from "../../contexts/studentContext";
import { useQueryClient } from "react-query";
import jwt_decode from 'jwt-decode';
import { isNotEmpty, useForm } from "@mantine/form";
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
    initialValues: {code: "",password: ""},
    validate: {
      code: (value) => (value.length == 0 ? 'email is required !' : null),
      password: (value) => (value.length < 8 ? 'password is required !' : null),
    
    },
  });

  const { setToken, role, setUser } = useStateContext()

  if (role === '') {
    return <Navigate to='/' />
  }

  const queryClient = useQueryClient()

  const handleSubmit = (values) => {

    const payload = {
      code: values.code,
      password: values.password
    }

    

    if (role === 'student') {
      axiosClient.post('/student/login', payload)
        .then(({ data }) => {
          setToken(data.token)
          setUser(data.user);
          const decodedToken = jwt_decode(data.token);
          console.log(decodedToken)
          queryClient.invalidateQueries('fetchStudentData')
          queryClient.invalidateQueries('getStudentTeamInformation')
          queryClient.invalidateQueries('getAllRooms')
          return <Navigate to='student' />
        }).catch((err) => {
          const response = err.response;
          if (response && response.status === 422 || response.status === 401) {
            showNotification({
              title: `${response.data.message}`, message: `code or password is incorrect `, color: 'red',
              autoClose: true,
              disallowClose: true,

              icon: <IconX size={20} />
            }
            );
          }
        })

    }
    else if (role === 'teacher') {
      axiosClient.post('/teacher/login', payload)
        .then(({ data }) => {
          setToken(data.token)
          setUser(data.user)
          // console.log(data)
          return <Navigate to='/teacher' />
        }).catch((err) => {
          const response = err.response;
          if (response && response.status === 422 || response.status === 401) {
            showNotification({
              title: `${response.data.message}`, message: `code or password is incorrect `, color: 'red',
              autoClose: true,
              disallowClose: true,

              icon: <IconX size={20} />
            }
            );
          }
        })
    }
    // // } else if (role === 'admin') {

    // // }
  }

  return (

    <div className='wrapper'>

      <Paper className='form' radius={0} p={30}>
        <Title order={2} className='title' align='center' mt='md' mb={50}>

        </Title>

        <div className='box'>

          <form  onSubmit={form.onSubmit(handleSubmit)} >


            <SimpleGrid spacing={20} >

         
              <TextInput 
              label='code or email'
               placeholder="code or email" 
              size='md' 
              icon={<IconAt size="1rem" />} 
              {...form.getInputProps('code')} 
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




        <Button fullWidth mt="xl" size="sm" className="back-btn" variant="outline" color='teal'   >
          <Link to='/' ><IconArrowLeft size={15} /> back to home  </Link>
        </Button>


      </Paper>
    </div>
  );
}

export default Login 
