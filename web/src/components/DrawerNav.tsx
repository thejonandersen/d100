import * as React from 'react';
import {
    Box,
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';

import {MoveToInbox, Mail} from '@mui/icons-material';

import {useAppSelector, useAppDispatch} from '../state/hooks';
import {toggle} from '../state/drawer/slice';
import {useNavigate} from 'react-router'
import IconResolver from './IconResolver'
import Typography from '@mui/material/Typography'

type DrawerLink = {
    label: string;
    uri: string;
    icon: string;
    children?: DrawerLink[];
}

export function DrawerNav() {
    const open = useAppSelector(state => state.drawer.status === 'open');
    const dispatch = useAppDispatch();
    const dispatchToggle = () => dispatch(toggle(null));
    const navigate = useNavigate();
    const links: DrawerLink[] = [
        {
            label: 'Advantages',
            uri: 'advantage',
            icon: 'RocketLaunch',
        },
        {
            label: 'Add Language',
            uri: 'language',
            icon: 'RecordVoiceOver'
        },
        {
            label: 'Races',
            uri: 'race',
            icon: 'Diversity2',
        },
        {
            label: 'Characters',
            uri: 'character',
            icon: 'Face',
        },
    ]

    // menu view/create/edit
    return (
        <Drawer open={open} onClose={dispatchToggle}>
            <Box sx={{width: 250}} role="presentation">
                <List>
                    {links.map((link) => (
                        <Box key={link.label}>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate(link.uri)}>
                                    <ListItemIcon>
                                        <IconResolver iconName={link.icon}/>
                                    </ListItemIcon>
                                    <ListItemText primary={
                                        <Typography variant="h6" fontWeight="bold">{link.label}</Typography>
                                    }/>
                                </ListItemButton>
                            </ListItem>
                            <Divider/>
                        </Box>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}
