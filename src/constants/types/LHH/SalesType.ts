// 제품 카테고리 타입
export type ProductCategoryKey = 'airConditioner' | 'washingMachine';

// 기본 주문 정보 타입
export interface Order {
  orderId?: number;
  customerId: number;
  productDetailId: number;
  productRemark?: string;
  count: number;
  discountAmount: number;
  totalAmount: number;
  remark?: string;
}

// 제품 상세 정보 타입
export interface ProductDetail {
  productDetailId: number;
  productTypeId: number;
  productId: number;
}

// 세척 폼 데이터 타입
export interface SalesFormData {
  // 기본 필드
  orderId?: number;
  selectedCategory: ProductCategoryKey | '';
  selectedDropdownValue: string;
  itemCount: number;
  discountAmount: number;
  finalPrice: number;
  uniqueDetails: string;
  customProduct: string;

  // 상태 관련 필드
  isDiscountApplied: boolean;
  isFinalPriceManual: boolean;
}

// API 요청 타입
export interface SalesRegistrationRequest {
  productTypeId: number;
  productId: number;
  count: number;
  discountAmount: number;
  totalAmount: number;
  remark?: string;
  customProduct?: string;
}

// API 응답 타입
export interface SalesRegistrationResponse {
  orderId: number;
  productDetailId: number;
  message: string;
}

// 가격 계산 관련 타입
export interface PriceCalculation {
  basePrice: number;
  discountAmount: number;
  finalPrice: number;
  unitPrice: number;
}
