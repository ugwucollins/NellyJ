import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdCheckmark } from "react-icons/io";
import { Assets } from "../../component/assets";
import SelectField from "../../context/SelectField";
import { buttonClassName } from "../../component/Animation";
import { BiLoaderCircle } from "react-icons/bi";
import {
  OrderStatusArray,
  OrderStatusProgress,
  OrderStatusValues,
} from "../../seller/Orders/OrdersInfo";
import { UserAdminAuth } from "../context/AdminContext";
import ApiURL from "../../context/Api";
import { adminPath, UserAuth } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const OrdersInfoID = ({ orderId }: any) => {
  const { allOrders, GetAllUsersOrders }: any = UserAdminAuth();
  const { options }: any = UserAuth();

  const [OrderStatus, setOrderStatus] = useState("accepted");
  const [OrderValue, setOrderValue]: any = useState({});
  const CheckOrder = OrderStatus === "" ? [] : [0];
  const [width, setWidth] = useState("0%");
  const [active, setActive] = useState(CheckOrder);
  const [Color, setColor] = useState("bg-black");
  const [orderSValue, setOrderSValue] = useState("");
  const [loading, setLoading] = useState(false);

  const HandleOrders = () => {
    const findOrder =
      allOrders && allOrders.find((order: any) => order._id === orderId);
    setOrderValue(findOrder);
    setOrderStatus(findOrder?.orderStatus!);
    setOrderSValue(findOrder?.orderStatus!);
  };

  useEffect(() => {
    HandleOrders();
  }, []);

  const handleOrdersChange = () => {
    switch (OrderStatus) {
      case OrderStatusValues.Order_Placed:
        setWidth("8%");
        setColor("bg-red-700");
        setActive([1]);
        break;
      case OrderStatusValues.Accepted:
        setWidth("27.5%");
        setColor("bg-orange-800");
        setActive([1, 2]);
        break;
      case OrderStatusValues.In_Progress:
        setWidth("52.1%");
        setColor("bg-orange-500");
        setActive([1, 2, 3]);
        break;
      case OrderStatusValues.On_The_Way_Placed:
        setWidth("75%");
        setColor("bg-yellow-800");
        setActive([1, 2, 3, 4]);

        break;
      case OrderStatusValues.Delivered:
        setWidth("100%");
        setColor("bg-green-800");
        setActive([1, 2, 3, 4, 5]);
        break;

      default:
        null;
        break;
    }
  };
  useEffect(() => {
    handleOrdersChange();
  }, [OrderStatus]);

  const router = useNavigate();

  const HandleSubmit = async (e: any) => {
    setLoading(true);
    const status = {
      orderStatus: orderSValue,
    };
    e.preventDefault();
    try {
      const res = await ApiURL.put(
        "/v1/orders/update/status/" + orderId,
        status,
        options
      );
      const data = res.data;
      if (data.success) {
        setOrderStatus(orderSValue);
        toast.success(data.message || "Updated Order Successfully", {
          id: "orders",
        });
        setTimeout(() => {
          setLoading(false);
          router(adminPath + "/orders", { replace: true });
          GetAllUsersOrders();
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Server Error 501");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-16 pt-5 max-md:px-14 max-sm:px-6 max-[170px]:px-1">
      <div>
        <h1 className="text-xl font-semibold">Order Status</h1>
        <p className=" opacity-80 pb-4">Order ID: {orderId}</p>
        <div className="py-10 w-full overflow-auto rounded-xl outline-neutral-400/70 shadow-md drop-shadow-sm my-2 mb-4 outline outline-1 px-2">
          <div className="text-xl pb-3 flex gap-2 justify-between">
            {OrderStatusProgress.map((items, index: any) => (
              <div
                key={items.title}
                className={`flex flex-col items-center text-center ${
                  active[index] ? "opacity-100" : "opacity-35"
                }`}
              >
                <div className="relative">
                  <span className="text-2xl">{items.icon}</span>
                  {active[index] && (
                    <div className="size-4 -right-1 bg-yellow-500/90 blur-[2px] rounded-full absolute -bottom-1" />
                  )}
                </div>
                <p className="capitalize text-sm font-semibold">
                  {items.title}
                </p>
              </div>
            ))}
          </div>
          <div className="relative bg-neutral-300/60 rounded-md w-full h-[8px]">
            <div
              className={`h-[8px] z-0 absolute transition-all duration-500 top-0 left-0 rounded-md ${Color}`}
              style={{ width: width }}
            />
            <div className="flex justify-between items-center absolute -top-1.5  w-[99%] px-0 text-center ml-1 ">
              {[1, 2, 3, 4, 5].map((item, index: number) => (
                <div key={item}>
                  {active[index] && (
                    <span
                      className={`size-5 z-[1] text-3xl text-primary rounded flex justify-center text-center items-center ${Color}`}
                    >
                      <IoMdCheckmark />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-5 px-4 shadow-lg py-5 mb-8 max-sm:mb-0 mt-10 outline outline-1 outline-neutral-400/70 rounded-xl w-full flex justify-between flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="size-20 mb-2 rounded-full bg-slate-300 p-2">
              <img
                src={
                  (OrderValue.orderedBy && OrderValue?.orderedBy?.imageUrl) ||
                  Assets.CustomerPhotos
                }
                className="rounded-full object-cover size-16"
                alt={OrderValue.address && OrderValue.address.firstName}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex whitespace-nowrap items-start justify-start gap-1 flex-col text-left font-medium">
                <h1 className="text-base whitespace-nowrap font-semibold opacity-85 capitalize">
                  {OrderValue.address && OrderValue.address.lastName}{" "}
                  {OrderValue.address && OrderValue.address.firstName}
                </h1>
                <span>
                  {" "}
                  {OrderValue.address && OrderValue.address.phoneNumber}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h1 className=" font-semibold text-lg pb-1">Address</h1>
            <div className="text-sm font-semibold w-60">
              {OrderValue.address && OrderValue.address.address},{" "}
              {OrderValue.address && OrderValue.address.state},{" "}
              {OrderValue.address && OrderValue.address.city},{" "}
              {OrderValue.address && OrderValue.address.nearestBusTop},{" "}
              {OrderValue.address && OrderValue.address.country},
            </div>
          </div>
        </div>

        <div className="pt-5 px-4 shadow-lg pb-5 mb-8 max-sm:mb-0 mt-10 outline outline-1 outline-neutral-400/70 rounded-xl">
          <h1 className="font-semibold text-lg py-1">Products</h1>
          <hr className="w-full h-[1.5px] bg-neutral-400 my-1" />
          {OrderValue?.items?.map((items: any, index: number) => (
            <div
              key={index}
              className="flex w-full items-center justify-start gap-2 py-2"
            >
              <div
                className={`bg-neutral-100 p-4 max-[330px]:p-0 rounded-md w-18 ${
                  true ? "dark:bg-neutral-600" : "dark:bg-neutral-300"
                }`}
              >
                <img
                  src={items.product && items.product.imageUrl}
                  className="size-10 rounded-md object-cover"
                  alt={items.product && items.product.name}
                />
              </div>
              <div className="whitespace-nowrap">
                <p className="font-semibold text-base capitalize">
                  {items.product && items.product.name}
                </p>
                <span className="whitespace-nowrap text-sm font-semibold opacity-60 capitalize">
                  Quantity: {items && items.quantity}
                </span>
              </div>
            </div>
          ))}

          <hr className="w-full h-[1.5px] bg-neutral-400 my-1" />

          <div className="flex flex-col justify-end text-end">
            <h1 className="font-semibold capitalize">Total Amount</h1>
            <p className="text-xl font-semibold">
              {OrderValue?.totalPrice + OrderValue?.deliveryFee}
            </p>
          </div>
        </div>

        <div className="w-full py-6 px-4 mb-2 rounded-xl shadow-lg drop-shadow-sm">
          <h1
            className="py-1
          "
          >
            Order Status Change
          </h1>

          <form onSubmit={HandleSubmit} className="flex flex-col gap-y-4">
            <SelectField
              name="status"
              label="Order Status"
              value={orderSValue}
              className="py-4"
              options={OrderStatusArray}
              onChange={(e) => setOrderSValue(e.target.value)}
            />

            <button
              disabled={loading}
              className={` disabled:opacity-80 ${buttonClassName}`}
            >
              {loading ? (
                <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
              ) : (
                <p>Update</p>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrdersInfoID;
