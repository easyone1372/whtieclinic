import { useState, useEffect, useCallback } from 'react';
import { Engineer, EngineerCommissionRate } from '@/constants/yh/EngineerTypeData';
import { engineerService } from './engineerService';
import { CalendarEventType } from '@/components/atom/Calendar/ACalendar';
import { createCalendarEvents } from './engineerUtils';


export const useEngineer = () => {
  const [selectedEngineer, setSelectedEngineer] = useState<Engineer | null>(null);
  const [editedEngineer, setEditedEngineer] = useState<Engineer | null>(null);
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEventType[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const response = await engineerService.getAllEngineers();
        const { engineer, EngineerCommissionRates, engineerPay, engineerPayDay } = response.data;

        const processedEngineers: Engineer[] = engineer.map((eng) => {
          const commissionRate = EngineerCommissionRates.find(
            (rate) => rate.engineerId === eng.id
          );
          const payments = engineerPay.filter(
            (pay) => pay.engineerId === eng.id
          );
          const payDay = engineerPayDay.find(
            (day) => day.engineerId === eng.id
          );

          return {
            engineer_id: eng.id,
            name: eng.name,
            phone_number: eng.phoneNumber,
            location: eng.location,
            remark: eng.remark,
            commission_rate: {
              engineer_id: eng.id,
              commission_rate_id: commissionRate?.rateId || 0
            },
            skills: [],
            dayoffs: [],
            holidays: [],
            daily_earnings: payments.map((pay) => ({
              engineer_dailyearning_id: pay.id,
              engineer_id: eng.id,
              date: new Date(pay.date),
              daily_amount: pay.daily_amount
            })),
            weekly_earnings: [],
            is_paid: payDay?.is_pay || false
          };
        });

        setEngineers(processedEngineers);
      } catch (error) {
        console.error('기사 정보 조회 실패:', error);
      }
    };

    fetchEngineers();
  }, []);

  useEffect(() => {
    if (selectedEngineer) {
      setEvents(createCalendarEvents(selectedEngineer));
      setEditedEngineer(selectedEngineer);
    }
  }, [selectedEngineer]);

  // handler 함수들 선언
  const handleWorkerSelect = useCallback((engineer: Engineer) => {
    setSelectedEngineer(engineer);
    setOpen(false);
  }, []);

  const handleEditToggle = useCallback(async () => {
    if (isEditing && editedEngineer && selectedEngineer) {
      try {
        await engineerService.updateEngineer(editedEngineer.engineer_id, editedEngineer);
        setSelectedEngineer(editedEngineer);
      } catch (error) {
        console.error('기사 정보 수정 실패:', error);
      }
    }
    setIsEditing(!isEditing);
  }, [isEditing, editedEngineer, selectedEngineer]);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
    setEditedEngineer(selectedEngineer);
  }, [selectedEngineer]);

  // return 문에서 선언된 handler 함수들 사용
  return {
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
  };
};