'use client';
import { Instrument_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import './globals.css';
const Instrument = Instrument_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);
  return (
    <html lang="en">
      <body className={`${Instrument.className} antialiased`}>{children}</body>
    </html>
  );
}
