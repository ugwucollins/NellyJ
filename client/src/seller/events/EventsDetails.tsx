import { useParams } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Sidebar from "../pages/Sidebar";
import HeaderProp from "../../context/HeaderProp";
import { sellerPath } from "../../context/UserContext";
import EventInfo from "./EventInfo";

const EventsDetails = () => {
  const { id: _id } = useParams();
  return (
    <div>
      <Navbar />
      <div className="w-full flex mt-[68px] max-sm:mt-0">
        <Sidebar />
        <div className="w-full overflow-y-auto h-[90.6vh] max-[500px]:min-h-screen">
          <div className="w-full sticky top-0 z-[1]">
            <HeaderProp
              LinkText1="Home"
              LinkText2="event"
              AnText="Events Details"
              LinkPath={sellerPath + "/events" + _id}
            />
          </div>
          <EventInfo id={_id} />
        </div>
      </div>
    </div>
  );
};

export default EventsDetails;
