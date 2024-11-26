// UnifiedSchedulePage.tsx
'use client';

import ShaFormTemplate from '@/components/organism/Template/ShaFormTemplate';
import ShaOrderFormData, { OrderFormValues } from '@/data/ShaCustomerForm';
import orderApi from '@/service/Order/Order';

const OrderForm = () => {
  // 초기값 설정
  const initialValues: OrderFormValues = {
    orderDate: '',
    orderEngineerName: '',
    selectedEngineerId: null,

    orderCustomerName: '',
    orderCustomerPhone: '',
    orderCustomerAddr: '',
    orderCustomerRemark: '',

    orderCategory: '',
    orderProduct: '',
    orderRemark: '',

    orderTotalAmount: 0,
    totalAmount: 0,
    orderCount: 1,
    orderIsDiscount: false,
    orderDiscountRatio: 0,
    orderDeposit: 0,
    depositPayed: false,

    orderPayment: '',
    orderReceiptDocs: '',
    receiptDocsIssued: false,

    engineerInfo: '',
    availableEngineers: [],
  };

  // 유효성 검사 규칙
  const validationRules = [
    (formValues: OrderFormValues) => !!formValues.orderDate,
    (formValues: OrderFormValues) => !!formValues.orderEngineerName,
    (formValues: OrderFormValues) => !!formValues.orderCustomerName,
    (formValues: OrderFormValues) => !!formValues.orderCustomerPhone,
    (formValues: OrderFormValues) => !!formValues.orderCustomerAddr,
    (formValues: OrderFormValues) => !!formValues.orderCategory,
    (formValues: OrderFormValues) => !!formValues.orderProduct,
    (formValues: OrderFormValues) => formValues.orderTotalAmount > 0,
    (formValues: OrderFormValues) => formValues.orderCount > 0,
    (formValues: OrderFormValues) => !!formValues.orderPayment,
    (formValues: OrderFormValues) => !!formValues.orderReceiptDocs,
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <ShaFormTemplate<OrderFormValues>
        title="통합 예약 등록"
        initialValues={initialValues}
        onSubmit={orderApi.register}
        formDataGenerator={ShaOrderFormData}
        validationRules={validationRules}
      />
    </div>
  );
};

export default OrderForm;
