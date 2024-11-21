'use client';

import { useEffect, useRef, useState } from 'react';
import { DataTable } from './DataTable';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ShaFormTemplate from '@/components/organism/Template/ShaFormTemplate';
import ShaOrderFormData, { OrderFormValues } from '@/data/ShaCustomerForm';
import orderApi from '@/service/Order/Order';

export interface Customer {
  orderDate: string;
  customerName: string;
  customerPhone: string;
  customerAddr: string;
  customerRemark: string | null;
  engineerName: string;
  orderProduct: string;
  orderPayment: string;
  orderReceiptDocs: string;
  receiptDocsIssued: boolean | null;
}

// 날짜 파싱 유틸리티 함수
const parseOrderDate = (dateString: string | undefined | null): Date => {
  if (!dateString) return new Date();
  try {
    return new Date(dateString.replace(' ', 'T') + ':00:00');
  } catch (error) {
    console.error('Date parsing error:', error);
    return new Date();
  }
};

export function CustomerManagement({ customers }: { customers: Customer[] }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);

  // Dialog가 닫힐 때 트리거 버튼으로 포커스 되돌리기
  useEffect(() => {
    if (!isDialogOpen && dialogTriggerRef.current) {
      dialogTriggerRef.current.focus();
    }
  }, [isDialogOpen]);

  const initialValues: OrderFormValues = {
    orderDate: '',
    orderEngineerName: '',
    selectedEngineerId: null,
    orderCustomerName: '',
    orderCustomerPhone: '',
    orderCustomerAddr: '',
    orderCustomerRemark: '',
    orderCategory: '',
    orderProduct: '',
    orderRemark: '',
    orderTotalAmount: 0,
    totalAmount: 0,
    orderCount: 1,
    orderIsDiscount: false,
    orderDiscountRatio: 0,
    orderDeposit: 0,
    depositPayed: false,
    orderPayment: '',
    orderReceiptDocs: '',
    receiptDocsIssued: false,
    engineerInfo: '',
    availableEngineers: [],
  };

  // 유효성 검사 규칙
  const validationRules = [
    (formValues: OrderFormValues) => !!formValues.orderDate,
    (formValues: OrderFormValues) => !!formValues.orderEngineerName,
    (formValues: OrderFormValues) => !!formValues.orderCustomerName,
    (formValues: OrderFormValues) => !!formValues.orderCustomerPhone,
    (formValues: OrderFormValues) => !!formValues.orderCustomerAddr,
    (formValues: OrderFormValues) => !!formValues.orderCategory,
    (formValues: OrderFormValues) => !!formValues.orderProduct,
    (formValues: OrderFormValues) => formValues.orderTotalAmount > 0,
    (formValues: OrderFormValues) => formValues.orderCount > 0,
    (formValues: OrderFormValues) => !!formValues.orderPayment,
    (formValues: OrderFormValues) => !!formValues.orderReceiptDocs,
  ];

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: 'orderDate',
      header: '예약일시',
      cell: ({ row }) => {
        const value = row.getValue('orderDate');
        try {
          const date = parseOrderDate(value as string);
          return format(date, 'yyyy-MM-dd HH:mm');
        } catch (error) {
          return '날짜 오류';
        }
      },
    },
    {
      accessorKey: 'customerName',
      header: '고객명',
    },
    {
      accessorKey: 'customerPhone',
      header: '연락처',
    },
    {
      accessorKey: 'customerAddr',
      header: '주소',
    },
    {
      accessorKey: 'engineerName',
      header: '담당기사',
    },
    {
      accessorKey: 'orderProduct',
      header: '세척품목',
    },
    {
      accessorKey: 'orderPayment',
      header: '결제방식',
    },
    {
      accessorKey: 'actions',
      header: '관리',
      cell: ({ row }) => {
        const customer = row.original;

        return (
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                setSelectedCustomer(null);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button
                ref={dialogTriggerRef}
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCustomer(customer);
                  setIsDialogOpen(true);
                }}
              >
                수정
              </Button>
            </DialogTrigger>
            {selectedCustomer && (
              <DialogContent
                className="max-w-4xl"
                onInteractOutside={(e) => {
                  e.preventDefault(); // 외부 클릭 방지
                }}
                onEscapeKeyDown={(e) => {
                  e.preventDefault(); // ESC 키 방지 (필요한 경우)
                }}
              >
                <DialogHeader>
                  <DialogTitle>예약 정보 수정</DialogTitle>
                  <DialogDescription>고객의 예약 정보를 수정할 수 있습니다.</DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <ShaFormTemplate<OrderFormValues>
                    title=""
                    initialValues={{
                      ...initialValues,
                      orderDate: customer.orderDate,
                      orderEngineerName: customer.engineerName,
                      orderCustomerName: customer.customerName,
                      orderCustomerPhone: customer.customerPhone,
                      orderCustomerAddr: customer.customerAddr,
                      orderCustomerRemark: customer.customerRemark || '',
                      orderProduct: customer.orderProduct,
                      orderPayment: customer.orderPayment,
                      orderReceiptDocs: customer.orderReceiptDocs,
                      receiptDocsIssued: customer.receiptDocsIssued || false,
                    }}
                    onSubmit={async (values) => {
                      try {
                        await orderApi.register(values);
                        setIsDialogOpen(false);
                        // 성공 메시지 또는 리로드 로직 추가
                      } catch (error) {
                        // 에러 처리
                        console.error('Submit error:', error);
                      }
                    }}
                    formDataGenerator={ShaOrderFormData}
                    validationRules={validationRules}
                  />
                </div>
              </DialogContent>
            )}
          </Dialog>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">고객 예약 목록</h2>
        <DataTable
          columns={columns}
          data={customers}
          searchKey="customerName"
          searchPlaceholder="고객명으로 검색..."
        />
      </div>
    </div>
  );
}
