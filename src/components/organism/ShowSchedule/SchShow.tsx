import ShaDateSchedulePicker from '@/components/molecules/ADateTimePicker/ShaDateSchedulePicker';
import SchEngList from './SchEngList';
import { useState } from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { CardContent, CardHeader } from '@mui/material';
import ShaButton from '@/components/atom/Button/ShaButton';
import SchTimeLine from './SchTimeLine';
import { SchShowDisplay } from '@/constants/LJW/ShowSchTypes';
import { Engineer } from '@/constants/types/type';

//스케쥴 화면 전체
const SchShow = () => {
  const [engList, setEngList] = useState<Engineer[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectEng, setSelectEng] = useState<number | null>(null);
  const [scheduleData, setScheduleData] = useState<SchShowDisplay[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  //우상단 수정버튼 클릭시 작동 함수
  const handleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <div className="space-y-4">
        <ShaDateSchedulePicker />
        <SchEngList engineerList={engList} onClick={(engineer_id) => setSelectEng(engineer_id)} />
      </div>
      <div className="min-w-[1200px]">
        <Card className="w-full Shadow-sm">
          <CardHeader className="border-b w-full flex flex-row justify-between">
            <CardTitle className="text-2xl font-semibold"></CardTitle>
            <div>
              <ShaButton onClick={handleEditMode} size="sm" text="수정" />
            </div>
          </CardHeader>
          <CardContent>
            <SchTimeLine
              scheduleData={scheduleData}
              isEditing={isEditing}
              selectedDate={selectedDate}
              onEditOrder={}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchShow;
