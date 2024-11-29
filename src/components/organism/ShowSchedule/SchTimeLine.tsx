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
  const tableData = useMemo(() => {
    const orderMap = new Map(scheduleData.map((order) => [order.orderTimeslot, order]));

    const result = timeSlots.map((timeSlot) => {
      const order = orderMap.get(timeSlot);

      const baseRow: SchTableRow = {
        timeSlot,
        customerName: '',
        customerPhone: '',
        customerAddr: '',
        orderProductDetail: '',
        orderCount: '',
        orderTotalAmount: '',
        orderRemarks: '',
        customerRemarks: '',
      };

      if (order) {
        showSchArray.forEach((key) => {
          baseRow[key as keyof SchTableRow] = order[key as keyof typeof order]?.toString() ?? '';
        });
      }

      return baseRow;
    });
  

    // console.log('Generated tableData:', result);
    return result;
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
