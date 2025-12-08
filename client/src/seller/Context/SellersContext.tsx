import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { sellerPath, UserAuth } from "../../context/UserContext";
import ApiURL from "../../context/Api";
import toast from "react-hot-toast";

export const createSellersContext = createContext({});
const SellersContext = ({ children }: { children: ReactNode }) => {
  const [seller, setSeller] = useState<object | null>();
  const [contact, setContact] = useState<[]>();
  const [sales, setSales] = useState<[]>();
  const [events, setEvents] = useState<[]>();
  const { options, token }: any = UserAuth();

  const HandleLogOut = () => {
    setSeller(null);
    localStorage.removeItem("token");
    localStorage.removeItem("path");
    window.location.replace(sellerPath + "/login");
  };

  async function GetAllContactHandler() {
    try {
      const res = await ApiURL.get("/v1/contact/get", options);
      const data = res.data;
      if (data.success) {
        setContact(data.data);
      }
    } catch (error: any) {
      console.log(error);

      toast.error(error.response.data.message, { id: "contact" });
    }
  }
  async function GetAllBookedEvents() {
    try {
      const res = await ApiURL.get("/v1/events/get", options);
      const data = res.data;

      if (data.success) {
        setEvents(data.data);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message, { id: "contact" });
    }
  }
  async function GetAllSales() {
    try {
      const res = await ApiURL.get("/v1/sales/get", options);
      const data = res.data;
      if (data.success) {
        setSales(data.data);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message, { id: "contact" });
    }
  }

  useEffect(() => {
    if (token) {
      GetAllContactHandler();
      GetAllBookedEvents();
      GetAllSales();
    }
  }, []);

  const Values = {
    seller,
    setSeller,
    HandleLogOut,
    events,
    setEvents,
    contact,
    setContact,
    GetAllBookedEvents,
    sales,
    setSales,
  };
  return (
    <createSellersContext.Provider value={Values}>
      {children}
    </createSellersContext.Provider>
  );
};

export default SellersContext;
export function UserSellerAuth() {
  return React.useContext(createSellersContext);
}
