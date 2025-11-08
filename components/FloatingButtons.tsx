
import React from 'react';
import { WhatsAppIcon, PhoneIcon } from './Icons';

const FloatingButtons = () => {
    return (
        <div className="fixed bottom-5 left-5 z-50 flex flex-col space-y-3">
            <a 
                href="https://wa.me/910000000000" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all transform hover:scale-110"
                aria-label="Chat on WhatsApp"
            >
                <WhatsAppIcon className="w-8 h-8" />
            </a>
            <a 
                href="tel:+910000000000" 
                className="bg-blue-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all transform hover:scale-110"
                aria-label="Call Us"
            >
                <PhoneIcon className="w-7 h-7" />
            </a>
        </div>
    );
};

export default FloatingButtons;
