import {
    UnstyledButton,
    Group,
    Avatar,
    Text,
    createStyles,
    LoadingOverlay
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    user: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        backgroundColor: '#EEEEF5',
        borderRadius: '8px',
        '&:hover': {
            cursor: 'default'
        },
        userSelect: 'auto'
    }
}));

export function UserAvatar(props) {
    const { classes } = useStyles();

    return (<>
        <UnstyledButton className={
            classes.user
        }
        >
            <Group>
                <LoadingOverlay visible={!props.username} loaderProps={{
                    size: 'md',
                    color: 'gold'
                }} />

                <Avatar radius="xl" />
                <div style={
                    { flex: 1 }
                }>
                    <Text size="lg"
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