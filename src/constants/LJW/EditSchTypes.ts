import { OrderFormValues } from '@/data/ShaCustomerForm';

export type EditScheduleTypes = {
  orderId: number;
  customerId: number;
  engineerId: number;
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
};

export type EditOrderFormValues = OrderFormValues & {
  orderId: number;
  customerId: number;
  engineerId: number;
};

export const editScheduleValues: EditOrderFormValues = {
  orderId: 0,
  orderDate: '',
  // orderTime: '',
  orderEngineerName: '', //
  selectedEngineerId: null,
  engineerId: 0,

  customerId: 0,
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
  depositPaid: false,

  orderPayment: '',
  orderReceiptDocs: '',
  receiptDocsIssued: false,

  engineerInfo: '',
  availableEngineers: [],
};

export const schInfoToFormValues = (orderData: any): EditOrderFormValues => ({
  ...editScheduleValues,
  orderId: orderData.orderId || 0,
  orderDate: orderData.orderDate || '',
  customerId: orderData.customerId || 0,
  engineerId: orderData.engineerId || 0,
  // orderTime: orderData.orderTime || '',
  orderEngineerName: orderData.engineerName || '', // 엔지니어 이름을 처리
  selectedEngineerId: orderData.selectedEngineerId || null, // 엔지니어 ID 처리
  orderCustomerName: orderData.customerName || '',
  orderCustomerPhone: orderData.customerPhone || '',
  orderCustomerAddr: orderData.customerAddr || '',
  orderCustomerRemark: orderData.customerRemark || '',
  orderProduct: orderData.orderProduct || '',
  orderCount: orderData.orderCount || 0,
  orderTotalAmount: orderData.orderTotalAmount || 0,
  orderRemark: orderData.orderRemark || '',
  orderCategory: orderData.orderCategory || '', // 카테고리 처리
  orderPayment: orderData.orderPayment || '', // 결제 방식 처리
  orderReceiptDocs: orderData.orderReceiptDocs || '', // 영수증 여부 처리
  receiptDocsIssued: orderData.receiptDocsIssued || false, // 영수증 발급 여부 처리
  orderDeposit: orderData.orderDeposit || 0, // 계약금 처리
  depositPaid: orderData.depositPaid || false, // 계약금 지불 여부 처리
  orderDiscountRatio: orderData.orderDiscountRatio || 0, // 할인율 처리
  orderIsDiscount: orderData.orderIsDiscount || false, // 할인 여부 처리
});

export const schValidationRules = [
  (formValues: EditOrderFormValues) => !!formValues.orderDate,
  // (formValues: EditOrderFormValues) => !!formValues.orderTime,
  (formValues: EditOrderFormValues) => !!formValues.orderEngineerName,
  (formValues: EditOrderFormValues) => !!formValues.orderCustomerName,
  (formValues: EditOrderFormValues) => !!formValues.orderCustomerPhone,
  (formValues: EditOrderFormValues) => !!formValues.orderCustomerAddr,
  (formValues: EditOrderFormValues) => !!formValues.orderCategory,
  (formValues: EditOrderFormValues) => !!formValues.orderProduct,
  (formValues: EditOrderFormValues) => formValues.orderTotalAmount > 0,
  (formValues: EditOrderFormValues) => formValues.orderCount > 0,
  (formValues: EditOrderFormValues) => !!formValues.orderPayment,
  (formValues: EditOrderFormValues) => !!formValues.orderReceiptDocs,
];
