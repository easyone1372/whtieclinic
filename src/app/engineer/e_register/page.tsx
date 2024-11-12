'use client';

import React from 'react';
import ShaRegister from '@/components/molecules/Engineer/ShaRegister';

const Page = () => {
  const Style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
  };

  return (
    <div style={Style}>
      <ShaRegister />
    </div>
  );
};
export default Page;
