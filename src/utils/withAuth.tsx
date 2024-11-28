'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (Component: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();
    const hasRun = useRef(false); // useEffect가 실행되었는지 추적

    useEffect(() => {
      if (hasRun.current) return; // 이미 실행되었다면 실행 중지
      hasRun.current = true; // 첫 번째 실행 시만 동작

      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        alert('로그인이 필요합니다.');
        router.push('/'); // 로그인 페이지로 리다이렉트
      }
    }, [router]);

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
