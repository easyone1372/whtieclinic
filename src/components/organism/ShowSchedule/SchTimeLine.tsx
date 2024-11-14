//SchTimeLine.tsx
import ATable from '@/components/molecules/Table/ATable';
import { schHeaders, showSchArray } from '@/constants/LJW/ShowSchArray';
import {
  SchTableColumn,
  SchTableRow,
  SchTimeLineProps,
  timeSlots,
} from '@/constants/LJW/ShowSchTypes';

//카드 내부에 들어갈 데이터테이블
const SchTimeLine = ({ scheduleData, onEditOrder, isEditing, selectedDate }: SchTimeLineProps) => {
  /// TimeSlot 기반의 데이터 구조로 변환
  const transformDataForTable = () => {
    return timeSlots.map((timeSlot) => {
      // 해당 시간대의 주문 찾기
      const order = scheduleData.find((order) => order.orderTimeslot === timeSlot);

      // 기본 행 데이터 구조 생성
      const baseRow = showSchArray.reduce(
        (acc, key) => ({
          ...acc,
          [key]: '',
        }),
        { timeSlot } as SchTableRow
      );

      // 주문이 있으면 데이터 채우기
      if (order) {
        showSchArray.forEach((key) => {
          baseRow[key] = order[key]?.toString() ?? '';
        });
      }

      return baseRow;
    });
  };

  const tableColumns: SchTableColumn[] = ['timeSlot', ...showSchArray];

  return (
    <div>
      <ATable headers={schHeaders} data={transformDataForTable()} columns={tableColumns} />
    </div>
  );
};

export default SchTimeLine;
