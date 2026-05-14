import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import AIConcierge from '@/components/AIConcierge';
import CustomCursor from '@/components/CustomCursor';
import OverlayGrain from '@/components/OverlayGrain';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0088CC',
};

export const metadata: Metadata = {
  title: {
    default: 'Traveloop | Premium Indian Travel Planning',
    template: '%s | Traveloop'
  },
  description: 'Plan. Explore. Loop. — A high-fidelity, cinematic window to India\'s most extraordinary heritage destinations and curated experiences.',
  keywords: ['Travel India', 'Heritage Tourism', 'Luxury Travel', 'Itinerary Planner', 'Indian Culture'],
  authors: [{ name: 'Traveloop Team' }],
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
        <link href="https://api.fontshare.com/v2/css?f[]=zodiak@500,700&f[]=satoshi@300,400,500&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (theme === 'dark' || (!theme && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="bg-bg text-text font-body antialiased selection:bg-primary selection:text-white relative">
        <OverlayGrain />
        <CustomCursor />
        <AuthProvider>
          {children}
          <AIConcierge />
        </AuthProvider>
      </body>
    </html>
  );
}
