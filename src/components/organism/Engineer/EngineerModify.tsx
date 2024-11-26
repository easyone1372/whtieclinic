'use client';

import { useEffect, useState } from 'react';
import ShaDrawer from '@/components/molecules/drawer/ShaDrawer';
import ShaFormTemplate from '@/components/organism/Template/ShaFormTemplate';
import { EngineerFormValues, ShaEngineerFormData } from '@/data/ShaEngineerFormData';
import { engineerApi } from '@/service/Engineer/EngineerRegi';
import { fetchEngineers } from '@/service/EngineerList/EngineerList';
import { Engineer, EngineerModifyType } from '@/constants/types/type';

const validationRules = [
  (formValues: EngineerFormValues) => !!formValues.engineerName,
  (formValues: EngineerFormValues) => !!formValues.engineerPhone,
  (formValues: EngineerFormValues) => !!formValues.engineerAddr,
  (formValues: EngineerFormValues) =>
    typeof formValues.engineerCommissionRate === 'number' &&
    formValues.engineerCommissionRate >= 0 &&
    formValues.engineerCommissionRate <= 100,
  (formValues: EngineerFormValues) => !!formValues.engineerValidSkill,
  (formValues: EngineerFormValues) => !!formValues.engineerPayday,
];

const EngineerModify = () => {
  const [filter, setFilter] = useState('');
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [selectedEngineer, setSelectedEngineer] = useState<Engineer | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 엔지니어 목록을 불러오는 함수
  const loadEngineers = async () => {
    try {
      const data = await fetchEngineers();
      setEngineers(data);
    } catch (error) {
      console.error('Error loading engineers:', error);
    }
  };

  useEffect(() => {
    loadEngineers();
  }, []);

  const handleFilterChange = (value: string) => setFilter(value);

  const handleItemClick = async (item: Engineer) => {
    try {
      // 선택한 엔지니어의 세부 정보를 받아옴
      const engineer = await engineerApi.getEngineer(item.engineerId);
      setSelectedEngineer({
        ...item,
        engineerValidSkill: engineer.engineerSkills || [], // 서버에서 받은 `engineerSkills`를 `engineerValidSkill`로 변환
      });
      setIsDrawerOpen(false);
    } catch (error) {
      console.error('Error fetching engineer details:', error);
    }
  };

  // 서버에서 받은 엔지니어 정보를 폼의 초기값으로 변환
  const engineerToFormValues = (engineer: EngineerModifyType): EngineerFormValues => ({
    engineerName: engineer.engineerName,
    engineerPhone: engineer.engineerPhone,
    engineerAddr: engineer.engineerAddr,
    engineerValidSkill: engineer.engineerSkills || [], // `engineerValidSkill`을 그대로 사용
    engineerRemark: engineer.engineerRemark || '',
    engineerCommissionRate: engineer.engineerCommissionRate || 50,
    engineerPayday: engineer.engineerPayday || '',
    engineerHoliday: engineer.engineerHoliday || [],
    engineerDayoff: engineer.engineerDayoff || '',
  });

  // 폼 데이터 제출 시 `engineerValidSkill`을 그대로 서버에 전송하고, `engineerId`도 함께 전송
  const handleSubmit = async (values: EngineerFormValues) => {
    try {
      if (!selectedEngineer) {
        console.error('No engineer selected');
        return;
      }

      const { engineerId } = selectedEngineer;
      if (!engineerId) {
        console.error('Engineer ID is missing');
        return;
      }

      // `engineerValidSkill`을 그대로 서버에 전송하고 `engineerId`도 추가하여 전송
      const modifiedValues = {
        ...values,
        engineerId, // `engineerId` 추가
      };

      const response = await engineerApi.modify(engineerId, modifiedValues);

      if (response.success) {
        // 성공적으로 수정되면 리스트를 새로고침
        await loadEngineers();
        // 선택된 엔지니어 정보도 업데이트
        const updatedEngineer = await engineerApi.getEngineer(engineerId);
        setSelectedEngineer({
          ...selectedEngineer,
          ...updatedEngineer,
        });
      }
    } catch (error) {
      console.error('Error updating engineer:', error);
    }
  };

  return (
    <div>
      <ShaDrawer
        data={engineers}
        filterKeys={['engineerName', 'engineerPhone', 'engineerAddr']}
        filter={filter}
        onFilterChange={handleFilterChange}
        onItemClick={handleItemClick}
        drawerTitle="기사님 목록"
        drawerDescription="기사님을 클릭하세요."
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
      />
      {selectedEngineer && (
        <div className="p-6">
          <ShaFormTemplate<EngineerFormValues>
            title="기사 정보 수정"
            initialValues={engineerToFormValues(selectedEngineer)} // `engineerValidSkill`을 사용
            onSubmit={handleSubmit} // `handleSubmit`을 호출하여 `engineerValidSkill`을 서버로 전송
            formDataGenerator={ShaEngineerFormData}
            validationRules={validationRules}
          />
        </div>
      )}
    </div>
  );
};

export default EngineerModify;
