'use client';

import ADataGrid from '@/components/molecules/datagrid/ADataGrid';

import { CustomerInfo } from '@/constants/CustomerInfo';
import { customerColumns } from '@/constants/yh/ColumnData';

const Page = () => {
  const rows = Object.entries(CustomerInfo).map(([key, customer]) => ({
    id: key,
    ...customer,
  }));

  const customerDataProps = {
    rows,
    columns: customerColumns,
    title: `고객 정보`,
  };

  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full overflow-y-auto">
        <ADataGrid {...customerDataProps} />
      </div>
    </div>
  );
};

export default Page;
