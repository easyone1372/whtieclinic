// 기본 엔지니어 타입
export type Engineer = {
  engineer_id: number;
  name: string;
  phone_number: string;
  location: string;
  remark?: string;
  skills: Skill[];
  dayoffs: Dayoff[];
  holidays?: Holiday[];
  commission_rate: EngineerCommissionRate;
  daily_earnings: EngineerDailyEarning[];
  weekly_earnings: EngineerWeeklyEarning[];
  is_paid: boolean;
};

// 스킬 관련 타입
export type Skill = {
  skill_id: number;
  skill: string;
};

export type EngineerSkill = {
  engineer_id: number;
  skill_id: number;
};

export type EngineerSkillRemark = {
  engineer_skill_remark_id: number;
  engineer_id: number;
  skill_remark: string;
};

// 휴무 관련 타입
export type Dayoff = {
  engineer_id: number;
  weekday_id: number;
};

export type Holiday = {
  holiday_id: number;
  engineer_id: number;
  holiday: Date;
};

// 급여 관련 타입
export type EngineerPayday = {
  engineer_id: number;
  weekday_id: number;
  is_pay: boolean;
};

export type EngineerDailyEarning = {
  engineer_dailyearning_id: number;
  engineer_id: number;
  date: Date;
  daily_amount: number;
};

export type EngineerWeeklyEarning = {
  engineer_id: number;
  calendar_id: number;
  total_weekly_amount: number;
};

// 수당률 관련 타입
export type CommissionRate = {
  commission_rate_id: number;
  rate: '50%' | '55%' | '60%' | '65%' | '70%' | '75%' | '80%';
};

export type EngineerCommissionRate = {
  engineer_id: number;
  commission_rate_id: number;
};

// API 응답 타입
export type ApiResponse = {
  engineer: {
    id: number;
    name: string;
    phoneNumber: string;
    location: string;
    remark?: string;
  }[];
  EngineerCommissionRates: {
    id: number;
    engineerId: number;
    rateId: number;
  }[];
  engineerPay: {
    id: number;
    engineerId: number;
    date: string;
    daily_amount: number;
  }[];
  engineerPayDay: {
    id: number;
    engineerId: number;
    weekdays: string;
    is_pay: boolean;
  }[];
};

// UI 컴포넌트 타입
export type FooterItem = {
  label: string;
  value: string | number | boolean;
  renderValue?: (value: string | number | boolean) => React.ReactNode;
  isEditable?: boolean;
  onValueChange?: (value: string) => void;
};

export type FooterProps = {
  data: FooterItem[];
  isEditing: boolean;
};

export type FilterProps = {
  data: [string, Engineer][];
  filter: string;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onItemClick: (item: [string, Engineer]) => void;
};

export type WorkerDrawerProps = {
  engineers: Engineer[];
  onEngineerSelect: (engineer: Engineer) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

