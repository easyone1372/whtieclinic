'use client';

import * as React from 'react';

import ACalendar from '@/components/atom/Calendar/ACalendar';
import LoginForm from '@/components/organism/Login/LoginForm';
import SalesCalendar from '@/components/atom/Calendar/MainCalendar';
import { sampleSalesData } from '@/constants/MainCalendarSalesData';
import SalesDashboard from '@/components/atom/Calendar/MainCalendar';

const Home = () => {
  // API에서 데이터를 받아올 경우
  // const [salesData, setSalesData] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('/api/sales');
  //     const data = await response.json();
  //     setSalesData(data);
  //   };
  //   fetchData();
  // }, []);
  return (
    <>
      {/* <ACalendar></ACalendar> */}
      <SalesDashboard></SalesDashboard>
    </>
  );
};

export default Home;
