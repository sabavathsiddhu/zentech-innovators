import React from 'react';

const AboutPage = () => {
    return (
        <div className="bg-white dark:bg-slate-900 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">About ZenTech Innovators</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Empowering the next generation of tech leaders by bridging the gap between academic learning and real-world industry demands.
                    </p>
                </div>

                {/* Mission and Vision Section */}
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-gray-50 dark:bg-slate-800/50 p-8 rounded-lg">
                        <h2 className="text-2xl font-bold text-violet dark:text-cyan mb-4">Our Mission</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            To provide accessible, industry-relevant training and guaranteed internship opportunities that equip students with the practical skills and confidence needed to launch successful careers in technology.
                        </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-800/50 p-8 rounded-lg">
                        <h2 className="text-2xl font-bold text-violet dark:text-cyan mb-4">Our Vision</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            To become India’s most trusted platform for skill development and career acceleration, creating a seamless transition from education to employment for every student.
                        </p>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
                            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet to-cyan">10,000+</p>
                            <p className="mt-2 text-lg font-semibold text-gray-700 dark:text-gray-300">Students Trained</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
                            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet to-cyan">100+</p>
                            <p className="mt-2 text-lg font-semibold text-gray-700 dark:text-gray-300">Hiring Partners</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
                            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet to-cyan">95%</p>
                            <p className="mt-2 text-lg font-semibold text-gray-700 dark:text-gray-300">Placement Assistance Rate</p>
                        </div>
                    </div>
                </div>

                {/* Our Story section */}
                <div className="max-w-4xl mx-auto mt-20">
                     <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Our Story</h2>
                     <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed text-center">
                        Founded by a team of passionate educators and industry professionals, ZenTech Innovators was born from a simple observation: a significant gap existed between the theoretical knowledge provided in colleges and the practical skills required by the tech industry. We set out to build a platform that not only teaches the latest technologies but also provides the crucial hands-on experience that turns students into confident, job-ready professionals. Our journey is driven by the success of our students, and we are committed to innovating our programs to meet the ever-evolving demands of the digital world.
                     </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
