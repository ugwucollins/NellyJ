import { Link } from "react-router-dom";
import { buttonClassName } from "../../component/Animation";
import { Assets } from "../../component/assets";
import DateFormater from "../../context/DateFormat";
import HeaderProp from "../../context/HeaderProp";
import { currency } from "../../context/ProductContext";
import { sellerPath } from "../../context/UserContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { UserAdminAuth } from "../../Admin/context/AdminContext";
import { EmptyItems } from "../../component/ShoppingCart";
import { CiDeliveryTruck } from "react-icons/ci";
import { useEffect, useState } from "react";
import InputField from "../../context/InputField";
import Loader from "../../context/Loader";

const Orders = () => {
  return (
    <div>
      <>
        <Navbar />
        <div className="w-full flex mt-[68px] max-sm:mt-0">
          <Sidebar />
          <div className="w-full overflow-y-auto h-[90.6vh] max-[500px]:min-h-screen">
            <div className="w-full sticky top-0 z-[1]">
              <HeaderProp
                LinkText1="Home"
                LinkText2="Orders"
                AnText="All Orders"
                LinkPath={sellerPath + "/orders"}
              />
            </div>
            <OrdersTable />
          </div>
        </div>
      </>
    </div>
  );
};

export default Orders;

export const OrdersTable = () => {
  const { allOrders }: any = UserAdminAuth();

  const [findOrders, setFindOrders] = useState([]);
  const [search, setSearch] = useState<string>("");

  function handleChange(e: any) {
    setSearch(e.target.value);
  }

  function handleFind() {
    const filter =
      allOrders &&
      allOrders.filter(
        (item: any) =>
          item._id.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          item.orderedBy.email
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          item.orderedBy.firstName
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          item.orderedBy.phoneNumber
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
      );
    setFindOrders(filter);
  }

  useEffect(() => {
    setTimeout(() => {
      handleFind();
    }, 500);
  }, [search]);

  return (
    <div className="w-full overflow-hidden">
      {allOrders && (
        <div className="w-full flex justify-end max-sm:justify-start items-end">
          <div className="pr-10 w-80 pt-4 pl-4">
            <InputField
              onChange={handleChange}
              value={search}
              name="search"
              placeholder="Search Orders by orderId, firstName or Email"
              type="text"
              className="rounded-lg shadow-lg"
              label="Search Orders*"
            />
          </div>
        </div>
      )}

      {!findOrders.length && (
        <div className="flex justify-center min-h-[50vh] items-center">
          <div>
            <Loader className="w-20" size="size-16" />
          </div>
        </div>
      )}

      <div className="w-full overflow-auto relative">
        {findOrders &&
          findOrders.map((order: any, index: number) => (
            <div
              key={index}
              className="w-full items-center flex justify-between gap-5 shadow pl-5 pr-5 py-4"
            >
              <div className="flex items-center gap-2 relative">
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
                  {order?.items?.map((list: any, index: number) => (
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

                {order.isPaid ? (
                  <div className="absolute size-3  top-1.5 left-0.5 rounded-full bg-green-800" />
                ) : (
                  <div className="absolute size-3  top-1.5 left-0.5 rounded-full bg-red-800" />
                )}
              </div>

              <div className="flex text-left flex-col gap-1">
                <h1 className="text-base whitespace-nowrap font-semibold capitalize">
                  {order.address.lastName} {order.address.firstName}
                </h1>

                <div className="text-sm font-semibold w-60">
                  {order.address.address},{order.address.city},
                  {order.address.nearestBusTop},{order.address.state},{" "}
                  {order.address.country},
                </div>
              </div>

              <div className="whitespace-nowrap font-bold">
                {currency}
                {order.totalPrice + order.deliveryFee}
              </div>
              <div>
                <p className="text-base whitespace-nowrap font-medium opacity-80 pl-2 wh">
                  Method: {order.paymentMethod}
                </p>
                <p className="text-base whitespace-nowrap font-medium opacity-80 pl-2 wh">
                  Date:
                  {/* {DateFormater(order.createdAt, "short")} */}
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
      <div className="flex justify-center min-h-[60vh] items-center">
        {!allOrders && (
          <EmptyItems
            title="No Placed Orders"
            icon={<CiDeliveryTruck />}
            LinkPath={sellerPath}
            Text="Contiune checking"
          />
        )}
      </div>
    </div>
  );
};
