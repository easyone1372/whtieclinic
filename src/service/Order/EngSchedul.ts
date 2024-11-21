// engineerScheduler.ts
import { format, isSameDay } from 'date-fns';
import { fetchEngineers } from '../EngineerList/EngineerList';
import api from '@/utils/axios';
import { ko } from 'date-fns/locale';

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
    // searchAllEngineer API 호출
    const engineerResponse = await api.get<Engineer[]>('/engineer/searchAllEngineer');
    const engineers = engineerResponse.data;

    // getAllEngineerSchedule API 호출
    const scheduleResponse = await api.get<ScheduleData[]>('/engineer/getAllEngineerSchedule', {
      params: {
        selectedDate: selectedDate.split(' ')[0],
      },
    });
    const schedules = scheduleResponse.data;

    const selectedHour = selectedDate.split(' ')[1];
    const bookedEngineersIds = schedules
      .filter((schedule) => schedule.orderDate.split(' ')[1] === selectedHour)
      .map((schedule) => schedule.engineerId);

    const availableEngineers = engineers.filter((engineer) => {
      if (bookedEngineersIds.includes(engineer.engineerId)) {
        return false;
      }

      try {
        const dateOnly = selectedDate.split(' ')[0];
        const [year, month, day] = dateOnly.split('-').map(Number);
        const date = new Date(year, month - 1, day);

        // 정기 휴무일 체크
        const selectedDay = format(date, 'EEEE', { locale: ko });
        if (engineer.engineerDayoff) {
          const daysOff = engineer.engineerDayoff.split(/[,\s]+/).map((day) => day.trim());
          if (daysOff.includes(selectedDay)) {
            return false;
          }
        }

        // 휴가일 체크
        if (engineer.engineerHoliday && Array.isArray(engineer.engineerHoliday)) {
          const hasHoliday = engineer.engineerHoliday.some((holiday) => {
            try {
              return isSameDay(new Date(holiday), date);
            } catch {
              return false;
            }
          });
          if (hasHoliday) return false;
        }

        // 스킬 체크
        if (orderProduct) {
          const [category, detail] = orderProduct.split(':');
          if (!engineer.engineerSkills.includes(detail)) {
            return false;
          }
        }

        return true;
      } catch (error) {
        console.error('Date parsing error:', error);
        return false;
      }
    });

    return availableEngineers.map((engineer) => ({
      value: engineer.engineerId.toString(),
      text: engineer.engineerName,
    }));
  } catch (error) {
    console.error('Error fetching available engineers:', error);
    return [];
  }
};

export const getEngineerInfo = async (engineerId: number) => {
  try {
    const response = await api.get<Engineer[]>('/engineer/searchAllEngineer');
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
