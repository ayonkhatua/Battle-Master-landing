import React from 'react';
import Link from 'next/link';

const Footer = () => {
  // Ye automatically current year (jaise 2026) utha lega
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] border-t border-slate-800 text-slate-400 py-10 px-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand Name & Tagline */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-black text-white tracking-widest">BATTLE MASTER</h3>
          <p className="text-sm mt-1">Play • Compete • Earn</p>
        </div>

        {/* Important Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link href="/privacy" className="hover:text-indigo-400 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/contact" className="hover:text-indigo-400 transition-colors">
            Contact Us
          </Link>
        </div>

      </div>

      {/* Copyright Line */}
      <div className="max-w-4xl mx-auto mt-8 pt-6 border-t border-slate-800/50 text-center text-xs">
        <p>&copy; {currentYear} Battle Master. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;