import React, {useEffect} from "react";
import {Route, Routes} from "react-router";
import {useAppSelector} from '../state/hooks';
import {useLocation, useNavigate} from 'react-router';
import {Login, Home, Advantage, Race, Character, Language} from '../pages/';
import {User as UserPage} from '../pages/User';
import {ProtectedRoute} from './ProtectedRoute';
import {User, isTokenValid} from '../state/user/slice'
import {Container} from '@mui/material'

export const AppRoutes = () => {
    const user = useAppSelector(state => state.user)
    const location = useLocation();
    const navigate = useNavigate();
    const tokenValid = isTokenValid();

    console.log({ tokenValid })

    useEffect(() => {
        if (user.current && location.pathname === '/login') {
            navigate('/');
        }
    }, [user, tokenValid])

    return (
        <Container>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute user={user.current as User}>
                        <Home />
                    </ProtectedRoute>
                }/>
                <Route path="advantage" element={
                    <ProtectedRoute user={user.current as User}>
                        <Advantage />
                    </ProtectedRoute>
                }/>
                <Route path="character" element={
                    <ProtectedRoute user={user.current as User}>
                        <Character />
                    </ProtectedRoute>
                }/>
                <Route path="language" element={
                    <ProtectedRoute user={user.current as User}>
                        <Language />
                    </ProtectedRoute>
                }/>
                <Route path="race" element={
                    <ProtectedRoute user={user.current as User}>
                        <Race />
                    </ProtectedRoute>
                }/>
                <Route path="user" element={
                    <ProtectedRoute user={user.current as User}>
                        <UserPage />
                    </ProtectedRoute>
                }/>
                <Route path="login" element={<Login/>}/>
            </Routes>
        </Container>
    )
}
