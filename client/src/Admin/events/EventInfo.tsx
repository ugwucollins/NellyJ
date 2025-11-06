import { useEffect, useState } from "react";
import AvaterImage from "../../context/AvaterImage";
import { BiCake } from "react-icons/bi";
import DateFormater from "../../context/DateFormat";

const EventInfo = ({ id: _id }: string | any) => {
  const [EventInfo, setEventInfo]: any = useState({});
  const jsonValue: any = localStorage.getItem("event");
  const EventArray = JSON.parse(jsonValue ? jsonValue : []);

  const FetchContactInfo = async () => {
    const filter =
      EventArray &&
      EventArray.find((item: any) => item._id.toString() === _id.toString());
    setEventInfo(filter);
    console.log(filter);
  };

  useEffect(() => {
    FetchContactInfo();
  }, []);

  return (
    <div className="w-full flex justify-center items-center flex-col px-2 py-8">
      <h1 className=" font-bold text-lg dark:py-4">Event Info</h1>
      <div className="w-full max-w-2xl shadow-lg drop-shadow-md rounded-2xl p-10 outline-none dark:outline-1 dark:outline dark:outline-slate-700">
        <div className="flex w-full items-center justify-center flex-col text-center gap-2 py-2">
          <div
            className={`bg-neutral-100 size-24 relative flex justify-center items-center max-[330px]:p-0 rounded-full ${
              true ? "dark:bg-neutral-600" : "dark:bg-neutral-300"
            }`}
          >
            {EventInfo && EventInfo?.userId ? (
              <img
                src={EventInfo && EventInfo?.userId?.imageUrl}
                className="size-20 rounded-full object-cover"
                alt={"contacted photos"}
              />
            ) : (
              <AvaterImage size="20" />
            )}
          </div>
          <div className="whitespace-nowrap">
            <p className="font-semibold text-base capitalize">
              {EventInfo && EventInfo.name}
            </p>
            <span className="whitespace-nowrap text-sm font-semibold opacity-60 capitalize">
              {EventInfo && EventInfo?.userId?.email}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-y-4 w-full">
          <div className="flex gap-2 items-center pb-2">
            <div className="w-auto p-4 text-black text-2xl bg-slate-50 shadow rounded-full">
              <BiCake />
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold">{EventInfo && EventInfo.event}</h1>
              <p className="text-sm font-semibold opacity-75">
                {DateFormater({
                  date: EventInfo.date ? EventInfo.date : new Date(),
                  monthType: "short",
                })}
              </p>
            </div>
          </div>

          <div>
            <h1 className="font-semibold text-lg py-1 underline capitalize">
              description:
            </h1>
            <p className="font-bold text-balance opacity-80 ">
              {EventInfo && EventInfo?.description}
            </p>
          </div>

          <div>
            <span className="font-semibold mr-4 font-serif opacity-85">
              Address:
            </span>
            <address className="pr-4 pb-6 text-left font-semibold text-gray-600 dark:text-gray-400">
              "{EventInfo.address && EventInfo.address}, {EventInfo.busTop},{" "}
              {EventInfo.town}, {EventInfo.state}, {EventInfo.country}"
            </address>
          </div>
        </div>

        <div className="flex items-center w-full justify-end pt-4">
          <p
            className={`text-sm font-semibold capitalize w-auto p-2  rounded-full outline outline-1 text-black
               ${
                 EventInfo && EventInfo?.userId
                   ? "bg-green-300  outline-green-800"
                   : "bg-yellow-200  outline-yellow-800"
               }
                 `}
          >
            {EventInfo && EventInfo?.userId
              ? "Active customer"
              : "guest Visitor"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
