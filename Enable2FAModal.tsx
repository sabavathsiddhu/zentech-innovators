import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { XIcon } from './Icons';

interface Enable2FAModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Enable2FAModal: React.FC<Enable2FAModalProps> = ({ isOpen, onClose }) => {
    const { user, enableMfa } = useAuth();
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');

    if (!isOpen || !user) return null;

    // Mock secret key for demonstration. In a real app, this would be generated securely per user.
    const mockSecret = 'JBSWY3DPEHPK3PXP';
    const otpAuthUrl = `otpauth://totp/ZenTech:${user.email}?secret=${mockSecret}&issuer=ZenTech`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpAuthUrl)}`;

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        // Mock validation: check if it's a 6-digit number.
        // A real app would verify the TOTP against the secret.
        if (/^\d{6}$/.test(verificationCode)) {
            enableMfa();
            onClose();
        } else {
            setError('Please enter a valid 6-digit code from your authenticator app.');
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-lg p-8 relative transition-all duration-300 ease-out animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    <XIcon className="w-6 h-6" />
                </button>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Set up Two-Factor Authentication</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Scan the QR code with an authenticator app (like Google Authenticator or Authy), then enter the 6-digit code to verify.
                </p>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-shrink-0 p-4 bg-white rounded-lg">
                        <img src={qrCodeUrl} alt="QR Code for 2FA" className="w-48 h-48" />
                    </div>
                    <div className="w-full">
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">Or enter this code manually:</p>
                        <div className="my-2 p-3 bg-gray-100 dark:bg-slate-700 rounded-md text-center font-mono tracking-widest">
                            {mockSecret}
                        </div>
                        <form onSubmit={handleVerify} className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Verification Code
                                </label>
                                <input 
                                    type="text"
                                    id="verification-code"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    maxLength={6}
                                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan focus:border-cyan text-center text-lg tracking-[0.2em]"
                                    placeholder="_ _ _ _ _ _"
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-violet to-cyan hover:opacity-90"
                            >
                                Verify & Enable
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Enable2FAModal;
