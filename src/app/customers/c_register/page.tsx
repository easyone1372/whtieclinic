'use client';

import ShaFormTemplate from '@/components/organism/Template/ShaFormTemplate';
import { OrderFormValues, ShaOrderFormData } from '@/data/ShaOrderFormData';
import { orderApi } from '@/service/Order/Order';

const Page = () => {
  return (
    <div>
      <ShaFormTemplate<OrderFormValues>
        title="세척 정보 등록"
        initialValues={{
          orderCategory: '',
          orderProduct: '',
          orderTotalAmount: 0,
          orderCount: 1,
          orderIsDiscount: false,
          orderDiscountRatio: 0,
          orderRemark: '',
        }}
        onSubmit={orderApi.register}
        formDataGenerator={ShaOrderFormData}
        
      />
    </div>
  );
};

export default Page;
