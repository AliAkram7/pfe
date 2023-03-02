import { Container, Title, Accordion, createStyles, List, ThemeIcon } from "@mantine/core";
import { IconPaperclip } from "@tabler/icons";
import { createContext } from "react";
import { Link } from "react-router-dom";
import { useGetAllRooms } from "../connection/receiveData/fetchData";
import Task from "./task";

const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,
        minHeight: 650,
        width: '100%',
    },

    title: {
        marginBottom: theme.spacing.xl * 1.5
    },

    item: {
        borderRadius: theme.radius.md,
        marginBottom: theme.spacing.lg,

        border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
            }`
    }
}));





export function BlogTask() {


    const { data: getAllRooms } = useGetAllRooms();

    const teamRooms = getAllRooms?.data.map((room) => {
        const k = Math.random()
        return (<Task 
            key={k}
            title={room.room_name}
            description={room.discription} 
            creater={room.name}
            timeAgo={room.created_at}
            id={room.id_room}
            />)

    })


    const { classes } = useStyles();

    return (<>
        <div className='blog-section'>

            <h1>team rooms</h1>

            <Container size='lg'
                className={
                    classes.wrapper
                }>
                <Accordion variant='separated'>
                {teamRooms}
                </Accordion>

            </Container>
        </div>
    </>
    );
}

export default BlogTask;