import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { AddressProp } from "./Types";
import ApiURL from "./Api";

export const UserProvider = createContext({});
export const sellerPath: string = import.meta.env.VITE_SELLER_PATH;
export const adminPath: string = import.meta.env.VITE_ADMIN_PATH;
export const loginPath: string = import.meta.env.VITE_LOGIN_PATH;
export const forgetPath: string = import.meta.env.VITE_FORGET_PATH;
export const production: boolean = import.meta.env.PROD;
export const NotAuth: string = "/auth/signin";

const UserContext = ({ children }: any) => {
  const authHeader = localStorage.getItem("token");

  const [user, setuser] = useState<null | Object>(null);
  const [isLogIn, setisLogIn] = useState(false);
  const [token, setToken] = useState(JSON.parse(authHeader!));
  const [UsersAddress, setUsersAddress] = useState<any>([]);
  const JsonValue: any = localStorage.getItem("event");
  const [events, setEvents] = useState(JSON.parse(JsonValue) || []);

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const router = useNavigate();

  const LogOut = () => {
    window.location.replace(NotAuth);
    setuser(null);
    localStorage.removeItem("token");
    setToken("");
  };
  const Addaddress = (formData: any) => {
    const _id = Date.now();

    const data = {
      _id: _id,
      title: formData.title,
      firstName: formData.firstName,
      lastName: formData.lastName,
      country: formData.country,
      city: formData.city,
      state: formData.state,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
    };
    const newAddress = data;
    const Addedaddress: any = [...UsersAddress, newAddress];
    setUsersAddress(Addedaddress);
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

  const Values = {
    options,
    token,
    setToken,
    user,
    setuser,
    DeleteAddress,
    Addaddress,
    isLogIn,
    EditAddress,
    setisLogIn,
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
  return useContext(UserProvider);
};
