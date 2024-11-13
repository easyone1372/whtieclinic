// customer 테이블 타입
export type Customer = {
  customerId: number;
  customerName: string;
  customerPhone: string;
  customerAddr: string;
  customerRemark?: string;
};

// engineer 테이블 타입
export type Engineer = {
  engineerId: number;
  engineerName: string;
  engineerPhone: string;
  engineerAddr: string;
  engineerRemark?: string;
  engineerCommission: number;
  engineerDayoff?: string;
  engineerHoliday?: string;
  engineerPayday?: string;
};

// order 테이블 타입
export type Order = {
  orderId: number;
  orderCategory: string;
  orderDate: string;
  orderProduct: string;
  orderTotalAmount: number;
  orderCount: number;
  orderIsDiscount: boolean;
  orderDiscountRatio: number;
  orderRemark?: string;
  orderDeposit: number;
  depositPayed: boolean;
  orderPayment: string;
  orderRecieptDocs?: string;
  recieptDocsIssued: boolean;
};

// engineerDailyEarning 테이블 타입
export type EngineerDailyEarning = {
  idx: number;
  orderId: number;
  engineerId: number;
  dailyIncome: number;
  date: string;
};

// skills 테이블 타입
export type Skill = {
  skillId: number;
  skillType: string;
};

// engineerSkill 테이블 타입 (Many-to-Many 관계)
export type EngineerSkill = {
  engineerId: number;
  skillId: number;
};

// customerEngineerOrder 테이블 타입 (중간 테이블)
export type CustomerEngineerOrder = {
  idx: number;
  customerId: number;
  orderId: number;
  engineerId: number;
};

// adminRefreshTokens 테이블 타입
export type AdminRefreshToken = {
  idx: number;
  tokenId: number;
  refreshToken: string;
  createdAt: string;
  expiresAt: string;
};

// adminAccount 테이블 타입
export type AdminAccount = {
  idx: number;
  adminId: string;
  adminPw: string;
  role: string;
  tokenVersion: number;
};
