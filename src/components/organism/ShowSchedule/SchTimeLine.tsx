//SchTimeLine.tsx
import ATable from '@/components/molecules/Table/ATable';
import { schHeaders, showSchArray } from '@/constants/LJW/ShowSchArray';
import {
  SchTableColumn,
  SchTableRow,
  SchTimeLineProps,
  timeSlots,
} from '@/constants/LJW/ShowSchTypes';
import { useMemo } from 'react';

//카드 내부에 들어갈 데이터테이블
const SchTimeLine = ({ scheduleData, onEditRow, isEditing, selectedDate }: SchTimeLineProps) => {
  // 테이블 데이터 메모이제이션
  const tableData = useMemo(() => {
    // 스케줄 데이터를 Map으로 변환하여 검색 성능 향상
    const orderMap = new Map(scheduleData.map((order) => [order.orderTimeslot, order]));

    return timeSlots.map((timeSlot) => {
      const order = orderMap.get(timeSlot);

      // 기본 행 데이터 생성
      const baseRow = {
        timeSlot,
        ...Object.fromEntries(showSchArray.map((key) => [key, ''])),
      } as SchTableRow;

      // 주문이 있으면 데이터 채우기
      if (order) {
        showSchArray.forEach((key) => {
          baseRow[key] = order[key]?.toString() ?? '';
        });
      }

      return baseRow;
    });
  }, [scheduleData]);

  const tableColumns = useMemo<SchTableColumn[]>(() => ['timeSlot', ...showSchArray], []);

  return (
    <ATable
      headers={schHeaders}
      data={tableData}
      columns={tableColumns}
      isEditing={isEditing}
      onEditRow={(row) => onEditRow(row.timeSlot)}
    />
  );
};

export default SchTimeLine;
