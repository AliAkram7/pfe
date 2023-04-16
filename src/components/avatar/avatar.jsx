import {
    UnstyledButton,
    Group,
    Avatar,
    Text,
    createStyles,
    LoadingOverlay,
    Button
} from '@mantine/core';
import { useTimeout } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons';
import { useEffect, useState } from 'react';

const useStyles = createStyles((theme) => ({
    user: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        backgroundColor: '#FFFFFFF',
        border:'1px solid #12B886', 
        borderRadius: '8px',
        '&:hover': {
            cursor: 'default'
        },
        userSelect: 'auto'
    }
}));

export function UserAvatar(props) {
    const { classes } = useStyles();

    const [contextSets, setContextSet] = useState(false) ; 

    useEffect(() => {
      
        setTimeout(setContextSet(true), 1000*5) ; 
        
    }, [])
    

    return (<>
        <UnstyledButton className={
            classes.user
        }
        color='teal'
        >
            <Group>
                <LoadingOverlay visible={!props.username && !contextSets} loaderProps={{
                    size: 'md',
                    color: 'teal'
                }} />

                <Avatar radius="xl" />
                <div style={
                    { flex: 1 }
                }>
                    <Text size="sm"
                        weight={500}>{props.username}</Text>
                    <Text color="dimmed" size="sm">{props.userinfo}</Text>
                    <Text color="dimmed" size="sm">{props.email}</Text>
                    <Text color="dimmed" size="sm">{props.tel}</Text>
                    <Text weight={500} color="" size="xs">{props.date}</Text>


                </div>

            </Group>
        </UnstyledButton>
    </>
    );
}


export default UserAvatar