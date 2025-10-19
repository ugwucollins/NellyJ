import { useState } from "react";
import HeaderProp from "../../context/HeaderProp";
import type { AccountProp } from "../../context/Types";
import { Account, AccountType } from "../assets";
import {
  DarkModeClass,
  FeatureArryMap,
} from "../HomeContent/HomeExportComponent";
import PasswordM from "./PasswordM";
import AddressM from "./AddressM";
import LogOut from "./LogOut";
import AccountM from "./AccountM";
import Payment from "./Payment";
import OrdersM from "./OrdersM";

const ProfileHeader = () => {
  return (
    <div>
      <HeaderProp
        AnText="Profile"
        LinkPath=""
        LinkText1="Home"
        className="pb-10"
        LinkText2="profile"
      />
      <div className="w-full px-20 max-md:px-14 max-sm:px-5 max-[170px]:px-1">
        <ProfileContent />
      </div>
      <div
        className={`w-full overflow-hidden px-10 max-[170px]:px-1 max-[690px]:px-10 pb-3 relative z-[2] ${DarkModeClass}`}
      >
        <FeatureArryMap />
      </div>
    </div>
  );
};

export const ProfileContent = () => {
  const [CurrentIndex, setCurrentIndex] = useState("account");

  return (
    <div className="flex gap-4 flex-row max-sm:flex-col gap-y-6">
      <div
        className="flex w-auto gap-2.5 pb-8 max-sm:gap-x-4 max-sm:gap-y-3 max-sm:flex-wrap text-left  max-sm:justify-center max-sm:items-center flex-col max-sm:flex-row
      "
      >
        {Account.map((item: AccountProp, index: number) => {
          return (
            <div
              key={index}
              onClick={() => setCurrentIndex(item.type)}
              className={`px-4 py-2.5 whitespace-nowrap pr-4  cursor-pointer outline outline-1 outline-slate-200 ${
                CurrentIndex === item.type
                  ? "bg-yellow-700 text-white font-semibold rounded-xl"
                  : "rounded-lg"
              }`}
            >
              {item.title}
            </div>
          );
        })}
      </div>
      <div className="w-full  px-4 max-[170px]:px-1 pl-5">
        <div>
          {CurrentIndex === AccountType.Personal_Account && <AccountM />}
        </div>
        <div>
          {CurrentIndex === AccountType.Password_Manager && <PasswordM />}
        </div>

        <div>{CurrentIndex === AccountType.Manage_Address && <AddressM />}</div>

        <div>{CurrentIndex === AccountType.Payment_Method && <Payment />}</div>
        <div>{CurrentIndex === AccountType.My_Orders && <OrdersM />}</div>

        <div>{CurrentIndex === AccountType.Logout && <LogOut />}</div>
      </div>
    </div>
  );
};

export default ProfileHeader;
