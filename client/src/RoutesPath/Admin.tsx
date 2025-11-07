import { Route, Routes, useNavigate } from "react-router-dom";
import PrivateRoute from "../Admin/PrivateRoute";
import Dashboard from "../Admin/pages/Dashboard";
import NotFound from "../component/pages/NotFound";
import Login from "../component/auth/Admin/Login/Login";
import { adminPath } from "../context/UserContext";
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
            <Route path="addproduct" element={<CreateProduct />} />
            <Route path="listproduct" element={<AllProducts />} />
            <Route path="orders" element={<Orders />} />
            <Route path="contact" element={<Contact />} />
            <Route path="events" element={<Events />} />
            <Route path="users" element={<Users />} />
            <Route path="orders/:orderID" element={<OrdersDetails />} />
            <Route path={"contact/:id"} element={<ContactID />} />
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
