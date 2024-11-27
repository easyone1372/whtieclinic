// 'use client';

// import { useEffect, useState } from 'react';
// import ShaDrawer from '@/components/molecules/drawer/ShaDrawer';
// import ShaFormTemplate from '@/components/organism/Template/ShaFormTemplate';
// import ShaOrderFormData, { OrderFormValues } from '@/data/ShaCustomerForm';
// import api from '@/utils/axios';
// import orderApi from '@/service/Order/Order';

// // API 응답 타입 정의
// interface Order {
//   order_id: number;
//   engineer_id: number;
//   customer_id: number;
//   order_date: string;
//   engineer_name: string;
//   customer_name: string;
//   customer_addr: string;
//   customer_phone: string;
//   order_product: string;
//   order_product_detail: string;
//   order_count: number;
//   order_total_amount: number;
//   order_remarks: string | null;
//   customer_remarks: string | null;
// }

// const validationRules = [
//   (formValues: OrderFormValues) => !!formValues.orderDate,
//   (formValues: OrderFormValues) => !!formValues.orderCustomerName,
//   (formValues: OrderFormValues) => !!formValues.orderCustomerPhone,
//   (formValues: OrderFormValues) => !!formValues.orderCustomerAddr,
//   (formValues: OrderFormValues) => !!formValues.orderProduct,
//   (formValues: OrderFormValues) => formValues.orderCount > 0,
//   (formValues: OrderFormValues) => formValues.orderTotalAmount > 0,
// ];

// const OrderModify = () => {
//   const [filter, setFilter] = useState('');
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [formKey, setFormKey] = useState(0);

//   // 주문 목록을 불러오는 함수
//   const loadOrders = async () => {
//     try {
//       const response = await api.get<Order[]>('/order-management/orders');
//       setOrders(response.data);
//     } catch (error) {
//       console.error('Error loading orders:', error);
//     }
//   };

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   const handleFilterChange = (value: string) => setFilter(value);

//   const handleItemClick = async (item: Order) => {
//     setIsDrawerOpen(false);
//     setSelectedOrder(item);
//     setFormKey((prev) => prev + 1);
//   };

//   const orderToFormValues = (order: Order): OrderFormValues => ({
//     orderDate: order.order_date,
//     orderCustomerName: order.customer_name,
//     orderCustomerPhone: order.customer_phone,
//     orderCustomerAddr: order.customer_addr,
//     orderCustomerRemark: order.customer_remarks || '',
//     depositPayed: false, // API 응답에 없는 값들은 기본값 설정
//     orderDeposit: 0,
//     orderPayment: '',
//     orderReceiptDocs: '',
//     receiptDocsIssued: false,
//     orderCategory: order.order_product,
//     orderProduct: `${order.order_product}:${order.order_product_detail}`,
//     orderRemark: order.order_remarks || '',
//     orderCount: order.order_count || 0,
//     orderTotalAmount: order.order_total_amount,
//     orderIsDiscount: false,
//     orderDiscountRatio: 0,
//     orderEngineerName: order.engineer_name,
//     totalAmount: order.order_total_amount,
//     selectedEngineerId: order.engineer_id,
//     engineerInfo: '',
//     availableEngineers: [],
//   });

//   const handleSubmit = async (values: OrderFormValues) => {
//     try {
//       if (!selectedOrder?.order_id) {
//         console.error('No order selected or missing ID');
//         return;
//       }

//       const response = await orderApi.modify(selectedOrder.order_id, values);

//       if (response.success) {
//         await loadOrders();
//         alert('수정이 완료되었습니다!');
//       }
//     } catch (error) {
//       console.error('Error updating order:', error);
//       alert('수정에 실패했습니다.');
//     }
//   };

//   return (
//     <div>
//       <ShaDrawer
//         data={orders}
//         filterKeys={['customer_name', 'customer_phone', 'customer_addr', 'order_product']}
//         filter={filter}
//         onFilterChange={handleFilterChange}
//         onItemClick={handleItemClick}
//         drawerTitle="주문 목록"
//         drawerDescription="주문을 클릭하세요."
//         isOpen={isDrawerOpen}
//         setIsOpen={setIsDrawerOpen}
//       />
//       {selectedOrder && (
//         <div className="p-6">
//           <ShaFormTemplate<OrderFormValues>
//             key={formKey}
//             title="주문 정보 수정"
//             initialValues={orderToFormValues(selectedOrder)}
//             onSubmit={handleSubmit}
//             formDataGenerator={ShaOrderFormData}
//             validationRules={validationRules}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderModify;
