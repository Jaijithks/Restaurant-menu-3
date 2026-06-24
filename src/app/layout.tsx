import type { Metadata } from "next";
import { Alice } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const alice = Alice({
  variable: "--font-alice",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Ochre & Ember | Exquisite Yemeni Mandi & Grills",
  description: "Experience the rich tradition of Yemeni Mandi and premium charcoal-grilled Al-Fahm at Ochre & Ember. Explore our interactive digital menu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${alice.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}

