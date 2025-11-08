import React, { useEffect } from 'react';
import { XIcon } from './Icons';
import { Partner } from '../types';

interface PartnerDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    partner: Partner;
}

const PartnerDetailModal: React.FC<PartnerDetailModalProps> = ({ isOpen, onClose, partner }) => {
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-lg p-8 relative animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    aria-label="Close"
                >
                    <XIcon className="w-6 h-6" />
                </button>

                <div className="flex flex-col items-center text-center">
                    <img
                        src={partner.logoUrl}
                        alt={`${partner.name} logo`}
                        className="max-h-16 mb-6 object-contain"
                    />
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{partner.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{partner.description}</p>
                    <a
                        href={partner.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-violet to-cyan text-white font-semibold py-2 px-6 rounded-md shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                    >
                        Visit Website &rarr;
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PartnerDetailModal;
