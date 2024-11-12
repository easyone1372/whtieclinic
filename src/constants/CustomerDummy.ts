export const customerDummyData = {
  id: 1,
  reservationDateTime: new Date('2024-02-15T14:30:00'),
  name: '홍길동',
  phoneNumber: '010-1234-5678',
  address: '서울시 강남구 테헤란로 123',
  uniqueDetails: '주차장 지하 1층 이용 가능',
  payment: '카드',
  document: '현금영수증',
  published: '발행',
  isDepositPaid: true,
  depositAmount: 50000,
};

export const salesDummyData = {
  id: 1,
  selectedCategory: 'airConditioner' as const,
  selectedDropdownValue: '스탠드형',
  itemCount: 2,
  discountAmount: 10000,
  finalPrice: 190000,
  uniqueDetails: '2층 설치, 사다리 필요',
  customProduct: '',
  isDiscountApplied: true,
  isFinalPriceManual: true,
};
