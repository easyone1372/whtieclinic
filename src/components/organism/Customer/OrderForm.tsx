// UnifiedSchedulePage.tsx
'use client';

import ShaFormTemplate from '@/components/organism/Template/ShaFormTemplate';
import ShaOrderFormData, { OrderFormValues } from '@/data/ShaCustomerForm';
import { orderApi } from '@/service/Order/Order';
import { ScheduleShowApi } from '@/service/Schedule/ScheduleShow';

const UnifiedSchedulePage = () => {
  // 초기값 설정
  const initialValues: OrderFormValues = {
    orderDate: '',
    selectedEngineerId: null,
    customerName: '',
    customerPhone: '',
    customerAddr: '',
    customerRemark: '',
    orderProduct: '',
    orderProductDetail: '',
    orderTotalAmount: 0,
    orderCount: 1,
    orderIsDiscount: false,
    orderDiscountRatio: 0,
    orderRemark: '',
    orderDeposit: 0,
    depositPayed: false,
    orderPayment: '',
    orderRecieptDocs: '',
    recieptDocsIssued: false,
    engineerInfo: '',
  };

  // 유효성 검사 규칙
  const validationRules = [
    (formValues: OrderFormValues) => !!formValues.orderDate,
    (formValues: OrderFormValues) => !!formValues.selectedEngineerId,
    (formValues: OrderFormValues) => !!formValues.customerName,
    (formValues: OrderFormValues) => !!formValues.customerPhone,
    (formValues: OrderFormValues) => !!formValues.customerAddr,
    (formValues: OrderFormValues) => !!formValues.orderProduct,
    (formValues: OrderFormValues) => formValues.orderTotalAmount > 0,
    (formValues: OrderFormValues) => formValues.orderCount > 0,
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* <ShaFormTemplate<OrderFormValues>
        title="통합 예약 등록"
        initialValues={initialValues}
        onSubmit={ScheduleShowApi.schshow}
        formDataGenerator={ShaOrderFormData}
        validationRules={validationRules}
      /> */}
    </div>
  );
};

export default UnifiedSchedulePage;