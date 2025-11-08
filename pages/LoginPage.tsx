import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GoogleIcon } from '../components/Icons';

const LoginPage = () => {
    const [formState, setFormState] = useState({
        email: 'student@example.com',
        password: 'password123',
    });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const validateField = (name: string, value: string) => {
        let error = '';
        if (name === 'email') {
            if (!value) {
                error = 'Email is required.';
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                error = 'Email address is invalid.';
            }
        }
        if (name === 'password') {
            if (!value) {
                error = 'Password is required.';
            } else if (value.length < 8) {
                error = 'Password must be at least 8 characters long.';
            }
        }
        return error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const emailError = validateField('email', formState.email);
        const passwordError = validateField('password', formState.password);

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return;
        }

        login({ name: 'Alex Doe', email: formState.email });
        navigate('/dashboard');
    };
    
    const handleGoogleLogin = () => {
        login({ name: 'Google User', email: 'google.user@example.com' });
        navigate('/dashboard');
    };

    const isFormValid = useMemo(() => {
        const emailError = validateField('email', formState.email);
        const passwordError = validateField('password', formState.password);
        return !emailError && !passwordError;
    }, [formState]);


    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formState.email}
                                onChange={handleChange}
                                aria-invalid={!!errors.email}
                                aria-describedby="email-error"
                                className={`appearance-none rounded-md relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 dark:text-gray-200 bg-white dark:bg-slate-800 focus:outline-none focus:ring-cyan focus:border-cyan sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}
                                placeholder="Email address"
                            />
                             {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1 px-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="password"className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={formState.password}
                                onChange={handleChange}
                                aria-invalid={!!errors.password}
                                aria-describedby="password-error"
                                className={`appearance-none rounded-md relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 dark:text-gray-200 bg-white dark:bg-slate-800 focus:outline-none focus:ring-cyan focus:border-cyan sm:text-sm ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}
                                placeholder="Password"
                            />
                            {errors.password && <p id="password-error" className="text-red-500 text-xs mt-1 px-1">{errors.password}</p>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-violet to-cyan hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan disabled:opacity-50 transition-colors"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-slate-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-50 dark:bg-slate-900 text-gray-500 dark:text-gray-400">
                            OR
                        </span>
                    </div>
                </div>

                <div>
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan"
                    >
                        <GoogleIcon className="w-5 h-5 mr-2" />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
