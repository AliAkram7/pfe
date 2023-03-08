import { TextInput, Textarea, SimpleGrid, Group, Title, Button, Select, MantineProvider, Flex } from '@mantine/core';
import { IconBrandTelegram } from '@tabler/icons';
// import { useForm } from '@mantine/form';
import { Form, Formik } from 'formik';
import { useRef } from 'react';
import * as Yup from 'yup'
import FormikControl from '../FormControl/FormikControl';
import { useSendSuggestion } from './connection/sendSuggestion';



export function SuggestionTheme() {

    const specialty_name = useRef() 
    const initialValues = {
        themeTitle: "",
        themeDesc: "",
        specialty_name : '',

    }


    const validationSchema =  Yup.object({
        themeTitle : Yup.string().required('this field is required') , 
        themeDesc : Yup.string().required('this field is required') , 

    })


    const {mutate :  sendSuggestion} = useSendSuggestion()
    
    const onSubmit=(value)=>{
        console.log(value.themeDesc)
            let payload = { 
                themeTitle : value.themeTitle , 
                themeDesc : value.themeDesc  , 
                specialty_name :  specialty_name.current.value
            } 

            sendSuggestion(payload) ; 

    }


    return (
        <>
            <Formik
                initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}

            >
                {(Formik) => {
                    return (
                        <div className='box'>


                            <Form>
                                <SimpleGrid cols={1} mt="lg" breakpoints={[{ maxWidth: 'xl', cols: 1 }]}>

                                    <FormikControl
                                        control='input'
                                        type='text'
                                        label='theme title'
                                        name='themeTitle'
                                    />
                                    <MantineProvider theme={{ primaryColor: 'teal' }} >
                                        <Select
                                            // label="specialty"
                                            variant='default'
                                            placeholder="specialty"
                                            searchable
                                            nothingFound="No options"
                                            // required={true}  
                                            ref = {specialty_name}
                                            data={[
                                                { value: 'RSD', label: 'networks and distributed system', group: 'Computer Science department' },
                                                { value: 'ISI', label: 'computer systems engineer', group: 'Computer Science department' },
                                                { value: 'SITW', label: 'Information systems and web technology', group: 'Computer Science department' },
                                                { value: 'summer', label: 'Summer', group: 'Never was a pickle' },]}
                                        />
                                    </MantineProvider> 
                                </SimpleGrid>

                                <FormikControl
                                    control='textarea'
                                    label='theme description'
                                    name="themeDesc"
                                    row={50}
                                />

                                <Group position="center"
                                    mt="xl"  >
                                    <Button color='teal' size='lg'
                                        type='submit'
                                        className='SubmitBtn'
                                      disabled={!Formik.isValid} 
                                    >send<IconBrandTelegram />
                                    </Button>
                                </Group>
                            </Form>
                        </div>
                    );
                }}

            </Formik>

        </>
    );
}