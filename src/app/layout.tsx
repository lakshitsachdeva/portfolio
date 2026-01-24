import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Lakshit Sachdeva | AI & ML Engineer",
  description: "Portfolio of Lakshit Sachdeva, a Computer Science student specializing in Machine Learning and Full-Stack Development.",
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
