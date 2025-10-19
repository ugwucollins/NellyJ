import { MdDashboard, MdProductionQuantityLimits } from "react-icons/md";
import { sellerPath } from "../../context/UserContext";
import type { SidebarProp } from "./Types";
import { RiProductHuntFill } from "react-icons/ri";
import { GrDeliver } from "react-icons/gr";

export const SideBarMenu: SidebarProp[] = [
  {
    icon: <MdDashboard />,
    path: sellerPath,
    Title: "Dashboard",
  },
  {
    icon: <RiProductHuntFill />,
    path: sellerPath + "/addproduct",
    Title: "Add Product",
  },
  {
    icon: <MdProductionQuantityLimits />,
    path: sellerPath + "/listproduct",
    Title: "List Product",
  },
  {
    icon: <GrDeliver />,
    path: sellerPath + "/orders",
    Title: "Orders",
  },
];
