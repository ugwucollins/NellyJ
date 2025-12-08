import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { adminPath, UserAuth } from "../../context/UserContext";
import ApiURL from "../../context/Api";
import toast from "react-hot-toast";

export const createAdminContext = createContext({});
const AdminContext = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<object | null>();
  const [allOrders, setAllOrders] = useState<[] | null>();
  const [customers, setCustomers] = useState([]);
  const [sellers, setSellers] = useState<[] | any>([]);

  const { options, token }: any = UserAuth();

  async function GetAllUsersOrders() {
    try {
      const res = await ApiURL.get("/v1/orders/get", options);
      const data = res.data;

      if (data.success) {
        setAllOrders(data?.data);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }

  async function GetAllUsersHandler() {
    try {
      const res = await ApiURL.get("/user", options);
      const data = res.data;
      if (data.success) {
        setCustomers(data?.data);
      }
    } catch (error: any) {
      toast.error(error.response.data.message, { id: "users" });
    }
  }
  async function GetAllSellers() {
    try {
      const res = await ApiURL.get("/user/sellers", options);
      const data = res.data;

      if (data.success) {
        setSellers(data.data);
      }
    } catch (error: any) {
      toast.error(error.response.data.message, { id: "sellers" });
    }
  }

  useEffect(() => {
    if (token) {
      GetAllUsersOrders();
      GetAllUsersHandler();
      GetAllSellers();
    }
  }, []);

  const HandleLogOut = () => {
    setAdmin(null);
    localStorage.removeItem("token");
    window.location.replace(adminPath + "/login");
  };

  const Values = {
    customers,
    setCustomers,
    admin,
    setAdmin,
    HandleLogOut,
    allOrders,
    setAllOrders,
    sellers,
    setSellers,
    GetAllSellers,
    GetAllUsersOrders,
  };

  return (
    <createAdminContext.Provider value={Values}>
      {children}
    </createAdminContext.Provider>
  );
};

export default AdminContext;
export function UserAdminAuth() {
  return React.useContext(createAdminContext);
}
