import React, {useState, useEffect} from 'react'
import {
    Paper,
    Box,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Modal,
    Card,
    CardHeader,
    Avatar,
    CardContent,
    Container, Button
} from '@mui/material'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import {AdvantageCategory} from 'd100-libs'
import {categoryIcons, specialReqsToString, reqToString} from './utils'
import IconResolver from '../../components/IconResolver'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import useCollectionPage from '../../hooks/useCollectionPage'


export const Advantages = () => {
    const {data: advantages, handleEditClick, handleCreateClick, setSelected, selected, special} = useCollectionPage('advantage');
    const [categories, setCategories] = useState<AdvantageCategory[]>([])
    const [openCategory, setOpenCategory] = useState<AdvantageCategory|null>()

    const toggleOpen = (cat: AdvantageCategory) => {
        if (openCategory === cat) {
            setOpenCategory(null)
        } else {
            setOpenCategory(cat)
        }
    }

    useEffect(() => {
        if (!advantages.length) {
            return;
        } else {
            const categories: AdvantageCategory[] = [];
            advantages.forEach(advantage => {
                if (!categories.includes(advantage.category)) {
                    categories.push(advantage.category);
                }
            });
            setCategories(categories.sort());
            setOpenCategory(categories[0]);
        }
    }, [advantages])
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
                    startIcon={<IconResolver iconName="Add" />}
                    onClick={() => handleCreateClick()}
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
                                <ListItemIcon sx={{ color: 'inherit', mt: 0 }}>
                                    <IconResolver iconName={categoryIcons[category]} sx={(theme: any) => ({
                                        color: openCategory === category ? theme.palette.common.black : theme.palette.grey[500]
                                    })}/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={category.replace('_', ' ')}
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
                                advantages.filter(advantage => advantage.category === category).map((item) => (
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
            <Modal
                open={!!selected}
                onClose={() => { setSelected(null) }}
                sx={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                }}
            >
                <Card sx={{maxWidth: 500}}>
                    <CardHeader
                        avatar={selected && <Avatar><IconResolver iconName={categoryIcons[selected.category as AdvantageCategory]} /></Avatar>}
                        title={selected?.name}
                        subheader={selected?.category.replace('_', ' ')}
                        titleTypographyProps={{
                            color: 'primary',
                            variant: 'h5'
                        }}
                        action={
                            <IconButton onClick={() => setSelected(null)}>
                                <IconResolver iconName="Close" />
                            </IconButton>
                        }
                    />
                    <CardContent>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Description:</Typography>
                        <Typography variant="body2" sx={{ pb: 2 }}>
                            {selected?.description}
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{`Requirements${special && special.requirements ? ` (${specialReqsToString(special.requirements)})`:''}:`}</Typography>
                        {selected?.requirements.map((req: any) => {
                            const reqString = reqToString(req);
                            return (
                                <Typography key={reqString}>{reqString}</Typography>
                            )
                        })}
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', pt: 2 }}>Cost: {selected?.cost}</Typography>
                    </CardContent>
                </Card>
            </Modal>
        </Container>
    )
}
