
import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { blogPosts } from '../blogData';
import TTSButton from '../components/TTSButton';

const BlogPostPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = blogPosts.find(p => p.slug === slug);

    if (!post || !post.content) {
        return (
            <div className="py-20 text-center">
                <h1 className="text-4xl font-bold">404 - Post Not Found</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Sorry, we couldn't find the article you're looking for.</p>
                <NavLink to="/blog" className="mt-8 inline-block text-cyan hover:underline">
                    &larr; Back to All Articles
                </NavLink>
            </div>
        );
    }
    
    const textToSpeak = post.rawContent || post.title;

    return (
        <div className="bg-white dark:bg-slate-900 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <article>
                    <header className="mb-12">
                        <NavLink to="/blog" className="text-cyan hover:underline mb-4 inline-block">&larr; Back to All Articles</NavLink>
                        <div className="flex justify-between items-start gap-4">
                             <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                {post.title}
                            </h1>
                            <TTSButton textToSpeak={textToSpeak} />
                        </div>
                        <div className="mt-6 flex items-center">
                            <img src={post.authorImage} alt={post.author} className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">{post.author}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">{post.date}</p>
                            </div>
                        </div>
                    </header>
                    
                    <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-auto rounded-lg shadow-lg mb-12" 
                    />

                    {post.content}
                </article>
            </div>
        </div>
    );
};

export default BlogPostPage;
