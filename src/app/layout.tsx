import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--default-font-family",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Huzaifah Adam - Nomad AI",
  description: "Trading Spreadsheets for Soil. Documenting my transition into agriculture, self-sufficiency, and the art of unlearning the corporate grind.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} antialiased`}>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
