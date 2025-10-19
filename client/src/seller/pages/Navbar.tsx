import { useState } from "react";
import { Assets } from "../../component/assets";
import Modal from "../../context/Modal";
import { UserSellerAuth } from "../Context/SellersContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { HandleLogOut }: any = UserSellerAuth();

  const handleClose = () => {
    setOpen(!open);
  };
  const handleActionModal = () => {
    setOpen(!open);
    HandleLogOut();
  };
  return (
    <div>
      <div>
        {open && (
          <Modal
            Title="Are you Sure You want to Logout From the Sellers Account"
            OkayBtn="Yes"
            Progress={handleActionModal}
            Cancel={handleClose}
            CancelBtn="No"
          />
        )}
      </div>

      <div className="w-full max-sm:hidden fixed z-[3] top-0 dark:bg-sellerDark bg-white dark:shadow-neutral-300 shadow-md px-8 py-2 flex items-center justify-between">
        <div className="flex items-center flex-row gap-2.5">
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
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">
            Hi' <span className="font-bold">{"Seller"}</span>
          </h1>
          <button
            onClick={handleClose}
            className="px-6 py-3 dark:outline-white dark:shadow-lg 
            dark:hover:outline-white dark:hover:bg-white dark:drop-shadow-lg bg-black text-white font-semibold hover:font-bold text-base rounded-full hover:outline-2 outline hover:bg-transparent hover:text-black transition-all duration-200"
          >
            <p>LogOut</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
