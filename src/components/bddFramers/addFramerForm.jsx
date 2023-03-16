import { Button, createStyles, LoadingOverlay, NumberInput, Select, SimpleGrid, TextInput } from '@mantine/core';
import { hasLength, isNotEmpty, matches, useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react'
import { useTeacherContext } from '../../contexts/teacherContext';
import { useAddTeacherAsFramer, useFetchListOfNotFramer } from './connection/connection';

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

function AddFramerFrom(props) {
    const { classes, cx } = useStyles();


    const [selectedData, setSelectedData] = useState([])

    const { data: fetchListOfNotFramer } = useFetchListOfNotFramer()

    function combineValidators(...validators) {
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

    const form = useForm({
        initialValues: { code: '', numberOfAcceptedTeam: 0 },

        // functions will be used to validate values at corresponding key
        validate: {
            code: combineValidators(
                hasLength({ min: 8, max: 12 }, 'required'),
                matches(/[0-9]+$/gm, 'Name should contain at least one number', true),
            ),
            numberOfAcceptedTeam: (value) => (value < 1 ? 'at least accepted on team' : value > 4 ? 'maximum accepted is 4' : null)
        }
    });

    const { mutate: addTeacherAsFramer, isLoading :addIsLoading } = useAddTeacherAsFramer()

    const handleSubmit = (values) => {

        const payload = {
            code: values.code,
            numberOfAcceptedTeam: values.numberOfAcceptedTeam
        }
        addTeacherAsFramer(payload)
        
    };

    return (
        <>

            <LoadingOverlay
                visible={addIsLoading}
                overlayBlur={1}
                loaderProps={{ size: 'md', color: 'gold' }}
                overlayOpacity={0.3}
                overlayColor="whitesmoke"
            />
            <form onSubmit={form.onSubmit(handleSubmit)} >
                <SimpleGrid cols={1}  >
                    {fetchListOfNotFramer?.data?.length > 0 ?
                        <Select
                            data={fetchListOfNotFramer?.data}
                            allowDeselect={true}
                            label='teacher'
                            {...form.getInputProps('code')}
                            searchable
                        /> : <Select
                            placeholder='no teacher found !'
                            data={[]}
                            allowDeselect={true}
                            label='teacher'
                            searchable
                        />
                    }
                    <SimpleGrid cols={1} >
                        <NumberInput
                            label="number of teams allowed"
                            defaultValue={0}
                            min={0}
                            step={1}
                            max={4}
                            stepHoldDelay={500}

                            {...form.getInputProps('numberOfAcceptedTeam')}
                        />

                    </SimpleGrid>

                    <Button type='onsubmit' >save</Button>
                </SimpleGrid>
            </form>
        </>
    )
}

export default AddFramerFrom