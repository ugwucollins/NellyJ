// import { useEffect, useState } from "react";
import EventCards from "./EventCards";
import { Assets } from "../../component/assets";
import { EmptyItems } from "../../component/ShoppingCart";
import { MdEventAvailable } from "react-icons/md";
import { adminPath } from "../../context/UserContext";
import { UserSellerAuth } from "../../seller/Context/SellersContext";

const AllEvents = () => {
  const { events }: any = UserSellerAuth();

  return (
    <div className=" w-full flex justify-center flex-wrap gap-4 py-2">
      {events &&
        events.map((event: any, index: number) => {
          return (
            <EventCards
              event={event}
              key={index}
              // imageUrl={event.userId.imageUrl}
              // name={event.userId.lastName + " " + event.userId.firstName}
              // event={event.event}
              // address={event.address}
              // date={event.date}
              // key={index}
              // description={event.description}
              // number={event.phone}
              // status={"completed"}
            />
          );
        })}

      <div className="flex justify-center min-h-[60vh] items-center">
        {!events && (
          <EmptyItems
            title="No Booked Events"
            icon={<MdEventAvailable />}
            LinkPath={adminPath}
            Text="Contiune checking"
          />
        )}
      </div>
    </div>
  );
};

export default AllEvents;

export const userId = {
  firstName: "collins",
  _id: "collins",
  gender: "male",
  lastName: "ugwu",
  email: "collins@gmail.com",
  imageUrl: Assets.Client2,
  phoneNumber: 8101245121,
  password: "12345678",
};
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
// const date = new Date();

// export const Ev: EventProps[] = [
//   {
//     _id: 1761906718032,
//     userId: userId,
//     status: "pending",
//     id: "1761906718032ugwu collins",
//     address: "no 12 williams onyaboue close",
//     name: "ugwu collins",
//     phone: "08101245121",
//     person: "500",
//     description:
//       "DateField.tsx:22 Cannot update a component (`EventFormField`) while rendering a different component (`DateField`). To locate the bad setState() call inside `DateField`, follow the stack trace as description in https://react.dev/link/setstate-in-render",
//     state: "Enugu",
//     country: "Nigeria",
//     town: "Abakaliki",
//     busTop: "Hilltop junction",
//     event: "Wedding ceremony",
//     date: "13,December 2032",
//     foods: ["Egusi Soup", " Fried Rice", "okoro soup", "  Bitter Leaf Soup"],
//   },
//   {
//     _id: 1761906718032,
//     userId: userId,
//     status: "pending",
//     id: "1761906718032ugwu collins",
//     address: "no 12 williams onyaboue close",
//     name: "ugwu collins",
//     phone: "08101245121",
//     person: "500",
//     description:
//       "DateField.tsx:22 Cannot update a component (`EventFormField`) while rendering a different component (`DateField`). To locate the bad setState() call inside `DateField`, follow the stack trace as description in https://react.dev/link/setstate-in-render",
//     state: "Enugu",
//     country: "Nigeria",
//     town: "Abakaliki",
//     busTop: "Hilltop junction",
//     event: "Wedding ceremony",
//     date: "13,December 2032",
//     foods: ["Egusi Soup", " Fried Rice", "okoro soup", "  Bitter Leaf Soup"],
//   },
//   {
//     _id: 1761906718032,
//     userId: userId,
//     status: "pending",
//     id: "1761906718032ugwu collins",
//     address: "no 12 williams onyaboue close",
//     name: "ugwu collins",
//     phone: "08101245121",
//     person: "500",
//     description:
//       "DateField.tsx:22 Cannot update a component (`EventFormField`) while rendering a different component (`DateField`). To locate the bad setState() call inside `DateField`, follow the stack trace as description in https://react.dev/link/setstate-in-render",
//     state: "Enugu",
//     country: "Nigeria",
//     town: "Abakaliki",
//     busTop: "Hilltop junction",
//     event: "Wedding ceremony",
//     date: date ? date : "3, November 2025",
//     foods: ["Egusi Soup", " Fried Rice", "okoro soup", "  Bitter Leaf Soup"],
//   },
// ];
