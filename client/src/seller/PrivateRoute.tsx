import { UserSellerAuth } from "./Context/SellersContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { sellerPath } from "../context/UserContext";
import { UserRoleAuth } from "../RolesControlle/RoleContext";
import Unauthorize from "../component/pages/Unauthorize";

const PrivateRoute = ({ allowedRoles }: any) => {
  const { seller }: any = UserSellerAuth();
  const { roles }: any = UserRoleAuth();
  const location = useLocation();

  return roles?.find((role: any) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : seller ? (
    <Unauthorize />
  ) : !seller ? (
    <Navigate to={`${sellerPath}/login`} state={{ from: location }} replace />
  ) : (
    <Navigate to={`${sellerPath}/login`} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
