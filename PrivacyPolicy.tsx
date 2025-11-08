import React from "react";
import { NavLink } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 dark:bg-slate-900 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <article className="prose dark:prose-invert mx-auto p-8 max-w-4xl bg-white dark:bg-slate-800 rounded-lg shadow-lg">
                <h1>Privacy Policy</h1>
                <p>Last updated: 08 November 2025</p>

                <h2>Introduction</h2>
                <p>
                    ZenTech Innovators ("we", "us", "our") respects your privacy. This policy explains what
                    data we collect, why we collect it, how we use it, and your choices.
                </p>

                <h2>Data We Collect</h2>
                <ul>
                    <li><strong>Personal information:</strong> name, email, phone, education details provided during application.</li>
                    <li><strong>Payment data:</strong> transaction IDs, payment status (we do not store full card data).</li>
                    <li><strong>Usage data:</strong> pages visited, form submissions, IP address, device info for analytics and anti-fraud.</li>
                </ul>

                <h2>How We Use Your Data</h2>
                <ul>
                    <li>Process applications and payments.</li>
                    <li>Deliver program content, certificates, and support.</li>
                    <li>Improve our services and communicate updates.</li>
                </ul>

                <h2>Data Storage & Security</h2>
                <p>
                    We store data in Supabase (Postgres), and use industry-standard security practices (HTTPS, encrypted keys).
                    We do not share your personal data with third parties except where required to process payments (payment gateways),
                    or with your explicit consent.
                </p>

                <h2>Your Rights</h2>
                <p>
                    You may request access to, correction of, or deletion of your personal data. To do so, please <NavLink to="/contact">contact us</NavLink>.
                </p>

                <h2>Cookies & Tracking</h2>
                <p>
                    We use cookies for basic session functionality and analytics. You can disable cookies in your browser,
                    but some features of the site may not work correctly.
                </p>

                <h2>Contact</h2>
                <p>For questions about this privacy policy, please <NavLink to="/contact">contact us</NavLink>.</p>
            </article>
        </div>
    </div>
  );
}