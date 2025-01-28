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
import {load as loadRaces, all as allRaces, Race} from '../../state/race/slice'
import {useAppDispatch, useAppSelector} from '../../state/hooks'
import useCollectionPage from '../../hooks/useCollectionPage'

export const CharacterTemplates = () => {
  const {data: races, selected, setSelected, handleCreateClick, handleEditClick, special} = useCollectionPage('characterTemplate');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setSelected(null);
  }

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
              onClick={handleCreateClick}
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
                    onClick={() => setSelected(item)}
                >
                  <ListItemText
                      primary={item.name}
                  />
                  <Button onClick={(e) => handleEditClick(e, item.id as string)}>Edit</Button>
                </ListItemButton>
            ))}
          </List>
        </Paper>
      </Container>
  )
}
