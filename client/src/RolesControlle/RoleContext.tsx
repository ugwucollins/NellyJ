import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { UserAuthInfo } from "../App";

export const createRoleContext = createContext({});
const RoleContext = ({ children }: { children: ReactNode }) => {
  const [roles, setRoles]: any = useState(["guest"]);
  const { user }: any = UserAuthInfo();

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
