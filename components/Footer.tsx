import React from 'react';
import { NavLink } from 'react-router-dom';
import { LinkedInIcon, InstagramIcon, WhatsAppIcon } from './Icons';

const quickLinks = [
    { name: 'Programs', path: '/programs' },
    { name: 'Careers', path: '/partners' },
    { name: 'Terms & Conditions', path: '#' },
    { name: 'Refund Policy', path: '#' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Admin: View Interns', path: '/admin/interns' },
];

const socialLinks = [
    { Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/zentech-innovators-zentech-innovators-2b6823397?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B%2B%2FcFKzKuTLeffaRUSGtOwQ%3D%3D' },
    { Icon: InstagramIcon, href: 'https://instagram.com' },
    { Icon: WhatsAppIcon, href: 'https://whatsapp.com' },
]

const Footer = () => {
    return (
        <footer className="bg-slate-800 dark:bg-slate-900 text-white border-t border-slate-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet to-cyan">ZenTech Innovators</h2>
                        <p className="mt-4 text-gray-400 max-w-md">Empowering Students Through Innovation & Technology. Join us to bridge the gap between your education and dream career.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold tracking-wider text-gray-200">Quick Links</h3>
                        <ul className="mt-4 space-y-2">
                            {quickLinks.map(link => (
                                <li key={link.name}>
                                    <NavLink to={link.path} className="text-gray-400 hover:text-cyan transition-colors">
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold tracking-wider text-gray-200">Connect With Us</h3>
                        <div className="flex mt-4 space-x-4">
                            {socialLinks.map(({ Icon, href }, index) => (
                                <a key={index} href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan transition-colors">
                                    <Icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} ZenTech Innovators. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;