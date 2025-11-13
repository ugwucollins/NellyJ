import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DummyOrder, Products as ProductsArray } from "../component/assets";
import type { ProductProps } from "./Types";
import ApiURL from "./Api";
import { UserAuth } from "./UserContext";

export const ProductProvider = createContext({});
export const currency = "₦";

const ProductContext = ({ children }: any) => {
  const { user, token, setuser }: any = UserAuth();
  const [products, setproducts] = useState<ProductProps>(ProductsArray || []);
  const [cartItem, setcartItem] = useState({});
  const [category, setcategory] = useState("");
  const [coupon, setcoupon] = useState("1111");
  const JsonValue: any = localStorage.getItem("HiddenCode");
  const [code, setcode] = useState(JSON.parse(JsonValue));
  const [text, settext] = useState("");
  const [promo, setpromo] = useState(false);
  const local: any = localStorage.getItem("promo");
  const num: any = JSON.parse(local);
  const [cartArray, setcartArray]: any = useState([]);
  const [orders, setOrders] = useState(DummyOrder);

  useEffect(() => {
    setOrders(DummyOrder);
  }, []);
  const duration = +num || 0 * 0 * 0 * 0 * 1000;

  const AddtoCart = async (itemId: any) => {
    let cartData: any = structuredClone(cartItem);
    if (cartData[itemId]) {
      cartData[itemId] = cartData[itemId] += 1;
    } else {
      cartData[itemId] = cartData[itemId] = 1;
    }
    setcartItem(cartData);
    toast.success("Added to cart");
  };

  const ShuffleArray = (array: []) => {
    for (let i = array.length - 1; i > 0; i--) {
      const items = Math.floor(Math.random() * (i + 1));
      [array[i], array[items]] = [array[items], array[i]];
    }

    return array;
  };

  const UpdateCart = (itemId: any, quantity: any) => {
    let cartData: any = structuredClone(cartItem);
    cartData[itemId] = quantity;
    setcartItem(cartData);
    toast.success("Cart has Been Updated");
  };
  const getTotalCount = () => {
    let totalCount = 0;
    let cart: any = cartItem;
    for (const item in cart) {
      totalCount += cart[item];
    }
    return totalCount;
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    let cart: any = cartItem;
    for (const item in cart) {
      let itemPrice = products.find((product) => product._id === item);
      if (cart[item] > 0) {
        totalAmount += itemPrice?.price! * cart[item];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };
  const getTotalDeliveryFee = () => {
    let totalAmount = 0;
    let cart: any = cartItem;
    for (const item in cart) {
      let itemPrice = products.find((product) => product._id === item);
      if (cart[item] > 0) {
        totalAmount += +itemPrice?.deliveryFee! * cart[item];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  const RemoveFromeCart = async (itemId: any) => {
    let cartData: any = structuredClone(cartItem);
    if (cartData[itemId]) {
      cartData[itemId] = cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
        toast.success("Removed From Cart");
      } else {
        toast.success("Reducing Item Quantity");
      }
    }
    setcartItem(cartData);
  };

  useEffect(() => {
    if (duration === 0) {
      console.log("no");
      setpromo(false);
    } else if (duration === -1 || +num === 0 || +num === -1) {
      setpromo(false);
    } else {
      setpromo(true);
    }
    getTotalCount();
  }, [duration, cartItem]);

  useEffect(() => {
    const info = {
      cartItems: cartItem,
    };

    async function UpdateCart() {
      try {
        const res = await ApiURL.post("/user/cart/update", info, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        if (data.success) {
          setuser(data.data.cartItems);
        } else {
          toast.error(data.message, { id: "cart" });
        }
      } catch (error: any) {
        toast.error(error.response.data.message, { id: "cart" });
      }
    }

    if (user) {
      UpdateCart();
    }
  }, [cartItem]);

  const Values = {
    getTotalDeliveryFee,
    orders,
    setOrders,
    cartArray,
    setcartArray,
    getTotalCount,
    getTotalAmount,
    products,
    setproducts,
    cartItem,
    setcartItem,
    coupon,
    code,
    setcode,
    text,
    settext,
    setcoupon,
    num,
    category,
    setcategory,
    duration,
    currency,
    AddtoCart,
    UpdateCart,
    RemoveFromeCart,
    ShuffleArray,
    promo,
    setpromo,
  };
  return (
    <ProductProvider.Provider value={Values}>
      {children}
    </ProductProvider.Provider>
  );
};

export default ProductContext;

export const UserProduct = () => {
  return useContext(ProductProvider);
};
