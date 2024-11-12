'use client';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ShaGenerateTableRows from './ShaGenerateTableRows';
import { ScheduleDisplayOrder } from '@/constants/jwType/jwtype';

//스케쥴 보기 column 지정
type ShaScheduleTimelineProps = {
  scheduleData: ScheduleDisplayOrder[];
  onEditOrder: (order: ScheduleDisplayOrder) => void;
  isEditing: boolean;
  selectedDate: Date;
};
const ShaScheduleTimeline = ({
  scheduleData,
  onEditOrder,
  isEditing,
  selectedDate,
}: ShaScheduleTimelineProps) => {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead className="sticky left-0 bg-gray-50">Time Slot</TableHead>
            <TableHead>고객명</TableHead>
            <TableHead>주소</TableHead>
            <TableHead>전화번호</TableHead>
            <TableHead>세탁품목</TableHead>
            <TableHead>세탁대수</TableHead>
            <TableHead>가격</TableHead>
            <TableHead>비고</TableHead>
            {isEditing && <TableHead>수정</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          <ShaGenerateTableRows
            scheduleData={scheduleData}
            onEditOrder={onEditOrder}
            isEditing={isEditing}
            selectedDate={selectedDate}
          />
        </TableBody>
      </Table>
    </div>
  );
};

export default ShaScheduleTimeline;
