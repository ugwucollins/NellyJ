import { BiDollar } from "react-icons/bi";
import HeaderProp from "../../context/HeaderProp";
import Card from "../Context/Card";
import { UserSellerAuth } from "../Context/SellersContext";
import { GrDeliver } from "react-icons/gr";
import type { AddCardProp, CardProp } from "../Context/Types";
import { sellerPath } from "../../context/UserContext";
import { MdProductionQuantityLimits } from "react-icons/md";
import AddCard from "../Context/AddCard";
import { PiPlus } from "react-icons/pi";

const SellerDashboard = () => {
  return (
    <div className="w-full">
      <div className="w-full sticky top-0 z-[1]">
        <HeaderProp
          LinkText1="Home"
          LinkText2="dashboard"
          AnText="Sellers Dashboard"
          LinkPath={sellerPath}
        />
      </div>
      <div className="px-4 py-5">
        <SellerDashboardContent />
      </div>
    </div>
  );
};

export default SellerDashboard;

export const SellerDashboardContent = () => {
  const { seller }: any = UserSellerAuth();

  return (
    <div>
      <div className=" mb-4 py-2 px-2">
        <h1 className="font-bold text-xl">Dashboard Overview</h1>
        <h1 className="opacity-90 text-sm font-semibold">
          Welcome {seller && seller.email.split("@gmail.com")}!
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-5 my-5">
        {CardArray.map((item: CardProp, index) => (
          <Card
            key={index}
            index={index}
            Title={item.Title}
            icon={item.icon}
            value={item.value}
            color={item.color}
            pen={item.pen}
            path={item.path}
          />
        ))}
      </div>
      <div className="flex pb-4 flex-wrap gap-4 justify-center px-4">
        {CardArrayLong.map((item: AddCardProp, index) => (
          <AddCard
            index={index}
            key={item.Title}
            Title={item.Title}
            icon={item.icon}
            text={item.text}
            color={item.color}
            path={item.path}
            btnText={item.btnText}
          />
        ))}
      </div>
    </div>
  );
};

export const CardArrayLong: AddCardProp[] = [
  {
    Title: "Add New Product",
    icon: <PiPlus />,
    text: "Quickly add a new product to your store inventory",
    color: "purple",
    btnText: "Add Product",
    path: sellerPath + "/addproduct",
  },
  {
    Title: "See All Product",
    icon: <MdProductionQuantityLimits />,
    text: "Quickly List of all the new product to your store inventory",
    color: "#854d0e",
    btnText: "View Product",
    path: sellerPath + "/listproduct",
  },
];
export const CardArray: CardProp[] = [
  {
    Title: "Total Sales",
    icon: <BiDollar />,
    value: " $24,789",
    color: "green",
    pen: "+12.5 from past last month",
    path: sellerPath,
  },
  {
    Title: "Total Orders",
    icon: <GrDeliver />,
    value: " 120",
    color: "yellow",
    pen: "+20 from past last week",
    path: sellerPath + "/orders",
  },
  {
    Title: "All Products",
    icon: <MdProductionQuantityLimits />,
    value: "1299",
    color: "Orange",
    pen: "+12 Total New product",
    path: sellerPath + "/listproduct",
  },
  {
    Title: "Total Customers",
    icon: <MdProductionQuantityLimits />,
    value: "1299",
    color: "blue",
    pen: "20 Total New User/customers",
    path: sellerPath,
  },
];
