import React, { useState, useEffect } from 'react';
import { XIcon, LockIcon } from './Icons';
import { useNavigate } from 'react-router-dom';
import type { Program, Applicant } from '../types';
import { saveApplicationToSupabase, savePaymentDetails } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    program: Program;
    duration: { label: string; price: number };
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, program, duration }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({ 
        name: user?.name || '', 
        email: user?.email || '', 
        phone: '' 
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'processing_payment' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFormData(prev => ({ ...prev, name: user.name, email: user.email }));
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePayment = async () => {
        setStatus('submitting');
        setError('');

        const applicantData: Applicant = { ...formData, programName: `${program.title} (${duration.label})` };
        
        const { data: applicationData, error: appError } = await saveApplicationToSupabase(applicantData);
    
        if (appError || !applicationData || !applicationData.id) {
            let userFriendlyError = 'Failed to submit application. Please try again.';
            if (appError?.message?.includes('Failed to fetch')) {
                userFriendlyError = 'Network Error: Could not connect to server. Please check your Supabase credentials and network connection.';
            } else if (appError?.message?.includes("Could not find the table")) {
                userFriendlyError = "Database setup needed: The 'applications' table is missing. Please create it in your Supabase project.";
            } else if (appError?.message.includes('violates row-level security policy')) {
                userFriendlyError = "Database Security Error: Submission is blocked. Please check the Row Level Security (RLS) policies for the 'applications' table in your Supabase project.";
            }
            setError(userFriendlyError);
            setStatus('error');
            console.error("Application submission error:", appError?.message);
            return;
        }
        
        const applicationId = applicationData.id;
        
        const options = {
            key: process.env.RAZORPAY_KEY_ID || 'rzp_test_YourKey', // Replace with your actual key
            amount: duration.price * 100, // Amount in paise
            currency: "INR",
            name: "ZenTech Innovators",
            description: `Registration for ${program.title} (${duration.label})`,
            image: "https://i.ibb.co/TqP8W94/Chat-GPT-Image-Nov-5-2025-11-28-13-PM-png.png",
            handler: async function (response: any) {
                setStatus('processing_payment');
                const { success, error: paymentError } = await savePaymentDetails({
                    applicationId,
                    paymentId: response.razorpay_payment_id,
                    amount: duration.price,
                    status: 'success',
                    method: 'Razorpay',
                });
                if (success) {
                    setStatus('success');
                    setTimeout(() => {
                        onClose();
                        navigate('/payment-success');
                    }, 1500);
                } else {
                    let userFriendlyError = 'Payment was successful, but we failed to save the details. Please contact support.';
                    if (paymentError?.message?.includes("Could not find the table")) {
                        userFriendlyError = "Database setup needed: The 'payments' table is missing. Please create it in your Supabase project.";
                    } else if (paymentError?.message?.includes('violates row-level security policy')) {
                        userFriendlyError = "Payment successful, but saving details was blocked. Please check RLS policies for the 'payments' table.";
                    }
                    setError(userFriendlyError);
                    setStatus('error');
                    console.error("Error saving payment details:", paymentError?.message);
                }
            },
            prefill: {
                name: formData.name,
                email: formData.email,
                contact: formData.phone,
            },
            notes: {
                program: `${program.title} (${duration.label})`,
                application_id: applicationId,
            },
            theme: {
                color: "#6B00B6"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', async function (response: any) {
            setError(`Payment Failed: ${response.error.description}`);
            setStatus('error');
            const { error: paymentError } = await savePaymentDetails({
                applicationId,
                paymentId: response.error.metadata.payment_id,
                amount: duration.price,
                status: 'failed',
                method: 'Razorpay',
            });
             if (paymentError) {
                console.error("Additionally, failed to log the failed payment:", paymentError.message);
                if (paymentError.message.includes("Could not find the table")) {
                     setError(`Payment Failed. Also, database setup needed: The 'payments' table is missing.`);
                } else if (paymentError.message.includes('violates row-level security policy')) {
                    setError(`Payment Failed. Also, database access is blocked. Please check RLS policies for the 'payments' table.`);
                }
            }
        });
        rzp.open();
        setStatus('idle'); // Reset status after opening modal
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handlePayment();
    };
    
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-md p-8 relative transition-all duration-300 ease-out animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    <XIcon className="w-6 h-6" />
                </button>
                
                {status === 'success' ? (
                     <div className="text-center py-8">
                        <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">Payment Successful!</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Your spot is confirmed. Redirecting...</p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Confirm Your Spot</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">You're applying for the <span className="font-semibold text-cyan">{program.title}</span> for <span className="font-semibold text-cyan">{duration.label}</span>.</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan focus:border-cyan" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan focus:border-cyan" />
                            </div>
                             <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                                <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan focus:border-cyan" />
                            </div>
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-violet to-cyan hover:opacity-90 disabled:opacity-50"
                                >
                                    {status === 'submitting' ? 'Processing...' : `Pay ₹${duration.price} and Confirm`}
                                </button>
                                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center flex items-center justify-center gap-2">
                                    <LockIcon className="w-4 h-4" /> 100% Secure via RuPay
                                </p>
                                {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default ApplicationModal;