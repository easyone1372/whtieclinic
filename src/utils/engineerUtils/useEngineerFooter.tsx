import { ReactNode, useCallback } from 'react';
import ShaCheckbox from '@/components/atom/CheckBox/ShaCheckBox';
import { Engineer, FooterItem } from '@/constants/yh/EngineerTypeData';
import { engineerService } from './engineerService';
import { calculateNewDailyEarnings } from './engineerUtils';

export const useEngineerFooter = (
  engineer: Engineer,
  editedEngineer: Engineer | null,
  setEditedEngineer: (engineer: Engineer | null) => void
) => {
  const getTotalWage = useCallback((eng: Engineer): number => {
    return eng.daily_earnings.reduce((sum, dp) => sum + dp.daily_amount, 0);
  }, []);

  const calculateWageAmount = useCallback(
    (eng: Engineer): number => {
      if (!eng || !eng.commission_rate) return 0;

      const totalWage = getTotalWage(eng);
      return Math.round(totalWage * (eng.commission_rate.commission_rate_id / 100));
    },
    [getTotalWage]
  );

  const handleTotalWageChange = useCallback(
    async (value: string) => {
      if (!editedEngineer) return;

      const currentTotal = getTotalWage(engineer);
      const newTotal = parseInt(value);
      const newDailyEarnings = calculateNewDailyEarnings(
        editedEngineer.daily_earnings,
        newTotal,
        currentTotal
      );

      setEditedEngineer({
        ...editedEngineer,
        daily_earnings: newDailyEarnings,
      });
    },
    [editedEngineer, engineer, setEditedEngineer, getTotalWage]
  );

  const handlePaymentStatusChange = useCallback(
    async (checked: boolean) => {
      if (!editedEngineer) return;

      try {
        await engineerService.updatePaymentStatus(editedEngineer.engineer_id, checked);
        setEditedEngineer({
          ...editedEngineer,
          is_paid: checked,
        });
      } catch (error) {
        console.error('지급 상태 변경 실패:', error);
      }
    },
    [editedEngineer, setEditedEngineer]
  );

  const getFooterData = useCallback((): FooterItem[] => {
    const totalWage = getTotalWage(engineer);
    const wageAmount = calculateWageAmount(engineer);

    return [
      {
        label: '합계 급여',
        value: `${totalWage.toLocaleString()}원`,
        isEditable: true,
        onValueChange: handleTotalWageChange,
      },
      {
        label: '수당률',
        value: `${engineer.commission_rate.commission_rate_id}%`, // commission_rate_id 직접 사용
      },
      {
        label: '수당 금액',
        value: `${wageAmount.toLocaleString()}원`,
      },
      {
        label: '지급 여부',
        value: engineer.is_paid,
        renderValue: ((value: boolean): ReactNode => (
          <ShaCheckbox isChecked={value} onChange={handlePaymentStatusChange} />
        )) as (value: string | number | boolean) => ReactNode,
      },
      { label: '전화번호', value: engineer.phone_number },
      { label: '주소', value: engineer.location },
      { label: '특이사항', value: engineer.remark || '' },
    ];
  }, [
    engineer,
    handleTotalWageChange,
    handlePaymentStatusChange,
    calculateWageAmount,
    getTotalWage,
  ]);

  return { getFooterData };
};
