import { MdEventAvailable } from "react-icons/md";
import { EmptyItems } from "../../component/ShoppingCart";
import EventCards from "./EventCards";
import { sellerPath } from "../../context/UserContext";
import { UserSellerAuth } from "../Context/SellersContext";

const AllEvents = () => {
  const { events }: any = UserSellerAuth();

  return (
    <div className=" w-full flex justify-center flex-wrap gap-4 py-2">
      {events &&
        events.map((event: any, index: number) => {
          return <EventCards event={event} key={index} />;
        })}

      <div className="flex justify-center min-h-[60vh] items-center">
        {!events && (
          <EmptyItems
            title="No Booked Events"
            icon={<MdEventAvailable />}
            LinkPath={sellerPath}
            Text="Contiune checking"
          />
        )}
      </div>
    </div>
  );
};

export default AllEvents;

export type EventProps = {
  _id: string | number;
  userId: string | object | any;
  id: string;
  status: string;
  address: string;
  name: string;
  phone: string | number;
  person: string | number;
  description: string;
  state: string;
  country: string;
  town: string;
  busTop: string;
  event: string;
  date: string | Date;
  foods: string[] | [string];
};
