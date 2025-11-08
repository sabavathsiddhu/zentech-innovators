
import React from 'react';
import type { Student } from '../types';
import { LinkedInIcon } from '../components/Icons';

const champions: Student[] = [
    {
        name: 'Priya Sharma',
        domain: 'Data Science',
        companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1280px-Google_2015_logo.svg.png',
        imageUrl: 'https://unifiedmentor.com/assets/Khushi-DUf8RrkD.webp',
        story: 'The practical approach of the Data Science course helped me build a strong portfolio, which was key to getting my role as a Data Analyst at Google.'
    },
    {
        name: 'Rohan Mehta',
        domain: 'Full Stack Development',
        companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        imageUrl: 'https://unifiedmentor.com/assets/Amaljith-ibfzhSS_.webp',
        story: 'The hands-on projects and mentorship were incredible. ZenTech gave me the confidence and skills to land my dream job at Amazon as a Software Development Engineer.'
    },
    {
        name: 'Anjali Singh',
        domain: 'UI/UX Design',
        companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1280px-Microsoft_logo_%282012%29.svg.png',
        imageUrl: 'https://unifiedmentor.com/assets/UrvashiTomar-BMlRpt5X.webp',
        story: 'I always had an eye for design, but ZenTech taught me the process. Learning Figma and user research principles was a game-changer. Now I\'m designing experiences for millions at Microsoft.'
    },
    {
        name: 'Vikram Patel',
        domain: 'Digital Marketing',
        companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Infosys_logo.svg/1280px-Infosys_logo.svg.png',
        imageUrl: 'https://unifiedmentor.com/assets/DeveshK-B2GV01Oi.webp',
        story: 'The digital marketing course gave me practical skills in SEO, Meta Ads, and analytics that I could apply from day one. I\'m now a Digital Strategist at Infosys.'
    },
    {
        name: 'Sneha Gupta',
        domain: 'Data Analyst',
        companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/TCS_logo.svg/1280px-TCS_logo.svg.png',
        imageUrl: 'https://unifiedmentor.com/assets/ShrutiGoyal-CPNjCj3r.webp',
        story: 'The focus on real-world data sets and tools like Tableau prepared me perfectly for my role as a Systems Engineer at TCS.'
    },
     {
        name: 'Amit Kumar',
        domain: 'Backend Development',
        companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Cognizant_logo_2022.svg/2560px-Cognizant_logo_2022.svg.png',
        imageUrl: 'https://unifiedmentor.com/assets/RishabMishra-B9Kkh-D_.webp',
        story: 'The Backend fellowship was incredibly rewarding. The focus on MLOps and deployment was crucial. I am now working on cutting-edge AI projects at Cognizant.'
    },
];

interface ChampionCardProps {
    student: Student;
}

const ChampionCard: React.FC<ChampionCardProps> = ({ student }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col">
        <div className="relative">
            <img src={student.imageUrl} alt={student.name} className="w-full h-48 object-cover" />
             <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
                 <h3 className="text-xl font-bold text-white">{student.name}</h3>
                 <p className="text-sm text-gray-200">{student.domain}</p>
            </div>
        </div>
        <div className="p-6 flex-grow flex flex-col">
            <p className="text-gray-600 dark:text-gray-400 text-sm italic flex-grow">"{student.story}"</p>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700 flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Placed at</p>
                    <img src={student.companyLogo} alt="Company Logo" className="max-h-6 object-contain" />
                </div>
                <a href="#" className="text-gray-400 hover:text-cyan transition-colors" aria-label={`LinkedIn profile of ${student.name}`}>
                    <LinkedInIcon className="w-5 h-5" />
                </a>
            </div>
        </div>
    </div>
);


const ChampionsPage = () => {
    return (
        <div className="bg-gray-50 dark:bg-slate-900 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Our Champions</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Meet the talented individuals who have successfully launched their careers after completing our programs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {champions.map((student, index) => (
                       <ChampionCard key={index} student={student} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChampionsPage;
