import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import type { Partner } from '../types';
import PartnerDetailModal from '../components/PartnerDetailModal';

const partners: Partner[] = [
    { name: 'Google', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1280px-Google_2015_logo.svg.png', description: 'A multinational technology company specializing in Internet-related services and products, including online advertising technologies, a search engine, cloud computing, software, and hardware.', websiteUrl: 'https://about.google/' },
    { name: 'Amazon', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', description: 'A global leader in e-commerce, cloud computing with AWS, digital streaming, and artificial intelligence. Known for its customer-centric approach and innovation.', websiteUrl: 'https://www.aboutamazon.com/' },
    { name: 'Microsoft', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1280px-Microsoft_logo_%282012%29.svg.png', description: 'A technology corporation that produces computer software, consumer electronics, personal computers, and related services. Best known for its Windows OS and Azure cloud platform.', websiteUrl: 'https://www.microsoft.com/' },
    { name: 'TCS', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/TCS_logo.svg/1280px-TCS_logo.svg.png', description: 'Tata Consultancy Services is a global leader in IT services, consulting, and business solutions, offering a wide range of services to clients across various industries.', websiteUrl: 'https://www.tcs.com/' },
    { name: 'Infosys', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Infosys_logo.svg/1280px-Infosys_logo.svg.png', description: 'A global leader in next-generation digital services and consulting, enabling clients in more than 50 countries to navigate their digital transformation.', websiteUrl: 'https://www.infosys.com/' },
    { name: 'Cognizant', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Cognizant_logo_2022.svg/2560px-Cognizant_logo_2022.svg.png', description: 'An American multinational technology company that provides business consulting, information technology, and outsourcing services.', websiteUrl: 'https://www.cognizant.com/' },
    { name: 'Wipro', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/2560px-Wipro_Primary_Logo_Color_RGB.svg.png', description: 'A leading global information technology, consulting, and business process services company. They harness the power of cognitive computing and hyper-automation.', websiteUrl: 'https://www.wipro.com/' },
    { name: 'Accenture', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/2560px-Accenture.svg.png', description: 'A professional services company with leading capabilities in digital, cloud, and security. It offers Strategy, Consulting, and Technology services.', websiteUrl: 'https://www.accenture.com/' },
    { name: 'Capgemini', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Capgemini_201x_logo.svg/2560px-Capgemini_201x_logo.svg.png', description: 'A global leader in consulting, technology services, and digital transformation, at the forefront of innovation to address the entire breadth of clients’ opportunities.', websiteUrl: 'https://www.capgemini.com/' },
    { name: 'HCL Tech', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/HCL_Technologies_logo.svg/2560px-HCL_Technologies_logo.svg.png', description: 'A next-generation global technology company that helps enterprises reimagine their businesses for the digital age through its extensive portfolio of services and products.', websiteUrl: 'https://www.hcltech.com/' },
    { name: 'Oracle', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/2560px-Oracle_logo.svg.png', description: 'A computer technology corporation best known for its software products and services like Java and its enterprise database management systems.', websiteUrl: 'https://www.oracle.com/' },
    { name: 'IBM', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png', description: 'International Business Machines is a leader in hybrid cloud and AI, helping clients in more than 175 countries capitalize on insights from their data.', websiteUrl: 'https://www.ibm.com/' },
];

const PartnersPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', program: 'Data Science' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setMessage('');

        const { error } = await supabase
            .from('interns')
            .insert([{ 
                name: formData.name, 
                email: formData.email, 
                program: formData.program,
                notes: `Phone: ${formData.phone}`
            }]);

        if (error) {
            let userFriendlyError = 'Failed to submit application. Please try again.';
             if (error.message?.includes('Failed to fetch')) {
                userFriendlyError = 'Network Error: Could not connect to server. Please check your Supabase credentials and network connection.';
            } else if (error.message?.includes("Could not find the table")) {
                userFriendlyError = "Database setup needed: The 'interns' table is missing. Please create it in your Supabase project.";
            } else if (error.message.includes('violates row-level security policy')) {
                userFriendlyError = "Database Security Error: Submission is blocked. Please check the Row Level Security (RLS) policies for the 'interns' table in your Supabase project.";
            }
            setMessage(userFriendlyError);
            setStatus('error');
            console.error("Application submission error:", error.message);
        } else {
            setMessage('✅ Application submitted successfully! We will get back to you soon.');
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', program: 'Data Science' });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePartnerClick = (partner: Partner) => {
        setSelectedPartner(partner);
    };

    const closeModal = () => {
        setSelectedPartner(null);
    };

    return (
        <div className="bg-gray-50 dark:bg-slate-900 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Our Hiring Partners</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        We collaborate with over 100+ leading companies to provide guaranteed internship and placement opportunities for our students.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
                    {partners.map((partner) => (
                        <button 
                            key={partner.name}
                            onClick={() => handlePartnerClick(partner)}
                            className="flex justify-center items-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <img 
                                src={partner.logoUrl} 
                                alt={`${partner.name} logo`} 
                                className="max-h-12 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300" 
                            />
                        </button>
                    ))}
                    <div className="flex justify-center items-center p-6 text-center text-gray-600 dark:text-gray-400">
                        <p className="text-xl font-semibold">And many more...</p>
                    </div>
                </div>

                <div className="mt-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Join Our Ambassador Program</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Apply to become a ZenTech Campus Ambassador and help us empower students.
                        </p>
                    </div>
                    <div className="max-w-xl mx-auto">
                        <form id="intern-form" onSubmit={handleSubmit} className="p-8 bg-white dark:bg-slate-800 shadow-lg rounded-xl">
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="border p-2 w-full rounded-md bg-gray-50 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="border p-2 w-full rounded-md bg-gray-50 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan" />
                            </div>
                             <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="border p-2 w-full rounded-md bg-gray-50 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="program" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program of Interest</label>
                                <select id="program" name="program" value={formData.program} onChange={handleChange} className="border p-2 w-full rounded-md bg-gray-50 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan">
                                    <option value="Data Science">Data Science</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Machine Learning">Machine Learning</option>
                                    <option value="Digital Marketing">Digital Marketing</option>
                                    <option value="UI/UX Design">UI/UX Design</option>
                                </select>
                            </div>
                            <button type="submit" disabled={status === 'submitting'} className="w-full bg-gradient-to-r from-violet to-cyan text-white py-3 px-4 rounded-md font-semibold disabled:opacity-50 transition-opacity">
                                {status === 'submitting' ? 'Submitting...' : 'Apply Now'}
                            </button>
                            {(status === 'success' || status === 'error') && (
                                <p className={`mt-4 text-center text-sm ${status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                                    {message}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
                
                <div className="mt-20 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Become a Hiring Partner</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Join our network to hire top-tier, job-ready talent from our programs.
                    </p>
                    <div className="mt-8">
                        <NavLink 
                            to="/contact" 
                            className="inline-block bg-gradient-to-r from-violet to-cyan text-white font-semibold py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                        >
                            Partner With Us
                        </NavLink>
                    </div>
                </div>
            </div>
            {selectedPartner && (
                <PartnerDetailModal
                    isOpen={!!selectedPartner}
                    onClose={closeModal}
                    partner={selectedPartner}
                />
            )}
        </div>
    );
};

export default PartnersPage;