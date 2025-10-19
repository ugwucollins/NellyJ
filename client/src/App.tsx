import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserContext, { adminPath, sellerPath } from "./context/UserContext";
import ProductContext from "./context/ProductContext";
import Customer from "./RoutesPath/Customer";
import Seller from "./RoutesPath/Seller";
import WishListContext from "./context/WishListContext";
import SellersContext from "./seller/Context/SellersContext";
import Admin from "./RoutesPath/Admin";
import AdminContext from "./Admin/context/AdminContext";
import RoleContext from "./RolesControlle/RoleContext";

const localTheme: any = localStorage.getItem("theme");
export const ThemeContext = createContext(JSON.parse(localTheme) || "system");
const App = () => {
  const location = useLocation().pathname;
  const [darkMode, setdarkMode] = useState(JSON.parse(localTheme) || "system");
  const media = window.matchMedia("(prefers-color-scheme:dark)");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const isSeller = location.match(sellerPath) && location.includes(sellerPath);
  const isAdmin = location.match(adminPath) && location.includes(adminPath);

  const HandleTheme = () => {
    setdarkMode(!darkMode);
  };
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  isOnline && console.log("yes");

  useEffect(() => {
    if (darkMode === true || (!(`theme` in localStorage) && media.matches)) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", JSON.stringify(darkMode));
    } else {
      document.body.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, [darkMode, media]);

  const Values = {
    darkMode,
    setdarkMode,
    HandleTheme,
  };

  return (
    <ThemeContext value={Values}>
      <RoleContext>
        <div
          className={`w-full p-0 m-0 overflow-hidden bg-primary transition-colors duration-500 dark:bg-secondary  dark:text-primary1 ${
            darkMode === true && "dark"
          }`}
        >
          {/* {!isOnline && (
        <div className="w-full z-20 h-full absolute top-0 left-0 bg-secondary/50">
          <div className="flex text-center justify-center items-center min-h-screen font-bold text-primary text-5xl">
            no please
          </div>
        </div>
      )} */}
          <UserContext>
            <SellersContext>
              <AdminContext>
                <ProductContext>
                  <WishListContext>
                    {isSeller ? (
                      <>
                        <Seller />
                      </>
                    ) : isAdmin ? (
                      <>
                        <Admin />
                      </>
                    ) : (
                      <>
                        <Customer
                          HandleTheme={HandleTheme}
                          darkMode={darkMode}
                        />
                      </>
                    )}
                  </WishListContext>
                </ProductContext>
              </AdminContext>
            </SellersContext>
          </UserContext>
        </div>
      </RoleContext>
    </ThemeContext>
  );
};

export const UseTheme = () => {
  return useContext(ThemeContext);
};

export default App;
