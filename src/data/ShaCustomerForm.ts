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
import { format } from 'date-fns';
import { Payment } from '@/constants/Payment';
import { Document } from '@/constants/Document';
import { productCategories } from './ProductCategory';
import { isHangulOnly, isNumberOnly } from '@/constants/validation';
import { getAvailableEngineers, getEngineerInfo } from '@/service/Order/EngSchedul';
import { fetchEngineers } from '@/service/EngineerList/EngineerList';

// 통합된 폼 값 타입
export type OrderFormValues = {
  // 예약 정보

  // 고객 정보
  customerName: string;
  customerPhone: string;
  customerAddr: string;
  customerRemark: string;

  // 주문 정보
  orderProduct: string;
  orderProductDetail: string;

  orderTotalAmount: number;
  orderCount: number;
  orderIsDiscount: boolean; // 할인 여부
  orderDiscountRatio: number; // 할인금액
  orderRemark?: string; // 특이사항
  orderDeposit: number; //계약금 금액
  depositPayed: boolean; // 계약금 여부
  orderPayment: string;
  orderRecieptDocs: string;
  recieptDocsIssued: boolean;

  // 기사 정보 표시용
  orderDate: string;
  selectedEngineerId: number | null;
  engineerInfo?: string;
  availableEngineers?: { value: string; text: string }[];
};

interface Engineer {
  engineerId: number;
  engineerName: string;
  engineerSkills: string[];
  engineerAddress: string;
  engineerPhone: string;
  engineerAvailability: boolean;
}

export const ShaOrderFormData = (
  formValues: OrderFormValues,
  handleFieldChange: (fieldName: keyof OrderFormValues, value: any) => void
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
            value: formValues.orderDate
              ? new Date(formValues.orderDate.replace(' ', 'T') + ':00:00') // "2024-11-16 12" -> Date 객체로 변환
              : null,
            onChange: async (newValue: Date | null) => {
              if (newValue) {
                // Date 객체를 "2024-11-16 12" 형식으로 변환
                const formattedDate = format(newValue, 'yyyy-MM-dd HH');
                handleFieldChange('orderDate', formattedDate);

                // 가능한 엔지니어 목록 업데이트
                const availableEngineers = await getAvailableEngineers(
                  formattedDate,
                  formValues.orderProduct
                );
                handleFieldChange('availableEngineers', availableEngineers);

                // 선택된 엔지니어가 새 시간에 가능한지 확인
                if (formValues.selectedEngineerId) {
                  const isStillAvailable = availableEngineers.some(
                    (eng) => eng.value === formValues.selectedEngineerId?.toString()
                  );
                  if (!isStillAvailable) {
                    handleFieldChange('selectedEngineerId', null);
                    handleFieldChange('engineerInfo', '');
                  }
                }
              } else {
                handleFieldChange('orderDate', '');
                handleFieldChange('availableEngineers', []);
                handleFieldChange('selectedEngineerId', null);
                handleFieldChange('engineerInfo', '');
              }
            },
          } as ShaDateTimePickerProps,
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
            options: formValues.availableEngineers || [], // 가능한 엔지니어 목록 사용
            value: formValues.selectedEngineerId?.toString() || '',
            onChange: async (value: string) => {
              const engineerId = Number(value);
              handleFieldChange('selectedEngineerId', engineerId);

              // 엔지니어 정보 가져오기
              const engineerInfo = await getEngineerInfo(engineerId);
              if (engineerInfo) {
                handleFieldChange('engineerInfo', engineerInfo);
              }
            },
          } as ShaDropdownProps,
        },
        {
          formfieldtype: 'ShaTextarea' as ShaFormFieldType,
          prevprops: {
            value: formValues.engineerInfo || '',
            size: 'large',
            rows: 5,
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
            value: formValues.customerName,
            onChange: (value: string) => handleFieldChange('customerName', value),
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
            value: formValues.customerPhone,
            onChange: (value: string) => handleFieldChange('customerPhone', value),
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
            value: formValues.customerAddr,
            onChange: (value: string) => handleFieldChange('customerAddr', value),
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

  // 3. 세척 정보 섹션

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
                  textprops: { text: productCategories.airConditioner.product },
                },
                washingMachine: {
                  textprops: { text: productCategories.washingMachine.product },
                },
              },
              value: formValues.orderProduct?.split(':')[0],
              onChange: (value: string) => {
                handleFieldChange('orderProduct', value); // 에어컨/세탁기
                handleFieldChange('orderProductDetail', '');

                handleFieldChange('selectedEngineerId', null);
                handleFieldChange('engineerInfo', '');
                handleFieldChange('availableEngineers', []);
              },
            },
            dropdownprops: {
              label: '카테고리 선택',
              width: 'small',
              options: formValues.orderProduct
                ? productCategories[
                    formValues.orderProduct.split(':')[0] === '에어컨'
                      ? 'airConditioner'
                      : 'washingMachine'
                  ].categories.map((item) => ({ value: item.category, text: item.category }))
                : [],
              value: formValues.orderProduct?.split(':')[1],
              onChange: async (value: string) => {
                const product = formValues.orderProduct?.split(':')[0];
                handleFieldChange('orderProduct', `${product}:${value}`);
                handleFieldChange('orderProductDetail', value);

                if (formValues.orderDate) {
                  // 1. 먼저 모든 엔지니어 데이터 가져오기
                  const allEngineers = await fetchEngineers();
                  // 2. 날짜/시간 기반으로 가능한 엔지니어 가져오기
                  const availableEngineers = await getAvailableEngineers(formValues.orderDate);

                  // 3. 스킬 기반으로 필터링
                  const filteredEngineers = availableEngineers.filter((eng) => {
                    const engineer = allEngineers.find(
                      (e) => e.engineerId.toString() === eng.value
                    );
                    return engineer?.engineerSkills?.includes(value);
                  });

                  handleFieldChange('availableEngineers', filteredEngineers);

                  // 4. 선택된 엔지니어가 여전히 가능한지 확인
                  if (formValues.selectedEngineerId) {
                    const isStillAvailable = filteredEngineers.some(
                      (eng) => eng.value === formValues.selectedEngineerId?.toString()
                    );
                    if (!isStillAvailable) {
                      handleFieldChange('selectedEngineerId', null);
                      handleFieldChange('engineerInfo', '');
                      handleFieldChange('engineerInfo', '가능한 기사가 없습니다.');
                    }
                  }
                }
              },
            },
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
            validate: isNumberOnly, // 숫자만 허용
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
              validate: isNumberOnly,
            },
          } as ShaDiscountCheckboxProps,
        },
      ],
    },
  },
];

export default ShaOrderFormData;
