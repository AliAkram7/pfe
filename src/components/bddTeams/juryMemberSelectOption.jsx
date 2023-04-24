import { forwardRef } from 'react';
import { Group, Avatar, Text, Select } from '@mantine/core';
import { useState } from 'react';
import {

    Box,
    Collapse,
    ThemeIcon,
    UnstyledButton,
    createStyles,

} from '@mantine/core';
import { IconCalendarStats, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { IconPlus } from '@tabler/icons';
import { useFetchJuryMembersGroups } from './connection/connection';



const SelectItem = forwardRef(({ image, label, subLabel, ...others } = data, ref) => (

    <div ref={ref} {...others}>
        <GroupMember icon={IconPlus} label={label}
            initiallyOpened={true} links={subLabel}
        />
    </div>
));

export default function JuryMemberSelectOption(props) {

    const { form } = props
    const { data, isLoading } = useFetchJuryMembersGroups()



    return (
        !isLoading ?
            <Select
                label="Choose the group of jury members"
                placeholder="Pick one"
                itemComponent={SelectItem}
                data={data?.data}
                searchable
                maxDropdownHeight={400}
                nothingFound="Nobody here"
                filter={(value, item) =>
                    item.label.toLowerCase().includes(value.toLowerCase().trim())
                }

                {...form.getInputProps('group_number')}
            />
            : null
    );



}


const useStyles = createStyles((theme) => ({
    control: {
        fontWeight: 500,
        display: 'block',
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        fontSize: theme.fontSizes.sm,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    link: {
        fontWeight: 500,
        display: 'block',
        textDecoration: 'none',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        paddingLeft: ("81px"),
        marginLeft: ('30px'),
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        borderLeft: `${('1px')} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,

        // '&:hover': {
        //     backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        //     color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        // },
    },

    chevron: {
        transition: 'transform 200ms ease',
    },
}));


export function GroupMember({ icon: Icon, label, initiallyOpened, links }) {
    const { classes, theme } = useStyles();
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
    const items = (hasLinks ? links : []).map((link, idx) => (

        link.isPresident == 0 ?

            <Text

                className={classes.link}
                key={link.teacher}
            >
                examiner {idx + 1} {link.teacher}
            </Text>
            : link.isPresident == 1 ?
                <Text
                    className={classes.link}
                    key={link.teacher}
                >
                    president {link.teacher}
                </Text>
                :<Text
                    className={classes.link}
                    key={link.label}
                >
                    {link.label}
                </Text>


    ));

    return (
        <>
            <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
                <Group position="apart" spacing={0}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ThemeIcon variant="light" size={30}>
                            <Icon size="1.1rem" />
                        </ThemeIcon>
                        <Box ml="md">{label}</Box>
                    </Box>
                    {hasLinks && (
                        <ChevronIcon
                            className={classes.chevron}
                            size="1rem"
                            stroke={1.5}
                            style={{
                                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
                            }}
                        />
                    )}
                </Group>
            </UnstyledButton>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}

// const mockdata = {
//     label: 'Releases',
//     icon: IconCalendarStats,
//     links: [
//         { label: 'Upcoming releases', link: '/' },
//         { label: 'Previous releases', link: '/' },
//         { label: 'Releases schedule', link: '/' },
//     ],
// };

// function NavbarLinksGroup() {
//     return (
//         <Box
//             sx={(theme) => ({
//                 minHeight: ("220rem"),
//                 padding: theme.spacing.md,
//                 backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
//             })}
//         >
//             <LinksGroup {...mockdata} />
//         </Box>
//     );
// }