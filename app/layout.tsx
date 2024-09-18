import Navbar from '@/components/navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI-Powered JP News Comprehension App',
  description: 'Read Japanese news and take AI-generated quizzes to test your comprehension',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}><Navbar />{children}</body>
    </html>
  );
}
