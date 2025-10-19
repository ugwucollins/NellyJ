import { Route, Routes, useNavigate } from "react-router-dom";
import PrivateRoute from "../Admin/PrivateRoute";
import Dashboard from "../Admin/pages/Dashboard";
import NotFound from "../component/pages/NotFound";
import Login from "../component/auth/Admin/Login/Login";
import { adminPath } from "../context/UserContext";
import { PersonalRoles } from "../RolesControlle/RolesValue";
import { UserAdminAuth } from "../Admin/context/AdminContext";
import { useEffect } from "react";

const Admin = () => {
  const { admin }: any = UserAdminAuth();
  const router = useNavigate();
  useEffect(() => {
    if (admin === null && !admin) {
      router(adminPath + "/login");
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path={adminPath}>
          <Route path={"login"} element={<Login />} />
          <Route
            element={<PrivateRoute allowedRoles={[PersonalRoles.ADMIN]} />}
          >
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound Link="/" />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Admin;
