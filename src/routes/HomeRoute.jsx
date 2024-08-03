import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import LoginPage from '../pages/LoginPage/LoginPage';
import { authState } from '../atoms/authAtom';
import AdminRouter from './AdminRouter';
import UserRouter from './UserRouter';
import HomePage from '../pages/HomePage/HomePage';

function HomeRoute(props) {
    const auth = useRecoilValue(authState);
    const { principal } = auth;

    if (!principal) {
        return (
            <Routes>
                
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<HomePage />} />
            </Routes>
        );

    }
	console.log(principal);

    return (
        <Routes>
            {principal.role_id === 2 ? (
                <Route path="/*" element={<AdminRouter />} />
            ) : (
                <Route path="/*" element={<UserRouter />} />
            )}
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default HomeRoute;
