import React, {useEffect} from "react";
import {Route, Routes} from "react-router";
import {useAppSelector} from '../state/hooks';
import {useLocation, useNavigate} from 'react-router';
import {Login, Home, Advantages, Race, Character, Language, CreateOrEditAdvantage, CreateOrEditRace} from '../pages/';
import {User as UserPage} from '../pages/User';
import {ProtectedRoute} from './ProtectedRoute';
import {User} from '../state/user/slice'
import {Container} from '@mui/material'

export const AppRoutes = () => {
    const user = useAppSelector(state => state.user)
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.current && location.pathname === '/login') {
            navigate('/');
        }
    }, [user])

    return (
        <Container>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute user={user.current as User}>
                        <Home />
                    </ProtectedRoute>
                }/>
                <Route path="/advantage" element={
                    <ProtectedRoute user={user.current as User}>
                        <Advantages />
                    </ProtectedRoute>
                } />
                <Route path="/advantage/create" element={
                    <ProtectedRoute user={user.current as User}>
                        <CreateOrEditAdvantage />
                    </ProtectedRoute>
                }/>
                <Route path="/advantage/edit/:id" element={
                    <ProtectedRoute user={user.current as User}>
                        <CreateOrEditAdvantage />
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
                <Route path="/race/edit/:id" element={
                    <ProtectedRoute user={user.current as User}>
                        <CreateOrEditRace />
                    </ProtectedRoute>
                }/>
                <Route path="/race/create/:id" element={
                    <ProtectedRoute user={user.current as User}>
                        <CreateOrEditRace />
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
