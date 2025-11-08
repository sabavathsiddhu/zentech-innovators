import React, { useState, useEffect } from 'react';
import { fetchAllInterns } from '../supabaseClient';
import type { Intern } from '../types';

const InternsListPage = () => {
    const [interns, setInterns] = useState<Intern[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getInterns = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchAllInterns();
                setInterns(data);
            } catch (err: any) {
                let userFriendlyError = "An unexpected error occurred while fetching data.";
                if (err.message?.includes('Failed to fetch')) {
                    userFriendlyError = 'Network Error: Could not fetch data. Please check your Supabase credentials and that the service is running.';
                } else if (err.message?.includes('Could not find the table')) {
                    userFriendlyError = "Database Setup Error: The 'interns' table seems to be missing. Please ensure it has been created in your Supabase project.";
                } else if (err.message?.includes('violates row-level security policy')) {
                    userFriendlyError = "Database Security Error: Access is blocked. Please check the Row Level Security (RLLS) policies for the 'interns' table.";
                } else {
                    userFriendlyError = err.message || userFriendlyError;
                }
                setError(userFriendlyError);
            } finally {
                setLoading(false);
            }
        };

        getInterns();
    }, []);

    return (
        <div className="bg-gray-50 dark:bg-slate-900 py-20 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Intern Applications</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Viewing all submissions from the ambassador program.
                    </p>
                </div>
                
                <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
                    {loading && <p className="p-6 text-center text-gray-600 dark:text-gray-400">Loading applications...</p>}
                    {error && <p className="p-6 text-center text-red-500">Error: {error}</p>}
                    {!loading && !error && (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                                <thead className="bg-gray-50 dark:bg-slate-700/50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Program</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Notes</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                                    {interns.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No applications found.</td>
                                        </tr>
                                    ) : (
                                        interns.map((intern) => (
                                            <tr key={intern.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{intern.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{intern.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{intern.program}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 max-w-xs truncate" title={intern.notes || ''}>{intern.notes || 'N/A'}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InternsListPage;
import { startPayment } from "../utils/payment";

// Example button
<button
  onClick={() =>
    startPayment({
      id: 123,
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      amount: 199,
    })
  }
  className="bg-violet-600 text-white px-6 py-2 rounded-lg"
>
  Apply Now
</button>
