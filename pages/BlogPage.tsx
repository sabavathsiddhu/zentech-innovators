import React from 'react';
import { NavLink } from 'react-router-dom';
import { blogPosts } from '../blogData';

const BlogPage = () => {
    return (
        <div className="bg-gray-50 dark:bg-slate-900 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">ZenTech Blog</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Insights, tutorials, and stories from the world of tech.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <NavLink to={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <div className="overflow-hidden">
                                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cyan transition-colors">{post.title}</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">{post.excerpt}</p>
                                <div className="mt-4 flex items-center">
                                    <img src={post.authorImage} alt={post.author} className="w-10 h-10 rounded-full mr-3" />
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{post.author}</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs">{post.date}</p>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;