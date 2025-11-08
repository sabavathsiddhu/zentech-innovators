import React from 'react';
import { AwardIcon } from './Icons';

const Ticker = () => {
  const messages = [
    "Sravani L has officially enrolled in the Data Analyst Internship program at ZenTech Innovators 🎉",
    "New Batch for Full Stack Development starting next week! Limited seats available.",
    "Congratulations to Rohan for getting placed at Amazon as a Software Engineer!",
    "Our new AI-powered learning tools are now live for all students.",
  ];

  return (
    <div className="bg-gray-100 text-gray-800 text-sm font-medium py-2 overflow-hidden flex items-center">
      <AwardIcon className="w-5 h-5 mx-4 text-violet flex-shrink-0" />
      <div className="whitespace-nowrap animate-ticker-scroll">
        <span className="inline-block px-8">{messages.join(" • ")}</span>
        <span className="inline-block px-8">{messages.join(" • ")}</span>
      </div>
    </div>
  );
};

export default Ticker;