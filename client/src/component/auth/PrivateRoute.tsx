import { NavLink, Outlet, useLocation } from "react-router-dom";
import { UserAuth } from "../../context/UserContext";
import { UserRoleAuth } from "../../RolesControlle/RoleContext";
import Unauthorize from "../pages/Unauthorize";

const PrivateRoute = ({ allowedRoles }: any) => {
  const { user }: any = UserAuth();
  const { roles }: any = UserRoleAuth();
  const location = useLocation();
  return roles?.find((role: any) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : user ? (
    <Unauthorize />
  ) : !user && user === null ? (
    <NavLink to={"/auth/signin"} state={{ from: location }} replace />
  ) : (
    <NavLink to={"/auth/signin"} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
