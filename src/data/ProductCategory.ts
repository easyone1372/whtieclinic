// 카테고리 타입 정의
export type AirConditionerCategory =
  | '벽걸이'
  | '원웨이'
  | '포웨이'
  | '스탠드'
  | '투인원'
  | '원형 360'
  | '파세코 창문형'
  | '사각 덕트'
  | '원형 덕트'
  | '메인 덕트'
  | '일반 실외기'
  | '대형 실외기'
  | '기타';

export type WashingMachineCategory =
  | '통돌이 5~17kg'
  | '통돌이 18~20kg'
  | '통돌이 21kg~'
  | '드럼 7~17kg'
  | '드럼 18~20kg'
  | '드럼 21kg~'
  | '드럼 빌트인'
  | '건조기'
  | '트윈워시'
  | '통돌이형 아기사랑 세탁기'
  | '드럼형 아기사랑 세탁기'
  | '기타';

// 제품 타입
export type ProductType = '에어컨' | '세탁기';

type ProductCategory = {
  product: ProductType;
  categories: { category: AirConditionerCategory | WashingMachineCategory }[]; // Product[] 대신 인라인으로 타입 정의
};

export const productCategories: Record<'airConditioner' | 'washingMachine', ProductCategory> = {
  // ProductCategoryProps 대신 Record 사용
  airConditioner: {
    product: '에어컨',
    categories: [
      { category: '벽걸이' },
      { category: '원웨이' },
      { category: '포웨이' },
      { category: '스탠드' },
      { category: '투인원' },
      { category: '원형 360' },
      { category: '파세코 창문형' },
      { category: '사각 덕트' },
      { category: '원형 덕트' },
      { category: '메인 덕트' },
      { category: '일반 실외기' },
      { category: '대형 실외기' },
      { category: '기타' },
    ],
  },
  washingMachine: {
    product: '세탁기',
    categories: [
      { category: '통돌이 5~17kg' },
      { category: '통돌이 18~20kg' },
      { category: '통돌이 21kg~' },
      { category: '드럼 7~17kg' },
      { category: '드럼 18~20kg' },
      { category: '드럼 21kg~' },
      { category: '드럼 빌트인' },
      { category: '건조기' },
      { category: '트윈워시' },
      { category: '통돌이형 아기사랑 세탁기' },
      { category: '드럼형 아기사랑 세탁기' },
      { category: '기타' },
    ],
  },
};
