'use client';

import { CustomerManagement } from '@/components/organism/Customer/OrderModify';
import { Suspense } from 'react';
interface PageProps {
  params: {
    orderId: string;
  };
}
const Page = ({ params }: PageProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomerManagement params={params} />
    </Suspense>
  );
};

export default Page;
