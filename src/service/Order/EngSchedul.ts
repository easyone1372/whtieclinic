// engineerScheduler.ts
import { format, isSameDay } from 'date-fns';
import { fetchEngineers } from '../EngineerList/EngineerList';
import api from '@/utils/axios';
import { ko } from 'date-fns/locale';
import axios from 'axios';

// service/EngineerList/EngineerList.ts
export interface Engineer {
  engineerId: number;
  engineerName: string;
  engineerPhone: string;
  engineerAddr: string;
  engineerRemark: string;
  engineerCommissionRate: number;
  engineerDayoff: string;
  engineerHoliday: string[];
  engineerPayday: string;
  engineerSkills: string[];
}

// service/Order/EngSchedul.ts
export interface ScheduleData {
  orderId: number;
  engineerId: number;
  customerId: number;
  orderDate: string;
  engineerName: string;
  customerName: string;
  customerAddr: string;
  customerPhone: string;
  orderProduct: string;
  orderProductDetail: string;
  orderCount: number;
  orderTotalAmount: number;
  orderRemarks: string | null;
  customerRemarks: string | null;
}

export const getAvailableEngineers = async (
  selectedDate: string,
  orderProduct?: string
): Promise<{ value: string; text: string }[]> => {
  try {
    // selectedDate가 "YYYY-MM-DD HH" 형식으로 들어옴
    if (!selectedDate || !selectedDate.match(/^\d{4}-\d{2}-\d{2} \d{2}$/)) {
      console.error('Invalid date format. Expected: YYYY-MM-DD HH');
      return [];
    }

    const [engineerResponse, scheduleResponse] = await Promise.all([
      api.get<Engineer[]>('/engineer-management/engineers'),
      api.get<ScheduleData[]>('/engineer-management/engineers/schedules', {
        params: {
          startDate: selectedDate.split(' ')[0], // YYYY-MM-DD
          selectedDate: selectedDate, // YYYY-MM-DD HH
        },
      }),
    ]);

    const engineers = engineerResponse.data;
    const schedules = scheduleResponse.data;

    // 해당 시간에 이미 예약된 기사 ID들
    const bookedEngineersIds = new Set(
      schedules
        .filter((schedule) => schedule.orderDate === selectedDate)
        .map((schedule) => schedule.engineerId)
    );

    const date = new Date(selectedDate.split(' ')[0]);
    const selectedDay = format(date, 'EEEE', { locale: ko });

    const availableEngineers = engineers.filter((engineer) => {
      // 이미 예약된 기사 제외
      if (bookedEngineersIds.has(engineer.engineerId)) return false;

      // 정기 휴무일 체크
      if (engineer.engineerDayoff) {
        const daysOff = engineer.engineerDayoff.split(/[,\s]+/).map((day) => day.trim());
        if (daysOff.includes(selectedDay)) return false;
      }

      // 휴가일 체크
      if (
        engineer.engineerHoliday?.some((holiday) => {
          try {
            return isSameDay(new Date(holiday), date);
          } catch {
            return false;
          }
        })
      )
        return false;

      // 스킬 체크
      if (orderProduct && !engineer.engineerSkills.includes(orderProduct)) {
        return false;
      }

      return true;
    });

    return availableEngineers.map((engineer) => ({
      value: engineer.engineerId.toString(),
      text: engineer.engineerName,
    }));
  } catch (error) {
    console.error('Error fetching available engineers:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Error details:', {
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    return [];
  }
};

// getEngineerInfo는 현재 상태로 충분히 깔끔합니다.

export const getEngineerInfo = async (engineerId: number) => {
  try {
    const response = await api.get<Engineer[]>('/engineer-management/engineers');
    const engineers = response.data;
    const engineer = engineers.find((eng) => eng.engineerId === engineerId);

    if (!engineer) return null;

    return `이름: ${engineer.engineerName}
           전화번호: ${engineer.engineerPhone}
           주소: ${engineer.engineerAddr}
           특이사항: ${engineer.engineerRemark || '없음'}
           보유 기술: ${engineer.engineerSkills.join(', ') || '없음'}
           휴무일: ${engineer.engineerDayoff || '없음'}`;
  } catch (error) {
    console.error('Error fetching engineer info:', error);
    return null;
  }
};
