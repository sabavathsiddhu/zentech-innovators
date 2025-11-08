import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LockIcon } from '../components/Icons';

const Verify2FAPage = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const user = location.state?.user;

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Mock validation: In a real app, you'd verify this code against a service.
        // The mock code '123456' corresponds to the QR code secret in the modal.
        setTimeout(() => {
            if (code === '123456' || /^\d{6}$/.test(code)) { // Loosely check for any 6 digits for demo
                login(user);
                navigate('/dashboard');
            } else {
                setError('Invalid authentication code. Please try again.');
                setLoading(false);
                setCode('');
            }
        }, 500);
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <LockIcon className="mx-auto h-12 w-auto text-cyan" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Two-Factor Authentication
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Enter the 6-digit code from your authenticator app.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <div>
                            <label htmlFor="2fa-code" className="sr-only">Authentication Code</label>
                            <input
                                id="2fa-code"
                                name="2fa-code"
                                type="tel"
                                autoComplete="one-time-code"
                                required
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className={`appearance-none rounded-md relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 dark:text-gray-200 bg-white dark:bg-slate-800 focus:outline-none focus:ring-cyan focus:border-cyan sm:text-lg text-center tracking-[0.5em] ${error ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}
                                placeholder="_ _ _ _ _ _"
                                maxLength={6}
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-violet to-cyan hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan disabled:opacity-50 transition-colors"
                        >
                            {loading ? 'Verifying...' : 'Verify'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Verify2FAPage;
