import { ShaDropdownProps } from '@/components/atom/DropdownBox/ShaDropDown';
import { ShaFormFieldType } from '@/components/molecules/Form/ShaFormField';
import { ShaTitledFormControlProps } from '@/components/molecules/Form/ShaTitledFormControl';
import { Payment } from '../Payment';
import { ShaInputProps } from '@/components/atom/Input/ShaInput';
import { ShaTextareaProps } from '@/components/atom/Input/ShaTextArea';
import { Document } from '../Document';
import { CheckboxProps } from '@/components/atom/CheckBox/ShaCheckBox';

export type EditOrderCustomerFormValues = {
  customerId: number;
  customerName: string;
  customerTel: string;
  address: string;
  uniqueDetails: string;
  document: string;
  published: boolean;
  payment: string;
};
export const EditOrderCustomerFormData = (
  formValues: EditOrderCustomerFormValues,
  handleFieldChange: (FieldName: keyof EditOrderCustomerFormValues, value: any) => void,
  handleIsChecked: () => void,
  isSubmitAttempted: boolean
): ShaTitledFormControlProps[] => [
  {
    titleprops: {
      text: '고객 성함',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaInput' as ShaFormFieldType,
          prevprops: {
            placeholder: '고객 성함',
            required: true,
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
            value: formValues.customerTel,
            onChange: (value: string) => handleFieldChange('customerTel', value),
          } as ShaInputProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '방문 주소',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaInput' as ShaFormFieldType,
          prevprops: {
            placeholder: '방문 주소',
            required: true,
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
            rows: 4,
            value: formValues.uniqueDetails,
            onChange: (value: string) => handleFieldChange('uniqueDetails', value),
          } as ShaTextareaProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '결제 방식',
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
      text: '증빙 서류',
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
          formfieldtype: 'ShaCheckbox' as ShaFormFieldType,
          prevprops: {
            textprops: { text: '발행완료' },
            isChecked: formValues.published,
            onChange: () => handleIsChecked(),
            className: 'mt-2',
          } as CheckboxProps,
        },
      ],
    },
  },
];
