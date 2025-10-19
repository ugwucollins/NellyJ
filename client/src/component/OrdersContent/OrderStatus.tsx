import { useEffect, useState } from "react";
import type { OrderStatusProp } from "../../context/Types";
import {
  IoBagCheckOutline,
  IoBagRemoveOutline,
  IoCubeOutline,
} from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoMdCheckmark } from "react-icons/io";
import { UserProduct } from "../../context/ProductContext";

const OrderStatus = ({ orderID }: any | string) => {
  const { orders }: any = UserProduct();
  const [OrderStatus, setOrderStatus] = useState("accepted");
  const [OrderValue, setOrderValue]: any = useState({});
  const CheckOrder = OrderStatus === "" ? [] : [0];
  const [width, setWidth] = useState("0%");
  const [active, setActive] = useState(CheckOrder);
  const [Color, setColor] = useState("bg-black");
  const OrderStatusProgress: OrderStatusProp[] = [
    {
      icon: <IoBagRemoveOutline />,
      LinkPath: "order placed",
      title: "Order Placed",
    },
    {
      icon: <IoBagCheckOutline />,
      LinkPath: "accepted",
      title: "Accepted",
    },
    {
      icon: <IoCubeOutline />,
      LinkPath: "in progress",
      title: "In Progress",
    },
    {
      icon: <TbTruckDelivery />,
      LinkPath: "on the way",
      title: "On The Way Placed",
    },
    {
      icon: <CiDeliveryTruck />,
      LinkPath: "Delivered",
      title: "Delivered",
    },
  ];

  const HandleOrders = () => {
    const findOrder = orders.find((order: any) => order._id === orderID);
    setOrderValue(findOrder);
    setOrderStatus(findOrder?.status!);
  };

  useEffect(() => {
    HandleOrders();
  }, []);
  const handleOrdersChange = () => {
    switch (OrderStatus) {
      case "order placed":
        setWidth("8%");
        setColor("bg-red-700");
        setActive([1]);
        break;
      case "accepted":
        setWidth("27.5%");
        setColor("bg-orange-800");
        setActive([1, 2]);
        break;
      case "in progress":
        setWidth("52.1%");
        setColor("bg-orange-500");
        setActive([1, 2, 3]);
        break;
      case "on the way":
        setWidth("75%");
        setColor("bg-yellow-800");
        setActive([1, 2, 3, 4]);

        break;
      case "Delivered":
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
    // , width, active/
  }, [OrderStatus]);

  return (
    <div className="w-full px-16 pt-5 max-md:px-14 max-sm:px-6 max-[170px]:px-1">
      <div>
        <h1 className="text-xl font-semibold">Order Status</h1>
        <p className=" opacity-80 pb-4">Order ID:{orderID}</p>
        <div className="py-10 rounded-xl outline-neutral-400/70 shadow-md drop-shadow-sm my-2 mb-4 outline outline-1 px-2">
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
          <div className="relative  bg-neutral-300/60 rounded-md w-full h-[8px]">
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

        <div className="pt-5 px-4 shadow-lg pb-5 mb-8 max-sm:mb-0 mt-10 outline outline-1 outline-neutral-400/70 rounded-xl">
          <h1 className="font-semibold text-lg py-1">Products</h1>
          <hr className="w-full h-[1.5px] bg-neutral-400 my-1" />
          {OrderValue.item &&
            OrderValue.item.map((items: any, index: number) => (
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
                    src={items.product && items.product.image}
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
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
