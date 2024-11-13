//스케쥴 table 데이터에 맞는 column 키 배열
export const showSchArray: Array<
  | 'customerName'
  | 'customerPhone'
  | 'customerAddr'
  | 'orderProductDetail'
  | 'orderCount'
  | 'orderTotalAmount' // 'orderTotalAmount' 오타 수정
  | 'orderRemarks'
  | 'customerRemarks'
> = [
  'customerName',
  'customerPhone',
  'customerAddr',
  'orderProductDetail',
  'orderCount',
  'orderTotalAmount', // 'orderTotalAmount' 오타 수정
  'orderRemarks',
  'customerRemarks',
];

//스케쥴 header 지정
//특이사항을 합쳐서 비고로 만들어야함
export const schHeaders = {
  timeSlot: 'timeSlot',
  customerName: '고객명',
  customerPhone: '전화번호',
  customerAddr: '주소',
  orderProductDetail: '세탁품목',
  orderCount: '전체대수',
  orderTotalAmount: '가격',
  orderRemarks: '주문 특이사항',
  customerRemarks: '고객 특이사항',
};
