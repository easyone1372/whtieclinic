import { ShaTitledFormControlProps } from '@/components/molecules/Form/ShaTitledFormControl';
import { ShaFormFieldType } from '@/components/molecules/Form/ShaFormField';
import { ShaInputProps } from '@/components/atom/Input/ShaInput';
import { ShaDateTimePickerProps } from '@/components/molecules/ADateTimePicker/ShaDateTimePicker';
import { ShaTextareaProps } from '@/components/atom/Input/ShaTextArea';
import { ShaDropdownProps } from '@/components/atom/DropdownBox/ShaDropDown';
import { ShaDiscountCheckboxProps } from '@/components/molecules/Customer/ShaDiscountCheckBox';
import { ShaCheckboxDropdownSelectorProps } from '@/components/molecules/Customer/ShaCheckBoxDropDownSelector';
import { ShaNumericInputProps } from '@/components/molecules/input/ShaNumericInput';
import { CheckboxProps } from '@/components/atom/CheckBox/ShaCheckBox';
import { format, parse } from 'date-fns';
import { Payment } from '@/constants/Payment';
import { Document } from '@/constants/Document';

import { getAvailableEngineers, getEngineerInfo } from '@/service/Order/EngSchedul';
import { fetchEngineers } from '@/service/EngineerList/EngineerList';
import { isNumberOnly } from '@/constants/validation';
import { productCategories } from '@/data/ProductCategory';
import { EditOrderFormValues } from './EditSchTypes';

export const EditOrderForm = (
  formValues: EditOrderFormValues,
  handleFieldChange: (fieldName: keyof EditOrderFormValues, value: any) => void
): ShaTitledFormControlProps[] => [
  // 1. 예약 정보 섹션
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
            value: (() => {
              if (!formValues.orderDate) return null;

              // YYYY-MM-DD HH 형식 파싱
              const [datePart, timePart] = formValues.orderDate.split(' ');
              const [year, month, day] = datePart.split('-');
              const hour = parseInt(timePart);

              return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), hour, 0);
            })(),
            onChange: async (newValue: Date | null) => {
              console.log('console newValue: ', newValue);
              if (newValue) {
                const formattedDate = format(newValue, 'yyyy-MM-dd HH');
                handleFieldChange('orderDate', formattedDate);

                const availableEngineers = await getAvailableEngineers(formattedDate);
                handleFieldChange('availableEngineers', availableEngineers);

                if (formValues.selectedEngineerId) {
                  const isStillAvailable = availableEngineers.some(
                    (eng) => eng.value === formValues.selectedEngineerId?.toString()
                  );
                  if (!isStillAvailable) {
                    handleFieldChange('selectedEngineerId', null);
                    handleFieldChange('engineerInfo', '');
                    handleFieldChange('orderEngineerName', '');
                  }
                }
              } else {
                handleFieldChange('orderDate', '');
                // handleFieldChange('orderTime', '');
                handleFieldChange('availableEngineers', []);
                handleFieldChange('selectedEngineerId', null);
                handleFieldChange('engineerInfo', '');
                handleFieldChange('orderEngineerName', '');
              }
            },
          } as ShaDateTimePickerProps,
        },
      ],
    },
  },
  {
    titleprops: { text: '세척품목' },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaCheckboxDropdownSelector' as ShaFormFieldType,
          prevprops: {
            onecheckboxprops: {
              checkboxes: {
                에어컨: { textprops: { text: '에어컨' } },
                세탁기: { textprops: { text: '세탁기' } },
              },
              value: formValues.orderCategory,
              onChange: async (value: string) => {
                handleFieldChange('orderCategory', value);
                handleFieldChange('orderProduct', '');

                if (formValues.orderDate) {
                  const engineers = await getAvailableEngineers(formValues.orderDate, value);
                  handleFieldChange('availableEngineers', engineers);
                  handleFieldChange('selectedEngineerId', null);
                  handleFieldChange('orderEngineerName', '');
                }
              },
            },
            dropdownprops: {
              label: '세부품목 선택',
              value: formValues.orderProduct,
              onChange: async (value: string) => {
                handleFieldChange('orderProduct', value);

                if (formValues.orderDate) {
                  const engineers = await getAvailableEngineers(formValues.orderDate, value);
                  handleFieldChange('availableEngineers', engineers);
                }
              },
            },
            customInputValue: formValues.orderRemark,
            onProductChange: (value: string) => handleFieldChange('orderRemark', value),
          } as ShaCheckboxDropdownSelectorProps,
        },
      ],
    },
  },
  {
    titleprops: { text: '담당 기사' },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaDropdown' as ShaFormFieldType,
          prevprops: {
            label: '기사 선택',
            width: 'medium',
            options: formValues.availableEngineers || [],
            value: formValues.selectedEngineerId?.toString() || '',
            onChange: async (value: string) => {
              const engineerId = Number(value);
              handleFieldChange('selectedEngineerId', engineerId);

              const engineerInfo = await getEngineerInfo(engineerId);
              handleFieldChange('engineerInfo', engineerInfo || '');
              const selectedEngineer = formValues.availableEngineers?.find(
                (eng) => eng.value === value
              );
              if (selectedEngineer) {
                handleFieldChange('orderEngineerName', selectedEngineer.text);
              }
            },
          } as ShaDropdownProps,
        },
        {
          formfieldtype: 'ShaTextarea' as ShaFormFieldType,
          prevprops: {
            value: formValues.engineerInfo || '',
            size: 'large',
            rows: 7,
            readOnly: true,
            className: 'mt-2 bg-gray-50 h-fit',
          } as ShaTextareaProps,
        },
      ],
    },
  },

  // 2. 고객 정보 섹션
  {
    titleprops: { text: '고객성함' },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaInput' as ShaFormFieldType,
          prevprops: {
            placeholder: '고객성함',
            value: formValues.orderCustomerName,
            onChange: (value: string) => handleFieldChange('orderCustomerName', value),
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
            value: formValues.orderCustomerPhone,
            onChange: (value: string) => handleFieldChange('orderCustomerPhone', value),
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
            value: formValues.orderCustomerAddr,
            onChange: (value: string) => handleFieldChange('orderCustomerAddr', value),
          } as ShaInputProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '세척 특이사항',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaTextarea' as ShaFormFieldType,
          prevprops: {
            placeholder: '세척 특이사항을 입력해주세요',
            size: 'large',
            rows: 4,
            value: formValues.orderCustomerRemark,
            onChange: (value: string) => handleFieldChange('orderCustomerRemark', value),
          } as ShaTextareaProps,
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
            onChange: (value: string) => handleFieldChange('orderPayment', value),
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
            value: formValues.orderReceiptDocs,
            onChange: (value: string) => handleFieldChange('orderReceiptDocs', value),
          } as ShaDropdownProps,
        },
        {
          formfieldtype: 'ShaCheckbox' as ShaFormFieldType,
          prevprops: {
            isChecked: formValues.receiptDocsIssued,
            onChange: (checked: boolean) => handleFieldChange('receiptDocsIssued', checked),
            textprops: {
              text: '발행완료',
              className: 'start',
            },
          } as CheckboxProps,
        },
      ],
    },
  },

  {
    titleprops: { text: '세척금액' },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaNumericInput' as ShaFormFieldType,
          prevprops: {
            value: formValues.orderTotalAmount.toString(),
            onChange: (value: string) => {
              const newOrderTotal = Number(value);
              handleFieldChange('orderTotalAmount', newOrderTotal);
              const totalAmount =
                newOrderTotal -
                (formValues.depositPaid ? formValues.orderDeposit : 0) -
                (formValues.orderIsDiscount ? formValues.orderDiscountRatio : 0);
              handleFieldChange('totalAmount', totalAmount);
            },
            size: 'medium',
            placeholder: '세척금액을 입력하세요',
            validate: isNumberOnly,
          } as ShaNumericInputProps,
        },
      ],
    },
  },

  {
    titleprops: { text: '세척대수' },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaNumericInput' as ShaFormFieldType,
          prevprops: {
            value: formValues.orderCount.toString(),
            onChange: (value: string) => handleFieldChange('orderCount', Number(value)),
            size: 'medium',
            unit: '대',
            placeholder: '세척대수를 입력하세요',
            showSpinner: true,
            min: 0,
            max: 999,
            step: 1,
            validate: isNumberOnly,
          } as ShaNumericInputProps,
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
              checked: formValues.depositPaid,
              onCheckedChange: (checked: boolean) => {
                handleFieldChange('depositPaid', checked);
                const totalAmount =
                  formValues.orderTotalAmount -
                  (checked ? formValues.orderDeposit : 0) -
                  (formValues.orderIsDiscount ? formValues.orderDiscountRatio : 0);
                handleFieldChange('totalAmount', totalAmount);
              },
              label: '계약금 입금완료',
            },
            numericInputProps: {
              value: formValues.orderDeposit.toString(),
              onChange: (value: string) => {
                const newDeposit = Number(value);
                handleFieldChange('orderDeposit', newDeposit);
                const totalAmount =
                  formValues.orderTotalAmount -
                  (formValues.depositPaid ? newDeposit : 0) -
                  (formValues.orderIsDiscount ? formValues.orderDiscountRatio : 0);
                handleFieldChange('totalAmount', totalAmount);
              },
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
    titleprops: { text: '할인 여부' },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaDiscountCheckbox' as ShaFormFieldType,
          prevprops: {
            checkboxProps: {
              checked: formValues.orderIsDiscount,
              onCheckedChange: (checked: boolean) => {
                handleFieldChange('orderIsDiscount', checked);
                const totalAmount =
                  formValues.orderTotalAmount -
                  (formValues.depositPaid ? formValues.orderDeposit : 0) -
                  (checked ? formValues.orderDiscountRatio : 0);
                handleFieldChange('totalAmount', totalAmount);
              },
              label: '할인 적용',
            },
            numericInputProps: {
              value: formValues.orderDiscountRatio.toString(),
              onChange: (value: string) => {
                const newDiscount = Number(value);
                handleFieldChange('orderDiscountRatio', newDiscount);
                const totalAmount =
                  formValues.orderTotalAmount -
                  (formValues.depositPaid ? formValues.orderDeposit : 0) -
                  (formValues.orderIsDiscount ? newDiscount : 0);
                handleFieldChange('totalAmount', totalAmount);
              },
              max: 1000000,
              size: 'medium',
              placeholder: '할인금액',
              validate: isNumberOnly,
            },
          } as ShaDiscountCheckboxProps,
        },
      ],
    },
  },
  {
    titleprops: { text: '총금액' },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaNumericInput' as ShaFormFieldType,
          prevprops: {
            value: formValues.totalAmount.toString(),
            size: 'medium',
            placeholder: '총금액',
            disabled: true,
            className: 'bg-gray-50',
            validate: isNumberOnly,
          } as ShaNumericInputProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '금액 특이사항',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaTextarea' as ShaFormFieldType,
          prevprops: {
            placeholder: '금액 특이사항을 입력해주세요',
            size: 'large',
            rows: 4,
            value: formValues.orderRemark,
            onChange: (value: string) => handleFieldChange('orderRemark', value),
          } as ShaTextareaProps,
        },
      ],
    },
  },
];

export default EditOrderForm;
