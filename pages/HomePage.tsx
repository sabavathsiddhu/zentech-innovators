
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ZapIcon, BriefcaseIcon, AwardIcon } from '../components/Icons';
import type { Feature, Student } from '../types';


const features: Feature[] = [
    {
        icon: ZapIcon,
        title: 'Accelerated Learning',
        description: 'Our intensive, project-based bootcamps get you job-ready in months, not years.',
    },
    {
        icon: BriefcaseIcon,
        title: 'Guaranteed Internships',
        description: 'We bridge the gap between education and career with guaranteed internship opportunities.',
    },
    {
        icon: AwardIcon,
        title: 'Expert Mentorship',
        description: 'Learn from industry veterans who have worked at top tech companies.',
    },
];

const studentChampions: Student[] = [
    {
        name: 'Priya Sharma',
        domain: 'Data Science',
        companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1280px-Google_2015_logo.svg.png',
        imageUrl: 'https://unifiedmentor.com/assets/Khushi-DUf8RrkD.webp',
        story: '"From learning Python to deploying ML models, the journey was amazing. I am now a Data Analyst at Google, all thanks to ZenTech."'
    },
    {
        name: 'Rohan Mehta',
        domain: 'Full Stack Development',
        companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        imageUrl: 'https://unifiedmentor.com/assets/Amaljith-ibfzhSS_.webp',
        story: '"The hands-on projects and mentorship were incredible. ZenTech gave me the confidence and skills to land my dream job at Amazon!"'
    },
];

const partnerLogos = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1280px-Microsoft_logo_%282012%29.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1280px-Google_2015_logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/TCS_logo.svg/1280px-TCS_logo.svg.png',
];

const HomePage = () => {
    return (
        <div className="bg-white dark:bg-slate-900">
            {/* Hero Section */}
            <section className="relative bg-gray-50 dark:bg-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Launch Your Tech Career with{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet to-cyan">
                            ZenTech Innovators
                        </span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                        Gain in-demand skills, build real-world projects, and land your dream internship with our expert-led programs.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <NavLink to="/programs" className="inline-block bg-gradient-to-r from-violet to-cyan text-white font-semibold py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                            Explore Programs
                        </NavLink>
                        <NavLink to="/contact" className="inline-block bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-gray-200 font-semibold py-3 px-8 rounded-md hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors">
                            Contact Us
                        </NavLink>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Choose ZenTech?</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">We provide the perfect launchpad for your tech career.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <div key={feature.title} className="bg-gray-50 dark:bg-slate-800/50 p-8 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                                <feature.icon className="w-12 h-12 mx-auto text-cyan" />
                                <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Student Champions Section */}
            <section className="py-20 bg-gray-50 dark:bg-slate-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Champions</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Hear from students who transformed their careers with us.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {studentChampions.map((student) => (
                            <div key={student.name} className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
                                <img src={student.imageUrl} alt={student.name} className="w-24 h-24 rounded-full -mt-12 border-4 border-white dark:border-slate-800 object-cover" />
                                <p className="mt-4 text-gray-600 dark:text-gray-400 italic">{student.story}</p>
                                <div className="mt-4">
                                    <h4 className="font-bold text-gray-900 dark:text-white">{student.name}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{student.domain}</p>
                                    <div className="mt-2 flex items-center justify-center gap-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Placed at</p>
                                        <img src={student.companyLogo} alt="Company Logo" className="h-6" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                         <NavLink to="/champions" className="text-cyan font-semibold hover:underline">
                            See more success stories &rarr;
                        </NavLink>
                    </div>
                </div>
            </section>
            
            {/* Partners Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-8">Trusted by Students from 100+ Hiring Partners Including</h2>
                    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
                        {partnerLogos.map((logo, index) => (
                             <img key={index} src={logo} alt={`Partner ${index + 1}`} className="max-h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
                        ))}
                         <p className="text-lg font-medium text-gray-500">and more...</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;

