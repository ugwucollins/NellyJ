import { useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/UserContext";
import EventPage from "../EventBooking/EventPage";
import { useEffect } from "react";

const Event = () => {
  const { user }: any = UserAuth();
  const router = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || -1;

  useEffect(() => {
    if (user === null && !user) {
      router("/auth/signin", { replace: true, state: { to: from } });
    }
  }, []);

  return (
    <div>
      <EventPage />
    </div>
  );
};

export default Event;
