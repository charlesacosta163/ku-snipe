import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Sun } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import CougarImage from "@/public/images/output.jpg"
import { Analytics } from "@vercel/analytics/react"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kusnipe.vercel.app"),
  title: "KU Watch",
  description: "Kean University Course Sniping Tool",
  openGraph: {
    title: "KU Watch",
    description: "Kean University Course Sniping Tool",
    images: [
      {
        url: CougarImage.src, // Path to your image
        width: 1200,
        height: 630,
        alt: "KU Sniper course tracking preview",
      },
    ],
  },
};

const maintenance = true 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${inter.variable} antialiased`}
      >
        {maintenance ? (
          <div className="flex items-center justify-center h-screen text-center p-4">
            <div className="flex flex-col items-center gap-4 max-w-[600px] w-full">
              <div className="bg-yellow-100 text-[#2A3370] p-6 rounded-full">
                <Sun className="w-[100px] h-[100px]"/>
              </div>
              <h1 className="text-4xl font-bold mb-2 text-[#2A3370]">We're on Summer Break</h1>
              <p className="text-gray-500">KU Watch is temporarily unavailable while we're enjoying the summer sun. We'll be back before the fall semester begins!</p>

              <div className="flex gap-2 text-sm font-medium items-center bg-blue-500 text-white px-2 py-0.5 rounded-full">
                <FaLinkedin /> Check Our<a href="https://www.linkedin.com/in/charles-acosta-11124125b/" target="_blank" className="underline font-bold">LinkedIn</a>page for app updates
              </div>
            </div>
          </div>
        ) : (
          children
        )}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
