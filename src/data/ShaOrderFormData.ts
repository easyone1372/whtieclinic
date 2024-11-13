import { ShaTitledFormControlProps } from '@/components/molecules/Form/ShaTitledFormControl';
import { ShaFormFieldType } from '@/components/molecules/Form/ShaFormField';
import { ShaOneCheckboxProps } from '@/components/molecules/checkbox/ShaOneCheckBox';
import { ShaDropdownProps } from '@/components/atom/DropdownBox/ShaDropDown';
import { ShaCheckboxDropdownSelectorProps } from '@/components/molecules/Customer/ShaCheckBoxDropDownSelector';
import { ShaTextareaProps } from '@/components/atom/Input/ShaTextArea';
import { ShaNumericInputProps } from '@/components/molecules/input/ShaNumericInput';
import { ShaDiscountCheckboxProps } from '@/components/molecules/Customer/ShaDiscountCheckBox';
import { productCategories } from './ProductCategory';

export type OrderFormValues = {
  orderCategory: string; // 세척품목 카테고리
  orderProduct: string; // 선택된 제품 또는 커스텀 제품명
  orderTotalAmount: number; // 세척금액
  orderCount: number; // 세척대수
  orderIsDiscount: boolean; // 할인 여부
  orderDiscountRatio: number; // 할인금액
  orderRemark?: string; // 특이사항
};

export const ShaOrderFormData = (
  formValues: OrderFormValues,
  handleFieldChange: (fieldName: keyof OrderFormValues, value: any) => void,
  isSubmitAttempted: boolean
): ShaTitledFormControlProps[] => [
  {
    titleprops: { text: '세척품목' },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaCheckboxDropdownSelector' as ShaFormFieldType,
          prevprops: {
            onecheckboxprops: {
              checkboxes: {
                airConditioner: {
                  textprops: {
                    text: productCategories.airConditioner.product,
                  },
                },
                washingMachine: {
                  textprops: {
                    text: productCategories.washingMachine.product,
                  },
                },
              },
              value: formValues.orderCategory?.split(':')[0],
              onChange: (value: string) => {
                handleFieldChange('orderCategory', value);
                handleFieldChange('orderProduct', '');
              },
            } as ShaOneCheckboxProps,
            dropdownprops: {
              label: '카테고리 선택',
              width: 'small',
              options: formValues.orderCategory
                ? productCategories[
                    formValues.orderCategory.split(':')[0] === '에어컨'
                      ? 'airConditioner'
                      : 'washingMachine'
                  ].categories.map((item) => ({
                    value: item.category,
                    text: item.category,
                  }))
                : [],
              value: formValues.orderCategory?.split(':')[1],
              onChange: (value: string) => {
                const product = formValues.orderCategory?.split(':')[0];
                handleFieldChange('orderCategory', `${product}:${value}`);
                handleFieldChange('orderProduct', value);
              },
            } as ShaDropdownProps,
          } as ShaCheckboxDropdownSelectorProps,
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
            onChange: (value: string) => handleFieldChange('orderTotalAmount', Number(value)),
            size: 'medium',
            placeholder: '세척금액을 입력하세요',
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
          } as ShaNumericInputProps,
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
              onCheckedChange: (checked: boolean) => handleFieldChange('orderIsDiscount', checked),
              label: '할인 적용',
            },
            numericInputProps: {
              value: formValues.orderDiscountRatio.toString(),
              onChange: (value: string) => handleFieldChange('orderDiscountRatio', Number(value)),
              max: 1000000,
              size: 'medium',
              placeholder: '할인금액',
            },
          } as ShaDiscountCheckboxProps,
        },
      ],
    },
  },
  {
    titleprops: { text: '특이사항' },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaTextarea' as ShaFormFieldType,
          prevprops: {
            placeholder: '특이사항을 입력하세요',
            value: formValues.orderRemark,
            onChange: (value: string) => handleFieldChange('orderRemark', value),
            size: 'large',
            rows: 4,
          } as ShaTextareaProps,
        },
      ],
    },
  },
];
