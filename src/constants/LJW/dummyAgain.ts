import { Engineer, Order } from '../types/type';
import { SchShowDisplay } from './ShowSchTypes';

//스케쥴조회 더미데이터
export const dummyEngineers: Engineer[] = [
  {
    engineerId: 1,
    engineerName: '김철수',
    engineerPhone: '010-1234-5678',
    engineerAddr: '서울특별시 강남구',
    engineerRemark: '에어컨 전문',
    engineerCommission: 10,
    engineerDayoff: '토요일,일요일', // 주말 휴무
    engineerHoliday: ['2024-11-15'], // 특정 날짜 휴무
    engineerPayday: '금요일',
    engineerSkills: [
      { skillId: 1, skillType: '에어컨' },
      { skillId: 2, skillType: '냉장고' },
    ],
  },
  {
    engineerId: 2,
    engineerName: '이영희',
    engineerPhone: '010-5678-1234',
    engineerAddr: '부산광역시 해운대구',
    engineerRemark: '난방기기 설치 전문가',
    engineerCommission: 15,
    engineerDayoff: '월요일', // 월요일 휴무
    engineerHoliday: ['2024-11-16'], // 특정 날짜 휴무
    engineerPayday: '월요일',
    engineerSkills: [
      { skillId: 3, skillType: '히터' },
      { skillId: 4, skillType: '온수기' },
    ],
  },
  {
    engineerId: 3,
    engineerName: '박민수',
    engineerPhone: '010-9876-5432',
    engineerAddr: '대구광역시 중구',
    engineerRemark: '가전 수리 전문가',
    engineerCommission: 12,
    engineerDayoff: '수요일', // 수요일 휴무
    engineerHoliday: ['2024-11-10'], // 특정 날짜 휴무
    engineerPayday: '목요일',
    engineerSkills: [
      { skillId: 5, skillType: '세탁기' },
      { skillId: 6, skillType: '청소기' },
    ],
  },
];

export const dummyOrders: Order[] = [
  {
    orderId: 1,
    orderCategory: '수리',
    orderDate: '2024-11-01',
    orderProduct: '에어컨',
    orderAmount: 1,
    orderTotalAmount: 50000,
    orderCount: 1,
    orderIsDiscount: false,
    orderPayment: '카드',
    orderReceiptDocs: 'receipt_0001.pdf',
    receiptDocsIssued: true,
    depositPayed: true,
  },
  {
    orderId: 2,
    orderCategory: '설치',
    orderDate: '2024-11-05',
    orderProduct: '히터',
    orderAmount: 1,
    orderTotalAmount: 70000,
    orderCount: 1,
    orderIsDiscount: true,
    orderDiscountRatio: 0.1,
    orderRemark: '긴급 설치 요청',
    orderDeposit: 20000,
    depositPayed: true,
    orderPayment: '현금',
    orderReceiptDocs: 'receipt_0002.pdf',
    receiptDocsIssued: false,
  },
  {
    orderId: 3,
    orderCategory: '수리',
    orderDate: '2024-11-10',
    orderProduct: '세탁기',
    orderAmount: 1,
    orderTotalAmount: 60000,
    orderCount: 1,
    orderIsDiscount: false,
    orderPayment: '카드',
    orderReceiptDocs: 'receipt_0003.pdf',
    receiptDocsIssued: true,
    depositPayed: false,
  },
];

export const dummyScheduleDisplays: SchShowDisplay[] = [
  {
    orderId: 1,
    engineerId: 1,
    customerId: 1,
    orderDate: '2024-11-14',
    orderTimeslot: '08:00 ~ 09:00',
    engineerName: '김철수',
    customerName: '홍길동',
    customerAddr: '서울특별시 종로구',
    customerPhone: '010-1111-2222',
    orderProduct: '에어컨',
    orderProductDetail: '삼성 벽걸이형',
    orderCount: 1,
    orderTotalAmount: 50000,
    orderRemarks: '소음 문제',
    customerRemarks: '빠른 수리 요청',
  },
  {
    orderId: 2,
    engineerId: 2,
    customerId: 2,
    orderDate: '2024-11-14',
    orderTimeslot: '10:00 ~ 11:00',
    engineerName: '이영희',
    customerName: '이민호',
    customerAddr: '부산광역시 수영구',
    customerPhone: '010-3333-4444',
    orderProduct: '히터',
    orderProductDetail: '대우 원형',
    orderCount: 1,
    orderTotalAmount: 70000,
    orderRemarks: '벽 설치 필요',
    customerRemarks: '주말에 설치 요청',
  },
  {
    orderId: 3,
    engineerId: 3,
    customerId: 3,
    orderDate: '2024-11-15',
    orderTimeslot: '13:00 ~ 14:00',
    engineerName: '박민수',
    customerName: '최수지',
    customerAddr: '대구광역시 서구',
    customerPhone: '010-5555-6666',
    orderProduct: '세탁기',
    orderProductDetail: 'LG 드럼 세탁기',
    orderCount: 1,
    orderTotalAmount: 60000,
    orderRemarks: '부품 교체 필요',
    customerRemarks: '오후 시간대 수리 요청',
  },
];
