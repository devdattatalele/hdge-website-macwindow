import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/chat/chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HDGE AI - Where Chatbots Get Down to Business",
  description: "AI that understands your business, tracks data, and delivers personalized support, 24/7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
