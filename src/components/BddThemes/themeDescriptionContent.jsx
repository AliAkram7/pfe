import {
    createStyles,
    Text,
    Avatar,
    Group,
    TypographyStylesProvider,
    Paper,
    validateJson,
    MediaQuery,

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
    const { teacher,
        title,
        description,
        send_at,
        objectives_of_the_project,
        key_word,
        work_plan,
        research_domain,
    } = row;

    const listKeyWord = key_word.map((key) => {

        return (
       
                <Text fz="md" >
                    - {key.key}
                </Text>

        )
    })

    const listWorkPlan = work_plan.map((plan) => {
        return (<Text fz="md" >
            - {plan.plan}
        </Text>)
    })

    const { classes } = useStyles();
    return (
        <Paper radius="lg" className={classes.comment}>
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
                <Text c='teal' >Title :</Text>
                <Text fz="md" >
                    {title}
                </Text>
                <Text c='teal'  >key words :</Text>
                {listKeyWord}
                <Text c='teal'  >Description :</Text>
                <Text fz="md" >
                    {description}
                </Text>
                <Text c='teal'  >objective of the project  :</Text>
                <Text fz="md" >
                    {objectives_of_the_project}
                </Text>
                <Text c='teal'  >work plan :</Text>
                {listWorkPlan}

            </TypographyStylesProvider>
        </Paper>
    );
}