import React from "react";

export default function ShippingPolicy() {
  return (
    <div className="bg-gray-50 dark:bg-slate-900 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert mx-auto p-8 max-w-4xl bg-white dark:bg-slate-800 rounded-lg shadow-lg">
                <h1>Shipping Policy</h1>

                <p>
                    ZenTech Innovators primarily provides digital products and services (courses, certificates, downloads).
                    No physical shipping is involved unless explicitly stated. Certificates are delivered as downloadable PDFs
                    via email or a secure verification link.
                </p>

                <h2>Physical Items (If Any)</h2>
                <p>
                    If a physical item is part of a program (which is rare), any applicable shipping fees and timelines will be clearly specified on the offer page before purchase.
                </p>
            </article>
        </div>
    </div>
  );
}