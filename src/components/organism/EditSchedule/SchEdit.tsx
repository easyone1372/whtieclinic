'use client';

import ShaFormTemplate from '@/components/organism/Template/ShaFormTemplate';
import EditOrderForm from '@/constants/LJW/EditOrderForm';
import {
  EditOrderFormValues,
  editScheduleValues,
  schInfoToFormValues,
  schValidationRules,
} from '@/constants/LJW/EditSchTypes';
import { getAvailableEngineers, getEngineerInfo } from '@/service/Order/EngSchedul';
import orderApi from '@/service/Order/Order';
import api from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type QueryParams = {
  orderId?: number;
  selectDate: string;
  selectTime: string;
  engineerId?: number;
};

const SchEdit = ({ queryParams }: { queryParams: QueryParams }) => {
  const [editOrderData, setEditOrderData] = useState<EditOrderFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  console.log('editSchedule Engineer:', queryParams.engineerId);
  console.log('editSelectDate:', queryParams.selectDate);
  console.log('editSelectTime:', queryParams.selectTime);
  console.log('editOrderData:', editOrderData);
  console.log('주문날짜 정보 타입:', typeof editOrderData?.orderDate);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let formValues: EditOrderFormValues;
        const combinedDateTime = `${queryParams.selectDate} ${queryParams.selectTime}`;

        // 먼저 가용 엔지니어 목록을 가져옴
        const availableEngineers = await getAvailableEngineers(combinedDateTime);

        if (queryParams.orderId) {
          // OrderId가 있을 경우 상세 데이터를 요청
          const response = await api.get(`/order-management/orders/${queryParams.orderId}`);
          const orderData = response.data;

          formValues = {
            ...schInfoToFormValues(orderData),
            orderDate: combinedDateTime,
            availableEngineers: availableEngineers,
          };

          if (queryParams.engineerId) {
            const engineerInfo = await getEngineerInfo(queryParams.engineerId);
            const selectedEngineer = availableEngineers.find(
              (eng) => eng.value === queryParams.engineerId?.toString()
            );

            formValues = {
              ...formValues,
              selectedEngineerId: queryParams.engineerId,
              engineerInfo: engineerInfo || '',
              orderEngineerName: selectedEngineer?.text || '',
            };
          }
        } else {
          formValues = {
            ...editScheduleValues,
            orderDate: combinedDateTime,
            availableEngineers: availableEngineers,
          };

          if (queryParams.engineerId) {
            const engineerInfo = await getEngineerInfo(queryParams.engineerId);
            const selectedEngineer = availableEngineers.find(
              (eng) => eng.value === queryParams.engineerId?.toString()
            );

            formValues = {
              ...formValues,
              selectedEngineerId: queryParams.engineerId,
              engineerInfo: engineerInfo || '',
              orderEngineerName: selectedEngineer?.text || '',
            };
          }
        }

        console.log('Setting editOrderData:', formValues); // 디버깅용
        setEditOrderData(formValues);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [queryParams]);

  const handleSubmit = async (values: EditOrderFormValues) => {
    try {
      if (queryParams.orderId) {
        await orderApi.modify(queryParams.orderId, values);
        // await api.put(`/order-management/orders/${queryParams.orderId}`, values);
      } else {
        await api.post('/order-management/orders', values);
      }
      router.push('/schedule/s_list');
    } catch (error) {
      console.error('스케쥴 수정 기능 오류:', error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <ShaFormTemplate<EditOrderFormValues>
      title="스케쥴 수정"
      initialValues={editOrderData || editScheduleValues}
      onSubmit={handleSubmit}
      formDataGenerator={EditOrderForm}
      validationRules={schValidationRules}
    />
  );
};

export default SchEdit;
