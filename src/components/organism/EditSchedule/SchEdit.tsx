import ShaFormTemplate from '@/components/organism/Template/ShaFormTemplate';
import EditOrderForm from '@/constants/LJW/EditOrderForm';
import {
  EditOrderFormValues,
  EditScheduleTypes,
  editScheduleValues,
  schInfoToFormValues,
  schValidationRules,
} from '@/constants/LJW/EditSchTypes';
import { getEngineerInfo } from '@/service/Order/EngSchedul';
import orderApi from '@/service/Order/Order';
import api from '@/utils/axios';
import { Router } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type QueryParams = {
  orderId?: number;
  selectDate?: string;
  selectTime?: string;
  engineerId?: number;
};

const SchEdit = ({ queryParams }: { queryParams: QueryParams }) => {
  const [editOrderData, setEditOrderData] = useState<EditOrderFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  console.log('editOrderData:', editOrderData);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let formValues: EditOrderFormValues;
        if (queryParams.orderId) {
          // OrderId가 있을 경우 상세 데이터를 요청
          const response = await api.get(`/order-management/orders/${queryParams.orderId}`); //api주소
          const orderData = response.data;
          formValues = schInfoToFormValues(orderData);
        } else {
          formValues = {
            ...editScheduleValues, // 기본값
            orderDate: queryParams.selectDate ? new Date(queryParams.selectDate) : new Date(),
            orderTime: queryParams.selectTime ?? '',
          };
          if (queryParams.engineerId) {
            const engineerInfo = await getEngineerInfo(queryParams.engineerId);
            formValues.selectedEngineerId = queryParams.engineerId;
            formValues.orderEngineerName = engineerInfo?.split('\n')[0].replace('이름: ', '') || '';
          }
        }
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
        await api.put(`/order-management/orders/${queryParams.orderId}`, values);
      } else {
        await api.post('/order-management/orders', values);
      }
      router.push('/schedule/s_list');
    } catch (error) {
      console.error('스케쥴 수정 기능 오류:', error);
    }
  };
  return (
    <ShaFormTemplate<EditOrderFormValues>
      title=""
      initialValues={editOrderData || editScheduleValues}
      onSubmit={handleSubmit}
      formDataGenerator={EditOrderForm}
      validationRules={schValidationRules}
    />
  );
};

export default SchEdit;
