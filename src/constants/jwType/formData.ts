// FormData.ts
import { ShaTitledFormControlProps } from "@/components/molecules/Form/ShaTitledFormControl";
import { ShaFormFieldType } from "@/components/molecules/Form/ShaFormField";
import { ShaDateTimePickerProps } from "@/components/molecules/ADateTimePicker/ShaDateTimePicker";
import { ShaDropdownProps } from "@/components/atom/DropdownBox/ShaDropDown";
import { ShaInputProps } from "@/components/atom/Input/ShaInput";
import { ShaTextareaProps } from "@/components/atom/Input/ShaTextArea";
import { CheckboxProps } from "@/components/atom/CheckBox/ShaCheckBox";
import { CustomerFormValues, EngineerTimeFormValues } from "./jwtype_edit";



// 엔지니어 시간 폼
export const ShaEngTimeEditFormData = (
    formValues: EngineerTimeFormValues,
    handleFieldChange: (fieldName: keyof EngineerTimeFormValues, value: any) => void
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
              value: formValues.booking_date,
              onChange: (newValue: Date | null) => handleFieldChange('booking_date', newValue || new Date()),
              required: true,
            } as ShaDateTimePickerProps,
          },
        ],
      },
    },
    {
      titleprops: {
        text: '기사 선택',
      },
      formfieldprops: {
        fields: [
          {
            formfieldtype: 'ShaDropdown' as ShaFormFieldType,
            prevprops: {
              label: '기사 선택',
              width: 'medium',
              options: [], // API에서 기사 목록 가져오기
              value: formValues.name,
              required: true,
              onChange: (value: string) => {
                handleFieldChange('name', value);
              },
            } as ShaDropdownProps,
          },
        ],
      },
    },
  ];
  
  // 고객 정보 폼
  export const EditOrderCustomerFormData = (
    formValues: CustomerFormValues,
    handleFieldChange: (fieldName: keyof CustomerFormValues, value: any) => void,
    handleReceiptToggle: () => void,
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
              value: formValues.customer_name,
              onChange: (value: string) => handleFieldChange('customer_name', value),
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
              value: formValues.phone_number,
              onChange: (value: string) => handleFieldChange('phone_number', value),
              showError: isSubmitAttempted,
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
              value: formValues.location,
              onChange: (value: string) => handleFieldChange('location', value),
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
              value: formValues.remark,
              onChange: (value: string) => handleFieldChange('remark', value),
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
                  options: [], // payment_type 테이블에서 가져온 데이터로 채워야 함
                  value: formValues.payment_method_type_id?.toString() || '', // null check 추가
                  required: true,
                  error: '결제방식을 선택해주세요',
                  onChange: (value: string) => handleFieldChange('payment_method_type_id', value ? Number(value) : null),
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
                  options: [], // receipt_docs 테이블에서 가져온 데이터로 채워야 함
                  value: formValues.receipt_docs_id?.toString() || '', // null check 추가
                  onChange: (value: string) => handleFieldChange('receipt_docs_id', value ? Number(value) : null),
                } as ShaDropdownProps,
              },
              {
                formfieldtype: 'ShaCheckbox' as ShaFormFieldType,
                prevprops: {
                  textprops: { text: '발행완료' },
                  isChecked: formValues.receipt_issued || false, // null check 추가
                  onChange: handleReceiptToggle,
                  className: 'mt-2',
                } as CheckboxProps,
          },
        ],
      },
    },
  ];

  // 결제 관련 UI 옵션
export const paymentMethodOptions = [
    { value: '1', label: '계좌이체' },
    { value: '2', label: '카드결제' },
    { value: '3', label: '숨고페이' },
    { value: '4', label: '현금결제' },
  ];
  
  export const receiptTypeOptions = [
    { value: '1', label: '간이영수증' },
    { value: '2', label: '세금계산서' },
    { value: '3', label: '현금영수증' },
    { value: '4', label: '카드영수증' },
    { value: '5', label: '필요없음' },
  ];