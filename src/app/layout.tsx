import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { CoachFAB } from "@/components/layout/CoachFAB";
import { SplashScreen } from "@/components/layout/SplashScreen";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Resilience Agent | AI Financial Companion",
  description: "Secure your financial future with AI-powered resilience agents.",
  appleWebApp: {
    title: "Resilience",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#030014",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground min-h-screen selection:bg-primary/30 antialiased`}>
        <div className="fixed inset-0 bg-liquid-gradient -z-50 pointer-events-none" />
        <main className="min-h-screen">
          <SplashScreen />
          {children}
        </main>
        <CoachFAB />
        <Navbar />
      </body>
    </html>
  );
}

