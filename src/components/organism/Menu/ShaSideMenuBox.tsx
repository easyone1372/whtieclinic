'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { sideBarMenuData } from '@/data/ShaSideBarMenuData';
import api from '@/utils/axios'; // axios 인스턴스 가져오기

type ShaSideMenuBoxProps = {
  isCollapsed: boolean;
  className?: string;
};

const ShaSideMenuBox = ({ isCollapsed, className }: ShaSideMenuBoxProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  // 토큰 확인 및 상태 업데이트
  const checkLoginStatus = () => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token); // 토큰이 존재하면 true, 없으면 false
  };

  // 컴포넌트가 로드될 때 로그인 상태 확인
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleLoginClick = () => {
    if (isLoggedIn) {
      handleLogout(); // 로그아웃 실행
    } else {
      router.push('/'); // 로그인 페이지로 이동
    }
  };

  const handleRegisterClick = () => {
    router.push('/regi'); // 회원가입 페이지로 이동
  };

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        // 로그아웃 API 호출
        await api.post('/auth/logout', {
          refresh_token: refreshToken,
        });
      }

      // localStorage에서 모든 토큰 제거
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // 상태 업데이트 및 메인 페이지로 리다이렉트
      setIsLoggedIn(false);
      router.push('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      // 로그아웃 실패 시에도 토큰 삭제 및 리다이렉트 실행
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsLoggedIn(false);
      router.push('/');
    }
  };

  const handleLoginSuccess = (accessToken: string, refreshToken: string) => {
    // 로그인 성공 시 토큰 저장 및 상태 업데이트
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setIsLoggedIn(true); // 로그인 상태 즉시 업데이트
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* 사이드바 메뉴 */}
      <div className="flex-grow py-2 space-y-1">
        {Object.entries(sideBarMenuData).map(([key, menuItem]) => {
          const MenuIcon = menuItem.icon;

          return (
            <div key={key} className="font-pretendard">
              <div
                className={cn(
                  'px-3 py-3',
                  'text-foreground flex items-center',
                  'transition-colors duration-200',
                  'hover:bg-[hsl(var(--sidebar-hover))]',
                  isCollapsed ? 'justify-center' : 'justify-start'
                )}
              >
                <MenuIcon className="h-6 w-6" />
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
                        'flex items-center px-6 py-2.5',
                        'transition-colors duration-200',
                        'hover:bg-[hsl(var(--sidebar-hover))]',
                        'text-[16px] font-medium',
                        isActive
                          ? 'bg-[hsl(var(--sidebar-hover))] text-foreground'
                          : 'text-muted-foreground'
                      )}
                    >
                      <LinkIcon className="h-4 w-4" />
                      <span className="ml-2.5 tracking-wide">{link.name}</span>
                    </Link>
                  );
                })}
            </div>
          );
        })}
      </div>

      {/* 로그인/로그아웃 및 회원가입 버튼 */}
      <div className="pb-4 space-y-2">
        <button
          onClick={handleLoginClick}
          className={cn(
            'w-full text-center py-2 rounded-lg',
            isLoggedIn
              ? 'bg-red-500 text-white hover:bg-red-600' // 로그아웃 스타일
              : 'bg-blue-500 text-white hover:bg-blue-600' // 로그인 스타일
          )}
        >
          {isLoggedIn ? '로그아웃' : '로그인'}
        </button>
        {!isLoggedIn && (
          <button
            onClick={handleRegisterClick}
            className="w-full text-center py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            회원가입
          </button>
        )}
      </div>
    </div>
  );
};

export default ShaSideMenuBox;
