import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import './globals.css';
const Instrument = Instrument_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Link sharing app',
  description: 'User can share their link and create profile',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Instrument.className} antialiased`}>{children}</body>
    </html>
  );
}
