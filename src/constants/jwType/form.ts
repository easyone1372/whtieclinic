// form.ts

// 필요한 컴포넌트와 타입 import
import { ShaTitledFormControlProps } from '@/components/molecules/Form/ShaTitledFormControl';
import { productCategories } from '@/constants/productCategory';
import { ShaFormFieldType } from '@/components/molecules/Form/ShaFormField';
import { ShaOneCheckboxProps } from '@/components/molecules/checkbox/ShaOneCheckBox';
import { ShaDropdownProps } from '@/components/atom/DropdownBox/ShaDropDown';
import { ShaCheckboxDropdownSelectorProps } from '@/components/molecules/Customer/ShaCheckBoxDropDownSelector';
import { ShaTextareaProps } from '@/components/atom/Input/ShaTextArea';
import { ShaNumericInputProps } from '@/components/molecules/input/ShaNumericInput';
import { ShaDiscountCheckboxProps } from '@/components/molecules/Customer/ShaDiscountCheckBox';

// 제품 카테고리 타입 정의
type ProductCategoryKey = keyof typeof productCategories;

// 판매 폼 데이터 타입 정의
export type SalesFormData = {
  // 필수 필드
  order_id: number;
  product_type_id: number | null;
  product_detail_id: number | null;
  count: number;
  discount_amount: number;
  total_amount: number;

  // 선택적 필드
  product_remark?: string;
  remark?: string;

  // UI 컨트롤용 필드
  selectedCategory: ProductCategoryKey | '';
  selectedDropdownValue: string;
  isDiscountApplied: boolean;
  customProduct: string;
};

// 판매 정보 props 타입 정의
type SalesInfoProps = {
  onCategoryChange: (category: ProductCategoryKey) => void;
  onDropdownChange: (value: string) => void;
  onItemCountChange: (value: string) => void;
  onDiscountChange: (value: string) => void;
  onRemarkChange: (value: string) => void;
  onProductRemarkChange: (value: string) => void;
  onDiscountToggle: (checked: boolean) => void;
  onTotalAmountChange: (value: string) => void;
  formData: SalesFormData;
  isSubmitAttempted: boolean;
};

// 판매 정보 폼 데이터 생성 함수
export const ShaSalesInfoFormData = ({
  onCategoryChange,
  onDropdownChange,
  onItemCountChange,
  onDiscountChange,
  onRemarkChange,
  onProductRemarkChange,
  onDiscountToggle,
  onTotalAmountChange,
  formData,
  isSubmitAttempted,
}: SalesInfoProps): ShaTitledFormControlProps[] => {
  // 폼 데이터에서 필요한 값 추출
  const {
    count,
    discount_amount,
    total_amount,
    product_remark,
    remark,
    selectedDropdownValue,
    selectedCategory,
    isDiscountApplied,
    customProduct,
  } = formData;

  // 폼 필드 정의 및 반환
  return [
    // 세척품목 섹션
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
                onChange: onDropdownChange,
                required: true,
                error: '세척품목을 선택해주세요',
                showError: isSubmitAttempted,
                options: selectedCategory
                  ? productCategories[selectedCategory].categories.map((category) => ({
                      value: category.category,
                      text: category.category,
                    }))
                  : [], // 선택된 카테고리가 없을 경우 빈 배열 반환
              } as ShaDropdownProps,
            } as ShaCheckboxDropdownSelectorProps,
          },
        ],
      },
    },

    // 세척금액 섹션
    {
      titleprops: { text: '세척금액' },
      formfieldprops: {
        fields: [
          {
            formfieldtype: 'ShaNumericInput' as ShaFormFieldType,
            prevprops: {
              value: total_amount.toString(),
              onChange: onTotalAmountChange,
              size: 'medium',
              placeholder: '세척금액을 입력하세요',
              required: true,
              showError: isSubmitAttempted,
            } as ShaNumericInputProps,
          },
        ],
      },
    },

    // 세척대수 섹션
    {
      titleprops: { text: '세척대수' },
      formfieldprops: {
        fields: [
          {
            formfieldtype: 'ShaNumericInput' as ShaFormFieldType,
            prevprops: {
              placeholder: '세척대수를 입력하세요',
              value: count.toString(),
              onChange: onItemCountChange,
              size: 'medium',
              unit: '대',
              showSpinner: true,
              min: 1,
              max: 999,
              step: 1,
              required: true,
              showError: isSubmitAttempted,
            } as ShaNumericInputProps,
          },
        ],
      },
    },

    // 할인 여부 섹션
    {
      titleprops: { text: '할인 여부' },
      formfieldprops: {
        fields: [
          {
            formfieldtype: 'ShaDiscountCheckbox' as ShaFormFieldType,
            prevprops: {
              checkboxProps: {
                checked: isDiscountApplied,
                onCheckedChange: onDiscountToggle,
                label: '할인 적용',
              },
              numericInputProps: {
                value: discount_amount.toString(),
                onChange: onDiscountChange,
                max: total_amount,
                size: 'medium',
                placeholder: '할인금액',
              },
            } as ShaDiscountCheckboxProps,
          },
        ],
      },
    },

    // 제품 특이사항 섹션
    {
      titleprops: { text: '제품 특이사항' },
      formfieldprops: {
        fields: [
          {
            formfieldtype: 'ShaTextarea' as ShaFormFieldType,
            prevprops: {
              placeholder: '제품 관련 특이사항을 입력하세요',
              value: product_remark || '',
              onChange: onProductRemarkChange,
              size: 'large',
              rows: 4,
            } as ShaTextareaProps,
          },
        ],
      },
    },

    // 기타 특이사항 섹션
    {
      titleprops: { text: '기타 특이사항' },
      formfieldprops: {
        fields: [
          {
            formfieldtype: 'ShaTextarea' as ShaFormFieldType,
            prevprops: {
              placeholder: '기타 특이사항을 입력하세요',
              value: remark || '',
              onChange: onRemarkChange,
              size: 'large',
              rows: 4,
            } as ShaTextareaProps,
          },
        ],
      },
    },
  ];
};
