import { CalendarEventType } from '@/components/atom/Calendar/ACalendar';
import { Engineer } from '@/constants/types/type';
import api from '@/utils/axios';

// 엔지니어 목록을 가져오는 함수
export const fetchEngineers = async (): Promise<Engineer[]> => {
  try {
    const response = await api.get('/api/engineer/searchAllEngineer'); // api 수정해야됨
    return response.data;
  } catch (error) {
    console.error('Error fetching engineers:', error);
    throw error;
  }
};

// 특정 엔지니어의 일급 데이터를 가져오는 함수
export const fetchEngineerEvents = async (engineerId: number): Promise<CalendarEventType[]> => {
  try {
    const response = await api.get(`/api/${engineerId}`); // api 수정해야됨
    return response.data;
  } catch (error) {
    console.error(`Error fetching events for engineer ${engineerId}:`, error);
    throw error;
  }
};

// 이거 나중에 다시 옮기던가 수정해야됨
export const LABEL_MAP = {
  engineerName: '이름',
  engineerPhone: '전화번호',
  engineerAddr: '주소',
  engineerRemark: '비고',
  engineerCommission_rate: '수당률',
  engineerDayoff: '휴무일',
  engineerHoliday: '휴가일',
  engineerPayday: '지급요일',
} as const;
