import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MenuIcon, XIcon, SunIcon, MoonIcon } from './Icons';
import { useAuth } from '../contexts/AuthContext';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Champions', path: '/champions' },
    { name: 'Blog', path: '/blog' },
    { name: 'AI Tools', path: '/ai-tools' },
    { name: 'Verify', path: '/verify-certificate' },
    { name: 'About', path: '/about' },
];

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) return savedTheme === 'dark';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const profileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsProfileMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <NavLink to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet to-cyan">
                        ZenTech
                    </NavLink>
                    <nav className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors ${isActive ? 'text-cyan' : 'text-gray-600 dark:text-gray-300 hover:text-cyan'}`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="flex items-center gap-2">
                        <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800" aria-label="Toggle dark mode">
                            {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                        </button>

                        {user ? (
                            <div className="relative" ref={profileMenuRef}>
                                <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="w-9 h-9 rounded-full bg-gradient-to-r from-violet to-cyan text-white flex items-center justify-center font-bold text-lg">
                                    {user.name.charAt(0).toUpperCase()}
                                </button>
                                {isProfileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                        <div className="px-4 py-2 border-b border-gray-200 dark:border-slate-700">
                                            <p className="text-sm text-gray-700 dark:text-gray-200">Signed in as</p>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                                        </div>
                                        <NavLink to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700">Dashboard</NavLink>
                                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                             <NavLink to="/login" className="hidden md:inline-block bg-gradient-to-r from-violet to-cyan text-white font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all text-sm">
                                Login
                            </NavLink>
                        )}
                        
                        <div className="md:hidden">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-gray-500" aria-label="Toggle menu">
                                {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-slate-900 border-b dark:border-slate-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-cyan/10 text-cyan' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                         {!user && (
                             <NavLink to="/login" className="block w-full text-left mt-2 px-3 py-2 rounded-md text-base font-medium bg-cyan/10 text-cyan">
                                Login
                            </NavLink>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
