import { useEffect } from "react";
import {
  summaryClassName,
  summaryClassNameP,
  summaryClassNamespan,
} from "../component/ShoppingCart";
import { currency, UserProduct } from "./ProductContext";
import { Link } from "react-router-dom";

const CheckOutCard = ({ LinkPath }: any) => {
  const {
    cartItem,
    products,
    getTotalAmount,
    code,
    cartArray,
    setcartArray,
    getTotalDeliveryFee,
  }: any = UserProduct();

  // const HandleCheckout = () => {
  //   setTimeout(() => {
  //     settext("");
  //     localStorage.removeItem("HiddenCode");
  //     setcode(false);
  //   }, 3000);
  // };

  function grtTotalCartItems() {
    let totalCart: any = [];
    for (const key in cartItem) {
      const product = products.find((item: any) => item._id === key);
      product.quantity = cartItem[key];
      totalCart.push(product);
    }
    setcartArray(totalCart);
  }

  useEffect(() => {
    grtTotalCartItems();
  }, [cartItem]);
  return (
    <div className="w-full max-w-xs max-sm:max-w-xl px-5 py-5 outline-1 hover:shadow-xl hover:rounded-xl outline outline-gray-300 rounded-md shadow-md">
      <div className="flex pb-2 flex-col gap-3.5">
        <div className="flex text-left flex-col gap-y-4 py-2">
          <h1 className="text-[min(5vw,18px)] font-bold">Order Summary</h1>
          <hr className="w-full h-[1px] bg-gray-400" />
        </div>

        <div className={summaryClassName}>
          <p className={summaryClassNameP}>sub total</p>
          <span className={summaryClassNamespan}>
            {currency}
            {getTotalAmount()}.00
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
          disabled={!cartArray.length}
          // onClick={HandleCheckout}
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
  );
};

export default CheckOutCard;
