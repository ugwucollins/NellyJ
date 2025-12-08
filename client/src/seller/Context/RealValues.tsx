import { useEffect, useState } from "react";
import { currency, UserProduct } from "../../context/ProductContext";
import { UserAuth } from "../../context/UserContext";
import { UserAdminAuth } from "../../Admin/context/AdminContext";
import { UserSellerAuth } from "./SellersContext";

export const RealValues = () => {
  const { products }: any = UserProduct();
  const [totalAmount, setTotalAmount] = useState<number | any>();
  const { token }: any = UserAuth();
  const { allOrders, customers, sellers }: any = UserAdminAuth();
  const { contact, events, sales }: any = UserSellerAuth();

  async function totalSales() {
    let amount =
      (await allOrders.reduce(async (acc: any, item: any) => {
        return (await acc) + item.totalPrice + item.deliveryFee;
      }, 0)) ||
      (await sales.reduce(async (acc: any, item: any) => {
        return (await acc) + item.amount;
      }, 0));
    setTotalAmount(amount);
  }

  useEffect(() => {
    if (token) {
      totalSales();
    }
  }, []);

  const Sales =
    totalAmount?.toString()?.length >= 5
      ? totalAmount.toString().slice(0, 2) +
        "," +
        totalAmount.toString().slice(2)
      : totalAmount?.toString()?.length >= 4
      ? totalAmount.toString().slice(0, 1) +
        "," +
        totalAmount.toString().slice(1)
      : totalAmount || 100;
  const customer = customers && customers?.length;
  const event = events && events.length;
  const product = products && products.length;
  const order = allOrders && allOrders.length;
  const contacts = contact && contact.length;
  return {
    product: product,
    orders: order,
    sales: `${currency} ${Sales}`,
    customers: customer,
    customersDetails: customers,
    sellers: sellers && sellers.length,
    events: event,
    contacts: contacts,
  };
};
