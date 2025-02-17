import * as React from 'react';
import {useAppSelector, useAppDispatch} from '@/state/hooks'
import {logout} from '@/state/user/slice';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import IconResolver from '@/components/IconResolver';
import {Button} from '@/components/ui/button';
import {DrawerNav} from '@/components/DrawerNav'

export function Header(): React.ReactElement {
    const user = useAppSelector(state => state.user.current);
    const dispatch = useAppDispatch();

    const logOutClick = () => {
        dispatch(logout());
    }

    return (
        <div className="flex w-full bg-yellow-700 h-14 justify-between p-2 pr-4 pl-4 items-center">
            <DrawerNav/>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarFallback className="bg-yellow-500 border-amber-900 border-2">
                            <IconResolver iconName="User" className="text-amber-900"/>
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={logOutClick}>Log Out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
