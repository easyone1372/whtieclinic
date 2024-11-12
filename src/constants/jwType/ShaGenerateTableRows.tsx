import ShaButton from '@/components/atom/Button/ShaButton';
import { TableCell, TableRow } from '@/components/ui/table';
import { timeSlots } from '@/constants/schedule/timeSlots';
import React from 'react';
import { ScheduleDisplayOrder } from './jwtype';

//스케쥴 ROW 테이블 설정
type ShaGenerateTableRowsProps = {
  scheduleData: ScheduleDisplayOrder[];
  onEditOrder: (order: ScheduleDisplayOrder) => void;
  isEditing: boolean;
  selectedDate: Date;
};

const ShaGenerateTableRows = ({
  scheduleData,
  onEditOrder,
  isEditing,
  selectedDate,
}: ShaGenerateTableRowsProps) => {
  const slotTimes = timeSlots.map((slot, index) => {
    const startTime = new Date(selectedDate);
    const endTime = new Date(selectedDate);

    if (index === 0) {
      startTime.setHours(0, 0, 0, 0);
      endTime.setHours(8, 0, 0, 0);
    } else if (index === timeSlots.length - 1) {
      startTime.setHours(19, 0, 0, 0);
      endTime.setHours(23, 59, 59, 999);
    } else {
      const [startHour, endHour] = slot.split(' ~ ').map((time) => {
        const [hour] = time.split(':');
        return parseInt(hour, 10);
      });
      startTime.setHours(startHour, 0, 0, 0);
      endTime.setHours(endHour, 0, 0, 0);
    }

    return { slotStartTime: startTime.getTime(), slotEndTime: endTime.getTime() };
  });

  return (
    <>
      {timeSlots.map((slot, index) => {
        const { slotStartTime, slotEndTime } = slotTimes[index];

        const slotOrders = scheduleData.filter((order) => {
          const orderStart = new Date(order.StartTime).getTime(); // StartTime으로 수정
          const orderEnd = new Date(order.EndTime).getTime(); // EndTime으로 수정
          return orderStart >= slotStartTime && orderEnd <= slotEndTime;
        });

        return (
          <TableRow key={slot}>
            <TableCell className="sticky left-0 bg-gray-50 w-44">{slot}</TableCell>
            {slotOrders.length > 0 ? (
              slotOrders.map((order) => (
                <React.Fragment key={order.OrderId}>
                  {' '}
                  {/* OrderId로 수정 */}
                  <TableCell>{order.CustomerName}</TableCell> {/* CustomerName으로 수정 */}
                  <TableCell>{order.Address}</TableCell> {/* Address로 수정 */}
                  <TableCell>{order.PhoneNumber}</TableCell> {/* PhoneNumber로 수정 */}
                  <TableCell>{order.Product}</TableCell> {/* Product로 수정 */}
                  <TableCell>{order.ItemCount}</TableCell> {/* ItemCount로 수정 */}
                  <TableCell>{order.FinalPrice}</TableCell> {/* FinalPrice로 수정 */}
                  <TableCell>{order.CustomerUniqueDetails}</TableCell>{' '}
                  {/* CustomerUniqueDetails로 수정 */}
                  {isEditing && (
                    <TableCell>
                      <ShaButton onClick={() => onEditOrder(order)} size="sm" text="수정" />
                    </TableCell>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableCell colSpan={7}> </TableCell>
            )}
          </TableRow>
        );
      })}
    </>
  );
};

export default ShaGenerateTableRows;
