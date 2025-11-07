import { UsersArray } from "../../Admin/users/UsersPage";
import { currency, UserProduct } from "../../context/ProductContext";

export const RealValues = () => {
  const { orders, products }: any = UserProduct();

  const Sales = 20000;
  const customers = UsersArray.length;
  const sellers = 15;
  const events = 30;
  const product = products && products.length;
  const order = orders && orders.length;
  const contacts = 100;
  return {
    product: product,
    orders: order,
    sales: `${currency} ${Sales}`,
    customers: customers,
    sellers: sellers,
    events: events,
    contacts: contacts,
  };
};
