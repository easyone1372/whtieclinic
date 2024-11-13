import { Days } from '../constants/Days';
import { Percentage } from '../constants/Percentage';
import { ShaFormFieldType } from '@/components/molecules/Form/ShaFormField';
import { ShaInputProps } from '@/components/atom/Input/ShaInput';
import { ShaLabelCheckBoxProps } from '@/components/molecules/Engineer/ShaLabelCheckBox';
import { ShaDropdownProps } from '@/components/atom/DropdownBox/ShaDropDown';
import { ShaHolidayRegistrationProps } from '@/components/molecules/Engineer/ShaHolidayRegistration';
import { ShaHolidayProps } from '@/components/molecules/Engineer/ShaHoliday';
import { ShaTextareaProps } from '@/components/atom/Input/ShaTextArea';
import { ShaTitledFormControlProps } from '@/components/molecules/Form/ShaTitledFormControl';

export type EngineerFormValues = {
  engineerId?: number;
  engineerName: string; // name -> engineerName
  engineerPhone: string; // phoneNumber -> engineerPhone
  engineerAddr: string; // location -> engineerAddr
  skills: string[]; // 그대로 유지 (Many-to-Many 관계를 위한 필드)
  engineerRemark?: string; // remark -> engineerRemark
  engineerCommission: number; // commissionRate -> engineerCommission
  engineerPayday?: string; // paymentDay -> engineerPayday
  engineerHoliday?: string; // regularHolidays -> engineerHoliday
  engineerDayoff?: string; // specialHolidays -> engineerDayoff
};

export const ShaEngineerFormData = (
  formValues: EngineerFormValues,
  handleFieldChange: (fieldName: keyof EngineerFormValues, value: any) => void,
  isSubmitAttempted: boolean
): ShaTitledFormControlProps[] => [
  {
    titleprops: {
      text: '기사성함',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaInput' as ShaFormFieldType,
          prevprops: {
            placeholder: '기사성함',
            required: true,
            error: '기사성함을 입력해주세요',
            value: formValues.engineerName,
            onChange: (value: string) => handleFieldChange('engineerName', value),
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
            value: formValues.engineerPhone,
            onChange: (value: string) => handleFieldChange('engineerPhone', value),
            showError: isSubmitAttempted,
          } as ShaInputProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '거주지역',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaInput' as ShaFormFieldType,
          prevprops: {
            placeholder: '거주지역',
            required: true,
            error: '거주지역을 입력해주세요',
            value: formValues.engineerAddr,
            onChange: (value: string) => handleFieldChange('engineerAddr', value),
            showError: isSubmitAttempted,
          } as ShaInputProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '가능품목',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaLabelCheckBox' as ShaFormFieldType,
          prevprops: {
            selectedItems: formValues.skills,
            onItemsChange: (newItems: string[]) => handleFieldChange('skills', newItems),
          } as ShaLabelCheckBoxProps,
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
            rows: 1,
            value: formValues.engineerRemark,
            onChange: (value: string) => handleFieldChange('engineerRemark', value),
          } as ShaTextareaProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '수당률',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaDropdown' as ShaFormFieldType,
          prevprops: {
            label: '선택',
            width: 'medium',
            options: Percentage.map((payment) => ({
              value: payment,
              text: payment,
            })),
            value: formValues.engineerCommission.toString(),
            required: true,
            error: '수당률을 선택해주세요',
            onChange: (value: string) => handleFieldChange('engineerCommission', Number(value)),
            showError: isSubmitAttempted,
          } as ShaDropdownProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '급여요일',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaDropdown' as ShaFormFieldType,
          prevprops: {
            label: '선택',
            width: 'medium',
            options: Days.map((days) => ({
              value: days,
              text: days,
            })),
            value: formValues.engineerPayday,
            required: true,
            error: '급여요일을 선택해주세요',
            onChange: (value: string) => handleFieldChange('engineerPayday', value),
            showError: isSubmitAttempted,
          } as ShaDropdownProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '휴무등록',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaHolidayRegistration' as ShaFormFieldType,
          prevprops: {
            registeredHolidays: formValues.engineerHoliday,
            onHolidaysChange: (dates: string) => {
              handleFieldChange('engineerHoliday', dates);
            },
          } as ShaHolidayRegistrationProps,
        },
      ],
    },
  },
  {
    titleprops: {
      text: '정기휴무',
    },
    formfieldprops: {
      fields: [
        {
          formfieldtype: 'ShaHoliday' as ShaFormFieldType,
          prevprops: {
            selectedDays: formValues.engineerHoliday ? [formValues.engineerHoliday] : [],
            onDaysChange: (newDays: string[]) => {
              handleFieldChange('engineerDayoff', newDays[0] || null);
            },
          } as ShaHolidayProps,
        },
      ],
    },
  },
];
