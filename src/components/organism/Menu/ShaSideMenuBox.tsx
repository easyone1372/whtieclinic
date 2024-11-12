'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { sideBarMenuData } from '@/constants/ShaSideBarMenuData';

type ShaSideMenuBoxProps = {
  isCollapsed: boolean;
  className?: string; // className prop 추가
};

const ShaSideMenuBox = ({ isCollapsed, className }: ShaSideMenuBoxProps) => {
  const pathname = usePathname();

  return (
    <div className={cn('py-2 space-y-1', className)}>
      {' '}
      {/* className 적용 */}
      {Object.entries(sideBarMenuData).map(([key, menuItem]) => {
        const MenuIcon = menuItem.icon;

        return (
          <div key={key} className="font-pretendard">
            {' '}
            {/* Pretendard 폰트 적용 */}
            <div
              className={cn(
                'px-3 py-3', // padding 살짝 증가
                'text-foreground flex items-center',
                'transition-colors duration-200',
                'hover:bg-[hsl(var(--sidebar-hover))]',
                isCollapsed ? 'justify-center' : 'justify-start'
              )}
            >
              <MenuIcon className="h-6 w-6" /> {/* 아이콘 크기 조정 */}
              {!isCollapsed && (
                <span className="ml-3 text-[19px] font-semibold tracking-wide">
                  {menuItem.title}
                </span>
              )}
            </div>
            {!isCollapsed &&
              menuItem.links.map((link, index) => {
                const LinkIcon = link.icon;
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={index}
                    href={link.href}
                    className={cn(
                      'flex items-center px-6 py-2.5', // padding 조정
                      'transition-colors duration-200',
                      'hover:bg-[hsl(var(--sidebar-hover))]',
                      'text-[16px] font-medium', // 폰트 크기와 굵기 조정
                      isActive
                        ? 'bg-[hsl(var(--sidebar-hover))] text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    <LinkIcon className="h-4 w-4" /> {/* 서브메뉴 아이콘 크기 조정 */}
                    <span className="ml-2.5 tracking-wide">{link.name}</span>
                  </Link>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default ShaSideMenuBox;
