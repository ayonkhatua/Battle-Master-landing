"use client";
import React from "react";
import { ShieldCheck, Lock, User, Wallet, Bell, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-300 font-sans">
      {/* Header Section */}
      <div className="bg-slate-900/50 border-b border-slate-800 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-6 font-bold"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 italic">
            PRIVACY <span className="text-indigo-500">POLICY</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto py-16 px-6">
        <div className="grid gap-12">
          
          {/* 1. Data Collection */}
          <section className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
                <User className="text-indigo-400 w-6 h-6" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">1. Information Collection</h2>
              <p className="leading-relaxed">
                When you register on <span className="text-white font-semibold">Battle Master</span>, we collect essential personal details required to create your account, such as your 
                <span className="text-indigo-300 italic"> username, email address, and phone number.</span> We only collect information that you voluntarily provide to us.
              </p>
            </div>
          </section>

          {/* 2. Data Usage */}
          <section className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                <ShieldCheck className="text-emerald-400 w-6 h-6" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">2. How We Use Your Data</h2>
              <p className="leading-relaxed mb-4">
                Your data is exclusively used for account verification, sending important notifications, and tracking your in-game tournament progress (kills, wins, and rankings).
              </p>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl italic text-emerald-400">
                "We have a strict policy: We never sell, rent, or share your personal data with any third-party marketing agencies."
              </div>
            </div>
          </section>

          {/* 3. Coins & Transactions */}
          <section className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-600/20 rounded-xl flex items-center justify-center border border-yellow-500/30">
                <Wallet className="text-yellow-400 w-6 h-6" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">3. Coins & Financial Security</h2>
              <p className="leading-relaxed">
                All coins in your <span className="text-white font-semibold">Battle Master Wallet</span> (including deposits, winnings, and bonuses) are intended strictly for in-app tournament entries. 
                All payment transactions are handled through secure, encrypted payment gateways to ensure your financial safety.
              </p>
            </div>
          </section>

          {/* 4. Security */}
          <section className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                <Lock className="text-blue-400 w-6 h-6" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">4. Account Security</h2>
              <p className="leading-relaxed">
                We implement industry-standard security measures to protect your account and personal information. We constantly monitor our systems for any suspicious activity to keep your data safe.
              </p>
            </div>
          </section>

          {/* 5. Updates */}
          <section className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                <Bell className="text-purple-400 w-6 h-6" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">5. Policy Changes</h2>
              <p className="leading-relaxed">
                Our Privacy Policy may be updated periodically to reflect new features or security updates. We will notify all active players via the <span className="text-white font-semibold italic">Notifications</span> section inside the app whenever a major change occurs.
              </p>
            </div>
          </section>

          {/* 6. Contact Us */}
          <section className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center border border-red-500/30">
                <Mail className="text-red-400 w-6 h-6" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">6. Support & Contact</h2>
              <p className="leading-relaxed">
                If you have any questions or concerns regarding your privacy or data protection, please feel free to reach out to us through the 
                <Link href="/contact" className="text-indigo-400 font-bold hover:underline ml-1">Contact Us</Link> section.
              </p>
            </div>
          </section>

        </div>

        {/* Footer Note */}
        <div className="mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Battle Master Official. All Rights Reserved.</p>
        </div>
      </div>
    </main>
  );
}