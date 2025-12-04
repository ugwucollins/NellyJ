import { useEffect, useState } from "react";
import { currency, UserProduct } from "../../context/ProductContext";
import ApiURL from "../../context/Api";
import toast from "react-hot-toast";
import { UserAuth } from "../../context/UserContext";
import { UserAdminAuth } from "../../Admin/context/AdminContext";
import { UserSellerAuth } from "./SellersContext";

export const RealValues = () => {
  const { products }: any = UserProduct();
  const [customers, setCustomers] = useState([]);
  const { options, token }: any = UserAuth();
  const { allOrders }: any = UserAdminAuth();
  const { contact, events }: any = UserSellerAuth();

  async function GetAllUsersHandler() {
    try {
      const res = await ApiURL.get("/user", options);
      const data = res.data;
      setCustomers(data?.data);
    } catch (error: any) {
      toast.error(error.response.data.message, { id: "users" });
    }
  }

  useEffect(() => {
    if (token) {
      GetAllUsersHandler();
    }
  }, []);

  const Sales = 20000;
  const customer = customers && customers?.length;
  const sellers = 15;
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
    sellers: sellers,
    events: event,
    contacts: contacts,
  };
};
