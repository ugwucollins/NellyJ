import HeaderProp from "../../context/HeaderProp";
import History from "../EventBooking/History";

const EventHistory = () => {
  return (
    <div>
      <HeaderProp
        AnText="Event History"
        LinkText1="Home"
        LinkText2="History"
        LinkPath="/event/history"
      />
      <History />
    </div>
  );
};

export default EventHistory;
