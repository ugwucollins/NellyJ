import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { adminPath } from "../../context/UserContext";
import { useLocation } from "react-router-dom";

export const createAdminContext = createContext({});
const AdminContext = ({ children }: { children: ReactNode }) => {
  const LocalJson: any = localStorage.getItem("admin");
  const CheckSeller = LocalJson ? JSON.parse(LocalJson) : null;
  const [admin, setAdmin] = useState(CheckSeller);

  const HandleLogOut = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
    localStorage.removeItem("adminPath");
    window.location.replace(adminPath + "/login");
  };
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("adminPath", JSON.stringify(location.pathname));
  }, [location.pathname]);

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
