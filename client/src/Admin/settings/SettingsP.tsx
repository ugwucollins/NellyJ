import { useState } from "react";
import { buttonClassName } from "../../component/Animation";
import AvaterImage from "../../context/AvaterImage";
import { UserAdminAuth } from "../context/AdminContext";
import Modal from "../../context/Modal";
import { LuLogOut, LuSun } from "react-icons/lu";
import { UseTheme } from "../../App";
import { BsMoonFill } from "react-icons/bs";

const SettingsP = () => {
  const { admin, HandleLogOut }: any = UserAdminAuth();
  const { HandleTheme, darkMode }: any = UseTheme();

  const [open, setOpen] = useState(false);
  function handleModalA() {
    setOpen(false);
    HandleLogOut();
  }

  function handleCloseModalA() {
    setOpen(!open);
  }

  if (open) {
    return (
      <div>
        <Modal
          Title="Are You sure you want to LogOut"
          Icon={<LuLogOut />}
          CancelBtn="No"
          Progress={handleModalA}
          OkayBtn="Yes"
          Cancel={handleCloseModalA}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center flex-col px-2 py-8">
      <div className="w-full max-w-2xl shadow-lg text-center drop-shadow-md rounded-2xl p-10 outline-none dark:outline-1 dark:outline dark:outline-slate-700">
        <h1 className=" font-bold text-lg dark:py-5 py-2">Settings</h1>
        <div className="flex w-full items-center justify-center flex-col text-center gap-2 py-2">
          <div
            className={`bg-neutral-100 size-24 relative flex justify-center items-center max-[330px]:p-0 rounded-full ${
              true ? "dark:bg-neutral-600" : "dark:bg-neutral-300"
            }`}
          >
            {admin && admin?._id ? (
              <img
                src={admin && admin?.imageUrl}
                className="size-24 rounded-full object-cover"
                alt={"contacted photos"}
              />
            ) : (
              <AvaterImage size="24" />
            )}
          </div>
          <div className="whitespace-nowrap">
            <p className="font-semibold text-base capitalize">
              {admin?.name ? admin?.name : "Hi Admin"}
            </p>
            <span className="whitespace-nowrap text-sm font-semibold opacity-60 capitalize">
              {admin && admin?.email}
            </span>
          </div>
        </div>

        <div
          onClick={HandleTheme}
          className={`items-center mt-5 dark:text-white cursor-pointer gap-4 py-2.5 flex rounded-md px-6 bg-slate-50 dark:bg-slate-800`}
        >
          {darkMode === true ? (
            <BsMoonFill className="text-2xl" />
          ) : (
            <LuSun className="text-2xl" />
          )}
          <span className=" font-semibold text-base hover:font-bold">
            {darkMode === true ? "Dark" : "Light"}Mode
          </span>
        </div>

        <div className="w-full flex flex-col gap-3 py-4">
          <button
            onClick={handleCloseModalA}
            className={`${buttonClassName} dark:bg-transparent dark:text-white dark:outline-white dark:hover:outline-red-800 dark:outline outline-2 bg-red-800 w-full`}
          >
            <p>LogOut</p>
          </button>
          <button className={`${buttonClassName} w-full`}>
            <p>Update</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsP;
