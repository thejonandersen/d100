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
import {CreateAdvantageSchema, AdvantageCategory} from 'd100-libs'
import z from 'zod'
import {API} from '../../common/axios'
import {advantageCategoryIcons, specialReqsToString, reqToString} from './utils'
import IconResolver from '../../components/IconResolver'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import {useNavigate, useParams} from 'react-router'

type Advantage = z.infer<typeof CreateAdvantageSchema>

export const Advantage = () => {
    const [advantages, setAdvantages] = useState<Advantage[]>([])
    const [categories, setCategories] = useState<AdvantageCategory[]>([])
    const [openCategory, setOpenCategory] = useState<AdvantageCategory|null>()
    const [selected, setSelected] = useState<Advantage|null>();
    const [special, setSpecial] = useState<any>()
    const navigate = useNavigate();

    const handleAdvantageClick = (advantage: Advantage) => {
        setSelected(advantage);
        if (advantage.special) {
            setSpecial(JSON.parse(advantage.special));
        }
    }

    const handleAdvantageEditClick = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();

        navigate(`edit/${id}`)
    }

    const handleClose = () => {
        setSelected(null);
        setSpecial(null);
    }

    const toggleOpen = (cat: AdvantageCategory) => {
        if (openCategory === cat) {
            setOpenCategory(null)
        } else {
            setOpenCategory(cat)
        }
    }

    const loadAdvantages = async () => {
        try {
            const response = await API.get<Advantage[]>('advantage');
            const responseCategories: AdvantageCategory[] = [];
            setAdvantages(response);
            response.forEach(advantage => {
                if (!responseCategories.includes(advantage.category)) {
                    responseCategories.push(advantage.category);
                }
            });
            setCategories(responseCategories);
            setOpenCategory(responseCategories[0]);
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        loadAdvantages();
    }, [])
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
                    onClick={() => navigate('create')}
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
                                    <IconResolver iconName={advantageCategoryIcons[category]} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={category.replace('_', ' ')}
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
                                advantages.filter(advantage => advantage.category === category).map((item) => (
                                    <ListItemButton
                                        key={item.name}
                                        sx={{ py: 1, minHeight: 32}}
                                        onClick={() => handleAdvantageClick(item)}
                                    >
                                        <ListItemText
                                            primary={item.name}
                                        />
                                        <Button onClick={(e) => handleAdvantageEditClick(e, item.id as string)}>Edit</Button>
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
                        avatar={selected && <Avatar><IconResolver iconName={advantageCategoryIcons[selected.category]} /></Avatar>}
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
                        {selected?.requirements.map((req) => {
                            return (
                                <Typography>{reqToString(req)}</Typography>
                            )
                        })}
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', pt: 2 }}>Cost: {selected?.cost}</Typography>
                    </CardContent>
                </Card>
            </Modal>
        </Container>
    )
}
