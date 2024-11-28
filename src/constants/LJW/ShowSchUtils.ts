import { ScheduleShowApi, ScheduleShowResponse } from '@/service/Schedule/ScheduleShow';
import { Engineer } from '../types/type';
import { SchShowDisplay, TimeSlot, timeSlots } from './ShowSchTypes';
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
    // console.log('selectedDayOfWeek:', selectedDayOfWeek);

    // API 호출
    const response = await api.get('/engineer-management/engineers'); ///api/ 안붙여서 안된거였음
    // console.log('response:', response);
    const data = await response.data;
    // console.log('API response:', data);

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
    // console.log('Engineers data:', engineers);

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
    // console.error('Error fetching engineers:', error);
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
      selectedDate: selectedDate.toISOString().split('T')[0],
    });

    const data = Array.isArray(response) ? response : response.data;

    if (!Array.isArray(data) || data.length === 0) {
      // console.warn('No data returned or invalid response format:', response);
      return [];
    }

    const isSameDate = (orderDate: string, selectedDate: Date) => {
      const [orderDateOnly] = orderDate.split(' ');
      return new Date(orderDateOnly).toDateString() === selectedDate.toDateString();
    };

    const mappedData: SchShowDisplay[] = data
      .filter((item) => item.engineerId === engineerId && isSameDate(item.orderDate, selectedDate)) // 필터링 추가
      .map((item: any) => {
        if (!item.orderDate) {
          // console.warn('Missing orderDate in item:', item);
          return null;
        }

        const [orderDate, orderTime] = item.orderDate.split(' ');
        const formattedTime = orderTime
          ? `${orderTime}:00 ~ ${Number(orderTime) + 1}:00`.replace('9:00', '09:00')
          : '미지정';

        return {
          orderId: item.orderId || 0,
          engineerId: item.engineerId || 0,
          engineerName: item.engineerName || '',
          customerId: item.customerId || 0,
          orderDate: orderDate || '',
          orderTimeslot: formattedTime,
          customerName: item.customerName || '',
          customerAddr: item.customerAddr || '',
          customerPhone: item.customerPhone || '',
          orderProduct: item.orderProduct || '',
          orderProductDetail: item.orderProductDetail || '',
          orderCount: item.orderCount || 0,
          orderTotalAmount: item.orderTotalAmount || 0,
          orderRemarks: item.orderRemarks || '',
          customerRemarks: item.customerRemarks || '',
        };
      })
      .filter((item) => item !== null);

    // console.log('Filtered Mapped Data by engineerId:', mappedData); // 디버깅용
    return mappedData;
  } catch (error) {
    // console.error('Error fetching orders:', error);
    return [];
  }
};
