import React, {useState, useEffect} from 'react'
import {
  Paper,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Container, Button
} from '@mui/material'
import IconResolver from '../../components/IconResolver'
import {Power} from '../../state/power/slice'
import useCollectionPage from '../../hooks/useCollectionPage'

export const Powers = () => {
  const {data: powers, selected, setSelected, handleCreateClick, handleEditClick, special} = useCollectionPage('power');

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
            {powers.map((item: Power) => (
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
