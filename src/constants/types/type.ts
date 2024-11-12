// customer 테이블 타입
export type Customer = {
  customer_id: number;
  customer_name: string;
  customer_phone: string;
  customer_addr: string;
  customer_remark?: string;
};

// engineer 테이블 타입
export type Engineer = {
  engineer_id: number;
  engineer_name: string;
  engineer_phone: string;
  engineer_addr: string;
  engineer_remark?: string;
  engineer_commission: number;
  engineer_dayoff?: string;
  engineer_holiday?: string;
  engineer_payday?: string;
};

// order 테이블 타입
export type Order = {
  order_id: number;
  order_category: string;
  order_date: string;
  order_product: string;
  order_total_amount: number;
  order_count: number;
  order_isDiscount: boolean;
  order_discount_ratio: number;
  order_remark?: string;
  order_deposit: number;
  deposit_payed: boolean;
  order_payment: string;
  order_reciept_docs?: string;
  reciept_docs_issued: boolean;
};

// engineer_daily_earning 테이블 타입
export type EngineerDailyEarning = {
  idx: number;
  order_id: number;
  engineer_id: number;
  daily_income: number;
  date: string;
};

// skills 테이블 타입
export type Skill = {
  skill_id: number;
  skill_type: string;
};

// engineer_skill 테이블 타입 (Many-to-Many 관계)
export type EngineerSkill = {
  engineer_id: number;
  skill_id: number;
};

// customer_engineer_order 테이블 타입 (중간 테이블)
export type CustomerEngineerOrder = {
  idx: number;
  customer_id: number;
  order_id: number;
  engineer_id: number;
};

// admin_refresh_tokens 테이블 타입
export type AdminRefreshToken = {
  idx: number;
  token_id: number;
  refresh_token: string;
  created_at: string;
  expires_at: string;
};

// admin_account 테이블 타입
export type AdminAccount = {
  idx: number;
  admin_id: string;
  admin_pw: string;
  role: string;
  token_version: number;
};


