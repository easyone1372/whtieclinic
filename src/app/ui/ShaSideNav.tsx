'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import ShaSideMenuBox from '@/components/organism/Menu/ShaSideMenuBox';
import ShaLogoIcon from '@/components/atom/Icon/ShaLogoIcon';
import { logoData, logoSmData } from '@/constants/logoData';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ShaSideNav = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <nav
      className={cn(
        'fixed left-0 top-0 h-screen bg-[hsl(var(--sidebar-background))]',
        'transition-all duration-300 border-r border-[hsl(var(--sidebar-border))]',
        'font-pretendard', // Pretendard 폰트 적용
        isExpanded ? 'w-72' : 'w-16', // 너비를 좀 더 넓게 (64 -> 72)
        'flex flex-col'
      )}
    >
      {/* 로고 영역 */}
      <div
        className={cn(
          'h-16 border-b border-[hsl(var(--sidebar-border))] flex items-center justify-center',
          'bg-[hsl(var(--sidebar-background))]',
          isExpanded ? 'px-4' : 'px-2'
        )}
      >
        {isExpanded ? (
          <ShaLogoIcon {...logoData} />
        ) : (
          <div className="flex items-center justify-center w-14 h-12">
            <ShaLogoIcon {...logoSmData} className="w-full h-full object-contain" />
          </div>
        )}
      </div>

      {/* 메뉴 영역 */}
      <div className="flex-1 overflow-hidden py-2">
        {' '}
        {/* 상하 여백 추가 */}
        <ShaSideMenuBox
          isCollapsed={!isExpanded}
          className={cn(
            'text-[15px]', // 기본 폰트 크기 증가
            'font-medium' // 살짝 더 굵게
          )}
        />
      </div>

      {/* 토글 버튼 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'absolute -right-4 top-8 h-8 w-8 rounded-full',
          'bg-[hsl(var(--sidebar-background))]',
          'border border-[hsl(var(--sidebar-border))]',
          'hover:bg-[hsl(var(--sidebar-hover))]',
          'focus:outline-none focus:ring-0',
          'shadow-sm' // 살짝 그림자 추가
        )}
      >
        <ChevronRight
          className={cn('h-4 w-4 text-foreground transition-transform', isExpanded && 'rotate-180')}
        />
      </Button>
    </nav>
  );
};

export default ShaSideNav;
