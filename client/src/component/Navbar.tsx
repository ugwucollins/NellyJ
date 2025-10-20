import { NavLink, useLocation } from "react-router-dom";
import { Assets, Menus } from "./assets";
import { NotAuth, UserAuth } from "../context/UserContext";
import { BiMenu, BiX } from "react-icons/bi";
import { useEffect, useState } from "react";
import { IoIosCart } from "react-icons/io";
import { LuLogOut, LuMoonStar, LuSun } from "react-icons/lu";
import { DarkModeClass } from "./HomeContent/HomeExportComponent";
import { UserProduct } from "../context/ProductContext";
import AvaterImage from "../context/AvaterImage";
import Modal from "../context/Modal";

const Navbar = ({ HandleTheme, darkMode }: any) => {
  useEffect(() => {}, [darkMode]);

  return (
    <div className="w-full z-10 sticky top-0 px-0.5">
      <Desktop HandleTheme={HandleTheme} darkMode={darkMode} />
      <Mobile HandleTheme={HandleTheme} darkMode={darkMode} />
    </div>
  );
};

export const Desktop = ({ HandleTheme, darkMode }: any) => {
  const { user, LogOut }: any = UserAuth();
  const { getTotalCount }: any = UserProduct();
  const [open, setOpen] = useState(false);
  const pathName = useLocation().pathname;
  const count = user && getTotalCount().length === 0 ? 0 : getTotalCount();
  const handleClose = () => {
    setOpen(!open);
  };
  const handleActionModal = () => {
    handleClose();
    LogOut();
  };

  return (
    <div>
      {open && (
        <Modal
          Icon={<LuLogOut />}
          OkayBtn="Yes"
          CancelBtn="No"
          Progress={handleActionModal}
          Cancel={handleClose}
          Title="Are You Sure that you want to LogOut"
        />
      )}
      <div
        className={`w-full max-[690px]:hidden fixed dark:text-primary shadow bg-primary h-auto py-3.5 flex justify-between px-16 drop-shadow max-md:pl-12 max-[800px]:pr-5 items-center hover:drop-shadow-lg   hover:shadow-inner ${DarkModeClass}`}
      >
        <LogoIcon />

        <div className="flex  max-lg:gap-8 gap-10 max-md:gap-4 items-center flex-row">
          {Menus.map((menu: any) => (
            <NavLink
              to={menu.path}
              key={menu.path}
              className={` hover:font-bold  ${
                pathName === menu.path ? "font-extrabold" : "font-semibold"
              }`}
            >
              {menu.title}
            </NavLink>
          ))}
        </div>

        <div className="px-5">
          <div>
            <div>
              {user ? (
                <>
                  <div className="flex gap-4 max-sm:gap-2 items-center">
                    <NavLink to={"/cart"}>
                      <div className=" relative">
                        <span
                          className={`w-auto absolute font-bold text-primary  text-[10px]  bg-red-900 rounded-full ${
                            count === 0
                              ? "-top-0.5 left-4 py-1 px-1 size-7"
                              : "-top-2.5 left-3.5 px-1.5 py-0.5 size-5"
                          }}`}
                        >
                          {count === 0 ? "" : count}
                        </span>
                        <IoIosCart className="text-2xl" />
                      </div>
                    </NavLink>

                    <div className="relative group">
                      <div className="flex relative flex-row-reverse icon items-center gap-1">
                        {user && user.imageUrl ? (
                          user.imageUrl && (
                            <img
                              src={user && user.imageUrl}
                              className="size-10 object-cover rounded-full ring-1 dark:ring-gray-800"
                              alt="userprofile"
                            />
                          )
                        ) : (
                          <AvaterImage size="10" />
                        )}

                        <span className="font-semibold max-lg:block capitalize max-sm:hidden">
                          {user && user.name
                            ? user && user.name.split(" ").slice(0, 6)[1]
                            : user.firstName && user.firstName
                            ? user.firstName
                            : "Avater"}
                        </span>
                      </div>
                      <div className="absolute bg-transparent px-2 hidden  group-hover:flex flex-col left-0">
                        <div className=" mt-2  bg-primary1 display py-2 px-3 text-secondary rounded-2xl">
                          <NavLink
                            to={"/profile"}
                            className="py-2 px-8 font-bold text-sm"
                          >
                            Profile
                          </NavLink>
                          <hr className="bg-secondary mt-2 h-[2px]" />
                          <NavLink
                            to={"/orders"}
                            className="py-2 px-8 font-bold text-sm"
                          >
                            Orders
                          </NavLink>

                          <hr className="bg-secondary mt-2 h-[2px]" />
                          <NavLink
                            to={"/wishlist"}
                            className="py-2 px-8 font-bold text-sm"
                          >
                            WishList
                          </NavLink>

                          <hr className="bg-secondary mt-2 h-[2px]" />
                          <NavLink
                            to={"/event/history"}
                            className="py-2 px-8 font-bold text-sm"
                          >
                            EventHistory
                          </NavLink>

                          <hr className="bg-secondary mt-2 h-[2px]" />

                          <button
                            className="py-2 px-8 font-bold text-sm"
                            onClick={handleClose}
                          >
                            {" "}
                            <p>LogOut</p>
                          </button>
                        </div>
                      </div>
                    </div>
                    {darkMode ? (
                      <LuMoonStar
                        className="text-xl cursor-pointer"
                        onClick={HandleTheme}
                      />
                    ) : (
                      <LuSun
                        className="text-xl cursor-pointer"
                        onClick={HandleTheme}
                      />
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-row items-center gap-3 max-sm:gap-2">
                  <NavLink to={NotAuth}>
                    <div className=" relative">
                      <span
                        className={`w-auto absolute font-bold text-primary  text-[10px]  bg-red-900 rounded-full ${
                          count === 0
                            ? "-top-1 left-4 py-1 px-1 size-7"
                            : "-top-2.5 left-3.5 px-1 py-0.5 size-5"
                        }}`}
                      >
                        {count === 0 ? "" : count}
                      </span>
                      <IoIosCart className="text-2xl" />
                    </div>
                  </NavLink>
                  <NavLink to={"/auth/signup"}>
                    <button className="bg-secondary dark:outline dark:outline-1 dark:outline-white text-primary font-semibold px-5 py-2.5 rounded-full">
                      <p className="bg-transparent">Sign UP</p>
                    </button>
                  </NavLink>
                  {darkMode ? (
                    <LuMoonStar
                      className="text-xl cursor-pointer"
                      onClick={HandleTheme}
                    />
                  ) : (
                    <LuSun
                      className="text-xl cursor-pointer"
                      onClick={HandleTheme}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LogoIcon = () => {
  const { user }: any = UserAuth();
  return (
    <NavLink to={user ? "/" : "/auth/signin"}>
      <div className="flex  items-center flex-row gap-2.5">
        <img
          src={Assets.Logo2}
          className="size-[52px] rounded-full"
          alt="Logo"
        />
        <div className="flex max-[170px]:hidden items-center font-semibold text-lg capitalize">
          <p>Nelly</p>
          <span className="font-extrabold text-yellow-700">-J</span>
        </div>
      </div>
    </NavLink>
  );
};

export const Mobile = ({ HandleTheme, darkMode }: any) => {
  const { getTotalCount }: any = UserProduct();
  const [open, setopen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { user, LogOut }: any = UserAuth();
  const pathName = useLocation().pathname;

  const count = user && getTotalCount().length === 0 ? 0 : getTotalCount();
  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };

  const handleActionModal = () => {
    setOpenModal(!openModal);
    handleClose();
    LogOut();
  };
  const handleClose = () => {
    setopen(!open);
  };

  return (
    <div className="w-full relative">
      {openModal && (
        <Modal
          Icon={<LuLogOut />}
          OkayBtn="Yes"
          CancelBtn="No"
          Progress={handleActionModal}
          Cancel={handleCloseModal}
          Title="Are You Sure that you want to LogOut"
        />
      )}
      <div
        className={`max-[690px]:block fixed dark:text-primary1  bg-primary w-full hidden  ${DarkModeClass}`}
      >
        <div className="w-full flex flex-row shadow-md py-2.5 justify-between px-8 max-[300px]:px-4 max-[200px]:px-2 items-center max-[180px]:px-0">
          <LogoIcon />
          <div className=" cursor-pointer" onClick={handleClose}>
            {open ? (
              <BiX className="text-3xl cursor-pointer" />
            ) : (
              <BiMenu className="text-3xl cursor-pointer" />
            )}
          </div>
        </div>

        {open && (
          <div className="absolute overflow-hidden max-[690px]:flex w-full hidden h-auto py-10 px-2 text-white bg-yellow-800 transition-all duration-1000  justify-center flex-col items-center align-middle">
            <div className="px-3 items-center pb-7 flex max-[200px]:justify-center justify-end w-full">
              <div>
                <div>
                  {user ? (
                    <>
                      <div className="flex max-[200px]:flex-col-reverse gap-4 max-sm:gap-2 items-center">
                        <NavLink to={"/cart"} onClick={handleClose}>
                          <div className=" relative">
                            <span
                              className={`w-auto absolute font-bold text-primary  text-[10px]  bg-red-900 rounded-full ${
                                count === 0
                                  ? "-top-1 left-4 py-1 px-1 size-7"
                                  : "-top-2.5 left-3.5 px-1 py-0.5 size-5"
                              }}`}
                            >
                              {count === 0 ? "" : count}
                            </span>

                            <IoIosCart className="text-2xl" />
                          </div>
                        </NavLink>

                        <div className="flex flex-row-reverse relative items-center gap-1 group">
                          <div className="flex flex-row-reverse items-center gap-1">
                            {user && user.imageUrl ? (
                              user.imageUrl && (
                                <img
                                  src={user && user.imageUrl}
                                  className="size-10 object-cover rounded-full ring-1 dark:ring-gray-800"
                                  alt="userprofile"
                                />
                              )
                            ) : (
                              <AvaterImage />
                            )}
                            <span className="font-semibold max-lg:block capitalize max-sm:hidden">
                              {user && user.name
                                ? user && user.name.split(" ").slice(0, 6)[1]
                                : "Avater"}
                            </span>
                          </div>
                          <div className="absolute bg-transparent px-2 hidden  group-hover:flex flex-col -left-24 top-10">
                            <div className=" mt-2  bg-primary1 display py-2 px-3 text-secondary rounded-2xl">
                              <NavLink
                                to={"/profile"}
                                onClick={handleClose}
                                className="py-2 px-8 font-bold text-sm"
                              >
                                Profile
                              </NavLink>
                              <hr className="bg-secondary mt-2 h-[2px]" />
                              <NavLink
                                onClick={handleClose}
                                to={"/orders"}
                                className="py-2 px-8 font-bold text-sm"
                              >
                                Orders
                              </NavLink>

                              <hr className="bg-secondary mt-2 h-[2px]" />
                              <NavLink
                                to={"/wishlist"}
                                onClick={handleClose}
                                className="py-2 px-8 font-bold text-sm"
                              >
                                WishList
                              </NavLink>

                              <hr className="bg-secondary mt-2 h-[2px]" />
                              <NavLink
                                to={"/event/history"}
                                onClick={handleClose}
                                className="py-2 px-8 font-bold text-sm"
                              >
                                EventHistory
                              </NavLink>

                              <hr className="bg-secondary mt-2 h-[2px]" />

                              <button
                                className="py-2 px-8 font-bold text-sm"
                                onClick={() => {
                                  handleCloseModal();
                                }}
                              >
                                {" "}
                                <p>LogOut</p>
                              </button>
                            </div>
                          </div>
                        </div>
                        {darkMode ? (
                          <LuMoonStar
                            className="text-xl cursor-pointer"
                            onClick={() => {
                              HandleTheme();
                              handleClose();
                            }}
                          />
                        ) : (
                          <LuSun
                            className="text-xl cursor-pointer"
                            onClick={() => {
                              HandleTheme();
                              handleClose();
                            }}
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex max-[200px]:flex-col-reverse flex-row items-center gap-3 max-sm:gap-2">
                        <NavLink to={NotAuth} onClick={handleClose}>
                          <div className=" relative">
                            <span
                              className={`w-auto absolute font-bold text-primary  text-[10px]  bg-red-900 rounded-full ${
                                count === 0
                                  ? "-top-1 left-4 py-1 px-1 size-7"
                                  : "-top-2.5 left-3.5 px-1 py-0.5 size-5"
                              }}`}
                            >
                              {count === 0 ? "" : count}
                            </span>
                            <IoIosCart className="text-2xl" />
                          </div>
                        </NavLink>
                        <NavLink to={"/auth/signup"} onClick={handleClose}>
                          <button className="bg-secondary text-primary font-semibold px-5 py-2.5 rounded-full">
                            <p>Sign UP</p>
                          </button>
                        </NavLink>
                        {darkMode ? (
                          <LuMoonStar
                            className="text-xl cursor-pointer"
                            onClick={() => {
                              HandleTheme();
                              handleClose();
                            }}
                          />
                        ) : (
                          <LuSun
                            className="text-xl cursor-pointer"
                            onClick={() => {
                              HandleTheme();
                              handleClose();
                            }}
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-10 items-center flex-col">
              {Menus.map((menu: any) => (
                <NavLink
                  onClick={handleClose}
                  to={menu.path}
                  key={menu.path}
                  className={` transition-all duration-1000 hover:font-bold  ${
                    pathName === menu.path ? "font-extrabold" : "font-semibold"
                  }`}
                >
                  {menu.title}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

export const ReplacePath = "/auth/signin";
