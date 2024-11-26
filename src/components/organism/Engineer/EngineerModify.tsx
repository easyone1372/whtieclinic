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
  const [formKey, setFormKey] = useState(0); // 폼을 강제로 리렌더링하기 위한 key

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
      setIsDrawerOpen(false);
      // 선택한 엔지니어의 세부 정보를 받아옴
      const engineer = await engineerApi.getEngineer(item.engineerId);
      setSelectedEngineer({
        ...item,
        engineerValidSkill: engineer.engineerSkills || [],
      });
      setFormKey((prev) => prev + 1); // 새로운 엔지니어 선택시 폼 리렌더링
    } catch (error) {
      console.error('Error fetching engineer details:', error);
    }
  };

  const engineerToFormValues = (engineer: EngineerModifyType): EngineerFormValues => ({
    engineerName: engineer.engineerName,
    engineerPhone: engineer.engineerPhone,
    engineerAddr: engineer.engineerAddr,
    engineerValidSkill: engineer.engineerSkills || [],
    engineerRemark: engineer.engineerRemark || '',
    engineerCommissionRate: engineer.engineerCommissionRate || 50,
    engineerPayday: engineer.engineerPayday || '',
    engineerHoliday: engineer.engineerHoliday || [],
    engineerDayoff: engineer.engineerDayoff || '',
  });

  const handleSubmit = async (values: EngineerFormValues) => {
    try {
      if (!selectedEngineer?.engineerId) {
        console.error('No engineer selected or missing ID');
        return;
      }

      const modifiedValues = {
        ...values,
        engineerId: selectedEngineer.engineerId,
      };

      const response = await engineerApi.modify(selectedEngineer.engineerId, modifiedValues);

      if (response.success) {
        await loadEngineers();
        const updatedEngineer = await engineerApi.getEngineer(selectedEngineer.engineerId);
        setSelectedEngineer((prev) => ({
          ...prev!,
          ...updatedEngineer,
          engineerValidSkill: updatedEngineer.engineerSkills || [],
        }));
        alert('수정이 완료되었습니다!');
      }
    } catch (error) {
      console.error('Error updating engineer:', error);
      alert('수정에 실패했습니다.');
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
            key={formKey}
            title="기사 정보 수정"
            initialValues={engineerToFormValues(selectedEngineer)}
            onSubmit={handleSubmit}
            formDataGenerator={ShaEngineerFormData}
            validationRules={validationRules}
          />
        </div>
      )}
    </div>
  );
};

export default EngineerModify;
