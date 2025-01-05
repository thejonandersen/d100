import React from 'react'
import {Navigate} from 'react-router';
import {User} from '../state/user/slice'
import useIsTokenValid from '../hooks/useIsTokenValid'

interface ProtectedRouteParams {
    user: User,
    children: any,
}

export const ProtectedRoute = ({ user, children }: ProtectedRouteParams) => {
    const isTokenValid = useIsTokenValid();
    if (!user || !isTokenValid) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
