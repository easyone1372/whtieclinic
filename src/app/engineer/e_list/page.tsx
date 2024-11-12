'use client';

import React from 'react';


import ACalendar from '@/components/atom/Calendar/ACalendar';
import ShaButton from '@/components/atom/Button/ShaButton';
import { useEngineer } from '@/utils/engineerUtils/useEngineer';
import { useEngineerFooter } from '@/utils/engineerUtils/useEngineerFooter';
import { Engineer } from '@/constants/yh/EngineerTypeData';
import WorkerDrawer from '@/components/yong/WorkerDrawer';
import { StyledCalendarContainer } from '@/components/yong/ContainerStyle';
import AFooter from '@/components/molecules/datagrid/AFooter';



const EngineerCalendarPage = () => {
  const {
    selectedEngineer,
    editedEngineer,
    setEditedEngineer,
    engineers,
    open,
    events,
    isEditing,
    setOpen,
    handleWorkerSelect,
    handleEditToggle,
    handleEditCancel,
  } = useEngineer();

  const { getFooterData } = useEngineerFooter(
    // null 체크를 통한 안전한 타입 처리
    (selectedEngineer || editedEngineer) as Engineer, // 둘 다 null인 경우는 밑의 조건문에서 처리됨
    editedEngineer,
    setEditedEngineer
  );

  // 선택된 엔지니어가 없는 경우의 초기 화면
  if (!selectedEngineer) {
    return (
      <div className="p-3 h-screen w-full">
        <WorkerDrawer
          engineers={engineers}
          onEngineerSelect={handleWorkerSelect}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    );
  }

  return (
    <div className="p-3 h-screen w-full">
      <div className="mb-3">
        <WorkerDrawer
          engineers={engineers}
          onEngineerSelect={handleWorkerSelect}
          open={open}
          onOpenChange={setOpen}
        />
      </div>

      <div className="w-full h-screen flex flex-col gap-5">
        <h2 className="mb-2 text-xl font-bold text-gray-800">
          {selectedEngineer.name}님의 근무 일정
        </h2>

        <StyledCalendarContainer className="flex-grow min-h-[700px] mb-3">
          <ACalendar
            events={events}
            onEventSelect={(event) => {
              console.log('Selected event:', event);
              // 이벤트 선택 핸들러를 필요에 따라 구현
            }}
          />
        </StyledCalendarContainer>

        <div className="w-full max-w-[1400px] mx-auto mt-auto">
          <AFooter data={getFooterData()} isEditing={isEditing} />
          <div className="flex justify-center gap-2 mt-4">
            <ShaButton text={isEditing ? '저장' : '수정'} onClick={handleEditToggle} />
            {isEditing && <ShaButton text="취소" onClick={handleEditCancel} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineerCalendarPage;
