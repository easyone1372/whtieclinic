import ShaCheckbox from '@/components/atom/CheckBox/ShaCheckBox';
import { ColumnDef } from '@tanstack/react-table';

export const customerColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'bookingDate',
    header: '예약일',
    cell: ({ row }) => {
      return <div className="w-24">{row.getValue('bookingDate')}</div>; // w-[100px] -> w-24
    },
  },
  {
    accessorKey: 'name',
    header: '이름',
    cell: ({ row }) => {
      return <div className="w-[50px]">{row.getValue('name')}</div>; // w-20 = 80px
    },
  },
  {
    accessorKey: 'tel',
    header: '전화번호',
    cell: ({ row }) => {
      return <div className="w-[120px]">{row.getValue('tel')}</div>; // w-32 = 128px
    },
  },
  {
    accessorKey: 'address',
    header: '주소',
    cell: ({ row }) => {
      // 주소는 남은 공간을 모두 사용하도록
      return <div className="w-full">{row.getValue('address')}</div>;
    },
  },
  {
    accessorKey: 'info',
    header: '정보',
    cell: ({ row }) => {
      return <div className="w-24">{row.getValue('info')}</div>;
    },
  },
  {
    accessorKey: 'engineer',
    header: '엔지니어',
    cell: ({ row }) => {
      return <div className="w-24">{row.getValue('engineer')}</div>;
    },
  },
  {
    accessorKey: 'cleaning',
    header: '청소 유형',
    cell: ({ row }) => {
      return <div className="w-24">{row.getValue('cleaning')}</div>;
    },
  },
  {
    accessorKey: 'bill',
    header: '영수증 발행',
    cell: ({ row }) => (
      <div className="w-[50px]">
        <ShaCheckbox
          isChecked={row.getValue('bill')}
          onChange={(checked) => {
            console.log(`클릭`, checked);
          }}
        />
      </div>
    ),
  },
];
