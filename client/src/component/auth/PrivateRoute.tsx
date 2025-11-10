import { NavLink, Outlet, useLocation } from "react-router-dom";
import { UserAuth } from "../../context/UserContext";
import { UserRoleAuth } from "../../RolesControlle/RoleContext";
import Unauthorize from "../pages/Unauthorize";
import { useEffect } from "react";
import ApiURL from "../../context/Api";

const PrivateRoute = ({ allowedRoles }: any) => {
  const { user, setuser }: any = UserAuth();
  const { roles, setRoles }: any = UserRoleAuth();

  async function FetchUser() {
    const authHeader = localStorage.getItem("token");
    const token = JSON.parse(authHeader!);
    const res = await ApiURL.get("/user/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;
    if (data.success) {
      setuser(data.data);
      setRoles(data.data?.roles);
    }
  }

  useEffect(() => {
    FetchUser();
  }, []);

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
