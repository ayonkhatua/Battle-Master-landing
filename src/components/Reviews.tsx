"use client";
import React, { useState, useEffect } from "react";
import { Star, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Reviews() {
  const [email, setEmail] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 🔥 NEW: State to show error/success feedback on the screen
  const [feedback, setFeedback] = useState<{type: 'error' | 'success' | null, msg: string}>({type: null, msg: ''});

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('rating')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Fetch Error:", error);
      } else if (data) {
        setReviews(data);
      }
    };

    fetchReviews();

    const channel = supabase
      .channel('public:rating')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'rating' }, (payload) => {
        setReviews((currentReviews) => [payload.new, ...currentReviews]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel) };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback({ type: null, msg: "" }); // Reset message

    if (!email || !reviewText) {
      // Translated from: "Email aur Review dono zaroori hain!"
      setFeedback({ type: 'error', msg: "Both Email and Review are required!" });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('rating')
        .insert([{ email: email, review: reviewText, stars: rating }]);

      if (error) throw error;

      setEmail("");
      setReviewText("");
      setFeedback({ type: 'success', msg: "The review has been submitted! Check the list below." });
      
      // Remove the success message after 3 seconds
      setTimeout(() => setFeedback({ type: null, msg: "" }), 3000);

    } catch (error: any) {
      console.error("Error adding review:", error);
      // 🔥 NEW: Actual error will be shown on the screen
      setFeedback({ type: 'error', msg: `Supabase Error: ${error.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#020617] text-white py-20 px-6 border-t border-slate-800">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black mb-4">PLAYER <span className="text-indigo-400">REVIEWS</span></h2>
          <p className="text-slate-400">See what our pro players have to say about Battle Master.</p>
        </div>

        {/* Rating Form */}
        <div className="bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-800 mb-12 shadow-xl">
          
          {/* 🔥 NEW: Feedback Message UI */}
          {feedback.type && (
            <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 font-bold ${feedback.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'}`}>
              {feedback.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
              {feedback.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex gap-2 justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button type="button" key={star} onClick={() => setRating(star)}>
                  <Star className={`w-10 h-10 transition-colors ${rating >= star ? "text-yellow-400 fill-yellow-400" : "text-slate-600"}`} />
                </button>
              ))}
            </div>
            
            <input 
              type="email" 
              placeholder="Enter your Email (Hidden from public)" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:border-indigo-500 focus:outline-none"
              required
            />
            
            <textarea 
              placeholder="Write your review here..." 
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:border-indigo-500 focus:outline-none"
              required
            />
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`bg-indigo-600 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-indigo-500"}`}
            >
              {isSubmitting ? "Submitting..." : <><Send className="w-5 h-5" /> Submit Rating</>}
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-center text-slate-500 italic">No reviews yet. Be the first!</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-indigo-300">
                    {rev.email ? `${rev.email.split("@")[0].substring(0, 3)}***@${rev.email.split("@")[1]}` : "Anonymous"}
                  </span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < rev.stars ? "text-yellow-400 fill-yellow-400" : "text-slate-700"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">{rev.review}</p>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}