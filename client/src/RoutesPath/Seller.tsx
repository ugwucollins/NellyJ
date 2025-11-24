import { Route, Routes, useNavigate } from "react-router-dom";
import { sellerPath, UserAuth } from "../context/UserContext";
import NotFound from "../component/pages/NotFound";
import Dashboard from "../seller/pages/Dashboard";
import Login from "../component/auth/Seller/Login/Login";
import AddProduct from "../seller/pages/AddProduct";
import ProtectedRoute from "../RolesControlle/ProtectedRoute";
import ListProduct from "../seller/pages/ListProduct";
import Orders from "../seller/pages/Orders";
import OrdersInfo from "../seller/Orders/OrdersInfo";
import { PersonalRoles } from "../RolesControlle/RolesValue";
import { UserSellerAuth } from "../seller/Context/SellersContext";
import { useEffect } from "react";
import Contacts from "../seller/pages/Contacts";
import ContactID from "../seller/Contact/ContactID";
import ApiURL from "../context/Api";
import { UserRoleAuth } from "../RolesControlle/RoleContext";
import Unauthorize from "../component/pages/Unauthorize";

const Seller = () => {
  const { seller, setSeller }: any = UserSellerAuth();
  const { token, setUsersStatus, usersStatus }: any = UserAuth();
  const { setRoles }: any = UserRoleAuth();

  const router = useNavigate();
  async function FetchUser() {
    const res = await ApiURL.get("/user/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;
    if (data.success) {
      setSeller(data?.data);
      setRoles(data?.data?.roles);
      setUsersStatus(data?.data.status);
    }
  }
  useEffect(() => {
    if (seller === null && !seller) {
      router(sellerPath + "/login");
    }

    if (token) {
      FetchUser();
    }
  }, []);
  if (usersStatus === "passed" || usersStatus === "blocked") {
    return <Unauthorize />;
  }

  return (
    <div>
      <Routes>
        <Route path={sellerPath}>
          <Route path={`login`} element={<Login />} />
          <Route
            element={
              <ProtectedRoute
                allowedRoles={[PersonalRoles.SELLERS, PersonalRoles.ADMIN]}
              />
            }
          >
            <Route index element={<Dashboard />} />
            <Route path={"addproduct"} element={<AddProduct />} />
            <Route path={"listproduct"} element={<ListProduct />} />
            <Route path={"orders"} element={<Orders />} />
            <Route path={"contact"} element={<Contacts />} />
            <Route path={"contact/:id"} element={<ContactID />} />
            <Route path={"orders/:orderId"} element={<OrdersInfo />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound Link="/" />} />
      </Routes>
    </div>
  );
};

export default Seller;
