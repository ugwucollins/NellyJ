import { Route, Routes, useNavigate } from "react-router-dom";
// import ProtectedRoute from "../RolesControlle/ProtectedRoute";
import Dashboard from "../Admin/pages/Dashboard";
import NotFound from "../component/pages/NotFound";
import Login from "../component/auth/Admin/Login/Login";
import { adminPath, UserAuth } from "../context/UserContext";
import { PersonalRoles } from "../RolesControlle/RolesValue";
import { UserAdminAuth } from "../Admin/context/AdminContext";
import { useEffect } from "react";
import CreateProduct from "../Admin/pages/CreateProduct";
import AllProducts from "../Admin/pages/AllProducts";
import Orders from "../Admin/pages/Orders";
import OrdersDetails from "../Admin/orders/OrdersDetails";
import Contact from "../Admin/pages/Contact";
import ContactID from "../Admin/contacts/ContactID";
import Events from "../Admin/pages/Events";
import Users from "../Admin/pages/Users";
import Settings from "../Admin/pages/Settings";
import EventsDetails from "../Admin/events/EventsDetails";
import UsersDetails from "../Admin/users/UsersDetails";
import ApiURL from "../context/Api";
import { UserRoleAuth } from "../RolesControlle/RoleContext";
import ProtectedRoute from "../RolesControlle/ProtectedRoute";
import Unauthorize from "../component/pages/Unauthorize";
import Sellers from "../Admin/pages/Sellers";
import { SellersDetail } from "../Admin/sellers/SellersDetail";

const Admin = () => {
  const { token, setUsersStatus, usersStatus }: any = UserAuth();
  const { setRoles }: any = UserRoleAuth();
  const { admin, setAdmin }: any = UserAdminAuth();
  const router = useNavigate();
  async function FetchUser() {
    const res = await ApiURL.get("/user/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;
    if (data.success) {
      setAdmin(data?.data);
      setRoles(data?.data?.roles);
      setUsersStatus(data?.data?.status);
    }
  }
  useEffect(() => {
    if (token) {
      FetchUser();
    }

    if (admin === null && !admin) {
      router(adminPath + "/login");
    }
  }, []);

  if (usersStatus === "passed" || usersStatus === "blocked") {
    return <Unauthorize />;
  }

  return (
    <div>
      <Routes>
        <Route path={adminPath}>
          <Route path={"login"} element={<Login />} />
          <Route
            element={<ProtectedRoute allowedRoles={[PersonalRoles.ADMIN]} />}
          >
            <Route index element={<Dashboard />} />
            <Route path="addproduct" element={<CreateProduct />} />
            <Route path="listproduct" element={<AllProducts />} />
            <Route path="orders" element={<Orders />} />
            <Route path="contact" element={<Contact />} />
            <Route path="events" element={<Events />} />
            <Route path="users" element={<Users />} />
            <Route path={"sellers"} element={<Sellers />} />
            <Route path="orders/:orderID" element={<OrdersDetails />} />
            <Route path={"contact/:id"} element={<ContactID />} />
            <Route path={"sellers/:id"} element={<SellersDetail />} />
            <Route path={"events/:id"} element={<EventsDetails />} />
            <Route path={"users/:id"} element={<UsersDetails />} />
            <Route path={"settings"} element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound Link="/" />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Admin;
