import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Assets, DummyAddress } from "../component/assets";
import toast from "react-hot-toast";

export const UserProvider = createContext({});
export const sellerPath: string = import.meta.env.VITE_SELLER_PATH;
export const adminPath: string = import.meta.env.VITE_ADMIN_PATH;
export const loginPath: string = import.meta.env.VITE_LOGIN_PATH;
export const production: boolean = import.meta.env.PROD;
export const NotAuth: string = "/auth/signin";

const UserContext = ({ children }: any) => {
  const [user, setuser] = useState<null | Object>(
    {
      firstName: "collins",
      _id: "collins",
      gender: "male",
      lastName: "ugwu",
      email: "collins@gmail.com",
      imageUrl: Assets.Client2,
      phoneNumber: 8101245121,
      password: "12345678",
    }
    // null
  );
  const [isLogIn, setisLogIn] = useState(false);
  const [UsersAddress, setUsersAddress] = useState(DummyAddress);
  const JsonValue: any = localStorage.getItem("event");
  const [events, setEvents] = useState(JSON.parse(JsonValue) || []);

  const router = useNavigate();

  const LogOut = () => {
    window.location.replace(NotAuth);
    setuser(null);
  };
  const Addaddress = (formData: any) => {
    const _id = Date.now();
    // UsersAddress.length > 0 ? UsersAddress[0]._id.toString() + 1 : 1;
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
    const Address: any = UsersAddress.map((item) =>
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
          }
        : item
    );
    setUsersAddress(Address);
    toast.success(`Edited the ${Address[0].title}`);
  };
  const DeleteAddress = (_id: any) => {
    const Address = UsersAddress.filter((item) => item._id !== _id);
    setUsersAddress(Address);
    toast.success(`Deleted the ${Address[0].title}`);
  };
  useEffect(() => {
    if (user) {
      setUsersAddress(DummyAddress);
    }
  }, []);

  const Values = {
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
  };
  return (
    <UserProvider.Provider value={Values}>{children}</UserProvider.Provider>
  );
};

export default UserContext;

export const UserAuth = () => {
  return useContext(UserProvider);
};
