import React from "react";
import { NavLink } from "react-router-dom";

export default function RefundPolicy() {
  return (
    <div className="bg-gray-50 dark:bg-slate-900 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert mx-auto p-8 max-w-4xl bg-white dark:bg-slate-800 rounded-lg shadow-lg">
                <h1>Cancellation & Refund Policy</h1>

                <p>Last updated: 08 November 2025</p>

                <h2>Overview</h2>
                <p>
                    ZenTech Innovators aims to provide high-quality internship and training experiences.
                    Refunds are available only under the rules below. By enrolling in a paid program,
                    you agree to this policy.
                </p>

                <h2>Cancellation by Participant</h2>
                <ul>
                    <li>
                    <strong>Before program start:</strong> If you cancel more than 7 days before the
                    program start date, you are eligible for a full refund minus a ₹249 administrative fee.
                    </li>
                    <li>
                    <strong>Within 7 days before start or after start:</strong> No refund will be provided
                    for cancellations made within 7 days of the program start date or once the program has started,
                    except under exceptional circumstances (see “Exceptions”).
                    </li>
                </ul>

                <h2>Cancellation by ZenTech Innovators</h2>
                <p>
                    If we cancel the program for any reason, we will either:
                    <ol>
                    <li>Offer an immediate full refund; or</li>
                    <li>Offer a transfer to a different cohort with equivalent terms.</li>
                    </ol>
                </p>

                <h2>Refund Process</h2>
                <ol>
                    <li>To request a refund, please <NavLink to="/contact">contact us</NavLink> with your registration details.</li>
                    <li>Approved refunds are processed within 7–10 business days and will be returned to the original payment method.</li>
                </ol>

                <h2>Exceptions</h2>
                <p>
                    Refunds outside the rules above may be considered for documented emergencies (medical, government travel restriction, etc.).
                    We evaluate exceptions case-by-case.
                </p>

                <h2>Contact</h2>
                <p>
                    For refund requests or queries, please <NavLink to="/contact">contact us</NavLink>.
                </p>
            </article>
        </div>
    </div>
  );
}