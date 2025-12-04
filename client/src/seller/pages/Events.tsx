import HeaderProp from "../../context/HeaderProp";
import { sellerPath } from "../../context/UserContext";
import AllEvents from "../events/AllEvents";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Events = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full flex mt-[68px] max-sm:mt-0">
        <Sidebar />
        <div className="w-full overflow-y-auto h-[90.6vh] max-[500px]:min-h-screen">
          <div className="w-full sticky top-0 z-[1]">
            <HeaderProp
              LinkText1="Home"
              LinkText2="all events"
              AnText="Booked Events"
              LinkPath={sellerPath + "/events"}
            />
          </div>
          <AllEvents />
        </div>
      </div>
    </div>
  );
};

export default Events;
