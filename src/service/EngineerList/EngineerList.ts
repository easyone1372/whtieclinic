import { Engineer } from '@/constants/types/type';
import api from '@/utils/axios';
import { format } from 'date-fns';

// 엔지니어 목록을 가져오는 함수
export const fetchEngineers = async (): Promise<Engineer[]> => {
  try {
    const response = await api.get('/engineer/searchAllEngineer'); // api 수정해야됨
    return response.data;
  } catch (error) {
    console.error('Error fetching engineers:', error);
    throw error;
  }
};

// 서버에서 반환되는 데이터 타입 정의
export type EngineerDailyEarning = {
  idx: number;
  dailyIncome: number; // 수익 금액
  date: string; // 날짜 ("2024-11-20 09" 형식)
};

// 달력 이벤트 타입 정의
export type CalendarEventType = {
  title: string; // 달력에 표시할 텍스트 (예: "50,000원")
  start: Date; // 이벤트 시작 날짜
  end: Date; // 이벤트 종료 날짜 (하루 단위라면 start와 같음)
};

// 특정 엔지니어의 일급 데이터를 가져오는 함수
export const fetchEngineerEvents = async (engineerId: number): Promise<EngineerDailyEarning[]> => {
  try {
    const response = await api.post(`/engineer/getEngineerdailySalary${engineerId}`, {});
    return response.data as EngineerDailyEarning[]; // 반환 데이터를 명확히 지정
  } catch (error) {
    console.error(`Error fetching events for engineer ${engineerId}:`, error);
    throw error;
  }
};

// 주급 server로 보내는 함수
export const updateEngineerPayment = async (
  engineerId: number, // engineer_id: int
  week: string, // 몇주차 weekly: string
  amount: number, // 수당금액 weekly_earning: int
  isPaid: boolean // 지급여부 ispaid: boolean
): Promise<void> => {
  try {
    await api.post('/engineer/updatePayment', {
      engineer_id: engineerId,
      week,
      amount,
      is_paid: isPaid,
    });
  } catch (error) {
    console.error('Error updating engineer payment:', error);
    throw error;
  }
};

// 이거 나중에 다시 옮기던가 수정해야됨
export const LABEL_MAP = {
  engineerName: '이름',
  engineerPhone: '전화번호',
  engineerAddr: '주소',
  engineerRemark: '비고',
  engineerSkills: '가능품목',
  engineerCommissionRate: '수당률',
  engineerDayoff: '휴무일',
  engineerHoliday: '휴가일',
  engineerPayday: '지급요일',
} as const;
