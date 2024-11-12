'use client';

import React from 'react';
import ShaSideNav from './ShaSideNav';
import { cn } from '@/lib/utils';

type LayoutWrapperProps = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      <ShaSideNav />
      <main 
        className={cn(
          'flex-1',
          'ml-72', // 사이드바 너비와 맞춤
          'p-8',
          'transition-all duration-300'
        )}
      >
        {/* 여기 사이드바제외 컨텐츠들 가운데정렬하게끔  */}
        <div className="w-full h-full max-w-[2400px] mx-auto">   
          {children}
        </div>
      </main>
    </div>
  );
};

export default LayoutWrapper;