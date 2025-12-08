import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserRoleAuth } from "./RoleContext";
import { RolesArray } from "./RolesValue";
import { UserAuth } from "../context/UserContext";
import toast from "react-hot-toast";
import { UserAuthInfo } from "../App";

const RoleRouter: React.FC = () => {
  const { roles }: any = UserRoleAuth();
  const { token }: any = UserAuth();
  const { user, usersStatus }: any = UserAuthInfo();

  const localJson: any = localStorage.getItem("id");
  const UserId = JSON.parse(localJson);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }

    if (UserId) {
      navigate("/complete/" + UserId, { replace: true });
    } else {
      if (usersStatus && usersStatus === "passed") {
        toast.error(user && user.firstName + " Your account has been Deleted");
        setTimeout(() => {
          localStorage.removeItem("token");
          navigate("/");
          window.location.reload();
        }, 1000);
      } else if (usersStatus && usersStatus === "blocked") {
        navigate("/contact");

        toast.error(
          user &&
            user.firstName +
              " Your account has been Blocked for more Verification"
        );

        setTimeout(() => {
          localStorage.removeItem("token");
          navigate("/", { replace: true });
          window.location.reload();
        }, 20000);
      } else {
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
      }
    }
  }, [roles]);

  return null;

  // This component doesn't render anything, just handles navigation
};

export default RoleRouter;
