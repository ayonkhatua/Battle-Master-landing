import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer"; // 🌟 FIX: Footer yahan import kiya hai

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // 🌟 Base URL set karna zaroori hai Next.js SEO ke liye
  metadataBase: new URL("https://battlemasterofficial.vercel.app"),
  
  // 🌟 FIX 1: App Name Explicitly define karna
  applicationName: "Battle Master",
  
  // 🌟 Google Site Verification
  verification: {
    google: "OPYp2LzFKHpIK5ZVNAbtUtZDe_r1JlVCTKHE2hN5z5I", 
  },

  // 🌟 Primary Meta Tags
  title: "Battle Master - Play Free Fire Tournaments & Earn Coins",
  description: "Join Battle Master, the ultimate platform for Free Fire custom room tournaments. Play Solo, Duo, or Squad matches and win real prizes daily!",
  keywords: [
    "Battle Master", 
    "Free Fire Tournaments", 
    "FF Custom Room", 
    "Esports App", 
    "Earn Money Playing FF", 
    "Battle Master App"
  ],
  authors: [{ name: "Battle Master Team" }],
  
  // 🌟 Canonical Link
  alternates: {
    canonical: "/",
  },
  
  // 🌟 FIX 2: Favicon/Logo Setup (Google search results ke liye)
  icons: {
    icon: "/logo.png", 
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  
  // 🌟 Open Graph
  openGraph: {
    title: "Battle Master - Play & Earn",
    description: "The best Free Fire tournament app for mobile gamers. Join daily custom rooms and win real coins per kill!",
    url: "https://battlemasterofficial.vercel.app",
    siteName: "Battle Master", // Ye bhi Google padhta hai
    images: [
      {
        url: "/logo.png", 
        width: 800, 
        height: 800,
        alt: "Battle Master Official Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  
  // 🌟 Twitter Card
  twitter: {
    card: "summary", 
    title: "Battle Master - Free Fire Esports",
    description: "Join daily FF custom rooms and win real rewards!",
    images: ["/logo.png"], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 🌟 FIX 3: JSON-LD Schema (Google ko forcefully Site ka naam batane ki Master Trick) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Battle Master",
              "url": "https://battlemasterofficial.vercel.app/"
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Footer /> {/* 🌟 FIX: Footer ko website ke end mein yahan add kiya hai */}
      </body>
    </html>
  );
}