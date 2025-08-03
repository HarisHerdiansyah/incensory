import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ToastContainer, Bounce } from 'react-toastify';
import AuthProvider from '@/components/AuthProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Incensory',
  description: 'Inovasi Alat Terapi Multisensori Berbasis Kombinasi Parfum Kemenyan dan Virtual Reality Phone sebagai Mengatasi Fobia Spesifik',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          {children}
          <ToastContainer
            position='top-right'
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
            transition={Bounce}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
