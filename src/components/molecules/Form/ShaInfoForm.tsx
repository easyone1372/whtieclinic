import React from 'react';
import ShaTitledFormControl, { ShaTitledFormControlProps } from './ShaTitledFormControl';

type ShaInfoFormProps = {
  ShaTitledFormControlProps: ShaTitledFormControlProps[];
};

const ShaInfoForm: React.FC<ShaInfoFormProps> = ({ ShaTitledFormControlProps }) => {
  return (
    <div className="flex flex-col gap-7">
      {ShaTitledFormControlProps.map((props, index) => (
        <ShaTitledFormControl key={index} {...props} />
      ))}
    </div>
  );
};

export default ShaInfoForm;
