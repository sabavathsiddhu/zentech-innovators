
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { CheckCircleIcon, XCircleIcon } from '../components/Icons';
// FIX: CertificateDetails should be imported from types.ts, not supabaseClient.ts
import { fetchCertificateFromSupabase } from '../supabaseClient';
import type { CertificateDetails } from '../types';


const VerifyCertificatePage = () => {
    const [certId, setCertId] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid' | 'error'>('idle');
    const [details, setDetails] = useState<CertificateDetails | null>(null);
    const [summary, setSummary] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!certId) return;

        setStatus('loading');
        setDetails(null);
        setSummary('');
        setErrorMessage('');

        try {
            const fetchedDetails = await fetchCertificateFromSupabase(certId);

            if (fetchedDetails) {
                setDetails(fetchedDetails);
                setStatus('valid');
                setIsGeneratingSummary(true);
                try {
                    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                    const prompt = `Generate a professional and concise verification summary for the following certificate.
                    - Certificate Holder: ${fetchedDetails.studentName}
                    - Program: ${fetchedDetails.domain}
                    - Issue Date: ${fetchedDetails.issueDate}
                    
                    The summary should sound official and confirmatory. Example: "This is a verified certificate for Riya Sharma, who successfully completed the Full Stack Development Fellowship on 2024-05-15."`;

                    const response = await ai.models.generateContent({
                        model: 'gemini-2.5-flash',
                        contents: prompt,
                    });
                    
                    setSummary(response.text);

                } catch (error) {
                    console.error("Error generating summary:", error);
                    setSummary("Could not generate AI summary, but the certificate is valid.");
                } finally {
                    setIsGeneratingSummary(false);
                }
            } else {
                setStatus('invalid');
            }
        } catch (err: any) {
             let userFriendlyError = "An unexpected database error occurred. Please try again later.";
            if (err.message?.includes("Could not find the table")) {
                userFriendlyError = "Database setup needed: The 'certificates' table is missing. Please create it in your Supabase project.";
            } else if (err.message?.includes('Failed to fetch')) {
                userFriendlyError = "Network Error: Could not connect to the database. Please check your Supabase credentials.";
            }
            setErrorMessage(userFriendlyError);
            setStatus('error');
        }
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Verify Certificate
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Enter the Certificate ID to verify its authenticity using our AI-powered system.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleVerify}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="certificate-id" className="sr-only">Certificate ID</label>
                            <input
                                id="certificate-id"
                                name="certificate-id"
                                type="text"
                                required
                                value={certId}
                                onChange={(e) => setCertId(e.target.value)}
                                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-slate-600 placeholder-gray-500 text-gray-900 dark:text-gray-200 bg-white dark:bg-slate-800 focus:outline-none focus:ring-cyan focus:border-cyan focus:z-10 sm:text-sm"
                                placeholder="Enter Certificate ID (e.g. INT2025-001)"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-violet to-cyan hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan disabled:opacity-50 transition-colors"
                        >
                            {status === 'loading' ? 'Verifying...' : 'Verify Now'}
                        </button>
                    </div>
                </form>

                <div className="mt-8">
                    {status === 'valid' && details && (
                        <div className="bg-green-100 dark:bg-green-900/50 border-l-4 border-green-500 p-4 rounded-r-lg animate-fade-in">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <CheckCircleIcon className="h-5 w-5 text-green-400" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Certificate Verified</h3>
                                    <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                                        {isGeneratingSummary ? (
                                            <p>Generating AI summary...</p>
                                        ) : (
                                            <p>{summary}</p>
                                        )}
                                        <a href={details.pdfLink} className="font-medium underline mt-2 inline-block">View Certificate PDF</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {(status === 'invalid' || status === 'error') && (
                        <div className="bg-red-100 dark:bg-red-900/50 border-l-4 border-red-500 p-4 rounded-r-lg animate-fade-in">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <XCircleIcon className="h-5 w-5 text-red-400" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Verification Failed</h3>
                                    <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                                        <p>{errorMessage || 'The certificate ID you entered was not found in our records. Please check the ID and try again.'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyCertificatePage;