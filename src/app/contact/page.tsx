"use client";
import React, { useState } from "react";
import { Mail, MessageSquare, ArrowLeft, Send, Headphones } from "lucide-react";
import Link from "next/link";

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Yahan tum apna Supabase ka code daal sakte ho future mein
    setTimeout(() => {
      alert("Message sent successfully! Our team will contact you soon.");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-300 font-sans">
      {/* Header Section */}
      <div className="bg-slate-900/50 border-b border-slate-800 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-6 font-bold"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 italic">
            CONTACT <span className="text-indigo-500">SUPPORT</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Got a problem with a custom room, coins, or your account? Our team is here 24/7 to help you out.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12">
        
        {/* Left Side: Direct Contact Methods */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Headphones className="text-indigo-500 w-6 h-6" /> Reach Us Directly
          </h2>

          {/* WhatsApp / Discord Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-indigo-500/50 transition-colors">
            <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center border border-emerald-500/30 mb-4">
              <MessageSquare className="text-emerald-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Live Chat</h3>
            <p className="text-slate-400 mb-4 text-sm">Fastest way to get help regarding ongoing tournaments.</p>
            {/* Note: Apna WhatsApp group ya Discord ka link yahan daal dena */}
            <a href="#" className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">
              Join Discord Server
            </a>
          </div>

          {/* Email Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-indigo-500/50 transition-colors">
            <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center border border-indigo-500/30 mb-4">
              <Mail className="text-indigo-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
            <p className="text-slate-400 mb-4 text-sm">For business inquiries or detailed account issues.</p>
            {/* Note: Apna support email yahan likh dena */}
            <a href="mailto:support@battlemaster.com" className="text-indigo-400 font-bold hover:underline">
              support@battlemaster.com
            </a>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">In-Game Name (IGN)</label>
              <input 
                type="text" 
                placeholder="E.g. Ninja_Killer"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="your@email.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">Describe your issue</label>
              <textarea 
                rows={4}
                placeholder="I didn't receive my winning coins for Room #402..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full bg-indigo-600 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25"}`}
            >
              {isSubmitting ? "Sending..." : <><Send className="w-5 h-5" /> Send Message</>}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}