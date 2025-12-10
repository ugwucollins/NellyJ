import { useState } from "react";
import { Assets } from "../../component/assets";
import { Link, useLocation } from "react-router-dom";
import {
  BiLogOut,
  BiPhoneCall,
  BiSolidArrowFromRight,
  BiX,
} from "react-icons/bi";
import Modal from "../../context/Modal";
import { UserSellerAuth } from "../Context/SellersContext";
import { UseTheme } from "../../App";
import { BsMoonFill } from "react-icons/bs";
import { LuSun } from "react-icons/lu";
import {
  MdDashboard,
  MdEventAvailable,
  MdMenu,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { sellerPath } from "../../context/UserContext";
import { RiProductHuntFill } from "react-icons/ri";
import { GrDeliver } from "react-icons/gr";
import type { SidebarProp } from "../Context/Types";

const Sidebar = () => {
  const { HandleLogOut, seller }: any = UserSellerAuth();
  const { HandleTheme, darkMode }: any = UseTheme();

  const [open, setOpen] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };
  const handleCloseSideBar = () => {
    setOpenSidebar(!openSidebar);
  };
  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };
  const handleActionModal = () => {
    setOpenModal(!openModal);
    HandleLogOut();
  };

  return (
    <div className="w-auto sticky top-0 z-[2]">
      <div>
        {openModal && (
          <Modal
            Title="Are you Sure You want to Logout From the Sellers Account"
            OkayBtn="Yes"
            Progress={handleActionModal}
            Cancel={handleCloseModal}
            CancelBtn="No"
          />
        )}
      </div>
      <div className="w-auto max-h-full relative max-[500px]:hidden max-[450px]:fixed dark:bg-sellerDark bg-white dark:shadow-neutral-300 px-0.5 shadow-lg max-sm:h-screen h-[90.6vh]">
        <div className="w-auto py-5 relative">
          <div
            className={`max-sm:block pb-4  hidden ${open ? "pl-8" : "pl-2"}`}
          >
            <SellerLogo action={open} />
          </div>

          <div
            onClick={handleClose}
            className="absolute -right-3 max-sm:top-7 top-1 rounded-full cursor-pointer size-10 flex items-center justify-center text-2xl text-black bg-slate-50"
          >
            <BiSolidArrowFromRight />
          </div>

          <hr className="h-[1.5px] w-full bg-neutral-400/90 mt-2 mb-5" />
          <SidebarMenuCom open={open} />
        </div>

        <div className="w-full absolute bottom-3 max-sm:bottom-8 left-0">
          <Link to={sellerPath + "/settings"}>
            <div className="flex items-center gap-3.5 cursor-pointer mb-2 px-5">
              <img
                src={
                  seller && seller.imageUrl ? seller.imageUrl : Assets.Avater
                }
                className={`object-cover ring-2 max-sm: rounded-full ${
                  open ? "size-10 ring-white" : "size-8 ring-yellow-800"
                }`}
                alt="Avater photo"
              />
              {open && (
                <span className="font-semibold text-base hover:font-bold">
                  {"Settings"}
                </span>
              )}
            </div>
          </Link>

          <div
            onClick={HandleTheme}
            className={`items-center cursor-pointer gap-4 py-2.5 flex rounded-md ${
              open ? "px-8" : "px-6"
            }`}
          >
            {darkMode === true ? (
              <BsMoonFill className="text-2xl" />
            ) : (
              <LuSun className="text-2xl" />
            )}
            {open && (
              <span className=" font-semibold text-base hover:font-bold">
                {darkMode === true ? "Dark" : "Light"}Mode
              </span>
            )}
          </div>

          <div
            onClick={handleCloseModal}
            className={`hidden items-center cursor-pointer gap-4 bg-slate-100 dark:bg-secondary py-2.5 max-sm:flex rounded-md ${
              open ? "px-6" : "px-4"
            }`}
          >
            <BiLogOut className="text-3xl" />
            {open && (
              <span className=" font-semibold text-base hover:font-bold">
                LogOut
              </span>
            )}
          </div>
        </div>
      </div>

      {openSidebar && (
        <div className="w-auto fixed dark:bg-sellerDark bg-white dark:shadow-neutral-300 px-0.5 shadow-lg max-sm:h-screen h-[90.6vh]">
          <div className="w-auto py-5 relative  transition-all duration-200 ">
            <div
              className={`max-sm:block pb-4  hidden ${open ? "pl-8" : "pl-2"}`}
            >
              <SellerLogo action={open} />
            </div>
            <div
              onClick={handleCloseSideBar}
              className={`absolute dark:text-black max-[500px]:block hidden text-2xl p-3 rounded cursor-pointer bg-white shadow-md right-0 top-0 `}
            >
              <BiX />
            </div>
            <div
              onClick={handleClose}
              className={`absolute -right-3  transition-all duration-200 rounded-full cursor-pointer size-10 flex items-center justify-center text-2xl text-black bg-slate-50 
                ${openSidebar ? " top-20" : "max-sm:top-7"}`}
            >
              <BiSolidArrowFromRight />
            </div>

            <hr className="h-[1.5px] w-full bg-neutral-400/90 mt-2 mb-5" />

            <SidebarMenuCom open={open} />
          </div>

          <div className="w-full absolute bottom-2 max-sm:bottom-6 left-0">
            <Link to={sellerPath + "/settings"}>
              <div className="flex items-center gap-3.5 cursor-pointer mb-2 px-5">
                <img
                  src={
                    seller && seller.imageUrl ? seller.imageUrl : Assets.Avater
                  }
                  className={`object-cover ring-2 max-sm: rounded-full ${
                    open ? "size-10 ring-white" : "size-8 ring-yellow-800"
                  }`}
                  alt="Avater photo"
                />
                {open && (
                  <span className="font-semibold text-base hover:font-bold">
                    {"Settings"}
                  </span>
                )}
              </div>
            </Link>

            <div
              onClick={HandleTheme}
              className={`items-center cursor-pointer gap-4 py-2.5 flex rounded-md ${
                open ? "px-8" : "px-6"
              }`}
            >
              {darkMode === true ? (
                <BsMoonFill className="text-2xl" />
              ) : (
                <LuSun className="text-2xl" />
              )}
              {open && (
                <span className=" font-semibold text-base hover:font-bold">
                  {darkMode === true ? "Dark" : "Light"}Mode
                </span>
              )}
            </div>

            <div
              onClick={handleCloseModal}
              className={`hidden items-center cursor-pointer gap-4 bg-slate-100 dark:bg-secondary py-2.5 max-sm:flex rounded-md ${
                open ? "px-6" : "px-4"
              }`}
            >
              <BiLogOut className="text-3xl" />
              {open && (
                <span className=" font-semibold text-base hover:font-bold">
                  LogOut
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {!openSidebar && (
        <div
          onClick={handleCloseSideBar}
          className={`absolute dark:text-black transition-all duration-200  max-[500px]:block hidden text-2xl p-3 rounded cursor-pointer bg-white shadow-md left-2 top-2`}
        >
          <MdMenu />
        </div>
      )}
    </div>
  );
};

export default Sidebar;

export function SellerLogo({ action }: any | boolean) {
  return (
    <div className="flex items-center flex-row gap-2.5">
      <img src={Assets.Logo2} className="size-[52px] rounded-full" alt="Logo" />
      {action && (
        <div className="flex max-[170px]:hidden items-center font-semibold text-lg capitalize">
          <p>Nelly</p>
          <span className="font-extrabold text-yellow-700">-J</span>
        </div>
      )}
    </div>
  );
}

type SidebarMenuComProp = {
  open: boolean;
  pathName?: string;
};

const SidebarMenuCom = ({ open }: SidebarMenuComProp) => {
  const pathName = useLocation().pathname;

  const SideBarMenu: SidebarProp[] = [
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
    {
      icon: <BiPhoneCall />,
      path: sellerPath + "/contact",
      Title: "Contact",
    },
    {
      icon: <MdEventAvailable />,
      path: sellerPath + "/events",
      Title: "Events",
    },
  ];

  return (
    <div className="flex gap-y-4 flex-col max-sm:mt-0 mt-5 overflow-hidden">
      {SideBarMenu.map((item, index: number) => {
        return (
          <Link to={item.path} key={index}>
            <div
              className={`py-3.5 transition-all duration-200 flex items-center relative dark:text-black gap-1 cursor-pointer  rounded-lg ${
                pathName === item.path
                  ? "bg-gray-100"
                  : "bg-white dark:bg-gray-200/60"
              } ${open ? "px-12" : "px-6"}`}
            >
              <span className="text-2xl">{item.icon}</span>
              {open && (
                <p
                  className={`text-base whitespace-nowrap hover:font-bold ${
                    pathName === item.path ? "font-bold" : "font-semibold"
                  }`}
                >
                  {item.Title}
                </p>
              )}
              {pathName === item.path && open && (
                <div>
                  <div className=" w-[5px] h-full rounded-2xl bg-yellow-800 top-0 absolute right-0" />
                  <div className="size-5 rounded-full bg-white shadow-xl drop-shadow-md top-1 absolute left-1" />
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
