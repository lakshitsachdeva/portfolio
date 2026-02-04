import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "lakshit sachdeva",
  description: "Portfolio of Lakshit Sachdeva, a Computer Science student specializing in Machine Learning and Full-Stack Development.",
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', type: 'image/png' },
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
      <body className="antialiased bg-black text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
