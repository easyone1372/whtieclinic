// constants/productCategory.ts
export const productCategories = {
    airConditioner: {
      product: '에어컨',
      details: {
        standardCleaning: {
          name: '표준 세척',
          basePrice: 50000
        },
        deepCleaning: {
          name: '전문 세척',
          basePrice: 70000
        },
        filterCleaning: {
          name: '필터 세척',
          basePrice: 30000
        }
      }
    },
    washingMachine: {
      product: '세탁기',
      details: {
        standardCleaning: {
          name: '일반 세척',
          basePrice: 60000
        },
        tubCleaning: {
          name: '통세척',
          basePrice: 80000
        },
        filterCleaning: {
          name: '필터 세척',
          basePrice: 35000
        }
      }
    }
  } as const;
  
  // 제품 타입 enum
  export type ProductType = keyof typeof productCategories;
  
  // 세부 제품 타입
  export type ProductDetail = {
    [K in ProductType]: {
      name: string;
      details: {
        [D: string]: {
          name: string;
          basePrice: number;
        };
      };
    };
  }[ProductType];
  
  // 카테고리 키 타입
  export type ProductCategoryKey = keyof typeof productCategories;