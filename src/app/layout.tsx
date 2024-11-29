import * as React from 'react';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutWrapper from './ui/layoutWrapper';
import { cn } from '@/lib/utils';
import LoginBtn from '@/components/organism/Login/LoginBtn';

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
        {/* 상단 영역 (헤더 역할) */}
        <header className="w-full h-16 bg-white flex items-center justify-end px-4 border-b">
          <LoginBtn />
        </header>

        {/* 메인 콘텐츠 영역 */}
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
