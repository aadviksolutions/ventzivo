import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ShortlistProvider } from '@/context/ShortlistContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import DemoBar from '@/components/layout/DemoBar';

export const metadata: Metadata = {
  title: "VentZivo — Plan. Connect. Celebrate. | India's Event Marketplace",
  description:
    "India's premier all-in-one event vendor discovery platform. Discover verified venues, caterers, decorators, photographers, DJs, makeup artists, and event production specialists for weddings, corporate events, parties, and celebrations.",
  keywords: [
    "VentZivo",
    "event marketplace",
    "wedding vendors",
    "corporate event planners",
    "photographers",
    "caterers",
    "banquet halls",
    "India events",
  ],
  openGraph: {
    title: "VentZivo — Plan. Connect. Celebrate. India's Event Marketplace",
    description: "Discover, compare and connect with top event vendors across India.",
    images: ['/ventzivo-logo.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased selection:bg-brand-blue-800 selection:text-white">
        <AuthProvider>
          <ShortlistProvider>
            <Navbar />
            <main className="flex-1 pb-16 md:pb-0">{children}</main>
            <Footer />
            <MobileBottomNav />
            <DemoBar />
          </ShortlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
