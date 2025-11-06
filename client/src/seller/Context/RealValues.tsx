import { currency, UserProduct } from "../../context/ProductContext";

export const RealValues = () => {
  const { orders, products }: any = UserProduct();

  const Sales = 20000;
  const customers = 200;
  const sellers = 5;
  const events = 300;
  const product = products && products.length;
  const order = orders && orders.length;
  return {
    product: product,
    orders: order,
    sales: `${currency} ${Sales}`,
    customers: customers,
    sellers: sellers,
    events: events,
  };
};
