
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';


// Fix: Provide content for DashboardPage.tsx, which was a placeholder file.
// This component acts as a simple placeholder for a user dashboard.

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="bg-gray-50 dark:bg-slate-900 py-20 min-h-[60vh] flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                        Welcome to your Dashboard, {user.name}!
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        This is a placeholder page for your dashboard content. Your courses and progress would appear here.
                    </p>
                    <button
                        onClick={handleLogout}
                        className="mt-8 bg-gradient-to-r from-violet to-cyan text-white font-semibold px-6 py-2 rounded-md shadow-lg hover:shadow-xl transition-shadow"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
