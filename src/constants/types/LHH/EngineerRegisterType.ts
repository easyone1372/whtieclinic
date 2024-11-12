export type EngineerForm = {
  engineerId?: number; // serial primary key from engineer table
  name: string; // from engineer table
  phoneNumber: string; // from engineer table
  residenceArea: string; // matches location in engineer table
  skills: string[]; // from engineer_skill junction table
  skillRemark: string; // from engineer_skill_remark table
  remark: string; // from engineer table
  commissionRate: RateEnum; // from engineer_commission_rates table
  payDay: DayNameEnum; // from engineer_payday table
  holidays: Date[]; // from holiday table
  regularHolidays: DayNameEnum[]; // from dayoff table
};

// 기본 Enum 타입들
export type DayNameEnum =
  | '월요일'
  | '화요일'
  | '수요일'
  | '목요일'
  | '금요일'
  | '토요일'
  | '일요일';
export type RateEnum = '50%' | '55%' | '60%' | '65%' | '70%' | '75%' | '80%';

// 엔지니어 기본 정보 타입
export type Engineer = {
  engineerId?: number;
  name: string;
  phoneNumber: string;
  location: string;
  remark?: string;
};

// 가능 품목 관련 타입
export type EngineerSkill = {
  engineerId?: number;
  skills: string[];
  skillRemark?: string;
};

// 휴무 관련 타입
export type EngineerHoliday = {
  engineerId?: number;
  regularHolidays: DayNameEnum[]; // 정기 휴무
  specialHolidays: Date[]; // 휴무 등록
};

// 수당 및 급여 관련 타입
export type EngineerPayment = {
  engineerId?: number;
  commissionRate: RateEnum;
  paymentDay: DayNameEnum;
};

export type EngineerFormValues = {
  engineerId?: number;
  name: string;
  phoneNumber: string;
  residenceArea: string;
  Items: string[];
  ItemsSpecialNotes: string;
  specialNotes: string;
  allowanceRate: RateEnum;
  paymentDay: DayNameEnum;
  holidayRegistration: Date[];
  regularHoliday: DayNameEnum[];
};

// API 요청 타입
export type EngineerRegistrationRequest = {
  // 기본 정보
  name: string;
  phoneNumber: string;
  location: string;
  remark?: string;

  // 가능 품목
  skills: string[];
  skillRemark?: string;

  // 수당 및 급여
  commissionRate: RateEnum;
  paymentDay: DayNameEnum;

  // 휴무
  regularHolidays: DayNameEnum[];
  specialHolidays: Date[];
};

// API 응답 타입
export type EngineerRegistrationResponse = {
  engineerId: number;
  message: string;
  // 생성된 관련 데이터의 ID들
  skillIds: number[];
  holidayIds: number[];
  regularHolidayIds: number[];
  commissionRateId: number;
  paymentDayId: number;
};

// 엔지니어 수정 요청 타입
export interface EngineerUpdateRequest extends EngineerRegistrationRequest {
  engineerId: number;
}

// 엔지니어 수정 응답 타입
export type EngineerUpdateResponse = {
  engineerId: number;
  message: string;
  // 수정된 관련 데이터의 ID들
  updatedSkillIds: number[];
  updatedHolidayIds: number[];
  updatedRegularHolidayIds: number[];
  updatedCommissionRateId: number;
  updatedPaymentDayId: number;
};

// 엔지니어 조회 응답 타입
export type EngineerDetailsResponse = {
  // 기본 정보
  engineerId: number;
  name: string;
  phoneNumber: string;
  location: string;
  remark?: string;

  // 가능 품목
  skills: {
    skillId: number;
    skillName: string;
  }[];
  skillRemark?: string;

  // 수당 및 급여
  commissionRate: {
    rateId: number;
    rate: RateEnum;
  };
  paymentDay: {
    dayId: number;
    day: DayNameEnum;
  };

  // 휴무
  regularHolidays: {
    holidayId: number;
    day: DayNameEnum;
  }[];
  specialHolidays: {
    holidayId: number;
    date: Date;
  }[];
};
