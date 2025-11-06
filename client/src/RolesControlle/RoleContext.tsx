import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export const createRoleContext = createContext({});
const RoleContext = ({ children }: { children: ReactNode }) => {
  const [roles, setRoles] = useState(["2013", "1948", "1988"]);
  const Values = {
    roles,
    setRoles,
  };
  useEffect(() => {
    setRoles;
  }, []);

  return (
    <createRoleContext.Provider value={Values}>
      {children}
    </createRoleContext.Provider>
  );
};

export default RoleContext;

export const UserRoleAuth = () => useContext(createRoleContext);
