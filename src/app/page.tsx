"use client";
import dynamic from "next/dynamic";

// Loading text hata diya hai, aur ssr: false waisa hi rakha hai taaki koi error na aaye
const Hero = dynamic(() => import("@/components/Hero"), { 
  ssr: false
});

const Reviews = dynamic(() => import("@/components/Reviews"), { 
  ssr: false
});

export default function Home() {
  return (
    <main className="bg-[#020617] min-h-screen">
      <Hero />
      <Reviews />
    </main>
  );
}