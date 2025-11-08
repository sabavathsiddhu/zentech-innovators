import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Ticker from './components/Ticker';
import FloatingButtons from './components/FloatingButtons';
import Chatbot from './components/Chatbot';
import { AuthProvider } from './contexts/AuthContext';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ProgramsPage = lazy(() => import('./pages/ProgramsPage'));
const ChampionsPage = lazy(() => import('./pages/ChampionsPage'));
const PartnersPage = lazy(() => import('./pages/PartnersPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const AiToolsPage = lazy(() => import('./pages/AiToolsPage'));
const VerifyCertificatePage = lazy(() => import('./pages/VerifyCertificatePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const PaymentSuccessPage = lazy(() => import('./pages/PaymentSuccessPage'));
const InternsListPage = lazy(() => import('./pages/InternsListPage'));


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


const App = () => {
    return (
        <AuthProvider>
            <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200">
                <ScrollToTop />
                <Ticker />
                <Header />
                <main className="flex-grow">
                    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/programs" element={<ProgramsPage />} />
                            <Route path="/champions" element={<ChampionsPage />} />
                            <Route path="/partners" element={<PartnersPage />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/blog/:slug" element={<BlogPostPage />} />
                            <Route path="/ai-tools" element={<AiToolsPage />} />
                            <Route path="/verify-certificate" element={<VerifyCertificatePage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/payment-success" element={<PaymentSuccessPage />} />
                            <Route path="/admin/interns" element={<InternsListPage />} />
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
                <FloatingButtons />
                <Chatbot />
            </div>
        </AuthProvider>
    );
};

export default App;