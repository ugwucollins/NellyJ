import { Link } from "react-router-dom";
import DateFormater from "../../context/DateFormat";
import { currency, UserProduct } from "../../context/ProductContext";
import { buttonClassName } from "../Animation";
import type { OrdersProp } from "../../context/Types";

const OrdersTable = () => {
  const { orders }: any = UserProduct();

  return (
    <div className="py-8">
      <div className="outline outline-1 rounded-xl p-6 pb-8 outline-neutral-400/60 ">
        <div className="w-full capitalize py-5 flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Orders Details</h1>
          <hr className="w-full h-[1px]" />
        </div>

        <div className="w-full flex flex-col gap-8">
          {orders.map((item: any | OrdersProp, index: number) => (
            <div
              key={index}
              className="outline outline-1 rounded-2xl p-2 pt-0 px-0 pb-4 outline-neutral-400/60 hover:shadow-xl transition-all duration-100"
            >
              {/* Header */}
              <div className="w-full p-4 rounded-t-2xl gap-4 flex flex-wrap items-center justify-between max-[300px]:justify-start bg-yellow-700/90">
                <div className="flex gap-3 items-center">
                  <div>
                    <span className=" whitespace-nowrap opacity-80 font-semibold text-base">
                      Order ID
                    </span>
                    <p className="font-bold text-base"> {item._id}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <div>
                    <span className=" whitespace-nowrap opacity-80 font-semibold text-base">
                      Total Payment
                    </span>
                    <p className="font-bold text-base">
                      {currency}
                      {item.amount}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <div>
                    <span className=" whitespace-nowrap opacity-80 font-semibold text-base">
                      Payment Method
                    </span>
                    <p className="font-bold text-base">{item.paymentMethod}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <div>
                    <span className=" whitespace-nowrap opacity-80 font-semibold text-base">
                      Estimated Delivery Date
                    </span>
                    <p className="font-bold text-base">
                      {/* {DateFormater(item.createdAt, "short")} */}
                      {DateFormater({
                        date: item && item.createdAt,
                        monthType: "short",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex px-2 pt-4 gap-1 justify-between capitalize w-full font-semibold text-base">
                <p>Products</p>
                <p className="max-[300px]:w-full max-[300px]:flex justify-end">
                  Sub Total
                </p>
              </div>

              <div className="w-full gap-1 px-2 flex flex-col items-center">
                {item.item.map((product: any, index: number) => (
                  <div
                    key={index}
                    className="w-full gap-1 px-2 flex  items-center justify-between"
                  >
                    <div className="flex w-full items-center justify-start gap-2 py-2">
                      <div
                        className={`bg-neutral-100 p-4 max-[330px]:p-0 rounded-md w-18 ${
                          true ? "dark:bg-neutral-600" : "dark:bg-neutral-300"
                        }`}
                      >
                        <img
                          src={product.product && product.product.image}
                          className="size-10 rounded-md object-cover"
                          alt={product.product && product.product.name}
                        />
                      </div>
                      <div className="whitespace-nowrap">
                        <p className="font-semibold text-base capitalize">
                          {product.product && product.product.name}
                        </p>
                        <span className="whitespace-nowrap text-sm font-semibold opacity-60 capitalize">
                          Quantity: {product.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="font-semibold pr-2 max-[300px]:pr-0 text-md whitespace-nowrap text-end">
                      {currency}
                      <span>
                        {product.product &&
                          product.product.price * product.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full px-2 my-4">
                <div className="w-full flex gap-2 px-2 items-center">
                  <span
                    className={`"w-auto py-2 px-4 rounded-full bg-red-400/10 outline outline-1   text-sm font-semibold capitalize ${
                      item.status === "on the way"
                        ? "text-blue-800 outline-blue-900"
                        : item.status === "accepted"
                        ? "text-orange-700 outline-orange-900"
                        : item.status === "Delivered"
                        ? "text-green-800 outline-green-900"
                        : "text-red-900 outline-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                  {item.status === "on the way"
                    ? "Your order Is still On the road"
                    : item.status === "Delivered"
                    ? "Your order has been Delivered"
                    : "Your order has been Approved"}
                </div>
                <div className="w-full mt-2 max-[250px]:justify-center flex justify-end px-1">
                  <Link
                    to={
                      item.status === "Delivered"
                        ? "/product"
                        : `/track-order/${item._id}`
                    }
                  >
                    <button
                      className={` rounded-full hover:shadow-md ${buttonClassName}`}
                    >
                      <p>
                        {item.status === "Delivered"
                          ? "Buy Again"
                          : "Track Order"}
                      </p>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
