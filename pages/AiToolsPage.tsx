
import React, { useState } from 'react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { ImageIcon, SparklesIcon, UploadCloudIcon } from '../components/Icons';

// Utility function to convert a File to a base64 string
const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
};


const AiToolsPage = () => {
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setImageUrl(URL.createObjectURL(file));
            setAnalysis('');
            setError('');
        }
    };

    const handleAnalyze = async () => {
        if (!image) {
            setError('Please upload an image first.');
            return;
        }
        setIsLoading(true);
        setAnalysis('');
        setError('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const imagePart = await fileToGenerativePart(image);
            const textPart = { text: "Analyze this image in detail. Describe what you see, including any text, objects, and the overall context. If it's a document like a certificate or resume, extract the key information." };
            
            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [imagePart, textPart] },
            });

            setAnalysis(response.text);

        } catch (err) {
            console.error("Error analyzing image:", err);
            setError('Failed to analyze the image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="bg-gray-50 dark:bg-slate-900 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                        <SparklesIcon className="w-10 h-10 text-violet" />
                        ZenTech AI Tools
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Leverage the power of Gemini to interact with your content in new ways.
                    </p>
                </div>

                {/* Image Analyzer Section */}
                <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3 mb-6">
                        <ImageIcon className="w-7 h-7 text-cyan" />
                        Gemini Vision: Image Analyzer
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {/* Left Side: Upload */}
                        <div className="space-y-4">
                             <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg">
                                {imageUrl ? (
                                    <img src={imageUrl} alt="Upload preview" className="max-h-48 rounded-lg object-contain" />
                                ) : (
                                    <>
                                        <UploadCloudIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-2"/>
                                        <p className="text-center text-sm text-gray-500 dark:text-gray-400">Your uploaded image will be displayed here.</p>
                                    </>
                                )}
                             </div>
                             <div>
                                <label htmlFor="image-upload" className="w-full text-center cursor-pointer bg-slate-100 dark:bg-slate-700 rounded-md font-medium text-violet dark:text-cyan hover:text-cyan p-3 block">
                                    <span>{image ? 'Change Image' : 'Select an Image'}</span>
                                    <input id="image-upload" name="image-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*"/>
                                </label>
                            </div>
                            <button 
                                onClick={handleAnalyze} 
                                disabled={!image || isLoading}
                                className="w-full bg-gradient-to-r from-violet to-cyan text-white font-semibold py-3 px-4 rounded-md shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <SparklesIcon className="w-5 h-5" />
                                        Analyze with Gemini
                                    </>
                                )}
                            </button>
                        </div>
                        {/* Right Side: Results */}
                        <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-lg min-h-[20rem]">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Analysis Results</h3>
                             {isLoading && <p className="text-sm text-gray-500 dark:text-gray-400">AI is analyzing the image. This may take a moment...</p>}
                             {error && <p className="text-sm text-red-500">{error}</p>}
                             {analysis && <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{analysis}</p>}
                             {!isLoading && !analysis && !error && <p className="text-sm text-gray-500 dark:text-gray-400">Upload an image and click "Analyze" to see the results here.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiToolsPage;
