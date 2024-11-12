type SalesDetailsMenuType =
  | '세척품목'
  | '세척대수'
  | '세척방식'
  | '할인여부'
  | '세척금액'
  | '특이사항';

type WashType = '종합세척' | '일반세척';
type Discount = '할인적용';

export type airConditionerCategory =
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
export type washingMachineCategory =
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

// 텍스트 전체
export type TextType =
  | SalesDetailsMenuType
  | WashType
  | Discount
  | airConditionerCategory
  | washingMachineCategory;

// 체크 박스에서만
export type CheckboxTextType = WashType | Discount;
