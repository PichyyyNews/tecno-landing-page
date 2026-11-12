import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Technology Computer | High-Performance Computing & Workstation Solutions",
    template: "%s | Technology Computer",
  },
  description:
    "High-performance workstations, neural compute rigs, and enterprise computing infrastructure engineered for speed, machine learning, and maximum throughput.",
  keywords: [
    "Technology Computer",
    "Workstation",
    "High-Performance Computing",
    "AI Rig",
    "Deep Learning Workstation",
    "Enterprise Hardware",
  ],
  authors: [{ name: "Technology Computer Systems" }],
  creator: "Technology Computer Systems",
  metadataBase: new URL("http://localhost"),
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/logo.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Technology Computer",
    title: "Technology Computer | High-Performance Computing & Workstation Solutions",
    description:
      "High-performance workstations, neural compute rigs, and enterprise computing infrastructure engineered for maximum throughput.",
    images: [
      {
        url: "/logo.png",
        width: 1920,
        height: 1920,
        alt: "Technology Computer Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology Computer | High-Performance Computing",
    description: "High-performance workstations and enterprise infrastructure.",
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
