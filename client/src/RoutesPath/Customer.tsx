import { lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "../component/Footer";
const Navbar = lazy(() => import("../component/Navbar"));
const NotFound = lazy(() => import("../component/pages/NotFound"));
import Home from "../component/pages/Home";
import Products from "../component/pages/Products";
import ProductDetails from "../component/ProductContent/ProductDetails";
import About from "../component/pages/About";
import Contact from "../component/pages/Contact";
import FAQs from "../component/pages/FAQs";
import Cart from "../component/pages/Cart";
import Profile from "../component/pages/Profile";
import SignIn from "../component/auth/Customer/SignIn/SignIn";
import SignUp from "../component/auth/Customer/SignUp/SignUp";
import Address from "../component/pages/Address";
import { forgetPath, loginPath, UserAuth } from "../context/UserContext";
import WishList from "../component/pages/WishList";
import ForgetPassword from "../component/auth/Customer/Forget-Password";
import Orders from "../component/pages/Orders";
import TrackOrders from "../component/pages/TrackOrders";
import TrackOrderById from "../component/OrdersContent/TrackOrderById";
import PrivateRoute from "../component/auth/PrivateRoute";
import { PersonalRoles } from "../RolesControlle/RolesValue";
import Event from "../component/pages/Event";
import EventHistory from "../component/pages/EventHistory";
import CompletePage from "../component/auth/Customer/SignUp/CompletePage";
import ApiURL from "../context/Api";
import { UserRoleAuth } from "../RolesControlle/RoleContext";

const Customer = ({ HandleTheme, darkMode }: any) => {
  const { setuser }: any = UserAuth();
  const { setRoles }: any = UserRoleAuth();
  const location = useLocation().pathname;
  const forget = location.match(forgetPath) && location.includes(forgetPath);
  const isLogin = location.match(loginPath) && location.includes(loginPath);
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
      setuser(data?.data);
      setRoles(data?.data?.roles);
    }
  }

  useEffect(() => {
    FetchUser();
  }, []);
  return (
    <div>
      {!isLogin && !forget && (
        <Navbar HandleTheme={HandleTheme} darkMode={darkMode} />
      )}
      <div className={`w-full ${isLogin || forget ? "p-0" : "pt-20"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Route */}
          <Route
            element={<PrivateRoute allowedRoles={[PersonalRoles.USERS]} />}
          >
            <Route path="/complete/:id" element={<CompletePage />} />
            <Route path="/event" element={<Event />} />
            <Route path="/event/history" element={<EventHistory />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/address" element={<Address />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/track-orders" element={<TrackOrders />} />
            <Route path="/track-order/:id" element={<TrackOrderById />} />
            <Route path="/wishlist" element={<WishList />} />
          </Route>

          <Route path="/faqs" element={<FAQs />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/forget-password" element={<ForgetPassword />} />
          <Route path="*" element={<NotFound Link="/" />} />
        </Routes>
        {!isLogin && !forget && <Footer />}
      </div>
    </div>
  );
};

export default Customer;
