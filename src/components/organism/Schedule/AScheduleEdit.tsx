import CustomerRegister from '../Customer/ShaCustomer';
import ShaScheduleRes from './ShaScheduleRes';

const AScheduleEdit = () => {
  return (
    <div className="flex">
      <div className="w-[500px]">
        <ShaScheduleRes />
      </div>
      <CustomerRegister />
    </div>
  );
};

export default AScheduleEdit;
