import HeaderProp from "../../context/HeaderProp";
import { adminPath } from "../../context/UserContext";
import Navbar from "../Bars/Navbar";
import Sidebar from "../Bars/Sidebar";
import UsersPage from "../users/UsersPage";

const Users = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full flex mt-[68px] max-sm:mt-0">
        <Sidebar />
        <div className="w-full overflow-y-auto h-[90.6vh] max-[500px]:min-h-screen">
          <div className="w-full sticky top-0 z-[1]">
            <HeaderProp
              LinkText1="Home"
              LinkText2="Users"
              AnText="All Users"
              LinkPath={adminPath + "/users"}
            />
          </div>
          <UsersPage />
        </div>
      </div>
    </div>
  );
};

export default Users;
