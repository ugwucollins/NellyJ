import HeaderProp from "../../context/HeaderProp";
import { ZodInputField } from "../../context/InputField";
import {
  DarkModeClass,
  FeatureArryMap as FeatureArrayMap,
} from "../HomeContent/HomeExportComponent";
import { buttonClassName } from "../Animation";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { UserProduct } from "../../context/ProductContext";
import type { TrackOrderField } from "../../Zod/typesField";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrackOrderSchema } from "../../Zod/Schema/Schemas";
import { useNavigate } from "react-router-dom";
import { BiLoaderCircle } from "react-icons/bi";

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
  const { orders }: any = UserProduct();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(TrackOrderSchema),
  });
  const router = useNavigate();

  const onSubmit: SubmitHandler<TrackOrderField> = (data) => {
    const findOrder = orders.filter((order: any) => order._id === data.orderID);

    try {
      if (findOrder.length) {
        router("/Track-order/" + data.orderID);
        setValue("email", "");
        setValue("orderID", "");
        toast.success("Order is Confirmed", { id: "order" });
      } else {
        const message = "Invalid OrderID Pls,Check";
        toast.error(message, { id: "orderError" });
        setError("orderID", {
          message: message,
        });
      }
    } catch (error: any) {
      setError("root", {
        message: error.message,
      });
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pt-8 flex flex-col gap-y-5"
      >
        <ZodInputField
          type="text"
          label="Order ID*"
          placeholder="Enter your Order ID"
          value={register("orderID")}
          error={errors.orderID?.message}
        />
        <ZodInputField
          type="email"
          label="email*"
          placeholder="Enter your Email"
          value={register("email")}
          error={errors.email?.message}
        />
        <div className="max-[300px]:flex max-[300px]:flex-col">
          <button className={`${buttonClassName}`}>
            {isSubmitting ? (
              <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
            ) : (
              <p>Track Order</p>
            )}
          </button>
        </div>
        {errors.root && (
          <span className="text-base text-red-500 font-semibold">
            {errors.root.message}
          </span>
        )}
      </form>
    </div>
  );
}

export default TrackOrders;
