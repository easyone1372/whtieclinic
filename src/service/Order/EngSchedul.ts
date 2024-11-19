// engineerScheduler.ts
import { format, isSameDay } from 'date-fns';
import { fetchEngineers } from '../EngineerList/EngineerList';
import api from '@/utils/axios';
import { Engineer, Skill } from '@/constants/types/type';

export interface ScheduleData {
  orderId: number;
  engineerId: number;
  customerId: number;
  orderDate: string; // "2024-11-19 09"
  engineerName: string;
  customerName: string;
  customerAddr: string;
  customerPhone: string;
  orderProduct: string;
  orderProductDetail: string;
  orderCount: number;
  orderTotalAmount: number;
  orderRemarks?: string;
  customerRemarks?: string;
}

interface EngineerOption {
  value: string;
  text: string;
  orderId: number;
  customerId: number;
  engineerId: number;
}

export const getAvailableEngineers = async (
  selectedDate: string,
  orderProduct?: string
): Promise<EngineerOption[]> => {
  try {
    const engineers = await fetchEngineers();

    const scheduleResponse = await api.get('/api/engineer/getAllEngineerSchedule', {
      params: {
        selectedDate: selectedDate.split(' ')[0],
      },
    });
    const schedules: ScheduleData[] = scheduleResponse.data;

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

        const selectedDay = format(date, 'EEEE');
        if (engineer.engineerDayoff === selectedDay) {
          return false;
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
      } catch (error) {
        console.error('Date parsing error:', error);
        return false;
      }
      // 휴무일(요일) 체크
     
      if (orderProduct && engineer.engineerSkills) {
        const hasSkill = engineer.engineerSkills.some(
          (skill: Skill) => skill.skillType === orderProduct
        );
        if (!hasSkill) return false;
      }

      return true;
    });

    return availableEngineers.map((engineer) => ({
      value: engineer.engineerId.toString(),
      text: engineer.engineerName,
      orderId: schedules.find((s) => s.engineerId === engineer.engineerId)?.orderId || 0,
      customerId: schedules.find((s) => s.engineerId === engineer.engineerId)?.customerId || 0,
      engineerId: engineer.engineerId,
    }));
  } catch (error) {
    console.error('Error fetching available engineers:', error);
    return [];
  }
};

export const getEngineerInfo = async (engineerId: number) => {
  try {
    const engineers = await fetchEngineers();
    const engineer = engineers.find((eng) => eng.engineerId === engineerId);

    if (!engineer) return null;

    const skillsText = engineer.engineerSkills
      ? engineer.engineerSkills.map((skill) => skill.skillType).join(', ')
      : '없음';

    return `이름: ${engineer.engineerName}
전화번호: ${engineer.engineerPhone}
주소: ${engineer.engineerAddr}
특이사항: ${engineer.engineerRemark || '없음'}
보유 기술: ${skillsText}
휴무일: ${engineer.engineerDayoff || '없음'}`;
  } catch (error) {
    console.error('Error fetching engineer info:', error);
    return null;
  }
};
