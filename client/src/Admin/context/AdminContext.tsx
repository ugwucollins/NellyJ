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

  useEffect(() => {
    if (token) {
      GetAllUsersOrders();
    }
  }, []);

  const HandleLogOut = () => {
    setAdmin(null);
    localStorage.removeItem("token");
    window.location.replace(adminPath + "/login");
  };

  const Values = { admin, setAdmin, HandleLogOut, allOrders, setAllOrders };
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
