import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { sellerPath } from "../../context/UserContext";
import { useLocation } from "react-router-dom";
import { UserAdminAuth } from "../../Admin/context/AdminContext";

export const createSellersContext = createContext({});
const SellersContext = ({ children }: { children: ReactNode }) => {
  const LocalJson: any = localStorage.getItem("seller");
  const LocalAdminJson: any = localStorage.getItem("admin");
  const CheckSeller = LocalJson
    ? JSON.parse(LocalJson)
    : LocalAdminJson
    ? JSON.parse(LocalAdminJson)
    : null;
  const { admin }: any = UserAdminAuth();
  const [seller, setSeller] = useState(CheckSeller);

  const HandleLogOut = () => {
    setSeller(null);
    localStorage.removeItem("seller");
    localStorage.removeItem("path");
    window.location.replace(sellerPath + "/login");
  };
  const location = useLocation();
  useEffect(() => {
    if (admin) {
      localStorage.setItem("seller", JSON.stringify(admin));
    } else {
      null;
    }
  }, [admin]);

  useEffect(() => {
    localStorage.setItem("path", JSON.stringify(location.pathname));
  }, [location.pathname]);

  const Values = { seller, setSeller, HandleLogOut };
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
