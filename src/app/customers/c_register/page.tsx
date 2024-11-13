import ShaFormTemplate from '@/components/organism/Template/ShaFormTemplate';
import { CustomerFormValues, ShaCustomerFormData } from '@/data/ShaCustomerFormData';
import { OrderFormValues, ShaOrderFormData } from '@/data/ShaOrderFormData';
import { customerApi } from '@/service/Customer/Customer';
import { orderApi } from '@/service/Order/Order';

const Page = () => {
  return (
    <div>
      <ShaFormTemplate<CustomerFormValues>
        title="고객 정보 등록"
        initialValues={{
          customerName: '',
          customerPhone: '',
          customerAddr: '',
          customerRemark: '',
          orderDate: '',
          orderCategory: '',
          orderProduct: '',
          orderTotalAmount: 0,
          orderCount: 1,
          orderIsDiscount: false,
          orderDiscountRatio: 0,
          orderRemark: '',
          orderDeposit: 0,
          depositPayed: false,
          orderPayment: '',
          orderRecieptDocs: '',
          recieptDocsIssued: false,
        }}
        onSubmit={customerApi.register}
        formDataGenerator={ShaCustomerFormData}
      />

      <ShaFormTemplate<OrderFormValues>
        title="세척 정보 등록"
        initialValues={{
          orderCategory: '',
          orderProduct: '',
          orderTotalAmount: 0,
          orderCount: 1,
          orderIsDiscount: false,
          orderDiscountRatio: 0,
          orderRemark: '',
        }}
        onSubmit={orderApi.register}
        formDataGenerator={ShaOrderFormData}
      />
    </div>
  );
};

export default Page;
