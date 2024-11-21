'use client';

import { Customer, CustomerManagement } from '@/components/organism/Customer/OrderModify';
import { useToast } from '@/hooks/use-toast';
import { customerApi } from '@/service/Order/OrderModify';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const Page = () => {
  const [customers, setCustomers] = useState<Customer[]>([]); // 타입 명시
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await customerApi.getAllOrders();
        setCustomers(data);
      } catch (error) {
        toast({
          title: '데이터 로딩 실패',
          description: '고객 정보를 불러오는데 실패했습니다.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return <CustomerManagement customers={customers} />;
};

export default Page;
