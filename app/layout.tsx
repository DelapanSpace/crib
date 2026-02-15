import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpaceAudio } from "@/components/background/space-audio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "8Space | Creative Strategy & Digital Production Studio",
    template: "%s | Delapan Space",
  },
  description: 
    "A production-focused creative studio specializing in social media management, brand design, and high-end digital experiences for global agencies and businesses.",
  metadataBase: new URL("https://dlpn.space"), // Update with your actual URL
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Delapan Space | Global Creative Strategy",
    description: "High-end design and digital production partner based in Indonesia.",
    url: "https://dlpn.space",
    siteName: "8Space",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "8Space | Creative Strategy & Production",
    description: "Elevating brands with strategic design and social-first content.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><SpaceAudio/>
        {children}
      </body>
    </html>
  );
}
