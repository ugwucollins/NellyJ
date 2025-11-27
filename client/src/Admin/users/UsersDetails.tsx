import { useParams } from "react-router-dom";
import Navbar from "../Bars/Navbar";
import Sidebar from "../Bars/Sidebar";
import HeaderProp from "../../context/HeaderProp";
import { adminPath, UserAuth } from "../../context/UserContext";
import type { UserCardProp } from "./UsersCard";
import { useEffect, useState } from "react";
import AvaterImage from "../../context/AvaterImage";
import ApiURL from "../../context/Api";
import toast from "react-hot-toast";

const UsersDetails = () => {
  const { id } = useParams();
  return (
    <div>
      <Navbar />
      <div className="w-full flex mt-[68px] max-sm:mt-0">
        <Sidebar />
        <div className="w-full overflow-y-auto h-[90.6vh] max-[500px]:min-h-screen">
          <div className="w-full sticky top-0 z-[1]">
            <HeaderProp
              LinkText1="Home"
              LinkText2="Users"
              AnText="Users Details"
              LinkPath={adminPath + "/users" + id}
            />
          </div>
          <UsersInfo _id={id} />
        </div>
      </div>
    </div>
  );
};

export const UsersInfo = ({ _id }: any | string) => {
  const { options, token }: any = UserAuth();
  const [user, setUser]: UserCardProp | any = useState({});
  const [address, setAddress]: UserCardProp | any = useState({});
  const FetchContactInfo = async () => {
    try {
      const res = await ApiURL.get("/user/get/" + _id);
      const data = res.data;
      if (data.success) {
        setUser(data.data);
      }
    } catch (error: any) {
      toast.error(error.response.data.message, { id: "users" });
    }
  };
  const FetchAddressInfo = async () => {
    try {
      const res = await ApiURL.get(
        "/v1/user/address/get/address/" + _id,
        options
      );
      const data = res.data;
      if (data.success) {
        setAddress(data.data);
      }
    } catch (error: any) {
      toast.error(error.response.data.message, { id: "users" });
    }
  };

  useEffect(() => {
    if (token) {
      FetchAddressInfo();
      FetchContactInfo();
    }
  }, []);

  return (
    <div className="w-full flex justify-center items-center flex-col px-2 py-8">
      <h1 className=" font-bold text-lg dark:py-4">Users Info</h1>
      <div className="w-full max-w-2xl shadow-lg drop-shadow-md rounded-2xl p-10 outline-none dark:outline-1 dark:outline dark:outline-slate-700">
        <div className="flex w-full items-center justify-center flex-col text-center gap-2 py-2">
          <div
            className={`bg-neutral-100 size-24 relative flex justify-center items-center max-[330px]:p-0 rounded-full ${
              true ? "dark:bg-neutral-600" : "dark:bg-neutral-300"
            }`}
          >
            {user && user?.imageUrl ? (
              <img
                src={user && user?.imageUrl}
                className="size-20 rounded-full object-cover"
                alt={user?.firstName + " photo"}
                loading="lazy"
              />
            ) : (
              <AvaterImage size="20" />
            )}
          </div>
          <div className="whitespace-nowrap">
            <p className="font-semibold text-base capitalize">
              {user && user.lastName}

              {user && user.firstName}
            </p>
            <span className="whitespace-nowrap text-sm font-semibold opacity-60 capitalize">
              {user && user.email}
            </span>
          </div>
        </div>

        <div>
          <span className="font-semibold mr-4 font-serif opacity-85">
            PhoneNumber:
          </span>
          <div className="pr-4 pb-6 text-left font-semibold text-gray-600 dark:text-gray-400">
            {user?.phoneNumber}
          </div>
        </div>
        <div>
          <span className="font-semibold mr-4 font-serif opacity-85">
            {address && "Address:"}
          </span>
          <address className="pr-4 pb-6 text-left font-semibold text-gray-600 dark:text-gray-400">
            "{address?.address && address?.address}, {address?.busTop},{" "}
            {address?.nearestBusTop} {address?.town}, {address?.state},{" "}
            {address?.country}"
          </address>
        </div>
        <div className="flex items-center w-full justify-end pt-4">
          <p
            className={`text-sm font-semibold capitalize w-auto p-2  rounded-full outline outline-1 text-black
               ${
                 user && user?._id
                   ? "bg-green-300  outline-green-800"
                   : "bg-yellow-200  outline-yellow-800"
               }
                 `}
          >
            {user && user?._id ? user?.status + " customer" : "guest Visitor"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsersDetails;
