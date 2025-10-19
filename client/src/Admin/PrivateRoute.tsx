import { UserAdminAuth } from "./context/AdminContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { adminPath } from "../context/UserContext";
import { UserRoleAuth } from "../RolesControlle/RoleContext";
import Unauthorize from "../component/pages/Unauthorize";

const PrivateRoute = ({ allowedRoles }: any) => {
  const { admin }: any = UserAdminAuth();
  const location = useLocation();
  const { roles }: any = UserRoleAuth();

  return roles?.find((role: any) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : admin ? (
    <Unauthorize />
  ) : (
    <Navigate to={`${adminPath}/login`} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
