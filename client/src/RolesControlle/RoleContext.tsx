import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { UserAuth } from "../context/UserContext";

export const createRoleContext = createContext({});
const RoleContext = ({ children }: { children: ReactNode }) => {
  const [roles, setRoles]: any = useState();
  const { user }: any = UserAuth();
  const Values = {
    roles,
    setRoles,
  };

  useEffect(() => {
    setRoles(user?.roles);
  }, [user]);

  return (
    <createRoleContext.Provider value={Values}>
      {children}
    </createRoleContext.Provider>
  );
};

export default RoleContext;

export const UserRoleAuth = () => useContext(createRoleContext);
