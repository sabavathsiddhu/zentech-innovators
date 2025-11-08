
import React from 'react';
import { NavLink } from 'react-router-dom';
import TTSButton from '../components/TTSButton';

const skills = [
    { title: '1. AI Literacy & Prompt Engineering', description: 'If you can make AI work for you, you’re already ahead of 90% of students. Learn how to write prompts, summarize research, generate content, or debug code using Gemini, ChatGPT, or Claude.', reason: 'Companies now expect interns to use AI to speed up workflow — not fear it.' },
    { title: '2. Data Analysis & Visualization', description: 'Every team needs someone who can read data and tell a story.', tools: 'Excel, Power BI, Python (Pandas, Matplotlib), Tableau.', reason: 'Decision-making today = data + narrative, not guesswork.' },
    { title: '3. Web Development (Full Stack Awareness)', description: 'Frontend → React / Next.js. Backend → Node.js, Express, Firebase, or Supabase', reason: 'Every product is digital-first. Interns who can prototype ideas instantly = gold.' },
    { title: '4. Machine Learning & Automation Basics', description: 'Not full-on AI scientist level — just enough to build a simple model, use APIs, or automate workflows with Python or Zapier.', reason: '2025 companies want interns who automate boring stuff.' },
    { title: '5. UI/UX Design Thinking', description: 'Knowing Figma isn’t enough — learn how to design for emotion and accessibility.', reason: 'You’ll stand out when you think like a user, not just a designer.' },
    { title: '6. Digital Marketing & Growth Analytics', description: 'Meta Ads, SEO, Google Analytics 4, Email automation.', reason: 'Every startup needs visibility. Growth interns with creative + analytical balance are irreplaceable.' },
    { title: '7. Version Control & Collaboration (Git + GitHub)', description: 'This is the oxygen of modern tech teams.', reason: 'Companies reject candidates who don’t understand basic Git workflows (branch, commit, pull request).' },
    { title: '8. Professional Communication & Copywriting', description: 'No, this isn’t “soft skills.” It’s your ability to sell ideas clearly — in emails, LinkedIn posts, or project reports.', reason: 'Even technical interns need to communicate results like professionals.' },
    { title: '9. API Integration & Automation Tools', description: 'Learn to connect systems — Google Sheets → Supabase → Discord → AI.', reason: 'It’s the foundation of modern AI startups and workflow engineering.' },
    { title: '10. Cybersecurity & Digital Ethics Awareness', description: 'Learn the basics of data privacy, phishing, and responsible AI use.', reason: 'Trust and compliance are everything in 2025 — especially for startups and edtech platforms.' },
];

// FIX: Generate a single string of the article's text content for the TTS component.
const textToSpeak = `
Top 10 Internship Skills to Learn in 2025.
Stay ahead of the curve with these essential skills for the modern workplace.
${skills.map(skill => `${skill.title}. ${skill.description}. ${skill.tools ? `Tools include ${skill.tools}.` : ''} Why it matters: ${skill.reason}.`).join('\n')}
`;

const Top10SkillsPage = () => {
    return (
        <div className="bg-white dark:bg-slate-900 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <article>
                    <header className="mb-12">
                        <NavLink to="/blog" className="text-cyan hover:underline mb-4 inline-block">&larr; Back to All Articles</NavLink>
                        <div className="flex justify-between items-start gap-4">
                             <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                Top 10 Internship Skills to Learn in 2025
                            </h1>
                            {/* FIX: Add TTSButton for accessibility and consistency with other blog posts. */}
                            <TTSButton textToSpeak={textToSpeak} />
                        </div>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Stay ahead of the curve with these essential skills for the modern workplace.
                        </p>
                    </header>
                    
                    <img 
                        src="https://aamirahmer.com/blog/wp-content/uploads/2024/03/Untitled-design-2-1280x640.jpg" 
                        alt="Top 10 Internship Skills to Learn in 2025" 
                        className="w-full h-auto rounded-lg shadow-lg mb-12" 
                    />

                    <div className="space-y-10">
                        {skills.map((skill, index) => (
                            <div key={index} className="p-6 rounded-lg bg-gray-50 dark:bg-slate-800/50 border-l-4 border-cyan">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{skill.title}</h2>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">{skill.description}</p>
                                {skill.tools && <p className="text-gray-700 dark:text-gray-300 mb-3"><strong className="text-gray-900 dark:text-white">Tools:</strong> {skill.tools}</p>}
                                <p className="italic text-gray-600 dark:text-gray-400"><strong className="text-gray-800 dark:text-gray-300 not-italic">Why it matters:</strong> {skill.reason}</p>
                            </div>
                        ))}
                    </div>
                </article>
            </div>
        </div>
    );
};

export default Top10SkillsPage;
