import React, {useEffect, useState} from 'react'
import {
    Box,
    Button,
    capitalize,
    Container,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper
} from '@mui/material'
import IconResolver from '../../components/IconResolver'
import {Power} from '../../state/power/slice'
import {PowerSkillSchema} from 'd100-libs'
import useCollectionPage from '../../hooks/useCollectionPage'
import z from 'zod'
import {categoryIcons} from './utils'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import PowerModal from './Modal'

type PowerCategory = z.infer<typeof PowerSkillSchema>

export const Powers = () => {
    const {
        data: powers,
        selected,
        setSelected,
        handleCreateClick,
        handleEditClick,
        special
    } = useCollectionPage('power');
    const [categories, setCategories] = useState<PowerCategory[]>([])
    const [openCategory, setOpenCategory] = useState<PowerCategory | null>()

    const toggleOpen = (cat: PowerCategory) => {
        if (openCategory === cat) {
            setOpenCategory(null)
        } else {
            setOpenCategory(cat)
        }
    }

    const handleClose = () => {
        setSelected(null);
    }

    useEffect(() => {
        if (!powers.length) {
            return;
        } else {
            const categories: PowerCategory[] = [];
            powers.forEach((power: Power) => {
                if (!categories.includes(power.skill)) {
                    categories.push(power.skill);
                }
            });
            setCategories(categories.sort());
            setOpenCategory(categories[0]);
        }
    }, [powers])

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    pb: 2
                }}
            >
                <Button
                    variant="contained"
                    startIcon={<IconResolver iconName="Add"/>}
                    onClick={handleCreateClick}
                >
                    Create New
                </Button>
            </Box>
            <Paper>
                <List component="nav" disablePadding>
                    {categories.map((category, index) => (
                        <Box key={category}>
                            <ListItemButton
                                alignItems="flex-start"
                                onClick={() => toggleOpen(category)}
                                selected={openCategory === category}
                                dense={openCategory !== category}
                                sx={theme => ({
                                    px: 3,
                                    py: 2,
                                    boxShadow: openCategory === category ? theme.shadows[3] : theme.shadows[0],
                                    borderTop: openCategory !== category && index !== 0 ? `1px solid ${theme.palette.grey[200] }`: 'none',
                                    transition: '0.2s',
                                    zIndex: theme.zIndex.drawer - 1
                                })}

                            >
                                <ListItemIcon sx={{color: 'inherit', mt: 0}}>
                                    <IconResolver iconName={categoryIcons[category]} sx={(theme: any) => ({
                                        color: openCategory === category ? theme.palette.common.black : theme.palette.grey[500]
                                    })}/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={category && capitalize(category.replace('_', ' '))}
                                    sx={(theme: any) => ({
                                        color: openCategory === category ? theme.palette.common.black : theme.palette.grey[500]
                                    })}
                                />
                                <KeyboardArrowDown
                                    sx={theme => ({
                                        mr: -1,
                                        transition: '0.2s',
                                        transform: openCategory === category ? 'rotate(-180deg)' : 'rotate(0)',
                                        color: openCategory === category ? theme.palette.common.black : theme.palette.grey[500]
                                    })}
                                />
                            </ListItemButton>
                            {openCategory === category &&
                                powers.filter((power: Power) => power.skill === category).map((item) => (
                                    <ListItemButton
                                        key={item.name}
                                        sx={theme => ({
                                            borderBottom: `1px solid ${theme.palette.grey[400] }`,
                                        })}
                                        onClick={() => setSelected(item)}
                                    >
                                        <ListItemText
                                            primary={item.name}
                                        />
                                        <Button onClick={(e) => handleEditClick(e, item.id as string)}>Edit</Button>
                                    </ListItemButton>
                                ))}
                        </Box>
                    ))}
                </List>
            </Paper>
            <PowerModal handleClose={handleClose} power={selected} />
        </Container>
    )
}
