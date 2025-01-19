import React, {useState, useEffect} from 'react'
import {
    Paper,
    Box,
    List,
    ListItemButton,
    ListItemText,
    Container, Button
} from '@mui/material'
import {AdvantageCategory, CreateRaceSchema} from 'd100-libs'
import z from 'zod'
import {API} from '../../common/axios'
import IconResolver from '../../components/IconResolver'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import {useNavigate, useParams} from 'react-router'
import {RaceModal} from './Modal'
import {load as loadRaces, all as allRaces, Race} from '../../state/race/slice'
import {useAppDispatch, useAppSelector} from '../../state/hooks'

export const Races = () => {
    const races = useAppSelector(allRaces)
    const [selected, setSelected] = useState<Race|null>();
    const [special, setSpecial] = useState<any>()
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleRaceClick = (race: Race) => {
        setSelected(race);
        if (race.special) {
            setSpecial(JSON.parse(race.special));
        }
    }

    const handleRaceEditClick = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();

        navigate(`edit/${id}`)
    }

    const handleClose = () => {
        setSelected(null);
        setSpecial(null);
    }

    useEffect(() => {
        if (!races.length) {
            dispatch(loadRaces());
        }
    }, [races])

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
                    {races.map((item: Race) => (
                        <ListItemButton
                            key={item.name}
                            sx={{ py: 1, minHeight: 32}}
                            onClick={() => handleRaceClick(item)}
                        >
                            <ListItemText
                                primary={item.name}
                            />
                            <Button onClick={(e) => handleRaceEditClick(e, item.id as string)}>Edit</Button>
                        </ListItemButton>
                    ))}
                </List>
            </Paper>
            <RaceModal race={selected as Race} handleClose={handleClose}/>
        </Container>
    )
}
