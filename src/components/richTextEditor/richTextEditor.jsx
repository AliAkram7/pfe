import { Form, Formik } from 'formik';
import React from 'react'
import FormikControl from '../FormControl/FormikControl';
import * as Yup from 'yup'
import { IconBrandTelegram, IconPlane } from '@tabler/icons';
import { Button, SimpleGrid, Textarea, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
function RichTextEditor(props) {


const form  = useForm({
  initialValues :  {
    textContent : ''
  }, 
  validate : {
    textContent : isNotEmpty('empty message') , 
  }
})

  const onSubmit = (values) => {
    const payload = {
      textContent: values.textContent,
      room_id:props.room_id
    };

    props.action(payload)
  }

  return (
    <div>

            <div className='box'>
              <form  onSubmit={form.onSubmit(onSubmit)}  >
                <SimpleGrid  cols={1}  spacing='md' > 
                <Textarea

                  label='send message'
                  minRows={3}
                  {...form.getInputProps('textContent')}
                />
                <Button
                  type='submit'
                  // className='SubmitBtn'
                  style={{width:'10%'}}
                > send <IconBrandTelegram />
                </Button>
              </SimpleGrid>
              </form>
            </div>

    </div>
  )
}

export default RichTextEditor
