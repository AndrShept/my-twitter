import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../components/AuthProvider';
import { Sidebar } from '../components/Sidebar';
import { Widgets } from '@/components/Widgets';
import { ToastProvider } from '@/components/ToastProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'bloX Welcome',
  // description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${inter.className} overflow-x-hidden overflow-y-scroll flex`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <main className='flex min-h-screen mx-auto   '>
              <Sidebar />
              <Toaster />
              <ToastProvider />
              <div className='min-h-max lg:w-[570px] md:w-[520px]  sm:w-[460px] w-[420px]    xl:ml-[250px] sm:ml-[73px]  ml-[60px]    '>
                {children}
              </div>
              <Widgets />
            </main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
