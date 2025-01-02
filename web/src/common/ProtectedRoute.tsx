import React from 'react'
import {Navigate} from 'react-router';
import {User} from '../features/user/slice'

interface ProtectedRouteParams {
    user: User,
    children: any,
}

export const ProtectedRoute = ({ user, children }: ProtectedRouteParams) => {
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
