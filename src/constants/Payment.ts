export const Payment: string[] = ['계좌이체', '카드결제', '숨고페이', '현장현금결제'];

export const PaymentOption = Payment.map((payment) => ({ text: payment, value: payment }));
