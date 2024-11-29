export type EditScheduleTypes = {
  orderId: number;
  customerId: number;
  engineerId: number;
  orderDate: string;
  orderTimeSlot: string;
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

export type EditOrderFormValues = {
  // 예약 정보
  orderId: number;
  orderDate: string;
  orderTime: string;
  orderEngineerName: string;

  // 고객 정보
  orderCustomerName: string;
  orderCustomerPhone: string;
  orderCustomerAddr: string;
  orderCustomerRemark: string;

  // 주문 정보
  orderCategory: string;
  orderProduct: string;
  orderRemark?: string;

  // 금액 정보
  orderTotalAmount: number; // 세척금액
  totalAmount: number; // 총금액 (세척금액 - 계약금 - 할인금액)
  orderCount: number;
  orderIsDiscount: boolean;
  orderDiscountRatio: number;
  orderDeposit: number;
  depositPaid: boolean;

  // 결제 정보
  orderPayment: string;
  orderReceiptDocs: string;
  receiptDocsIssued: boolean;

  // 기사 정보 표시용 (내부용)
  selectedEngineerId: number | null;
  engineerInfo?: string;
  availableEngineers?: { value: string; text: string }[];
};

export const editScheduleValues: EditOrderFormValues = {
  orderId: 0,
  orderDate: '',
  orderTime: '',
  orderEngineerName: '',
  selectedEngineerId: 0,
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
  orderTime: orderData.orderTime || '',
  orderEngineerName: orderData.orderEngineerName || '',
  selectedEngineerId: orderData.selectedEngineerId || 0,
  orderCustomerName: orderData.orderCustomerName || '',
  orderCustomerPhone: orderData.orderCustomerPhone || '',
  orderCustomerAddr: orderData.orderCustomerAddr || '',
  orderCustomerRemark: orderData.orderCustomerRemark || '',
  orderProduct: orderData.orderProduct || '',
  orderCount: orderData.orderCount || 0,
  orderTotalAmount: orderData.orderTotalAmount || 0,
  orderRemark: orderData.orderRemark || '',
});

export const schValidationRules = [
  (formValues: EditOrderFormValues) => !!formValues.orderDate,
  (formValues: EditOrderFormValues) => !!formValues.orderTime,
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
