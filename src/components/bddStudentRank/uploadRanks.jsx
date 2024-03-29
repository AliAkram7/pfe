import { useRef } from 'react';
import { Text, Group, Button, createStyles } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons';
import { useTeacherContext } from '../../contexts/teacherContext';
import { useUploadStudentsRanks } from './connection/connection';
import { useStateContext } from '../../contexts/ContextProvider';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        marginBottom: 30,
    },

    dropzone: {
        borderWidth: 1,
        paddingBottom: 50,
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },

    control: {
        position: 'absolute',
        width: 250,
        left: 'calc(50% - 125px)',
        bottom: -20,
    },
}));

function UploadRanks(props) {
    const { classes, theme } = useStyles();
    const openRef = useRef(null);

    const { selectedSpeciality } = useTeacherContext();
    const { selectedYearId } = useStateContext()
    const { mutate: uploadStudentRanks } = useUploadStudentsRanks()

    return (
        <div className={classes.wrapper}>
            <Dropzone
                openRef={openRef}
                onDrop={(files) => {
                    const formData = new FormData();
                    formData.append('file', files[0]);
                    formData.append('yearId', selectedYearId);
                    uploadStudentRanks(formData)
                    props.closeModel()
                }}
                onReject={(files) => console.log('rejected files', files)}
                className={classes.dropzone}
                radius="md"
                accept={[MIME_TYPES.xls]}
                maxSize={30 * 1024 ** 2}
            >
                <div style={{ pointerEvents: 'none' }}>
                    <Group position="center">
                        <Dropzone.Accept>
                            <IconDownload size={50} color={theme.colors[theme.primaryColor][6]} stroke={1.5} />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <IconCloudUpload
                                size={50}
                                color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                                stroke={1.5}
                            />
                        </Dropzone.Idle>
                    </Group>

                    <Text align="center" weight={700} size="lg" mt="xl">
                        <Dropzone.Accept>Drop files here</Dropzone.Accept>
                        {/* <Dropzone.Reject> file less than 30mb</Dropzone.Reject> */}
                        <Dropzone.Idle>Upload resume</Dropzone.Idle>
                    </Text>
                    <Text align="center" size="sm" mt="xs" color="dimmed">
                        Drag&apos;n&apos;drop files here to upload. We can accept only <i>.xlsx</i>
                    </Text>
                </div>
            </Dropzone>

            <Button color='teal' className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
                Select files
            </Button>
        </div>
    );
}

export default UploadRanks; 