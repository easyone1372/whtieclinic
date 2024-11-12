import ShaCheckbox, { TextProps } from '@/components/atom/CheckBox/ShaCheckBox';

export type ShaOneCheckboxProps = {
  checkboxes: {
    [key: string]: {
      textprops: TextProps;
    };
  };
  onChange: (selectedKey: string) => void;
  value: string;
};

const OneCheckbox = ({ checkboxes, onChange, value }: ShaOneCheckboxProps) => {
  const handleCheckboxChange = (key: string) => (checked: boolean) => {
    onChange(checked ? key : '');
  };

  return (
    <div className="flex gap-4">
      {Object.entries(checkboxes).map(([key, { textprops }]) => (
        <ShaCheckbox
          key={key}
          isChecked={value === key}
          onChange={handleCheckboxChange(key)}
          textprops={textprops}
        />
      ))}
    </div>
  );
};

export default OneCheckbox;
