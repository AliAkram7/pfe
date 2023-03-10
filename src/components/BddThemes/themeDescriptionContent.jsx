import {
    createStyles,
    Text,
    Avatar,
    Group,
    TypographyStylesProvider,
    Paper,

} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    comment: {
        padding: `${theme.spacing.xl} ${theme.spacing.xl}`,
    },

    body: {
        paddingLeft: '60px',
        paddingTop: theme.spacing.lg,
        fontSize: theme.fontSizes.md,
    },

    content: {
        '& > p:last-child': {
            marginBottom: 0,
        },
    },
}));



export function ThemeDescriptionContent(props) {

    const { row } = props;
    const { teacher, title, description, send_at } = row;

    const { classes } = useStyles();
    return (
        <Paper  radius="lg" className={classes.comment}>
            <Group>
                <Avatar alt={teacher} radius="xl" />
                <div>
                    <Text fz="md">{teacher}</Text>
                    <Text fz="xs" c="dimmed">
                        {send_at}
                    </Text>
                </div>
            </Group>
            <TypographyStylesProvider className={classes.body}>
                <Text c='dimmed' >Title :</Text>
                <Text fz="md" >
                         {title}
                    </Text>
                <Text c='dimmed'  >Description :</Text>
                    <Text fz="md" >
                {description}
                </Text>
            </TypographyStylesProvider>
        </Paper>
    );
}