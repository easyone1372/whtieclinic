'use client';

import { useEffect, useState } from 'react';
import ShaFormTemplate from '@/components/organism/Template/ShaFormTemplate';
import ShaOrderFormData, { OrderFormValues } from '@/data/ShaCustomerForm';
import api from '@/utils/axios';
import { useRouter } from 'next/navigation';
import orderApi from '@/service/Order/Order';

interface Customer {
  orderId: number;
  orderDate: string;
  customerName: string;
  customerPhone: string;
  customerAddr: string;
  customerRemark: string | null;
  engineerName: string;
  orderProduct: string;
  orderPayment: string;
  orderReceiptDocs: string;
  receiptDocsIssued: boolean;
}

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

const customerToFormValues = (customer: Customer): OrderFormValues => ({
  ...initialValues,
  orderDate: customer.orderDate,
  orderEngineerName: customer.engineerName,
  orderCustomerName: customer.customerName,
  orderCustomerPhone: customer.customerPhone,
  orderCustomerAddr: customer.customerAddr,
  orderCustomerRemark: customer.customerRemark || '',
  orderProduct: customer.orderProduct,
  orderPayment: customer.orderPayment,
  orderReceiptDocs: customer.orderReceiptDocs,
  receiptDocsIssued: customer.receiptDocsIssued,
});

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

export function CustomerManagement({ params }: { params: { orderId: string } }) {
  const router = useRouter();
  const [customerData, setCustomerData] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await api.get<Customer>(`/order-management/orders/${params.orderId}`);
        setCustomerData(response.data);
      } catch (error) {
        router.push('/customer');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerData();
  }, [params.orderId, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!customerData) {
    return <div>고객 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <ShaFormTemplate<OrderFormValues>
      title=""
      initialValues={customerToFormValues(customerData)}
      onSubmit={async (values) => {
        await orderApi.modify(Number(params.orderId), values);
        router.push('/customer');
      }}
      formDataGenerator={ShaOrderFormData}
      validationRules={validationRules}
    />
  );
}
