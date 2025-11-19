import React, { createContext, useState, type ReactNode } from "react";
import { sellerPath } from "../../context/UserContext";

export const createSellersContext = createContext({});
const SellersContext = ({ children }: { children: ReactNode }) => {
  const [seller, setSeller] = useState<object | null>();

  const HandleLogOut = () => {
    setSeller(null);
    localStorage.removeItem("token");
    localStorage.removeItem("path");
    window.location.replace(sellerPath + "/login");
  };

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
