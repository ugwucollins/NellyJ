import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserRoleAuth } from "./RoleContext";
import { RolesArray } from "./RolesValue";
import { UserAuth } from "../context/UserContext";

const RoleRouter: React.FC = () => {
  const { roles }: any = UserRoleAuth();
  const { token }: any = UserAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
    if (roles) {
      // const userRole = RolesArray.find((role) => role.role === roles);
      const userRole = RolesArray.find(
        (role) => role.role.includes(roles) || role.role.match(roles)
      );

      if (userRole) {
        navigate(userRole.defaultRedirect, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [roles]);

  return null;

  // This component doesn't render anything, just handles navigation
};

export default RoleRouter;
