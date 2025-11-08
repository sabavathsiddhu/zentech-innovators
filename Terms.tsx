import React from "react";
import { NavLink } from "react-router-dom";

export default function Terms() {
  return (
    <div className="bg-gray-50 dark:bg-slate-900 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose dark:prose-invert mx-auto p-8 max-w-4xl bg-white dark:bg-slate-800 rounded-lg shadow-lg">
          <h1>Terms & Conditions</h1>
          <p>Last updated: 08 November 2025</p>

          <h2>Agreement</h2>
          <p>
            By using our website and enrolling in programs, you agree to the following terms.
          </p>

          <h2>Services</h2>
          <p>
            ZenTech Innovators provides internship programs, certificates, training, and related services.
            Program content, pricing, and schedules may change; we will try to notify enrolled users where possible.
          </p>

          <h2>User Responsibilities</h2>
          <ul>
            <li>Provide accurate information in applications.</li>
            <li>Deliver original work for assignments; plagiarism may lead to disqualification.</li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            All course content and website materials are © ZenTech Innovators. You may not redistribute content without written permission.
          </p>

          <h2>Liability</h2>
          <p>
            We provide services “as-is”. We are not liable for indirect or consequential losses. Maximum liability
            is limited to the amount paid for the program.
          </p>

          <h2>Governing Law</h2>
          <p>These terms are governed by the laws of India.</p>

          <h2>Contact</h2>
          <p>For any questions, please <NavLink to="/contact">contact us</NavLink>.</p>
        </article>
      </div>
    </div>
  );
}