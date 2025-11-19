import React, { createContext, useState, type ReactNode } from "react";
import { adminPath } from "../../context/UserContext";

export const createAdminContext = createContext({});
const AdminContext = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<object | null>();

  const HandleLogOut = () => {
    setAdmin(null);
    localStorage.removeItem("token");
    window.location.replace(adminPath + "/login");
  };

  const Values = { admin, setAdmin, HandleLogOut };
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
