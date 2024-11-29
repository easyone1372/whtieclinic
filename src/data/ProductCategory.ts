// types/product.ts

// 제품 카테고리 타입 정의
export type ProductCategory = '에어컨' | '세탁기';

// 상세 제품 타입 정의
export type ProductDetail = {
  category: string; // 스킬과 직접 매칭을 위해 string으로 변경
};

// 제품 정보 타입 정의
export type Product = {
  product: ProductCategory;
  categories: ProductDetail[];
};

// 제품 데이터
export const productCategories: Record<ProductCategory, Product> = {
  에어컨: {
    product: '에어컨',
    categories: [
      { category: '벽걸이' },
      { category: '원웨이' },
      { category: '스탠드' },
      { category: '포웨이' },
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
  세탁기: {
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

// 필요한 경우 상세 카테고리 배열로도 접근 가능
export const airConditionerCategories = productCategories.에어컨.categories.map((c) => c.category);
export const washingMachineCategories = productCategories.세탁기.categories.map((c) => c.category);

// 엔지니어 스킬과 매칭을 위한 헬퍼 함수
export const isValidSkill = (category: string, skills: string[]): boolean => {
  return skills.includes(category);
};
