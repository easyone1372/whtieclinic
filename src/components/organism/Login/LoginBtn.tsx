// LoginBtn.tsx
'use client';
import { useRouter } from 'next/navigation';
import api from '@/utils/axios';
import ShaButton from '@/components/atom/Button/ShaButton';

// Props 타입 정의
interface LoginBtnProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const LoginBtn = ({ isLoggedIn, setIsLoggedIn }: LoginBtnProps) => {
  const router = useRouter();

  const handleLoginClick = async () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      try {
        const response = await api.post('/auth/login', { username: 'user', password: 'password' });
        const { accessToken, refreshToken } = response.data;

        // 토큰 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // 상태 업데이트
        setIsLoggedIn(true);

        // dashboard로 이동
        router.push('/dashboard');
      } catch (error) {
        console.error('로그인 실패:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await api.post('/auth/logout', { refresh_token: refreshToken });
      }

      // 토큰 삭제
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // 상태 업데이트
      setIsLoggedIn(false);

      // 페이지 새로고침 및 메인 페이지 이동
      window.location.href = '/';
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const handleRegisterClick = () => {
    router.push('/regi');
  };

  return (
    <div className="flex flex-row space-x-2 fixed top-4 right-4 z-50">
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
