import { useEffect, useState } from "react";
import {
  summaryClassName,
  summaryClassNameP,
  summaryClassNamespan,
} from "../component/ShoppingCart";
import { currency, UserProduct } from "./ProductContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ApiURL from "./Api";
import { UserAuth } from "./UserContext";
import toast from "react-hot-toast";
import SelectField from "./SelectField";
import { UserAuthInfo } from "../App";
import Modal from "./Modal";
import { BiWifiOff } from "react-icons/bi";

type CheckOutCardProps = {
  LinkPath: string;
  index?: string;
};
const { VITE_PAYMENT_ACTIVE, VITE_PAYMENT_NON_ACTIVE } = import.meta.env;
const paymentMTypes = {
  active: VITE_PAYMENT_ACTIVE,
  nonActive: VITE_PAYMENT_NON_ACTIVE,
};

const CheckOutCard = ({ LinkPath, index }: CheckOutCardProps) => {
  const {
    cartItem,
    products,
    getTotalAmount,
    code,
    cartArray,
    setcartArray,
    getTotalDeliveryFee,
    setcartItem,
    GetUsersOrders,
    setPaymentType,
  }: any = UserProduct();

  const location = useLocation().pathname;
  const router = useNavigate();
  const { options }: any = UserAuth();
  const { isOnline }: any = UserAuthInfo();
  const [paymentM, setPaymentM] = useState<string>(paymentMTypes.active);
  const [openPaymentChange, setOpenPaymentChange] = useState<boolean>(false);

  async function HandleCheckout() {
    if (location === "/cart/address" || location.includes("/cart/address")) {
      const datas = {
        address: index,
        paymentMethod: paymentM,
        deliveryFee: getTotalDeliveryFee(),
        items: cartArray.map((item: any) => ({
          product: item._id,
          quantity: item.quantity,
        })),
      };

      try {
        if (paymentM === paymentMTypes.active) {
          const datas = {
            address: index,
            paymentMethod: paymentM,
            deliveryFee: getTotalDeliveryFee(),
            items: cartArray.map((item: any) => ({
              product: item._id,
              quantity: item.quantity,
            })),
          };
          const res = await ApiURL.post(
            "/v1/orders/create/payment_init/checkout",
            datas,
            options
          );
          const data = res.data;

          if (data.success) {
            window.location.replace(data.data.url);
            GetUsersOrders();
            toast.success(data.message);
            setPaymentType(true);
            localStorage.setItem("payment", JSON.stringify(true));
            localStorage.setItem("res", JSON.stringify(data.data.res));
            localStorage.setItem("orderT", JSON.stringify(data.data.token));
          } else {
            toast.error(data.message);
          }
        } else if (paymentM === paymentMTypes.nonActive) {
          const res = await ApiURL.post("/v1/orders/create", datas, options);
          const data = res.data;
          if (data.success) {
            const salesInfo = {
              deliveryFee: getTotalDeliveryFee(),
              items: cartArray.map((item: any) => ({
                product: item._id,
                quantity: item.quantity,
              })),
              orderId: data?.data?._id,
            };

            const res = await ApiURL.post(
              "/v1/sales/create",
              salesInfo,
              options
            );
            const salesData = res.data;

            if (salesData.success) {
              toast.success(data.message);
              setTimeout(() => {
                setcartItem({});
                console.log(salesData);

                router("/orders", { replace: true });
                GetUsersOrders();
              }, 1000);
            } else {
              toast.error(salesData.message, { id: "order" });
            }
          }
        }
      } catch (error: any) {
        toast.error(error.response.data.message, { id: "order" });
      }
    }
  }
  function grtTotalCartItems() {
    let totalCart: any = [];
    for (const key in cartItem) {
      const product = products.find((item: any) => item._id === key);
      product.quantity = cartItem[key];
      totalCart.push(product);
    }
    setcartArray(totalCart);
  }

  function onChange(e: any) {
    setPaymentM(e.target.value);
    setOpenPaymentChange;
  }

  useEffect(() => {
    grtTotalCartItems();
  }, [cartItem]);

  const handleP = () => {
    window.location.reload();
  };

  return (
    <>
      {!isOnline && (
        <div>
          <Modal
            Title="No Internet Connection, Please Check Your Internet Connection"
            Icon={<BiWifiOff />}
            CancelBtn="No"
            Progress={handleP}
            OkayBtn="Try Again"
            Cancel={() => alert("Please Check Your Connection")}
          />
        </div>
      )}
      <div className="w-full max-w-xs max-sm:max-w-xl px-5 py-5 outline-1 hover:shadow-xl hover:rounded-xl outline outline-gray-300 rounded-md shadow-md">
        <div className="flex pb-2 flex-col gap-3.5">
          <div className="flex text-left flex-col gap-y-4 py-2">
            <h1 className="text-[min(5vw,18px)] font-bold">Order Summary</h1>
            <hr className="w-full h-[1px] bg-gray-600" />
          </div>

          <div className={summaryClassName}>
            <p className={summaryClassNameP}>PayMent Method</p>
            <div className={summaryClassNamespan}>
              {paymentM === "online" ? (
                <span className="capitalize">{paymentM}</span>
              ) : (
                <span className="capitalize">{"cash On delivery"}</span>
              )}
            </div>
          </div>

          {openPaymentChange && location.includes("/cart/address") && (
            <>
              <hr className="w-full h-[2px] bg-gray-300 " />
              <SelectField
                onChange={onChange}
                options={OrderOptions}
                name="Payment Type"
                label="Payment Type"
                value={paymentM}
              />
            </>
          )}

          <div className="w-full py-3">
            <hr className="w-full h-[2px] bg-gray-400 " />
          </div>

          <div className={summaryClassName}>
            <p className={summaryClassNameP}>sub total</p>
            <span className={summaryClassNamespan}>
              {currency}
              {cartArray && cartArray.length === 0 ? 0 : getTotalAmount()}.00
            </span>
          </div>

          <div className={summaryClassName}>
            <p className={summaryClassNameP}>Delivery Fee</p>
            <span className={summaryClassNamespan}>
              {currency}
              {cartArray.length === 0 ? 0 : getTotalDeliveryFee()}.00
            </span>
          </div>

          <div className={summaryClassName}>
            <p className={summaryClassNameP}>coupon discount</p>
            <span className={summaryClassNamespan}>
              {code && "-"}
              {currency}
              {code ? (getTotalAmount() * 10) / 100 : 0}.00
            </span>
          </div>

          <div className="w-full py-3">
            <hr className="w-full h-[2px] bg-gray-500 " />
          </div>

          <div className={summaryClassName}>
            <p className={summaryClassNameP}>total</p>
            <span className={summaryClassNamespan}>
              {currency}
              {cartArray.length === 0
                ? 0
                : code === true
                ? getTotalAmount() +
                  getTotalDeliveryFee() -
                  (getTotalAmount() * 10) / 100
                : getTotalAmount() + getTotalDeliveryFee()}
              .00
            </span>
          </div>

          <button
            disabled={!cartArray.length && !isOnline}
            onClick={HandleCheckout}
            className="px-5 py-3 capitalize bg-secondary text-primary1 dark:bg-yellow-800 hover:bg-yellow-950 rounded-lg shadow-md hover:shadow-lg transition-all disabled:line-through disabled:opacity-90 hover:rounded-full text-base font-semibold hover:font-bold"
          >
            <Link
              aria-disabled={!cartArray.length}
              to={`${cartArray.length ? LinkPath : ""}`}
            >
              <p>proceed checkout</p>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export const OrderOptions = [
  { title: paymentMTypes.nonActive, value: paymentMTypes.active },
  {
    title: paymentMTypes.nonActive,
    value: paymentMTypes.nonActive && "Cash on delivery",
  },
];

export default CheckOutCard;
