import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
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
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
