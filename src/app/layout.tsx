import * as React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutWrapper from './ui/layoutWrapper';
import { cn } from '@/lib/utils';
import LoginHeader from '@/components/organism/Login/LoginHeader';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'White Clinic',
  description: 'White Clinic Management Program',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(inter.className, 'min-h-screen antialiased', 'bg-background text-foreground')}
      >
       
        <LoginHeader />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
