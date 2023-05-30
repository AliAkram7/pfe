import { Button, createStyles, LoadingOverlay, NumberInput, Select, SimpleGrid } from '@mantine/core';
import { DateRangePicker, Month } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import dayjs from 'dayjs';

import React, { useState } from 'react'


import { combineValidators } from '../TeacherprofilePage/changeInfo';
import { useCreatePeriod } from './connection/connection';
import { useStateContext } from '../../contexts/ContextProvider';


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

function AddFollowUpForm(props) {
    const { classes, cx } = useStyles();



    const [selectedData, setSelectedData] = useState([])

    const form = useForm({
        initialValues: {
            nPeriod: 1,
            dateRange: [new Date(),
            new Date(),],
        },
        validate: {
            nPeriod: isNotEmpty('cannot be empty'),
            dateRange: (value) => (value[0] == null || value[1] == null ? 'cannot be empty' : null),
        },
    });

    const {mutate  : createPeriod} = useCreatePeriod()

    const {selectedYearId}  = useStateContext()
    
    const handleSubmit = (values) => {

        let start_date = values.dateRange[0].toISOString().slice(0, 19).replace('T', ' ');
        let end_date = values.dateRange[1].toISOString().slice(0, 19).replace('T', ' ');
        const payload = {
            start_date: start_date,
            end_date: end_date,
            nPeriod: values.nPeriod,
            selectedYearId : selectedYearId
        }

        createPeriod(payload) ; 


    };

    return (
        <>

            <LoadingOverlay
                // visible={addIsLoading}
                overlayBlur={1}
                loaderProps={{ size: 'md', color: 'gold' }}
                overlayOpacity={0.3}
                overlayColor="whitesmoke"
            />
            <form onSubmit={form.onSubmit(handleSubmit)} >

                <NumberInput
                    min={1}
                    label='period number'
                    {...form.getInputProps('nPeriod')}
                />
                <SimpleGrid spacing={20} >
                    <DateRangePicker
                        label='range'
     
                        {...form.getInputProps('dateRange')}
                    />
                    <Button type='onsubmit' >save</Button>
                </SimpleGrid>
            </form>
        </>
    )
}

export default AddFollowUpForm