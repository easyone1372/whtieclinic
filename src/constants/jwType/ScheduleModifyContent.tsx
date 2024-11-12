//ScheduleModifyContent.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AEditOrderInfo from './AEditOrderInfo';

const ScheduleModifyContent = () => {
  const searchParams = useSearchParams();

  const [selectTime, setSelectTime] = useState<Date | null>(null);
  const [engineerId, setEngineerId] = useState<number | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);

  useEffect(() => {
    const timeParam = searchParams.get('selectTime');
    const engineerParam = searchParams.get('engineerId');
    const customerParam = searchParams.get('customerId');
    const orderParam = searchParams.get('orderId');

    if (timeParam) setSelectTime(new Date(timeParam));
    if (engineerParam) setEngineerId(Number(engineerParam));
    if (customerParam) setCustomerId(Number(customerParam));
    if (orderParam) setOrderId(Number(orderParam));
  }, [searchParams]);

  return (
    <AEditOrderInfo
      selectTime={selectTime}
      engineer_id={engineerId}
      customer_id={customerId}
      order_id={orderId}
    />
  );
};

export default ScheduleModifyContent;
