'use client';

import SchEdit from '@/components/organism/EditSchedule/SchEdit';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const Page = () => {
  const searchParams = useSearchParams();
  const params = {
    orderId: searchParams.get('orderId') ? Number(searchParams.get('orderId')) : undefined,
    selectDate: searchParams.get('selectDate') || undefined,
    selectTime: searchParams.get('selectTime') || undefined,
    engineerId: searchParams.get('engineerId') ? Number(searchParams.get('engineerId')) : undefined,
  };

  console.log('s_modify: ', params);
  return <SchEdit queryParams={params} />;
};

export default function Wrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}
