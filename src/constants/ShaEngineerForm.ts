import { Days } from './Days';
import { Percentage } from './Percentage';
import { ShaTitledFormControlProps } from '@/components/molecules/Form/ShaTitledFormControl';
import { ShaFormFieldType } from '@/components/molecules/Form/ShaFormField';
import { ShaInputProps } from '@/components/atom/Input/ShaInput';
import { ShaLabelCheckBoxProps } from '@/components/molecules/Engineer/ShaLabelCheckBox';
import { ShaDropdownProps } from '@/components/atom/DropdownBox/ShaDropDown';
import { ShaHolidayRegistrationProps } from '@/components/molecules/Engineer/ShaHolidayRegistration';
import { ShaHolidayProps } from '@/components/molecules/Engineer/ShaHoliday';
import { ShaTextareaProps } from '@/components/atom/Input/ShaTextArea';
import { DayNameEnum, RateEnum } from './types/LHH/EngineerRegisterType';

export type EngineerFormValues = {
  engineerId?: number;
  name: string; // 기존: name
  phoneNumber: string; // 기존: phoneNumber
  location: string; // 기존: residenceArea
  skills: string[]; // 기존: Items
  skillRemark: string; // 기존: ItemsSpecialNotes
  remark: string; // 기존: specialNotes
  commissionRate: RateEnum; // 기존: allowanceRate
  paymentDay: DayNameEnum; // 기존: paymentDay
  specialHolidays: Date[]; // 기존: holidayRegistration
  regularHolidays: DayNameEnum[]; // 기존: regularHoliday
};

export const EngineerFormData = (
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
            value: formValues.location, // residenceArea → location
            onChange: (value: string) => handleFieldChange('location', value),
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
            selectedItems: formValues.skills, // Items → skills
            onItemsChange: (newItems: string[]) => handleFieldChange('skills', newItems),
          } as ShaLabelCheckBoxProps,
        },
        {
          formfieldtype: 'ShaTextarea' as ShaFormFieldType,
          prevprops: {
            placeholder: '특이사항을 입력해주세요',
            size: 'large',
            rows: 1,
            value: formValues.skillRemark, // ItemsSpecialNotes → skillRemark
            onChange: (value: string) => handleFieldChange('skillRemark', value),
          } as ShaTextareaProps,
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
            value: formValues.remark, // specialNotes → remark
            onChange: (value: string) => handleFieldChange('remark', value),
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
            value: formValues.commissionRate, // allowanceRate → commissionRate
            required: true,
            error: '수당률을 선택해주세요',
            onChange: (value: string) => handleFieldChange('commissionRate', value),
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
            value: formValues.paymentDay,
            required: true,
            error: '급여요일을 선택해주세요',
            onChange: (value: string) => handleFieldChange('paymentDay', value),
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
            registeredHolidays: formValues.specialHolidays, // holidayRegistration → specialHolidays
            onHolidaysChange: (newDays: Date[]) => handleFieldChange('specialHolidays', newDays),
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
            selectedDays: formValues.regularHolidays, // regularHoliday → regularHolidays
            onDaysChange: (newDays: string[]) => handleFieldChange('regularHolidays', newDays),
          } as ShaHolidayProps,
        },
      ],
    },
  },
];
