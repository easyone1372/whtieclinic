import { ShaTitledFormControlProps } from '@/components/molecules/Form/ShaTitledFormControl';
import { ShaFormFieldType } from '@/components/molecules/Form/ShaFormField';
import { ShaInputProps } from '@/components/atom/Input/ShaInput';

import { Payment } from '@/constants/Payment';
import { Document } from '@/constants/Document';
import { ShaDateTimePickerProps } from '@/components/molecules/ADateTimePicker/ShaDateTimePicker';
import { ShaTextareaProps } from '@/components/atom/Input/ShaTextArea';
import { ShaDropdownProps } from '@/components/atom/DropdownBox/ShaDropDown';

import { ShaDiscountCheckboxProps } from '@/components/molecules/Customer/ShaDiscountCheckBox';
import { CheckboxProps } from '@/components/atom/CheckBox/ShaCheckBox';
import { format } from 'date-fns';

// Customer와 Order 테이블의 정보를 모두 포함하는 폼 값 타입
export type CustomerFormValues = {
  // Customer 테이블 관련 필드
  customerName: string;
  customerPhone: string;
  customerAddr: string;
  customerRemark: string;

  // Order 테이블 관련 필드
  orderDate: string;
  orderCategory: string;
  orderProduct: string;
  orderTotalAmount: number;
  orderCount: number;
  orderIsDiscount: boolean;
  orderDiscountRatio: number;
  orderRemark?: string;
  orderDeposit: number;
  depositPayed: boolean;
  orderPayment: string;
  orderRecieptDocs: string;
  recieptDocsIssued: boolean;
};
export const ShaCustomerFormData = (
  formValues: CustomerFormValues,
  handleFieldChange: (fieldName: keyof CustomerFormValues, value: any) => void,
  isSubmitAttempted: boolean
): ShaTitledFormControlProps[] => [
  {
    titleprops: {
      text: '예약일시',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaDateTimePicker' as ShaFormFieldType,
          prevprops: {
            dateLabel: '예약 날짜',
            timeLabel: '예약 시간',
            value: formValues.orderDate ? new Date(formValues.orderDate) : null,
            onChange: (newValue: Date | null) => {
              if (newValue) {
                // Date 객체를 문자열로 변환 (예: "2024-11-13 14:30:00")
                const formattedDate = format(newValue, 'yyyy-MM-dd HH:mm:ss');
                handleFieldChange('orderDate', formattedDate);
              } else {
                handleFieldChange('orderDate', '');
              }
            },
          } as ShaDateTimePickerProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '고객성함',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaInput' as ShaFormFieldType,
          prevprops: {
            placeholder: '고객성함',
            required: true,
            error: '고객성함을 입력해주세요',
            value: formValues.customerName,
            onChange: (value: string) => handleFieldChange('customerName', value),
            showError: isSubmitAttempted,
          } as ShaInputProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '연락처',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaInput' as ShaFormFieldType,
          prevprops: {
            placeholder: '연락처',
            type: 'tel',
            required: true,
            error: '연락처를 입력해주세요',
            value: formValues.customerPhone,
            onChange: (value: string) => handleFieldChange('customerPhone', value),
            showError: isSubmitAttempted,
          } as ShaInputProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '방문주소',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaInput' as ShaFormFieldType,
          prevprops: {
            placeholder: '방문주소',
            required: true,
            error: '방문주소를 입력해주세요',
            value: formValues.customerAddr,
            onChange: (value: string) => handleFieldChange('customerAddr', value),
            showError: isSubmitAttempted,
          } as ShaInputProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '특이사항',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaTextarea' as ShaFormFieldType,
          prevprops: {
            placeholder: '특이사항을 입력해주세요',
            size: 'large',
            rows: 4,
            value: formValues.customerRemark,
            onChange: (value: string) => handleFieldChange('customerRemark', value),
          } as ShaTextareaProps,
        },
      ],
    },
  },
  {
    titleprops: { text: '계약금' },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaDiscountCheckbox' as ShaFormFieldType,
          prevprops: {
            checkboxProps: {
              checked: formValues.depositPayed,
              onCheckedChange: (checked: boolean) => handleFieldChange('depositPayed', checked),
              label: '계약금 입금완료',
            },
            numericInputProps: {
              value: formValues.orderDeposit.toString(),
              onChange: (value: string) => handleFieldChange('orderDeposit', Number(value)),
              max: 1000000,
              size: 'medium',
              placeholder: '계약금 입금액',
              unit: '원',
            },
          } as ShaDiscountCheckboxProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '결제방식',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaDropdown' as ShaFormFieldType,
          prevprops: {
            label: '결제방식 선택',
            width: 'medium',
            options: Payment.map((payment) => ({
              value: payment,
              text: payment,
            })),
            value: formValues.orderPayment,
            required: true,
            error: '결제방식을 선택해주세요',
            onChange: (value: string) => handleFieldChange('orderPayment', value),
            showError: isSubmitAttempted,
          } as ShaDropdownProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '증빙서류',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaDropdown' as ShaFormFieldType,
          prevprops: {
            label: '증빙서류 선택',
            width: 'medium',
            options: Document.map((doc) => ({
              value: doc,
              text: doc,
            })),
            value: formValues.orderRecieptDocs,
            onChange: (value: string) => handleFieldChange('orderRecieptDocs', value),
          } as ShaDropdownProps,
        },
        {
          formfieldtype: 'ShaCheckbox' as ShaFormFieldType,
          prevprops: {
            isChecked: formValues.recieptDocsIssued,
            onChange: (checked: boolean) => handleFieldChange('recieptDocsIssued', checked),
            textprops: {
              text: '발행완료',
              className: 'start',
            },
          } as CheckboxProps,
        },
      ],
    },
  },
];
