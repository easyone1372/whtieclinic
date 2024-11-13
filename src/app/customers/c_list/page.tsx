'use client';

import ATable from '@/components/molecules/Table/ATable';

const headers = {
  reservationDate: '예약일',
  name: '이름',
  phoneNumber: '전화번호',
  address: '주소',
  remark: '특이사항',
  engineer: '담당기사님',
  product: '청소품목',
  paymentMethod: '결제방식',
  receiptDocument: '증빙서류',
  receiptIssued: '영수증 발행여부',
};

const customerData = [
  {
    id: 1,
    bookingDate: '2024-11-15',
    name: '홍길동',
    phone: '01012345678',
    addr: '인천 남동구 장수동 하늘아파트 101동 201호',
    remark: '소음에 민감',
    engineer: '박만수',
    product: '원웨이',
    payment: '숨고페이',
    order_reciept_docs: '현금영수증',
    reciept_docs_issued: 'true',
  },
];

// 데이터에 맞는 열 키 배열
const customerColumns: Array<
  | 'bookingDate'
  | 'name'
  | 'phone'
  | 'addr'
  | 'remark'
  | 'engineer'
  | 'product'
  | 'payment'
  | 'order_reciept_docs'
  | 'reciept_docs_issued'
> = [
  'bookingDate',
  'name',
  'phone',
  'addr',
  'remark',
  'engineer',
  'product',
  'payment',
  'order_reciept_docs',
  'reciept_docs_issued',
];

const Page = () => {
  return (
    <div>
      <ATable
        headers={headers}
        data={customerData}
        columns={customerColumns}
        title="고객 정보 리스트"
      />
    </div>
  );
};

export default Page;
