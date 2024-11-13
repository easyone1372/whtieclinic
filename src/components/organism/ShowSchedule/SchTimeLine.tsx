import ATable from '@/components/molecules/Table/ATable';
import { schHeaders, showSchArray } from '@/constants/LJW/ShowSchArray';
import { SchTimeLineProps } from '@/constants/LJW/ShowSchTypes';

const SchTimeLine = ({ scheduleData, onEditOrder, isEditing, selectedDate }: SchTimeLineProps) => {
  const columnsWithTimeSlot = ['orderTimeslot', ...showSchArray];

  return (
    <div>
      <ATable title={undefined} headers={schHeaders} data={scheduleData} columns={showSchArray} />
    </div>
  );
};

export default SchTimeLine;
