import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Traveloop | Personalized Travel Planning',
  description: 'Plan. Explore. Loop. — A cinematic window to India\'s most extraordinary destinations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=zodiak@500,700&f[]=satoshi@300,400,500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-bg text-text font-body antialiased selection:bg-primary selection:text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
