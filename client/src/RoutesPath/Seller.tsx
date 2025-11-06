import { Route, Routes, useNavigate } from "react-router-dom";
import { sellerPath } from "../context/UserContext";
import NotFound from "../component/pages/NotFound";
import Dashboard from "../seller/pages/Dashboard";
import Login from "../component/auth/Seller/Login/Login";
import AddProduct from "../seller/pages/AddProduct";
import PrivateRoute from "../seller/PrivateRoute";
import ListProduct from "../seller/pages/ListProduct";
import Orders from "../seller/pages/Orders";
import OrdersInfo from "../seller/Orders/OrdersInfo";
import { PersonalRoles } from "../RolesControlle/RolesValue";
import { UserSellerAuth } from "../seller/Context/SellersContext";
import { useEffect } from "react";
import Contacts from "../seller/pages/Contacts";
import ContactID from "../seller/Contact/ContactID";

const Seller = () => {
  const { seller }: any = UserSellerAuth();

  const router = useNavigate();

  useEffect(() => {
    if (seller === null && !seller) {
      router(sellerPath + "/login");
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path={sellerPath}>
          <Route path={`login`} element={<Login />} />
          <Route
            element={
              <PrivateRoute
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
