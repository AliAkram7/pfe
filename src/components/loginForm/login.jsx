import React, { useEffect } from "react";
import { Paper, Title, Button } from "@mantine/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "../FormControl/FormikControl";



import "./login.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { completeNavigationProgress, startNavigationProgress } from "@mantine/nprogress";
import { axiosClient } from "../../axois-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { showNotification } from "@mantine/notifications";
import { IconArrowBack, IconArrowLeft, IconX } from "@tabler/icons";
import { useStudentContext } from "../../contexts/studentContext";
import { useQueryClient } from "react-query";
import jwt_decode from 'jwt-decode';
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






  const initialValues = {
    code: "",
    password: "",
  };

  const validationSchema = Yup.object({
    code: Yup.string().required("Please enter your code ").min(8, 'code is invalide'),
    password: Yup.string()
      .required("Please enter your password")
      .min(
        8,
        "password must contain 8 or more characters with at least one of each: lowercase , number "
      )
      .max(256, "password more long than its alowd [8-256] "),
  });


  const { setToken, role, setUser } = useStateContext()

  if (role === '') {
    return <Navigate to='/' />
  }

  const queryClient = useQueryClient()

  const onSubmit = (value) => {

    const payload = {
      code: value.code,
      password: value.password
      
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
    // } else if (role === 'admin') {

    // }





  }

  return (

    <div className='wrapper'>

      <Paper className='form' radius={0} p={30}>
        <Title order={2} className='title' align='center' mt='md' mb={50}>

        </Title>

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
                    label='code'
                    name='code'
                  />
                  <FormikControl
                    control='input'
                    type='password'
                    label='password'
                    name='password'
                  />
                  <Button  color='teal' size='lg'
                    type='submit'
                    className='SubmitBtn'
                    disabled={!Formik.isValid}
                  >
                    login
                  </Button>
                </Form>
              </div>
            );
          }}
        </Formik>


        <Button fullWidth mt="xl" size="lg" className="back-btn" variant="outline" color='teal'   >
          <Link to='/' ><IconArrowLeft size={15}   /> back to home  </Link>
        </Button>


      </Paper>
    </div>
  );
}

export default Login 
