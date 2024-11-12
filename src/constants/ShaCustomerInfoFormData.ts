import { ShaTitledFormControlProps } from '@/components/molecules/Form/ShaTitledFormControl';
import { ShaFormFieldType } from '@/components/molecules/Form/ShaFormField';
import { ShaInputProps } from '@/components/atom/Input/ShaInput';

import { Payment } from '@/constants/Payment';
import { Document } from '@/constants/Document';
import { ShaDateTimePickerProps } from '@/components/molecules/ADateTimePicker/ShaDateTimePicker';
import { ShaTextareaProps } from '@/components/atom/Input/ShaTextArea';
import { ShaDropdownProps } from '@/components/atom/DropdownBox/ShaDropDown';
import { ShaOneCheckboxProps } from '@/components/molecules/checkbox/ShaOneCheckBox';
import { publishedCheckboxData } from './yh/CustomerData';
import { ShaDiscountCheckboxProps } from '@/components/molecules/Customer/ShaDiscountCheckBox';

export type CustomerInfoValues = {
  reservationDateTime: Date | null;
  name: string;
  phoneNumber: string;
  address: string;
  uniqueDetails: string;
  payment: string;
  document: string;
  published: string;
  isDepositPaid: boolean;
  depositAmount: number;
};
export const ShaCustomerInfoFormData = (
  formValues: CustomerInfoValues,
  handleFieldChange: (fieldName: keyof CustomerInfoValues, value: any) => void,
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
            value: formValues.reservationDateTime,
            onChange: (newValue: Date | null) => handleFieldChange('reservationDateTime', newValue),
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
            value: formValues.name,
            onChange: (value: string) => handleFieldChange('name', value),
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
            value: formValues.phoneNumber,
            onChange: (value: string) => handleFieldChange('phoneNumber', value),
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
            value: formValues.address,
            onChange: (value: string) => handleFieldChange('address', value),
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
            value: formValues.uniqueDetails,
            onChange: (value: string) => handleFieldChange('uniqueDetails', value),
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
              checked: formValues.isDepositPaid,
              onCheckedChange: (checked: boolean) => handleFieldChange('isDepositPaid', checked),
              label: '계약금 입금완료',
            },
            numericInputProps: {
              value: formValues.depositAmount.toString(),
              onChange: (value: string) => handleFieldChange('depositAmount', Number(value)),
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
            value: formValues.payment,
            required: true,
            error: '결제방식을 선택해주세요',
            onChange: (value: string) => handleFieldChange('payment', value),
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
            value: formValues.document,
            onChange: (value: string) => handleFieldChange('document', value),
          } as ShaDropdownProps,
        },
        {
          formfieldtype: 'ShaOneCheckbox' as ShaFormFieldType,
          prevprops: {
            checkboxes: publishedCheckboxData,
            value: formValues.published,
            onChange: (value: string) => handleFieldChange('published', value),
            className: 'start',
          } as ShaOneCheckboxProps,
        },
      ],
    },
  },
];
