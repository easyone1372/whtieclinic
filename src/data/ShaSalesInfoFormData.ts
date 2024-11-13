import { ShaTitledFormControlProps } from '@/components/molecules/Form/ShaTitledFormControl';
import { ShaFormFieldType } from '@/components/molecules/Form/ShaFormField';
import { productCategories } from '@/constants/productCategory';
import { ShaOneCheckboxProps } from '@/components/molecules/checkbox/ShaOneCheckBox';
import { ShaDropdownProps } from '@/components/atom/DropdownBox/ShaDropDown';
import { ShaCheckboxDropdownSelectorProps } from '@/components/molecules/Customer/ShaCheckBoxDropDownSelector';
import { ShaTextareaProps } from '@/components/atom/Input/ShaTextArea';
import { ShaNumericInputProps } from '@/components/molecules/input/ShaNumericInput';
import { ShaDiscountCheckboxProps } from '@/components/molecules/Customer/ShaDiscountCheckBox';

type ProductCategoryKey = keyof typeof productCategories;

type SalesFormData = {
  itemCount: number;
  discountAmount: number;
  finalPrice: number;
  uniqueDetails: string;
  customProduct: string;
  selectedDropdownValue: string;
  selectedCategory: ProductCategoryKey | '';
  isDiscountApplied: boolean;
};

type SalesInfoProps = {
  onCategoryChange: (category: ProductCategoryKey) => void;
  onDropdownChange: (value: string) => void;
  onItemCountChange: (value: string) => void;
  onDiscountChange: (value: string) => void;
  onUniqueDetailsChange: (value: string) => void;
  onCustomProductChange: (value: string) => void;
  onDiscountToggle: (checked: boolean) => void;
  onFinalPriceChange: (value: string) => void;
  formData: SalesFormData;
  isSubmitAttempted: boolean; // 이 부분 추가
};

export const ShaSalesInfoFormData = ({
  onCategoryChange,
  onDropdownChange,
  onItemCountChange,
  onDiscountChange,
  onUniqueDetailsChange,
  onCustomProductChange,
  onDiscountToggle,
  onFinalPriceChange,
  formData,
  isSubmitAttempted,
}: SalesInfoProps): ShaTitledFormControlProps[] => {
  const {
    itemCount,
    discountAmount,
    finalPrice,
    uniqueDetails,
    customProduct,
    selectedDropdownValue,
    selectedCategory,
    isDiscountApplied,
  } = formData;

  return [
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
                value: selectedCategory,
                onChange: onCategoryChange,
              } as ShaOneCheckboxProps,
              dropdownprops: {
                label: '카테고리 선택',
                width: 'small',
                value: selectedDropdownValue,
                onChange: (value: string) => onDropdownChange(value),
              } as ShaDropdownProps,
              customInputValue: customProduct,
              onProductChange: onCustomProductChange,
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
              value: finalPrice.toString(),
              onChange: onFinalPriceChange,
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
              placeholder: '세척대수를 입력하세요',
              value: itemCount.toString(),
              onChange: onItemCountChange,
              size: 'medium',
              unit: '대',
              showSpinner: true, // 스피너 표시 활성화
              min: 0, // 최소값 설정
              max: 999, // 최대값 설정 (필요에 따라 조절)
              step: 1, // 증감 단위 설정
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
                checked: isDiscountApplied,
                onCheckedChange: (checked: boolean) => onDiscountToggle(checked),
                label: '할인 적용',
              },
              numericInputProps: {
                value: discountAmount.toString(),
                onChange: onDiscountChange,
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
              value: uniqueDetails,
              onChange: onUniqueDetailsChange,
              size: 'large',
              rows: 4,
            } as ShaTextareaProps,
          },
        ],
      },
    },
  ];
};
