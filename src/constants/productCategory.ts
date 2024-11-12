import { airConditionerCategory, washingMachineCategory } from './textType';

type Product = {
  category?: airConditionerCategory | washingMachineCategory;
};

type ProductCategory = {
  product: '에어컨' | '세탁기';
  categories: Product[];
};

type ProductCategoryProps = {
  airConditioner: ProductCategory;
  washingMachine: ProductCategory;
};

export const productCategories: ProductCategoryProps = {
  airConditioner: {
    product: '에어컨',
    categories: [
      {
        category: '벽걸이',
      },
      {
        category: '원웨이',
      },
      {
        category: '포웨이',
      },
      {
        category: '스탠드',
      },
      {
        category: '투인원',
      },
      {
        category: '원형 360',
      },
      {
        category: '파세코 창문형',
      },
      {
        category: '사각 덕트',
      },
      {
        category: '원형 덕트',
      },
      {
        category: '메인 덕트',
      },
      {
        category: '일반 실외기',
      },
      {
        category: '대형 실외기',
      },
      {
        category: '기타',
      },
    ],
  },
  washingMachine: {
    product: '세탁기',
    categories: [
      {
        category: '통돌이 5~17kg',
      },
      {
        category: '통돌이 18~20kg',
      },
      {
        category: '통돌이 21kg~',
      },
      {
        category: '드럼 7~17kg',
      },
      {
        category: '드럼 18~20kg',
      },
      {
        category: '드럼 21kg~',
      },
      {
        category: '드럼 빌트인',
      },
      {
        category: '건조기',
      },
      {
        category: '트윈워시',
      },
      {
        category: '통돌이형 아기사랑 세탁기',
      },
      {
        category: '드럼형 아기사랑 세탁기',
      },
      {
        category: '기타',
      },
    ],
  },
};
