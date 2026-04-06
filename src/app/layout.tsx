import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // 🌟 Base URL set karna zaroori hai Next.js SEO ke liye
  metadataBase: new URL("https://battlemasterofficial.vercel.app"),
  
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
  
  // 🌟 Canonical Link (Duplicate content se bachane ke liye)
  alternates: {
    canonical: "/",
  },
  
  // 🌟 Open Graph (WhatsApp, Facebook, Discord par share karne par jo preview aata hai)
  openGraph: {
    title: "Battle Master - Play & Earn",
    description: "The best Free Fire tournament app for mobile gamers. Join daily custom rooms and win real coins per kill!",
    url: "https://battlemasterofficial.vercel.app",
    siteName: "Battle Master",
    images: [
      {
        url: "/logo.png", // 🌟 Changed to logo
        width: 800, // Square dimension logo ke liye best hai
        height: 800,
        alt: "Battle Master Official Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  
  // 🌟 Twitter Card (X/Twitter par share karne ke liye)
  twitter: {
    card: "summary", // 🌟 Logo ke liye 'summary' card use hota hai
    title: "Battle Master - Free Fire Esports",
    description: "Join daily FF custom rooms and win real rewards!",
    images: ["/logo.png"], // 🌟 Changed to logo
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}