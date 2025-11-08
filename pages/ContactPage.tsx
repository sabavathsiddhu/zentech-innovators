
import React, { useState } from 'react';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        // In a real app, you would send this to a backend/serverless function
        // which then calls an email API like SendGrid securely.
        // Example: await fetch('/api/send-email', { method: 'POST', body: JSON.stringify(formData) });
        console.log('Simulating API call to backend for sending email:', formData);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Email sent successfully (simulated).');
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="bg-gray-50 dark:bg-slate-900 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white dark:bg-slate-800 p-8 md:p-12 rounded-xl shadow-lg">
                    {/* Contact Info */}
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Get in Touch</h1>
                        <p className="mt-3 text-gray-600 dark:text-gray-400">
                            Have a question or want to work with us? Drop us a message, and we'll get back to you soon.
                        </p>
                        <div className="mt-8 space-y-4 text-gray-700 dark:text-gray-300">
                            <p className="flex items-center">
                                <svg className="w-5 h-5 mr-3 text-violet" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                <span>contact@zentechinnovators.com</span>
                            </p>
                            <p className="flex items-center">
                                <svg className="w-5 h-5 mr-3 text-violet" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                                <span>+91 12345 67890</span>
                            </p>
                             <p className="flex items-start">
                                <svg className="w-5 h-5 mr-3 text-violet flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                                <span>Bangalore, Karnataka, India</span>
                            </p>
                        </div>
                    </div>
                    
                    {/* Contact Form */}
                    <div>
                        {status === 'sent' ? (
                            <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 p-4 rounded-md h-full flex items-center justify-center">
                                <p>Thank you for your message! We'll be in touch shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan focus:border-cyan" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan focus:border-cyan" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                    <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan focus:border-cyan"></textarea>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-violet to-cyan hover:opacity-90 disabled:opacity-50"
                                    >
                                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;