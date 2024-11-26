export type Customer = {
  customerId: number;
  customerName: string;
  customerPhone: string;
  customerAddr: string;
  customerRemark?: string;
};

export type Engineer = {
  engineerId: number;
  engineerName: string;
  engineerPhone: string;
  engineerAddr: string;
  engineerRemark?: string;
  engineerCommissionRate: number;
  engineerDayoff?: string;
  engineerHoliday?: string[]; //1114 배열로 받는거 같아서 [] 붙임.
  engineerPayday: string;
  engineerValidSkill?: string[];
};

export type EngineerModifyType = {
  engineerId: number;
  engineerName: string;
  engineerPhone: string;
  engineerAddr: string;
  engineerRemark?: string;
  engineerCommissionRate: number;
  engineerDayoff?: string;
  engineerHoliday?: string[]; //1114 배열로 받는거 같아서 [] 붙임.
  engineerPayday: string;
  engineerSkills?: string[];
};

export type Order = {
  orderId: number;
  orderCategory: string;
  orderDate: string;
  orderProduct: string;
  orderAmount: number;
  orderTotalAmount: number;
  orderCount: number;
  orderIsDiscount: boolean;
  orderDiscountRatio?: number;
  orderRemark?: string;
  orderDeposit?: number;
  depositPayed: boolean;
  orderPayment: string;
  orderReceiptDocs: string;
  receiptDocsIssued: boolean;
};

export type EngineerDailyEarning = {
  idx: number;
  orderId: number;
  engineerId: number;
  dailyIncome: number;
  date: string;
};

export type Skill = {
  skillId: number;
  skillType: string;
};

export type EngineerSkill = {
  engineerId: number;
  skillId: number;
};

export type CustomerEngineerOrder = {
  idx: number;
  customerId: number;
  orderId: number;
  engineerId: number;
};

export type AdminRefreshToken = {
  idx: number;
  tokenId: number;
  refreshToken: string;
  createdAt: string;
  expiresAt: string;
};

export type AdminAccount = {
  idx: number;
  adminId: string;
  adminPw: string;
  role: string;
  tokenVersion: number;
};
