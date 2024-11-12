export type CustomerProps = {
  name: string;
  tel: string;
  address: string;
  bookingDate: string;
  info: string;
  engineer: string;
  cleaning: '세탁기' | '에어컨';
  bill: boolean;
};

export type CustomerType = {
  [key: string]: CustomerProps;
};

export const CustomerInfo: CustomerType = {
  customer1: {
    name: '임지현',
    tel: '010-1111-1111',
    address: '김포시 김포한강1로 123번길 123, 고급아파트 101동 101호',
    info: '숨고페이',
    bookingDate: '2023-10-03',
    engineer: '홍길동',
    cleaning: '에어컨',
    bill: true,
  },
  customer2: {
    name: '박서준',
    tel: '010-2222-2222',
    address: '서울시 강남구 테헤란로 456, 스카이빌딩 2304호',
    info: '카카오페이',
    bookingDate: '2023-10-03',
    engineer: '김철수',
    cleaning: '세탁기',
    bill: false,
  },
  customer3: {
    name: '김미나',
    tel: '010-3333-3333',
    address: '부산시 해운대구 마린시티2로 789, 마린파크 505동 1502호',
    info: '네이버페이',
    bookingDate: '2023-10-04',
    engineer: '이영희',
    cleaning: '에어컨',
    bill: true,
  },
  customer4: {
    name: '이준호',
    tel: '010-4444-4444',
    address: '대구시 수성구 들안로 234, 그린파크 301동 704호',
    info: '토스',
    bookingDate: '2023-10-05',
    engineer: '박지성',
    cleaning: '세탁기',
    bill: false,
  },
  customer5: {
    name: '정은지',
    tel: '010-5555-5555',
    address: '인천시 연수구 컨벤시아대로 345, 송도파크뷰 123동 2201호',
    info: '페이코',
    bookingDate: '2023-10-06',
    engineer: '최민수',
    cleaning: '에어컨',
    bill: true,
  },
  customer6: {
    name: '최동욱',
    tel: '010-6666-6666',
    address: '광주시 서구 상무중앙로 567, 펠리시티 1차 1805호',
    info: '삼성페이',
    bookingDate: '2023-10-07',
    engineer: '강다솜',
    cleaning: '세탁기',
    bill: true,
  },
  customer7: {
    name: '한소희',
    tel: '010-7777-7777',
    address: '대전시 유성구 대학로 789, 유니버시아 410동 903호',
    info: '애플페이',
    bookingDate: '2023-10-08',
    engineer: '서민재',
    cleaning: '에어컨',
    bill: false,
  },
  customer8: {
    name: '강민석',
    tel: '010-8888-8888',
    address: '울산시 남구 삼산로 135, 그린코아 더베스트 2차 3302호',
    info: '제로페이',
    bookingDate: '2023-10-09',
    engineer: '임수진',
    cleaning: '세탁기',
    bill: true,
  },
};
