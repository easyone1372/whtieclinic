'use client';

import ShaButton from '@/components/atom/Button/ShaButton';
import { cn } from '@/lib/utils';
import api from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const LoginBtn = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  // 토큰 확인
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token); // 토큰이 존재하면 true, 없으면 false
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

  return (
    <div className="flex flex-row space-x-2 absolute top-4 right-4">
      <ShaButton
        text={isLoggedIn ? '로그아웃' : '로그인'}
        variant={isLoggedIn ? 'secondary' : 'default'}
        size="lg"
        onClick={handleLoginClick}
        className="px-4 py-2"
      />
      {!isLoggedIn && (
        <ShaButton
          text="회원가입"
          variant="outline"
          size="lg"
          onClick={handleRegisterClick}
          className="px-4 py-2"
        />
      )}
    </div>
  );
};

export default LoginBtn;
