import HeaderProp from "../../context/HeaderProp";
import { adminPath } from "../../context/UserContext";
import Navbar from "../Bars/Navbar";
import Sidebar from "../Bars/Sidebar";
import SettingsP from "../settings/SettingsP";

const Settings = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full flex mt-[68px] max-sm:mt-0">
        <Sidebar />
        <div className="w-full overflow-y-auto h-[90.6vh] max-[500px]:min-h-screen">
          <div className="w-full sticky top-0 z-[1]">
            <HeaderProp
              LinkText1="Home"
              LinkText2="settings"
              AnText="Settings"
              LinkPath={adminPath + "/settings"}
            />
          </div>
          <SettingsP />
        </div>
      </div>
    </div>
  );
};

export default Settings;
