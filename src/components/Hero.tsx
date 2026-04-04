"use client";
import React, { useState, useEffect } from "react";
import { Download, ShieldCheck, Zap, Users, Star, AlertCircle } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function Hero() {
  const [downloads, setDownloads] = useState<number>(0);
  const [rating, setRating] = useState<string>("4.9");
  const [isDownloading, setIsDownloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from('app_stats')
        .select('*') 
        .eq('id', 'metrics')
        .single();
      
      if (data) {
        if (data.downloads !== undefined) setDownloads(data.downloads);
        
        if (data.ratings !== undefined && data.ratings !== null) {
          setRating(String(data.ratings));
        } else if (data.rating !== undefined && data.rating !== null) {
          setRating(String(data.rating));
        }
      }
    };

    fetchStats();

    const channel = supabase
      .channel('public:app_stats')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'app_stats' }, (payload) => {
        if (payload.new.downloads !== undefined) {
          setDownloads(payload.new.downloads);
        }
        if (payload.new.ratings !== undefined && payload.new.ratings !== null) {
          setRating(String(payload.new.ratings));
        } else if (payload.new.rating !== undefined && payload.new.rating !== null) {
          setRating(String(payload.new.rating));
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel) };
  }, []);

  const handleDownloadClick = async () => {
    if (isDownloading) return; 
    
    setIsDownloading(true);
    setErrorMsg(null); 
    
    // Optimistic UI Update
    setDownloads((prev) => prev + 1);

    try {
      const { data, error: fetchError } = await supabase
        .from('app_stats')
        .select('downloads')
        .eq('id', 'metrics')
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

      if (data) {
        const { error: updateError } = await supabase
          .from('app_stats')
          .update({ downloads: data.downloads + 1 })
          .eq('id', 'metrics');
          
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('app_stats')
          .insert([{ id: 'metrics', downloads: 1, ratings: "4.9" }]);
          
        if (insertError) throw insertError;
      }

    } catch (error: any) {
      console.error("Supabase Error:", error.message || error);
      setDownloads((prev) => prev - 1);
      setErrorMsg("Database Update Failed. Check Supabase RLS.");
    } finally {
      try {
        const link = document.createElement("a");
        link.href = "/battle-master.apk";
        link.download = "BattleMaster.apk";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (e) {
        console.error("Download trigger failed:", e);
      }
      
      setTimeout(() => setIsDownloading(false), 2000); 
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#020617] text-white">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* 🔥 NAYA: HEADER (Logo aur Name) */}
      <div className="absolute top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            {/* Logo ko public folder se utha raha hai */}
            <Image src="/logo.png" alt="Battle Master Logo" fill className="object-cover" unoptimized />
          </div>
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-widest uppercase">
            Battle Master
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 z-10 w-full">
        
        {/* LEFT SIDE: TEXT */}
        <div className="flex-1 text-center lg:text-left pt-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800/50 border border-indigo-500/30 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400/20" />
            <span className="text-sm font-bold text-indigo-200 tracking-wider">INDIA'S #1 ESPORTS PLATFORM</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
            NO SCAMS. JUST SKILLS. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 animate-gradient-x">
              WIN REAL REWARDS.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Join daily Free Fire MAX custom rooms. Compete in Solo, Duo, or Squad matches and withdraw your winnings instantly via UPI.
          </p>

          {/* Error Message UI */}
          {errorMsg && (
            <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm font-medium text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 mb-12">
            
            <button 
              onClick={handleDownloadClick}
              disabled={isDownloading}
              className={`z-50 group relative flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_30px_rgba(79,70,229,0.5)] overflow-hidden border-none ${isDownloading ? "opacity-70 cursor-not-allowed" : "hover:bg-indigo-500 hover:scale-105 cursor-pointer"}`}
            >
              {!isDownloading && <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />}
              <Download className={`w-6 h-6 ${!isDownloading && "group-hover:-translate-y-1 transition-transform"}`} />
              {isDownloading ? "Starting..." : "Download APK Now"}
            </button>

            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm text-slate-300">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <div className="text-left">
                <p className="text-xs text-slate-400 font-medium leading-none mb-1">Guaranteed</p>
                <p className="text-sm font-bold leading-none text-white">100% Safe & Secure</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-8 pt-6 border-t border-slate-800/80">
            {/* Real Downloads Stat */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <Users className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="text-left">
                <p className="text-xl font-black text-white">{downloads.toLocaleString()}+</p>
                <p className="text-xs text-slate-400 font-medium">Real Downloads</p>
              </div>
            </div>
            
            <div className="w-px h-10 bg-slate-800"></div>
            
            {/* Instant Withdrawals Stat */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Zap className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="text-xl font-black text-white">Instant</p>
                <p className="text-xs text-slate-400 font-medium">UPI Withdrawals</p>
              </div>
            </div>
            
          </div>
        </div>

        {/* RIGHT SIDE: FLOATING PHONE */}
        <div className="flex-1 relative w-full max-w-[340px] lg:max-w-[380px] mt-10 lg:mt-0 animate-float mx-auto lg:mx-0">
          <div className="relative aspect-[9/19.5] rounded-[3rem] overflow-hidden border-[8px] border-slate-800 bg-slate-950 shadow-2xl shadow-indigo-600/30">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-slate-800 rounded-b-3xl z-20 flex justify-center items-end pb-1.5">
               <div className="w-12 h-1.5 bg-slate-900 rounded-full"></div>
            </div>
            <Image src="/app-screen-1.png" alt="Battle Master Gameplay" fill className="object-cover z-10" priority unoptimized />
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] z-10 pointer-events-none" />
          </div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl -z-10" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-2xl -z-10" />
          
          {/* Realtime Rating Badge */}
          <div className="absolute top-20 -left-6 sm:-left-12 bg-slate-800/90 border border-slate-700 p-3 rounded-2xl flex items-center gap-2 shadow-xl z-20">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="font-bold text-sm">{rating}/5</span>
          </div>
        </div>
      </div>
    </section>
  );
}