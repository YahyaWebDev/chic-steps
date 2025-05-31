import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "./navbar";
import Footer from "./footer";

  const GeistMono = Geist_Mono({subsets : ['latin']});

export const metadata: Metadata = {
  title: "Chic Steps ™",
  description: "Chic Steps – Discover Trendy & Comfortable Footwear for Every Occasion! Shop the Latest Styles in Women’s & Men’s Shoes – Sneakers, Heels, Boots & More. Free Shipping & Exclusive Deals!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
      <body
        className={` ${GeistMono.className} antialiased text-white bg-black p-0 m-0 box-border`}
      >
      <Navbar />
        {children}
      <Footer />
      </body>
      </ClerkProvider>
    </html>
  );
}
