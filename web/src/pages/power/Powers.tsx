import React, {useEffect, useState} from 'react'
import {Box, Button, Container, List, ListItemButton, ListItemIcon, ListItemText, Paper} from '@mui/material'
import IconResolver from '../../components/IconResolver'
import {Power} from '../../state/power/slice'
import {PowerSkillSchema} from 'd100-libs'
import useCollectionPage from '../../hooks/useCollectionPage'
import z from 'zod'
import {categoryIcons} from './utils'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'

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
    const [openCategory, setOpenCategory] = useState<PowerCategory|null>()

    const toggleOpen = (cat: PowerCategory) => {
        if (openCategory === cat) {
            setOpenCategory(null)
        } else {
            setOpenCategory(cat)
        }
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
            setCategories(categories);
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
                                sx={[
                                    {
                                        px: 3,
                                        pt: 2,
                                        pb: 2,
                                        backgroundColor: openCategory === category ? 'rgba(0,0,0,0.05)' : 'inherit',
                                        boxShadow: openCategory === category ? '0px 2px 4px rgba(0,0,0,0.3)' : 'none',
                                        borderTop: openCategory !== category && index !== 0 ? '1px solid rgba(0,0,0,0.1)': 'none',
                                        transition: '0.2s'
                                    }
                                ]}

                            >
                                <ListItemIcon sx={{ color: 'inherit', mt: 0 }}>
                                    <IconResolver iconName={categoryIcons[category]} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={category && category.replace('_', ' ')}
                                    sx={{ my: 0 }}
                                />
                                <KeyboardArrowDown
                                    sx={[
                                        {
                                            mr: -1,
                                            transition: '0.2s',
                                        },
                                        openCategory === category
                                            ? {
                                                transform: 'rotate(-180deg)',
                                            }
                                            : {
                                                transform: 'rotate(0)',
                                            },
                                    ]}
                                />
                            </ListItemButton>
                            {openCategory === category &&
                                powers.filter((power: Power) => power.skill === category).map((item) => (
                                    <ListItemButton
                                        key={item.name}
                                        sx={{ py: 1, minHeight: 32}}
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
        </Container>
    )
}
