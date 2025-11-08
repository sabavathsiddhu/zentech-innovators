
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { BotIcon, MessageSquareIcon, SendIcon, XIcon } from './Icons';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { text: "Hello! I'm ZenBot, your AI assistant. Ask me about our programs, or try a suggestion below!", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const suggestionChips = ["Find a program for me", "How to verify a certificate?", "Internship details"];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const sendMessage = async (messageText: string) => {
        if (messageText.trim() === '' || isLoading) return;

        const userMessage: Message = { text: messageText, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        if(input) setInput('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const response = await ai.models.generateContent({
                model: 'gemini-flash-lite-latest',
                contents: `You are ZenBot, a friendly and helpful AI assistant for ZenTech Innovators, an ed-tech platform. Your goal is to answer questions about courses, programs, admissions, and career support. Be concise and encouraging. Here is the user's question: "${messageText}"`,
            });
            
            const botResponse: Message = { text: response.text, sender: 'bot' };
            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error("Error fetching response from Gemini API:", error);
            const errorResponse: Message = { text: "Sorry, I'm having trouble connecting right now. Please try again later.", sender: 'bot' };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = () => {
        sendMessage(input);
    }

    const handleSuggestionClick = (suggestion: string) => {
        sendMessage(suggestion);
    }

    return (
        <>
            <div className="fixed bottom-5 right-5 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-gradient-to-r from-violet to-cyan text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    aria-label="Toggle Chatbot"
                >
                    {isOpen ? <XIcon className="w-8 h-8" /> : <MessageSquareIcon className="w-8 h-8" />}
                </button>
            </div>
            
            <div className={`fixed bottom-24 right-5 w-[calc(100%-2.5rem)] max-w-sm h-[32rem] bg-white dark:bg-slate-800 rounded-lg shadow-2xl flex flex-col z-50 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
                <header className="bg-slate-900 text-white p-4 rounded-t-lg flex items-center justify-between">
                    <div className="flex items-center">
                        <BotIcon className="w-6 h-6 mr-3" />
                        <h3 className="font-bold">Ask ZenTech AI Assistant 💬</h3>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
                        <XIcon className="w-5 h-5"/>
                    </button>
                </header>
                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-cyan text-white' : 'bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200'}`}>
                                    <p className="text-sm break-words">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                         {messages.length === 1 && !isLoading && (
                            <div className="flex flex-wrap gap-2 justify-start">
                                {suggestionChips.map(chip => (
                                    <button key={chip} onClick={() => handleSuggestionClick(chip)} className="px-3 py-1 text-xs bg-gray-200 dark:bg-slate-700 rounded-full hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors">
                                        {chip}
                                    </button>
                                ))}
                            </div>
                        )}
                        {isLoading && (
                            <div className="flex justify-start">
                                 <div className="max-w-[80%] p-3 rounded-lg bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200">
                                    <div className="flex items-center space-x-1">
                                        <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-slate-700">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask a question..."
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan bg-white dark:bg-slate-900"
                            disabled={isLoading}
                        />
                        <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-cyan text-white p-2 rounded-md disabled:opacity-50 transition-colors">
                            <SendIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chatbot;