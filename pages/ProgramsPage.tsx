import React, { useState } from 'react';
import type { Program } from '../types';
import ApplicationModal from '../components/ApplicationModal';
import { NavLink } from 'react-router-dom';
import { supabase, saveApplicationToSupabase } from '../supabaseClient';


const courses: Program[] = [
    { id: 1, title: 'Web Development', category: 'Course', description: 'Master front-end and back-end technologies to build complete web applications.', tags: ['HTML', 'CSS', 'JavaScript', 'React'] },
    { id: 2, title: 'Data Science', category: 'Course', description: 'Learn to analyze data, build predictive models, and derive actionable insights.', tags: ['Python', 'SQL', 'Pandas', 'Scikit-learn'] },
    { id: 3, title: 'Digital Marketing', category: 'Course', description: 'Master SEO, SEM, content marketing, and social media strategies to drive growth.', tags: ['SEO', 'Google Ads', 'Meta Ads', 'Analytics'] },
    { id: 4, title: 'Machine Learning', category: 'Course', description: 'Dive into algorithms, neural networks, and deep learning to build intelligent systems.', tags: ['TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'] },
    { id: 5, title: 'UI/UX Design', category: 'Course', description: 'Learn user-centered design principles to create intuitive and beautiful digital experiences.', tags: ['Figma', 'User Research', 'Prototyping', 'Wireframing'] },
    { id: 6, title: 'Graphic Design', category: 'Course', description: 'Develop skills in visual identity, branding, and digital media creation.', tags: ['Adobe Photoshop', 'Illustrator', 'Branding'] },
];

const fellowships: Program[] = [
    { id: 7, title: 'Full Stack Development Fellowship', category: 'Fellowship', description: 'An intensive program covering MERN stack, system design, and deployment.', tags: ['React', 'Node.js', 'MongoDB', 'AWS'] },
    { id: 8, title: 'Frontend Development Fellowship', category: 'Fellowship', description: 'Become a specialist in creating modern, responsive, and high-performance user interfaces.', tags: ['Next.js', 'TypeScript', 'GraphQL', 'CI/CD'] },
    { id: 9, title: 'Backend Development Fellowship', category: 'Fellowship', description: 'Master server-side logic, database architecture, and API design for scalable applications.', tags: ['Express', 'Microservices', 'PostgreSQL', 'Docker'] },
    { id: 10, title: 'UI/UX Designer Fellowship', category: 'Fellowship', description: 'A deep dive into advanced design systems, user psychology, and product strategy.', tags: ['Design Systems', 'A/B Testing', 'Product Strategy'] },
    { id: 11, title: 'Machine Learning Fellowship', category: 'Fellowship', description: 'Work on production-level ML projects, from data pipelines to model deployment.', tags: ['MLOps', 'Kubeflow', 'Cloud AI', 'Big Data'] },
    { id: 12, title: 'Data Analyst Fellowship', category: 'Fellowship', description: 'Gain expertise in advanced analytics, business intelligence, and data storytelling.', tags: ['Power BI', 'Tableau', 'Advanced SQL', 'ETL'] },
    { id: 13, title: 'Data Science Fellowship', category: 'Fellowship', description: 'Dive deep into advanced machine learning, Python, and big data technologies.', tags: ['Python', 'Machine Learning', 'Big Data', 'Spark'] },
    { id: 14, title: 'Digital Marketing Fellowship', category: 'Fellowship', description: 'Lead marketing campaigns with advanced analytics, marketing automation, and CRO.', tags: ['HubSpot', 'CRO', 'Advanced Analytics'] },
    { id: 15, title: 'Financial Analyst Fellowship', category: 'Fellowship', description: 'Master financial modeling, valuation, and market analysis for data-driven financial decisions.', tags: ['Excel', 'Valuation', 'Financial Modeling'] },
    { id: 16, title: 'Business Analyst Fellowship', category: 'Fellowship', description: 'Bridge the gap between business needs and technology solutions with agile methodologies.', tags: ['Agile', 'Scrum', 'JIRA', 'Requirement Analysis'] },
];

const durationOptions = [
    { id: '1m', label: '1 Month', price: 149 },
    { id: '2m', label: '2 Months', price: 299 },
    { id: '3m', label: '3 Months', price: 699 },
    { id: '4m', label: '4 Months', price: 999 },
];

interface ProgramCardProps {
    program: Program;
    onApply: (program: Program, duration: { label: string, price: number }) => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, onApply }) => {
    const [selectedDuration, setSelectedDuration] = useState(durationOptions[0]);

    const categoryColors = {
        'Course': 'border-blue-500',
        'Fellowship': 'border-violet-500',
    };

    return (
        <div className={`bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col border-t-4 ${categoryColors[program.category]}`}>
            <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{program.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{program.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {program.tags.map(tag => (
                        <span key={tag} className="text-xs font-semibold bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-slate-800/50">
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Duration:</p>
                    <div className="grid grid-cols-2 gap-2">
                        {durationOptions.map(option => (
                            <label key={option.id} className={`flex items-center justify-center p-2 rounded-md cursor-pointer text-xs font-semibold transition-colors ${selectedDuration.id === option.id ? 'bg-cyan text-white' : 'bg-gray-200 dark:bg-slate-700 hover:bg-gray-300'}`}>
                                <input
                                    type="radio"
                                    name={`duration-${program.id}`}
                                    className="sr-only"
                                    checked={selectedDuration.id === option.id}
                                    onChange={() => setSelectedDuration(option)}
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-gray-800 dark:text-white">₹{selectedDuration.price}</p>
                    <button
                        onClick={() => onApply(program, selectedDuration)}
                        className="bg-gradient-to-r from-violet to-cyan text-white font-semibold py-2 px-6 rounded-md shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                    >
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProgramsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState<{ program: Program; duration: { label: string; price: number } } | null>(null);

    const handleApplyClick = (program: Program, duration: { label: string, price: number }) => {
        setSelectedProgram({ program, duration });
        setIsModalOpen(true);
    };

    const renderProgramSection = (title: string, programList: Program[]) => (
        <section className="mb-20">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programList.map((program) => (
                    <ProgramCard key={program.id} program={program} onApply={handleApplyClick} />
                ))}
            </div>
        </section>
    );

    return (
        <div className="bg-gray-50 dark:bg-slate-900 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Our Programs</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Choose from our industry-leading programs designed to make you job-ready from day one.
                    </p>
                </div>
                
                {renderProgramSection('Courses', courses)}
                {renderProgramSection('Fellowships', fellowships)}

                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-gray-300 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Have a question?</h3>
                    <p className="text-gray-600 dark:text-gray-400 my-4">Can't decide which program is right for you? Our career advisors are here to help.</p>
                    <NavLink to="/contact" className="text-cyan font-semibold hover:underline">
                       Contact an Advisor &rarr;
                    </NavLink>
                </div>
            </div>

            {selectedProgram && (
                <ApplicationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    program={selectedProgram.program}
                    duration={selectedProgram.duration}
                />
            )}
        </div>
    );
};

export default ProgramsPage;