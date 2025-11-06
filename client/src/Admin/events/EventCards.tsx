import { BiCake } from "react-icons/bi";
import DateFormater from "../../context/DateFormat";
import { Link } from "react-router-dom";
import AvaterImage from "../../context/AvaterImage";
import { Assets } from "../../component/assets";
import { buttonClassName } from "../../component/Animation";

const EventCards = ({ event }: any) => {
  return (
    <div className="w-full dark:bg-slate-800/60 outline-none dark:outline-1 dark:outline dark:outline-slate-600/70 dark:text-white max-w-2xl shadow-md drop-shadow p-6 rounded-2xl">
      <div className="flex w-full gap-1 justify-between items-center">
        <div className="flex gap-1 items-center">
          {event.userId ? (
            <img
              src={
                event.userId.imageUrl ? event.userId.imageUrl : Assets.Client1
              }
              className="size-12 rounded-full object-cover"
              alt={"users photos"}
            />
          ) : (
            <AvaterImage />
          )}
          <div>
            <h1 className="font-bold capitalize">
              {event.name && event.name.length <= 12
                ? event.name && event.name
                : event.name && event.name.slice(0, 12) + ".."}
            </h1>
            <p className="text-sm font-semibold opacity-75">
              {event.phone && event.phone}
            </p>
          </div>
        </div>

        <div
          className={` capitalize outline outline-1 cursor-pointer w-auto px-3.5 rounded-full py-2 font-semibold ${
            event.status === EventStatus.Pending
              ? "bg-red-400/70 outline-red-700"
              : event.status === EventStatus.Active
              ? "bg-yellow-400/70 outline-yellow-700"
              : "bg-green-400/70 outline-green-700"
          }`}
        >
          {event.status === EventStatus.Pending
            ? EventStatus.Pending
            : event.status === EventStatus.Active
            ? EventStatus.Active
            : EventStatus.completed}
        </div>
      </div>
      <hr className="w-full h-[2px] my-2 bg-neutral-400" />

      <div className="flex flex-col gap-y-2 pt-2">
        <div className="flex gap-2 items-center pb-2">
          <div className="w-auto p-4 text-black text-2xl bg-slate-50 shadow rounded-full">
            <BiCake />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold">{event && event.event}</h1>
            <p className="text-sm font-semibold opacity-75">
              {DateFormater({
                date: event.date ? event.date : new Date(),
                monthType: "short",
                pro: false,
              })}
            </p>
          </div>
        </div>

        <div>
          <div className="pl-4 pt-2">
            {/* <h1 className="font-bold text-base text-left">{event.event}</h1> */}
            <span className="text-base font-semibold opacity-75">
              {/* {event.date} */}
            </span>
          </div>
          <span className="font-semibold ml-4 capitalize font-serif opacity-85">
            description:
          </span>
          <div className="px-4 pb-5 text-balance pt-0.5 text-left font-semibold text-gray-600 first:capitalize dark:text-gray-400">
            "
            {event.description.length <= 120
              ? event.description
              : event.description.slice(0, 120) + "..."}
            "
          </div>

          <span className="font-semibold ml-4 font-serif opacity-85">
            Address:
          </span>
          <address className="px-4 pb-6 text-left font-semibold text-gray-600 dark:text-gray-400">
            "{event.address && event.address}, {event.busTop}, {event.town},{" "}
            {event.state}, {event.country}"
          </address>
        </div>

        <div className="flex gap-2 items-center justify-end">
          <Link to={`${event._id}`}>
            <button className={`${buttonClassName}`}>
              <p>View Details</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCards;

export const EventStatus = {
  Pending: "pending",
  Active: "active",
  completed: "completed",
};
