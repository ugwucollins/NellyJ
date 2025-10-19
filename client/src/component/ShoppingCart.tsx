import { Link, NavLink } from "react-router-dom";
import TextAnimation from "./Animation";
import { BiPlus, BiX } from "react-icons/bi";
import { currency, UserProduct } from "../context/ProductContext";
import { GrSubtract } from "react-icons/gr";
import { IoIosCart } from "react-icons/io";
import toast from "react-hot-toast";
import CheckOutCard from "../context/CheckOutCard";
import type { EmptyItemProp } from "../context/Types";
import Modal from "../context/Modal";
import { useState } from "react";

const ShoppingCart = () => {
  return (
    <div>
      <CartHeader />
      <ShoppingCartItems />
    </div>
  );
};

export default ShoppingCart;

export const CartHeader = () => {
  return (
    <div className="w-full bg-primary1 dark:bg-secondary dark:shadow-lg dark:shadow-slate-800 pb-10 flex-col  flex  min-h-[30vh] justify-center items-center text-center">
      <h1>
        {TextAnimation(
          "Shopping  Cart",
          -22,
          0.2,
          "flex  gap-0.5 flex-wrap",
          "text-[min(10vw,30px)] font-bold"
        )}
      </h1>
      <div className="flex gap-1 flex-wrap">
        <Link to={"/"}>
          <p className=" cursor-pointer font-bold capitalize">Home/</p>
        </Link>
        <Link to={"/cart"}>
          <p className=" cursor-pointer font-bold capitalize text-blue-900">
            Shopping Cart
          </p>
        </Link>
      </div>
    </div>
  );
};

export const ShoppingCartItems = () => {
  const {
    AddtoCart,
    RemoveFromeCart,
    coupon,
    code,
    setcode,
    text,
    settext,
    setcartItem,
    cartArray,
  }: any = UserProduct();

  const HandleCoupon = () => {
    if (text === coupon) {
      settext("");
      toast.success("coupon Applied successfully");
      localStorage.setItem("HiddenCode", JSON.stringify(code));
      return setcode(true);
    } else {
      toast.error("Invaild coupon");
    }
  };

  const [open, setOpen] = useState(false);

  function HandleClick() {
    setOpen(!open);
  }
  const HandelClearCart = () => {
    setOpen(false);
    setcartItem({});
  };
  return (
    <div>
      {open && (
        <Modal
          Title="Are you sure that You want to Clear All the CartItems"
          OkayBtn="Process"
          CancelBtn="Cancel"
          Progress={HandelClearCart}
          Cancel={HandleClick}
        />
      )}

      <div className="w-full overflow-hidden gap-8 py-10 flex items-center flex-col justify-center px-16 max-md:px-10 mb-5 max-sm:px-8 max-[200px]:px-1 max-[750px]:flex-col">
        <div className="flex w-full gap-y-7  items-center justify-center gap-x-2 flex-row max-sm:flex-col">
          <div className="overflow-hidden  w-full">
            <div className="flex flex-col gap-2 overflow-auto px-2 py-2">
              <table className="w-full overflow-auto">
                <thead className="text-left bg-yellow-700 px-4 py-6 capitalize h-10 rounded-3xl w-full">
                  <tr>
                    <th />
                    <th>Product</th>
                    <th>price</th>
                    <th className="pl-2.5">Quantiy</th>
                    <th>subtotal</th>
                  </tr>
                </thead>
                <tbody className="w-full overflow-x-auto">
                  {cartArray.map((item: any, index: number) => {
                    const even = index % 2 === 0;
                    return (
                      <tr key={index}>
                        <td className="pl-2">
                          <BiX
                            className="text-3xl cursor-pointer"
                            onClick={() => RemoveFromeCart(item._id)}
                          />
                        </td>

                        <td className="pr-4">
                          <div className="flex w-full items-center justify-start gap-2 py-2">
                            <Link to={`/product/${item._id}`}>
                              <div
                                className={`bg-neutral-100  p-4 rounded-md w-20 ${
                                  even
                                    ? "dark:bg-neutral-600"
                                    : "dark:bg-neutral-300"
                                }`}
                              >
                                <img
                                  src={item && item.image}
                                  className="size-12 rounded-md object-cover"
                                  alt={`${item.name} photo`}
                                />
                              </div>
                            </Link>
                            <div className="whitespace-nowrap">
                              <p className="font-semibold text-base capitalize">
                                {item.name}
                              </p>
                              <span className="text-sm font-semibold opacity-60 capitalize">
                                Instock:{" "}
                                {item.instock === true ? "true" : "false"}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="pr-4">
                          <div className="flex gap-0.5 items-center font-semibold text-base whitespace-nowrap">
                            <p>{currency}</p>
                            <span> {item.price}</span>
                          </div>
                        </td>
                        <td className="pr-4 pl-2">
                          <div className="flex items-center outline-1 outline outline-slate-500 px-3 justify-between w-fit rounded-full">
                            <button
                              className="pr-1.5 py-2 "
                              onClick={() => {
                                AddtoCart(item._id);
                              }}
                              disabled={!item.instock}
                            >
                              <BiPlus className="text-lg  font-bold" />
                            </button>
                            <span className="font-bold ring-1 py-2 px-3 ring-slate-500 text-base">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => {
                                RemoveFromeCart(item._id);
                              }}
                              disabled={!item.instock}
                              className="pl-1.5 py-2 text-lg font-bold"
                            >
                              <GrSubtract />
                            </button>
                          </div>
                        </td>
                        <td className="pr-5 pl-2">
                          <div className="flex items-center font-semibold text-base whitespace-nowrap">
                            <p>{currency}</p>
                            <span>{item.price * item.quantity}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {!cartArray.length && (
                <EmptyItems
                  title="No Cart Items"
                  icon={<IoIosCart />}
                  LinkPath="/product"
                  Text="Contiune Shopping"
                />
              )}
            </div>

            {cartArray.length ? (
              <div className="w-full flex pr-5 justify-between items-center flex-row max-[1080px]:flex-col">
                <div className="flex w-full max-sm:justify-end gap-2 gap-y-4 items-center flex-wrap pb-4 pt-3">
                  <div className="pl-5  max-sm:pl-1">
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => settext(e.target.value)}
                      placeholder="coupon code"
                      className="rounded-3xl px-3 text-secondary py-2.5 transition-all duration-200 outline outline-1 outline-neutral-600  text-sm font-bold focus:text-base focus:font-semibold shadow drop-shadow dark:bg-neutral-50 placeholder:text-secondary/60 dark:outline-secondary"
                    />
                  </div>
                  <button
                    onClick={HandleCoupon}
                    className="px-4 ml-5  max-sm:ml-1 py-2.5 shadow drop-shadow-md  transition-all duration-200 capitalize text-sm hover:text-base font-semibold bg-yellow-800 text-white rounded-3xl"
                  >
                    <p>Apply coupon</p>
                  </button>
                </div>
                <p
                  onClick={HandleClick}
                  className="text-blue-900 w-full text-end capitalize font-semibold text-base cursor-pointer hover:font-bold whitespace-nowrap hover:underline transition-all duration-200"
                >
                  Clear Shopping Cart
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          <CheckOutCard LinkPath={"/cart/address"} />
        </div>
      </div>
    </div>
  );
};

export function EmptyItems({ title, Text, LinkPath, icon }: EmptyItemProp) {
  return (
    <div className="w-full py-5 pt-8 mt-10 flex flex-col justify-center items-center">
      <div className="bg-neutral-100  animate-bounce transition-all duration-200 p-4 rounded-full shadow drop-shadow-md dark:text-secondary text-5xl">
        {icon}
      </div>
      <h1 className="py-4 font-bold text-2xl capitalize">{title}</h1>
      <NavLink to={LinkPath}>
        <button className="px-4 py-3 mt-2 dark:outline-1 outline dark:outline-slate-100 shadow drop-shadow-md rounded-xl bg-secondary dark:bg-primary dark:hover:bg-neutral-700 dark:text-secondary text-base font-semibold hover:font-bold text-primary hover:text-primary1 hover:rounded-3xl">
          <p className="w-full hover:text-primary1">{Text}</p>
        </button>
      </NavLink>
    </div>
  );
}

export const summaryClassName = "flex justify-between gap-2 flex-row";
export const summaryClassNameP =
  "capitalize font-semibold text-base opacity-70";
export const summaryClassNamespan = "capitalize font-semibold text-base";
