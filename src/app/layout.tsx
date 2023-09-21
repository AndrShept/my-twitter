import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../components/AuthProvider';
import { Sidebar } from '../components/Sidebar';
import { Widgets } from '@/components/Widgets';
import { ToastProvider } from '@/components/ToastProvider';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default  function RootLayout({
  children
}: {
  children: React.ReactNode;

}) {

  return (
    <html lang='en'>
      <body className={`${inter.className} flex`}>
        <AuthProvider >
          <main className='flex min-h-screen mx-auto '>
            <ToastProvider/>
            <Sidebar/>
            <div className='xl:ml-[370px] md:min-w-[650px] sm:ml-[73px] max-w-2xl '>
            {children}
            </div>
            <Widgets/>
            
            </main>
        </AuthProvider>
      </body>
    </html>
  );
}
