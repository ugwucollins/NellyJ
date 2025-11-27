import { Link } from "react-router-dom";
import { Assets } from "../../component/assets";
import DateFormater from "../../context/DateFormat";
import { currency } from "../../context/ProductContext";
import { buttonClassName } from "../../component/Animation";
import { UserAdminAuth } from "../context/AdminContext";
const OrdersTable = () => {
  const { allOrders }: any = UserAdminAuth();

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full overflow-auto relative">
        {allOrders &&
          allOrders.map((order: any, index: number) => (
            <div
              key={index}
              className="w-full items-center flex justify-between gap-5 shadow pl-4 pr-5 py-4"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`size-24 mb-2 rounded-lg  p-4 ${
                    index % 2 === 0 ? "bg-slate-100" : "bg-slate-300"
                  }`}
                >
                  <img
                    src={Assets.order}
                    className="rounded-md object-cover size-16"
                    alt=""
                  />
                </div>

                <div className="flex flex-col">
                  {order.products.map((list: any, index: number) => (
                    <div
                      key={index}
                      className="flex whitespace-nowrap items-center gap-1 font-medium"
                    >
                      <h1 className="text-base whitespace-nowrap font-semibold opacity-85">
                        {list.product && list.product.name}
                      </h1>
                      <span>x {list && list.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex text-left flex-col gap-1">
                <h1 className="text-base whitespace-nowrap font-semibold capitalize">
                  {order.address.lastName} {order.address.firstName}
                </h1>

                <div className="text-sm font-semibold w-60">
                  {order.address.address}, {order.address.state},{" "}
                  {order.address.city},{order.address.nearestBusTop},
                  {order.address.country},
                </div>
              </div>

              <div className="whitespace-nowrap font-bold">
                {currency}
                {order.totalPrice}
              </div>
              <div>
                <p className="text-base whitespace-nowrap font-medium opacity-80 pl-2 wh">
                  Method: {order.paymentMethod}
                </p>
                <p className="text-base whitespace-nowrap font-medium opacity-80 pl-2 wh">
                  Date:{" "}
                  {DateFormater({
                    date: order && order.createdAt,
                    monthType: "short",
                  })}
                </p>
                <p className="text-base whitespace-nowrap font-medium opacity-80 pl-2 wh">
                  Payment: {order.isPaid ? "Paid" : "No"}
                </p>
              </div>

              <Link to={`${order._id}`}>
                <button className={`ml-2 whitespace-nowrap ${buttonClassName}`}>
                  <p>View Order</p>
                </button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrdersTable;
