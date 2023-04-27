import { Button, createStyles, LoadingOverlay, NumberInput, Select, SimpleGrid } from '@mantine/core';
import { DatePicker, DateRangePicker, Month, TimeInput } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import dayjs from 'dayjs';

import React, { useState } from 'react'


import { combineValidators } from '../TeacherprofilePage/changeInfo';
import { useCreatePeriod, useCreatePresentationRn } from './connection/connection';


const useStyles = createStyles((theme) => ({
    outside: {
        opacity: 0,
    },

    weekend: {
        color: `${theme.colors.green[6]} !important`,
    },

    selected: {
        color: `${theme.white} !important`,
        backgroundColor: `${theme.colors.green[6]} !important`
    },

}));

export default function PresentationForm(props) {
    const { classes, cx } = useStyles();



    const [selectedData, setSelectedData] = useState([])

    const form = useForm({
        initialValues: {
            date_presentation: '',
            time_presentation: '',
        },
        validate: {
            date_presentation: isNotEmpty('cannot be empty'),
            time_presentation: isNotEmpty('cannot be empty'),
        },
    });

    const { mutate: createPresentationRn, isLoading: createPresentationRnLoading } = useCreatePresentationRn()

    const handleSubmit = (values) => {

        const dateApp = new Date(
            values.date_presentation.getFullYear(),
            values.date_presentation.getMonth(),
            values.date_presentation.getDate(),
            values.time_presentation.getHours(),
            values.time_presentation.getMinutes(),
            values.time_presentation.getSeconds(),
        );

        const payload = { date_presentation: dateApp }

        console.log(payload)
        createPresentationRn(payload);


    };


    return (
        <>

            <LoadingOverlay
                visible={createPresentationRnLoading}
                overlayBlur={1}
                loaderProps={{ size: 'md', color: 'gold' }}
                overlayOpacity={0.3}
                overlayColor="whitesmoke"
            />
            <form onSubmit={form.onSubmit(handleSubmit)} >

                <SimpleGrid spacing={20} >
                    <DatePicker
                        label="date Presentation"
                        placeholder="Pick dates range"
                        {...form.getInputProps('date_presentation')}
                    />
                    <TimeInput
                        withAsterisk
                        label="Pick time"
                        format="12"
                        {...form.getInputProps('time_presentation')}
                    />

                    <Button type='onsubmit' >save</Button>
                </SimpleGrid>
            </form>
        </>
    )
}
