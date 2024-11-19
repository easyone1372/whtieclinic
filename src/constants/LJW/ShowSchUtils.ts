import { ScheduleShowApi, ScheduleShowResponse } from '@/service/Schedule/ScheduleShow';
import { Engineer } from '../types/type';
import { SchShowDisplay, TimeSlot, timeSlots } from './ShowSchTypes';
import { dummyEngineers, dummyScheduleDisplays } from './dummyAgain';
import api from '@/utils/axios';

// 프론트->db로 보낼때 string으로 변환 뒤 전송
export function formatDateAndTimeSlot(date: Date, timeSlot: TimeSlot): string {
  // 날짜를 YYYY-MM-DD 형식으로 변환
  const dateString = date.toISOString().split('T')[0]; // 'YYYY-MM-DD' 포맷
  // 날짜와 시간대를 결합한 문자열을 반환
  return `${dateString} ${timeSlot}`;
}

// db에서 받은 데이터를 date, string으로 구분.
export function parseDateAndTimeSlot(dateTimeString: string): { date: Date; timeSlot: TimeSlot } {
  const [dateString, ...timeSlotArray] = dateTimeString.split(' ');
  const timeSlot = timeSlotArray.join(' ') as TimeSlot; // 문자열을 다시 TimeSlot으로 변환

  // Date 객체 생성
  const date = new Date(`${dateString}T00:00:00Z`);
  return { date, timeSlot };
}

//

//해당 날짜에 휴무일이 아닌 기사 찾는 함수
export const getEngineersByDate = async (date: Date): Promise<Engineer[]> => {
  try {
    const selectedDayOfWeek = date.toLocaleString('ko-KR', { weekday: 'long' });
    console.log('selectedDayOfWeek:', selectedDayOfWeek);

    // API 호출
    const response = await api.get('/api/engineer/searchAllEngineer'); ///api/ 안붙여서 안된거였음
    console.log('response:', response);
    const data = await response.data;
    console.log('API response:', data);

    // 서버 응답 데이터를 Engineer 타입으로 매핑
    const engineers: Engineer[] = data.map((item: any) => ({
      engineerId: item.engineerId,
      engineerName: item.engineerName,
      engineerPhone: item.engineerPhone,
      engineerAddr: item.engineerAddr,
      engineerRemark: item.engineerRemark,
      engineerCommission: item.engineerCommissionRate, // 이름이 다르므로 주의
      engineerDayoff: item.engineerDayoff,
      engineerHoliday: item.engineerHoliday,
      engineerPayday: item.engineerPayday,
      engineerSkills: item.engineerSkills,
    }));

    // 데이터가 배열 형태인지 확인하고 필터링
    // const engineers: Engineer[] = Array.isArray(data) ? data : data.engineers || [];///
    console.log('Engineers data:', engineers);

    // 해당 날짜에 휴무일이 아닌 기사만 반환
    return engineers.filter((engineer) => {
      // 주중 정규 휴무일 체크 (쉼표로 구분된 경우를 대비)
      const isRegularHoliday = engineer.engineerDayoff
        ? engineer.engineerDayoff.split(',').some((day) => day.trim() === selectedDayOfWeek)
        : false;

      // 비정규 휴무일 체크 (쉼표로 구분된 날짜들)
      const isHoliday = engineer.engineerHoliday
        ? engineer.engineerHoliday.some(
            (holiday) => new Date(holiday).toDateString() === date.toDateString()
          )
        : false;

      // console.log('isHoliday:', isHoliday, 'isRegularHoliday:', isRegularHoliday);
      // 해당 날짜에 휴무일이 아닌 기사만 반환
      return !isHoliday && !isRegularHoliday;
    });
  } catch (error) {
    console.error('Error fetching engineers:', error);
    return [];
  }
};

//날짜 선택후 기사 선택 시 해당 기사의 스케쥴 데이터 맵핑하는 함수
export const getOrdersByEngineerAndDate = async (
  engineerId: number,
  selectedDate: Date
): Promise<SchShowDisplay[]> => {
  try {
    const response = await ScheduleShowApi.schshow({
      engineerId,
      selectedDate: selectedDate.toISOString(),
    });

    console.log('getOrdersByEngineerAndDate response:', response);

    // 응답 데이터 확인
    const data = Array.isArray(response) ? response : response.data;

    if (Array.isArray(data) && data.length > 0) {
      // 서버 데이터 매핑
      const mappedData: SchShowDisplay[] = data.map((item: any) => ({
        orderId: item.orderId || item.order_id || 0,
        engineerId: item.engineerId || item.engineer_id || 0,
        engineerName: item.engineerName || item.engineer_name || '',
        customerId: item.customerId || item.customer_id || 0,
        orderDate: item.orderDate || item.order_date || '',
        orderTimeslot: item.orderTimeslot || item.order_timeslot || '미지정',
        customerName: item.customerName || item.customer_name || '',
        customerAddr: item.customerAddr || item.customer_addr || '',
        customerPhone: item.customerPhone || item.customer_phone || '',
        orderProduct: item.orderProduct || item.order_product || '',
        orderProductDetail: item.orderProductDetail || item.order_product_detail || '',
        orderCount: item.orderCount || item.order_count || 0,
        orderTotalAmount: item.orderTotalAmount || item.order_total_amount || 0,
        orderRemarks: item.orderRemarks || item.order_remarks || '',
        customerRemarks: item.customerRemarks || item.customer_remarks || '',
      }));

      console.log('Mapped Data:', mappedData);
      return mappedData;
    } else {
      console.error('Unexpected response structure:', response);
      return [];
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

// 기사와 날짜에 맞는 스케줄을 반환하는 함수 (더미데이터) - 서버 연결 성공시 삭제
export const getOrdersByEngineerAndDate2 = async (
  engineerId: number,
  selectedDate: Date
): Promise<SchShowDisplay[]> => {
  // 선택된 날짜에 해당하는 스케줄 데이터 필터링
  return dummyScheduleDisplays.filter(
    (schedule) =>
      schedule.engineerId === engineerId &&
      schedule.orderDate.toDateString() === selectedDate.toDateString()
  );
};
