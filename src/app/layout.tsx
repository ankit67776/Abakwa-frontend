
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from '@/context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Abakwa', 
  description: 'Streamline your ad creative uploads and ad exchange with Abakwa.',
};

// IMPORTANT: Replace with your actual Google Client ID from environment variable
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_HERE";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID_HERE") {
    console.warn("Google Client ID is not configured. Google OAuth will not work. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID in your .env file.");
  }
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <TooltipProvider delayDuration={0}>
              {children}
            </TooltipProvider>
            <Toaster />
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
