import { useLocation, Outlet, Navigate } from "react-router-dom";
import { UserRoleAuth } from "./RoleContext";
import { RolesArray } from "./RolesValue";
import Unauthorize from "../component/pages/Unauthorize";
import { UserAuthInfo } from "../App";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { roles }: any = UserRoleAuth();
  const { user }: any = UserAuthInfo();
  const location = useLocation();

  // Check if user has a role
  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Find the user's role in the roles array
  const userRole = RolesArray.find((role) => role.role.includes(roles));

  if (userRole) {
    const isAllowed = userRole.allowedRoutes.some((route) => {
      if (route.endsWith("/*")) {
        const baseRoute = route.slice(0, -2);
        return location.pathname.startsWith(baseRoute);
      }

      return route === location.pathname;
    });

    if (!isAllowed) {
      return <Unauthorize />;
    }
  } else if (!allowedRoles.includes(roles)) {
    return <Unauthorize />;
  } else {
    return <Unauthorize />;
  }

  // If role not found or not allowed, redirect to not authorized or login
  // if (!userRole || !allowedRoles.includes(roles)) {
  //   // <Navigate to="/not-authorized" replace />;
  // }

  // Check if current path is allowed for the role
  // const isAllowed = userRole.allowedRoutes.some((route) => {
  //   console.log(route);

  //   if (route.endsWith("/*")) {
  //     const baseRoute = route.slice(0, -2);
  //     return location.pathname.startsWith(baseRoute);
  //   }

  //   return route === location.pathname;
  // });

  // if (!isAllowed) {
  //   return <Unauthorize />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
