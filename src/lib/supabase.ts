import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Agar keys nahi milengi toh ab page crash nahi hoga, sirf console me error aayega
if (!supabaseUrl || !supabaseKey) {
  console.error("🚨 ALERT: Supabase keys missing hain! .env.local file check karo.");
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co", 
  supabaseKey || "placeholder-key"
);