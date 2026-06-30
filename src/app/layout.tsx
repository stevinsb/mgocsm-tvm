import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MGOCSM Trivandrum - Worship • Study • Service",
  description: "Official portal of Mar Gregorios Orthodox Christian Student Movement (MGOCSM), Trivandrum Diocese. Empowering students to grow spiritually, serve society, and strengthen the Orthodox faith.",
  metadataBase: new URL("https://mgocsmtvm.org"),
  openGraph: {
    title: "MGOCSM Trivandrum",
    description: "Empowering students to grow spiritually, serve society, and strengthen the Orthodox faith.",
    url: "https://mgocsmtvm.org",
    siteName: "MGOCSM Trivandrum",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MGOCSM Trivandrum",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MGOCSM Trivandrum",
    description: "Worship • Study • Service - Mar Gregorios Orthodox Christian Student Movement, Trivandrum Diocese.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="en" data-scroll-behavior="smooth" className={`${poppins.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
