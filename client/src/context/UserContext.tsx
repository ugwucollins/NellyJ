import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { AddressProp } from "./Types";
import ApiURL from "./Api";
import { UserAuthInfo } from "../App";

export const UserProvider = createContext({});
export const sellerPath: string = import.meta.env.VITE_SELLER_PATH;
export const adminPath: string = import.meta.env.VITE_ADMIN_PATH;
export const loginPath: string = import.meta.env.VITE_LOGIN_PATH;
export const forgetPath: string = import.meta.env.VITE_FORGET_PATH;
export const resetPath: string = import.meta.env.VITE_RESET_PATH;
export const production: boolean = import.meta.env.PROD;
export const NotAuth: string = "/auth/signin";

const UserContext = ({ children }: any) => {
  const authHeader = localStorage.getItem("token");
  const { setUser, user }: any = UserAuthInfo();
  const [usersStatus, setUsersStatus] = useState("");
  const [token, setToken] = useState(JSON.parse(authHeader!));
  const [UsersAddress, setUsersAddress] = useState<any>([]);
  const [events, setEvents] = useState([]);

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const router = useNavigate();

  const LogOut = () => {
    setUser(null);
    localStorage.removeItem("token");
    setToken("");
    window.location.replace(NotAuth);
  };

  const Addaddress = async (formData: any) => {
    const newAddress = formData;
    const Addedaddress: any = [...UsersAddress, newAddress];
    setUsersAddress(Addedaddress);
    try {
      const { data } = await ApiURL.get(`/v1/user/address/get`, options);
      if (data.success) {
        setUsersAddress(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  const EditAddress = (_id: any, formData: any) => {
    const Address: any = UsersAddress.map((item: AddressProp | any) =>
      item._id === _id
        ? {
            ...item,
            title: formData.title,
            firstName: formData.firstName,
            lastName: formData.lastName,
            country: formData.country,
            city: formData.city,
            state: formData.state,
            address: formData.address,
            phone: formData.phone,
            email: formData.email,
            nearestBusTop: formData.nearestBusTop,
          }
        : item
    );
    setUsersAddress(Address);
    toast.success(`Edited the ${Address[0].title}`);
  };
  const DeleteAddress = async (_id: any) => {
    const Address = UsersAddress.filter(
      (item: AddressProp | any) => item._id !== _id
    );
    const res = await ApiURL.delete(`/v1/user/address/delete/${_id}`, options);
    const data = res.data;
    if (data.success) {
      setUsersAddress(Address);
      toast.success(`Deleted the ${Address[0]?.title}`);
    } else {
      toast.error(data.message || `Deleted the ${Address[0]?.title}`);
    }
  };

  const handleEvents = async () => {
    try {
      const res = await ApiURL.get("/v1/events/get/event/user", options);
      const data = res.data;

      if (data.success) {
        setEvents(data?.data);
      } else {
        toast.error(data.message, { id: "e" });
      }
    } catch (error: any) {
      toast.error(error.response.data.message, { id: "e" });
    }
  };

  useEffect(() => {
    if (user) {
      handleEvents();
    }
  }, []);

  const Values = {
    options,
    token,
    setToken,
    DeleteAddress,
    Addaddress,
    usersStatus,
    EditAddress,
    setUsersStatus,
    router,
    UsersAddress,
    LogOut,
    events,
    setEvents,
    setUsersAddress,
  };
  return (
    <UserProvider.Provider value={Values}>{children}</UserProvider.Provider>
  );
};

export default UserContext;

export const UserAuth = () => {
  const state = useContext(UserProvider);
  if (state === null) {
    toast.error("Still processing");
  } else if (state === undefined) {
    toast.error("Still processing state Undefine");
  }
  // return useContext(UserProvider);
  return state;
};
