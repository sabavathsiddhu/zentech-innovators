import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '../components/Icons';

const PaymentSuccessPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/dashboard');
        }, 5000); // 5-second redirect

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [navigate]);

    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg animate-fade-in">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                    Payment Successful!
                </h2>
                <p className="mt-2 text-md text-gray-600 dark:text-gray-400">
                    Your internship slot is confirmed. We've sent a confirmation email with your next steps. You will be redirected to your dashboard shortly.
                </p>
                <div className="mt-8">
                    <NavLink
                        to="/dashboard"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-violet to-cyan hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan"
                    >
                        Go to Dashboard
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
