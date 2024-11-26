import { Engineer } from '@/constants/types/type';
import api from '@/utils/axios';

// 엔지니어 목록을 가져오는 함수
export const fetchEngineers = async (): Promise<Engineer[]> => {
  try {
    const response = await api.get('/engineer-management/engineers'); // api 수정해야됨
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
    const response = await api.post(
      `/engineer-management/engineers/${engineerId}/daily-salary`,
      {}
    );
    return response.data as EngineerDailyEarning[]; // 반환 데이터를 명확히 지정
  } catch (error) {
    console.error('Error fetching events for engineer ${engineerId}:', error);
    throw error;
  }
};

// 주급 server로 보내는 함수
export const updateEngineerPayment = async (
  engineerId: number,
  weekly: string,
  weeklyEarning: number,
  isPaid: boolean
): Promise<void> => {
  try {
    // weekly 값을 "yyyy년 mm월 n주차" 형식으로 변환
    const transformedWeekly = weekly
      .replace(/-/g, ' ')
      .replace(/^(\d{4}) (\d{2}) (\d)$/, `$1년 $2월 $3주차`);

    // 요청 데이터
    const payload = {
      engineer_id: engineerId,
      weekly: transformedWeekly,
      weekly_earning: weeklyEarning,
      isPaid, // Boolean 값
    };

    console.log('Payload before request:', payload);

    // Axios 요청 보내기
    await api.post(`/engineer-management/engineers/weekly-salaries`, payload);
  } catch (error: any) {
    console.error('Error updating engineer payment:', error.response?.data || error.message);

    // 서버 응답에서 검증 실패 이유 확인
    if (error.response?.data) {
      console.error('Server Validation Errors:', error.response.data);
    }

    throw error;
  }
};

// 아이디랑 주차 server로 보내는 거
export const fetchEngineerWeeklyDetail = async (
  engineerId: number,
  weekly: string
): Promise<{ weeklyEarning: number; isPaid: boolean }> => {
  try {
    const response = await api.post(
      `/engineer-management/engineers/${engineerId}/weekly-salary-details`,
      {
        engineer_id: engineerId,
        weekly,
      }
    );
    return {
      weeklyEarning: response.data.weekly_earning,
      isPaid: response.data.is_paid,
    };
  } catch (error) {
    console.error('Error fetching weekly details:', error);
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
