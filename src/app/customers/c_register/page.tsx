'use client';

import UnifiedSchedulePage from '@/components/organism/Customer/OrderForm';
import ShaFormTemplate from '@/components/organism/Template/ShaFormTemplate';
import { OrderFormValues, ShaOrderFormData } from '@/data/ShaOrderFormData';
import { orderApi } from '@/service/Order/Order';

const Page = () => {
  return (
    <div>
      <UnifiedSchedulePage></UnifiedSchedulePage>
    </div>
  );
};

export default Page;
