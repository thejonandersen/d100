import * as React from 'react';
import {useNavigate} from 'react-router'
import IconResolver from './IconResolver'
import {DrawerContent, Drawer, DrawerTrigger} from '@/components/ui/drawer'
import {Button} from '@/components/ui/button'

type DrawerLink = {
    label: string;
    uri: string;
    icon: string;
    children?: DrawerLink[];
}

export function DrawerNav() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const links: DrawerLink[] = [
        {
            label: 'Advantages',
            uri: 'advantage',
            icon: 'Rocket',
        },
        {
            label: 'Add Language',
            uri: 'language',
            icon: 'Speech'
        },
        {
            label: 'Races',
            uri: 'race',
            icon: 'Users',
        },
        {
            label: 'Characters',
            uri: 'character',
            icon: 'Puzzle',
        },
        {
            label: 'Templates',
            uri: 'character-template',
            icon: 'Atom',
        },
        {
            label: 'Powers',
            uri: 'power',
            icon: 'Zap',
        },
    ]

    const handleClick = (uri: string) => {
        setOpen(false);
        navigate(uri)
    }

    return (
        <Drawer direction="left" open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="[&_svg]:size-6 bg-yellow-500 border-amber-900 border-2"
                    onClick={() => setOpen(!open)}
                >
                    <IconResolver iconName="Menu" className="text-amber-900"/>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="top-0 bottom-0 fixed mt-0 w-44 rounded-none bg-yellow-500 border-none">
                <ul>
                    {links.map((link) => (
                        <li
                            key={link.label}
                            className="flex items-center m-4 cursor-pointer text-amber-900"
                            onClick={() => handleClick(link.uri)}
                        >
                            <IconResolver iconName={link.icon} className="mr-3" />{link.label}
                        </li>
                    ))}
                </ul>
            </DrawerContent>
        </Drawer>
    );
}
