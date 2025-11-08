import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program_name: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("applications").insert([
      {
        name: formData.name,
        email: formData.email,
        program_name: `${formData.program_name} (Phone: ${formData.phone})`,
        status: "pending",
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("❌ Error submitting form:", error.message);
      alert("Something went wrong! Check the browser console for details.");
    } else {
      alert("✅ Application submitted successfully!");
      setFormData({ name: "", email: "", phone: "", program_name: "" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Apply for Internship 🚀</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-lg space-y-4">
        <div>
          <label htmlFor="name" className="sr-only">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan"
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan"
          />
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">Phone</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan"
          />
        </div>
        <div>
          <label htmlFor="program_name" className="sr-only">Program</label>
          <input
            id="program_name"
            type="text"
            name="program_name"
            placeholder="Program (e.g. Web Dev, AI, Data Science)"
            value={formData.program_name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-violet to-cyan text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Apply Now"}
        </button>
      </form>
    </div>
  );
}