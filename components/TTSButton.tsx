
import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { Volume2Icon } from './Icons';
import { decode, decodeAudioData } from '../utils/audio';

interface TTSButtonProps {
    textToSpeak: string;
}

const TTSButton: React.FC<TTSButtonProps> = ({ textToSpeak }) => {
    const [isLoading, setIsLoading] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<AudioBufferSourceNode | null>(null);

    const handlePlay = async () => {
        if (isLoading || !textToSpeak) return;
        setIsLoading(true);

        try {
            if (sourceRef.current) {
                sourceRef.current.stop();
            }
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            }
            const audioContext = audioContextRef.current;
            
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-preview-tts",
                contents: [{ parts: [{ text: textToSpeak }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                },
            });
            
            const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

            if (base64Audio && audioContext) {
                const audioBuffer = await decodeAudioData(decode(base64Audio), audioContext, 24000, 1);
                const source = audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioContext.destination);
                source.start();
                sourceRef.current = source;
                source.onended = () => setIsLoading(false);
            } else {
                 setIsLoading(false);
            }
        } catch (error) {
            console.error("Error generating or playing TTS audio:", error);
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handlePlay}
            disabled={isLoading}
            className="text-gray-500 dark:text-gray-400 hover:text-cyan dark:hover:text-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            title="Listen to this section"
        >
            {isLoading ? (
                <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <Volume2Icon className="w-6 h-6" />
            )}
        </button>
    );
};

export default TTSButton;
