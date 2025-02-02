import type { Metadata } from "next";
import { Lobster } from "next/font/google";
import "./globals.css";

const lobsterSans = Lobster({
  variable: "--font-lobster-sans",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Spell Book App",
  description: "Developed by Evgeniy Berezkin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lobsterSans.variable}>{children}</body>
    </html>
  );
}
