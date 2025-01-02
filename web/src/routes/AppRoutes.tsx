import React, {useEffect} from "react";
import {Route, Routes} from "react-router";
import {useAppSelector} from '../state/hooks';
import {useLocation, useNavigate} from 'react-router';
import {Login} from '../pages/Login';
import {ProtectedRoute} from './ProtectedRoute';
import {User} from '../state/user/slice'

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
        <Routes>
            <Route path="/" element={
                <ProtectedRoute user={user.current as User}>
                    <div>home</div>
                </ProtectedRoute>
            }/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    )
}
