'use client';
import React, { useState } from 'react';
import ShaSideNav from './ShaSideNav';
import { cn } from '@/lib/utils';
import LoginBtn from '@/components/organism/Login/LoginBtn';

type LayoutWrapperProps = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      <ShaSideNav isExpanded={isExpanded} onToggle={setIsExpanded} />
      <main
        className={cn(
          'flex-1',
          isExpanded ? 'ml-72' : 'ml-16', // 사이드바 상태에 따라 margin 조절
          'transition-all duration-300' // 부드러운 전환 효과
        )}
      >
       
        <div className="w-full h-full max-w-[2400px] mx-auto"> {children}</div>
      </main>
    </div>
  );
};

export default LayoutWrapper;
