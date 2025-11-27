import { useEffect, useState } from "react";
import { currency, UserProduct } from "../../context/ProductContext";
import ApiURL from "../../context/Api";
import toast from "react-hot-toast";
import { UserAuth } from "../../context/UserContext";
import { UserAdminAuth } from "../../Admin/context/AdminContext";

export const RealValues = () => {
  const { products }: any = UserProduct();
  const [customers, setCustomers] = useState([]);
  const { options }: any = UserAuth();
  const { allOrders }: any = UserAdminAuth();

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
    GetAllUsersHandler();
  }, []);

  const Sales = 20000;
  const customer = customers && customers?.length;
  const sellers = 15;
  const events = 30;
  const product = products && products.length;
  const order = allOrders && allOrders.length;
  const contacts = 100;
  return {
    product: product,
    orders: order,
    sales: `${currency} ${Sales}`,
    customers: customer,
    customersDetails: customers,
    sellers: sellers,
    events: events,
    contacts: contacts,
  };
};
