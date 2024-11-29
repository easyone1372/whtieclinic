'use client';

import { useState, useEffect } from 'react';
import LoginBtn from '@/components/organism/Login/LoginBtn';

const LoginHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="w-full h-16 bg-white flex items-center justify-end px-4 border-b">
      <LoginBtn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </header>
  );
};

export default LoginHeader;
