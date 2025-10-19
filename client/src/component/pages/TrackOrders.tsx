import { useState } from "react";
import HeaderProp from "../../context/HeaderProp";
import InputField from "../../context/InputField";
import {
  DarkModeClass,
  FeatureArryMap as FeatureArrayMap,
} from "../HomeContent/HomeExportComponent";
import { buttonClassName } from "../Animation";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const TrackOrders = () => {
  return (
    <div>
      <HeaderProp
        LinkText1="Home"
        LinkPath="/tack-orders"
        LinkText2="Track Your Orders"
        AnText="Track Your Order"
      />
      <TrackOrderForm />
      <div
        className={` w-full overflow-hidden px-10 max-[170px]:px-1 max-[690px]:px-10 pb-3 relative z-[2] ${DarkModeClass}`}
      >
        <FeatureArrayMap />
      </div>
    </div>
  );
};

export function TrackOrderForm() {
  const [formData, setFormData] = useState({
    orderId: "",
    email: "",
  });

  const router = useNavigate();
  const HandleChange = (e: any) => {
    const { value, name } = e.target;
    // setFormData({ ...formData, [name]: value });
    setFormData((per) => ({ ...per, [name]: value }));
  };

  const HandleSubmit = (e: any) => {
    e.preventDefault();
    toast.error("Please Enter the Orders Details");
    if (formData.email.trim() && formData.orderId.trim()) {
      router("/Track-order/" + formData.orderId);
      setFormData({
        orderId: "",
        email: "",
      });
      toast.success("Order is Confirmed");
    }
  };

  return (
    <div className="w-full px-16 max-md:px-14 pt-10 max-sm:px-6 max-[170px]:px-1">
      <div className="max-[400px]:text-balance w-full text-center flex justify-center items-center ">
        <p className="max-w-6xl w-full">
          To Track your order please enter your Order ID in the box below and
          press the 'Track Order' button. This was given to you on your receipt
          and in the confirmation email you should have received
        </p>
      </div>

      <form onSubmit={HandleSubmit} className="pt-8 flex flex-col gap-y-5">
        <InputField
          type="text"
          name="orderId"
          label="Order iD*"
          placeholder="Enter your Order ID"
          value={formData.orderId}
          onChange={HandleChange}
        />
        <InputField
          type="email"
          name="email"
          label="email*"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={HandleChange}
        />
        <div className="max-[300px]:flex max-[300px]:flex-col">
          <button className={`${buttonClassName}`}>
            <p>Track Order</p>
          </button>
        </div>
      </form>
    </div>
  );
}
export default TrackOrders;
