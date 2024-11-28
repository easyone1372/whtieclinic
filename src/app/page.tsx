'use client';

import * as React from 'react';

import ACalendar from '@/components/atom/Calendar/ACalendar';
import LoginForm from '@/components/organism/Login/LoginForm';
import ShaSalesDashboard from '@/components/organism/MainCalendar/ShaSalesDashBoard';

const Home = () => {
  return (
    <>
      <ShaSalesDashboard></ShaSalesDashboard>
    </>
  );
};

export default Home;
