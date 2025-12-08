import {
  MdDashboard,
  MdOutlineEventSeat,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { adminPath } from "../../context/UserContext";

import { RiProductHuntFill } from "react-icons/ri";
import { GrDeliver, GrUserSettings } from "react-icons/gr";
import { BiPhoneCall, BiUserPlus } from "react-icons/bi";
import type { SidebarProp } from "./types";
import { IoSettings } from "react-icons/io5";

export const SideBarMenu: SidebarProp[] = [
  {
    icon: <MdDashboard />,
    path: adminPath,
    Title: "Dashboard",
  },
  {
    icon: <RiProductHuntFill />,
    path: adminPath + "/addproduct",
    Title: "Add Product",
  },
  {
    icon: <MdProductionQuantityLimits />,
    path: adminPath + "/listproduct",
    Title: "List Product",
  },
  {
    icon: <GrDeliver />,
    path: adminPath + "/orders",
    Title: "Orders",
  },
  {
    icon: <BiPhoneCall />,
    path: adminPath + "/contact",
    Title: "Contact",
  },
  {
    icon: <MdOutlineEventSeat />,
    path: adminPath + "/events",
    Title: "Events",
  },
  {
    icon: <GrUserSettings />,
    path: adminPath + "/users",
    Title: "Users",
  },
  {
    icon: <BiUserPlus />,
    path: adminPath + "/sellers",
    Title: "Seller",
  },
  {
    icon: <IoSettings />,
    path: adminPath + "/settings",
    Title: "Settings",
  },
];
// Settings
