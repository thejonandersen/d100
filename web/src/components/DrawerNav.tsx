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
    const open = useAppSelector(state => state.drawer.open);
    const dispatch = useAppDispatch();
    const dispatchToggle = () => dispatch(toggle(null));
    const navigate = useNavigate();
    const links: DrawerLink[] = [
        {
            label: 'Advantage',
            uri: 'advantage',
            icon: 'RocketLaunch',
            children: [
                {
                    label: 'Create',
                    uri: 'create',
                    icon: 'Add',
                },
                {
                    label: 'Edit',
                    uri: 'edit',
                    icon: 'Edit',
                }
            ],
        },
        {
            label: 'Add Language',
            uri: 'language',
            icon: 'RecordVoiceOver'
        },
        {
            label: 'Race',
            uri: 'race',
            icon: 'Diversity2',
            children: [
                {
                    label: 'Create',
                    uri: 'create',
                    icon: 'Add',
                },
                {
                    label: 'Edit',
                    uri: 'edit',
                    icon: 'Edit',
                }
            ],
        },
        {
            label: 'Character',
            uri: 'character',
            icon: 'Face',
            children: [
                {
                    label: 'Create',
                    uri: 'create',
                    icon: 'Add',
                },
                {
                    label: 'Edit',
                    uri: 'edit',
                    icon: 'Edit',
                }
            ],
        },
    ]

    // menu view/create/edit
    return (
        <Drawer open={open} onClose={dispatchToggle}>
            <Box sx={{width: 250}} role="presentation">
                <List>
                    {links.map((link) => (
                        <>
                            <ListItem key={link.uri} disablePadding>
                                <ListItemButton key={`${link.uri}_button`} onClick={() => navigate(link.uri)}>
                                    <ListItemIcon>
                                        <IconResolver iconName={link.icon}/>
                                    </ListItemIcon>
                                    <ListItemText primary={
                                        <Typography variant="h6" fontWeight="bold">{link.label}</Typography>
                                    }/>
                                </ListItemButton>
                            </ListItem>
                            {link.children && link.children.map(child => (
                                <ListItem key={`${link.uri}_${child.uri}`} disablePadding>
                                    <ListItemButton key={`${link.uri}_${child.uri}_button`} onClick={() => navigate(`${link.uri}/${child.uri}`)}>
                                        <ListItemIcon>
                                            <IconResolver iconName={child.icon}/>
                                        </ListItemIcon>
                                        <ListItemText primary={child.label}/>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                            <Divider/>
                        </>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}
