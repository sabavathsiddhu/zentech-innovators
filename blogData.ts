import React from 'react';
import type { BlogPost } from './types';

const skillsContent = {
    skills: [
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
    ],
    rawText: "Top 10 Internship Skills to Learn in 2025. Stay ahead of the curve with these essential skills for the modern workplace. " + 
             [
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
            ].map(skill => `${skill.title}. ${skill.description}. ${skill.tools ? `Tools include ${skill.tools}.` : ''} Why it matters: ${skill.reason}.`).join(' ')
};

export const blogPosts: BlogPost[] = [
    {
        slug: 'top-10-skills-to-learn-in-2025',
        title: 'Top 10 Internship Skills to Learn in 2025',
        author: 'Jane Doe, Career Advisor',
        authorImage: 'https://i.pravatar.cc/150?u=jane-doe',
        date: 'July 22, 2024',
        imageUrl: 'https://aamirahmer.com/blog/wp-content/uploads/2024/03/Untitled-design-2-1280x640.jpg',
        excerpt: 'The job market for interns is more competitive than ever. Here’s a no-nonsense guide to the top 10 skills you absolutely need to learn to not just survive, but thrive in 2025.',
        content: React.createElement(
            'div',
            { className: "space-y-10" },
            skillsContent.skills.map((skill, index) => (
                React.createElement(
                    'div',
                    { key: index, className: "p-6 rounded-lg bg-gray-50 dark:bg-slate-800/50 border-l-4 border-cyan" },
                    React.createElement('h2', { className: "text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2" }, skill.title),
                    React.createElement('p', { className: "text-gray-700 dark:text-gray-300 mb-3" }, skill.description),
                    skill.tools && React.createElement(
                        'p',
                        { className: "text-gray-700 dark:text-gray-300 mb-3" },
                        React.createElement('strong', { className: "text-gray-900 dark:text-white" }, "Tools:"),
                        ` ${skill.tools}`
                    ),
                    React.createElement(
                        'p',
                        { className: "italic text-gray-600 dark:text-gray-400" },
                        React.createElement('strong', { className: "text-gray-800 dark:text-gray-300 not-italic" }, "Why it matters:"),
                        ` ${skill.reason}`
                    )
                )
            ))
        ),
        rawContent: skillsContent.rawText,
    },
    {
        slug: 'rise-of-ai-in-edtech',
        title: 'The Rise of AI in EdTech: A Student\'s Guide',
        author: 'John Smith, Tech Writer',
        authorImage: 'https://i.pravatar.cc/150?u=john-smith',
        date: 'July 15, 2024',
        imageUrl: 'https://images.unsplash.com/photo-1593349122056-2a8330a5b287?q=80&w=2070&auto=format&fit=crop',
        excerpt: 'Artificial Intelligence is revolutionizing education technology. Discover how AI-powered tools are creating personalized learning experiences and what it means for your future.',
        content: React.createElement('div', { className: "prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300" },
            React.createElement('p', null, "The world of education is undergoing a seismic shift, and at the heart of this transformation is Artificial Intelligence. For students, this isn't just a futuristic concept—it's a present-day reality that's changing how you learn, study, and prepare for your career. At ZenTech, we're at the forefront of integrating these tools to empower you."),
            React.createElement('h2', { className: "text-gray-900 dark:text-white" }, "Personalized Learning Paths"),
            React.createElement('p', null, "One of the most significant impacts of AI in EdTech is the ability to create truly personalized learning experiences. Instead of a one-size-fits-all curriculum, AI algorithms can analyze your performance, identify your strengths and weaknesses, and recommend resources or modules tailored specifically to your needs. This means less time wasted on concepts you've mastered and more focused practice where you need it most."),
            React.createElement('img', { src: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop", alt: "AI learning", className: "w-full h-auto rounded-lg shadow-lg my-8" }),
            React.createElement('h2', { className: "text-gray-900 dark:text-white" }, "The Role of AI Tutors and Assistants"),
            React.createElement('p', null, "Imagine having a personal tutor available 24/7. AI-powered chatbots and assistants, much like our own ZenBot, are making this a reality. Stuck on a complex coding problem at 2 AM? An AI tutor can provide instant feedback, offer hints, and guide you toward the solution without simply giving away the answer. This immediate support system is invaluable for reinforcing learning outside the classroom."),
            React.createElement('blockquote', { className: "border-l-4 border-cyan pl-4 italic" }, "\"AI is not about replacing educators; it's about augmenting their capabilities and providing students with tools to unlock their full potential.\""),
            React.createElement('h2', { className: "text-gray-900 dark:text-white" }, "Preparing for an AI-Driven Workforce"),
            React.createElement('p', null, "Beyond the classroom, the most crucial aspect of AI in EdTech is how it prepares you for the future of work. Companies now expect graduates to be AI-literate. By using AI-powered learning tools, you are not just studying a subject; you are simultaneously developing critical skills in prompt engineering, data analysis, and workflow automation. Our programs are designed to give you hands-on experience with these technologies, making you a more competitive candidate in the job market.")
        ),
        rawContent: `The Rise of AI in EdTech: A Student's Guide. The world of education is undergoing a seismic shift, and at the heart of this transformation is Artificial Intelligence. For students, this isn't just a futuristic concept—it's a present-day reality that's changing how you learn, study, and prepare for your career. At ZenTech, we're at the forefront of integrating these tools to empower you. Personalized Learning Paths. One of the most significant impacts of AI in EdTech is the ability to create truly personalized learning experiences. Instead of a one-size-fits-all curriculum, AI algorithms can analyze your performance, identify your strengths and weaknesses, and recommend resources or modules tailored specifically to your needs. This means less time wasted on concepts you've mastered and more focused practice where you need it most. The Role of AI Tutors and Assistants. Imagine having a personal tutor available 24/7. AI-powered chatbots and assistants, much like our own ZenBot, are making this a reality. Stuck on a complex coding problem at 2 AM? An AI tutor can provide instant feedback, offer hints, and guide you toward the solution without simply giving away the answer. This immediate support system is invaluable for reinforcing learning outside the classroom. "AI is not about replacing educators; it's about augmenting their capabilities and providing students with tools to unlock their full potential." Preparing for an AI-Driven Workforce. Beyond the classroom, the most crucial aspect of AI in EdTech is how it prepares you for the future of work. Companies now expect graduates to be AI-literate. By using AI-powered learning tools, you are not just studying a subject; you are simultaneously developing critical skills in prompt engineering, data analysis, and workflow automation. Our programs are designed to give you hands-on experience with these technologies, making you a more competitive candidate in the job market.`,
    },
];
