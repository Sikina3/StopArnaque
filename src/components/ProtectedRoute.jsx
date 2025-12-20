import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ isAdmin = false }) => {
    const { user, loading } = useAuth();

    console.log("ProtectedRoute check:", { isAdmin, user, loading });

    if (loading) {
        return null;
    }

    if (!user) {
        console.log("No user found, redirecting to /login");
        return <Navigate to="/login" replace />;
    }

    const isUserAdmin =
        user.admin === true ||
        user.admin === 1 ||
        user.admin === "1" ||
        String(user.admin).toLowerCase() === "true";

    console.log("Admin check details:", {
        isUserAdmin,
        rawValue: user.admin,
        type: typeof user.admin
    });

    if (isAdmin && !isUserAdmin) {
        console.log("Access denied: User is not an admin. Redirecting to home.");
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
