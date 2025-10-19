import HeaderProp from "../../context/HeaderProp";
import {
  DarkModeClass,
  FeatureArryMap as FeatureArrayMap,
} from "../HomeContent/HomeExportComponent";
import { IoMdCheckmark } from "react-icons/io";

import OrdersTable from "./OrdersTable";

const OrdersPage = () => {
  return (
    <div>
      {/* Header */}

      <HeaderProp
        LinkText1="Home"
        AnText="Orders Completed"
        LinkText2="Orders"
        LinkPath="/orders"
      />
      <OrdersMain />
      <div
        className={` w-full overflow-hidden px-10 max-[170px]:px-1 max-[690px]:px-10 pb-3 relative z-[2] ${DarkModeClass}`}
      >
        <FeatureArrayMap />
      </div>
    </div>
  );
};

export default OrdersPage;

export function OrdersMain() {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <div className="w-full px-16 max-md:px-14 max-sm:px-6 max-[170px]:px-1">
        <OrderHeader />
        <OrdersTable />
      </div>
    </div>
  );
}

export function OrderHeader() {
  return (
    <div className="flex justify-center items-center text-center flex-col">
      <span className="size-10 my-3 bg-yellow-800 text-3xl text-primary rounded-full flex justify-center text-center items-center">
        <IoMdCheckmark />
      </span>
      <h1 className="text-2xl font-semibold">Your Order is Completed</h1>
      <p className=" opacity-90">Thank you, Your order has been received</p>
    </div>
  );
}
