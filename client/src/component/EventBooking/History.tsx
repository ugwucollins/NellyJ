import { motion } from "framer-motion";
import { YSlideIn } from "../Animation";
import { Assets, EventsCheck } from "../assets";
import { useEffect, useState } from "react";
import { BsCakeFill } from "react-icons/bs";
import { FaBaby } from "react-icons/fa6";
import { TbTransactionDollar } from "react-icons/tb";
import { RiCouponFill } from "react-icons/ri";

const History = () => {
  return (
    <div className="my-5">
      <HistoryCard />
    </div>
  );
};

export default History;

export const HistoryCard = () => {
  const index = 1;
  const JsonValue: any = localStorage.getItem("event");
  const [events, setEvents] = useState(JSON.parse(JsonValue) || []);
  useEffect(() => {
    console.log(events);
    setEvents;
  }, []);

  return (
    <div>
      <motion.div
        key={index}
        variants={YSlideIn(150, 1, index ? index : 0.5, 0.5)}
        whileInView={"show"}
        initial={"hidden"}
        className="w-full flex justify-center items-center px-4"
      >
        <div className="bg-primary1 dark:bg-secondary dark:shadow-lg dark:shadow-primary1/15 dark:drop-shadow-lg shadow-md drop-shadow-md hover:shadow-lg hover:drop-shadow-xl rounded-2xl hover:rounded-3xl transition-all w-full max-w-md">
          <div className="w-full flex max-[280px]:flex-wrap gap-4">
            <div className="relative px-5 w-full max-w-[120px]">
              <div className="absolute w-full rounded-r-full z-0 h-full top-0 left-0 bg-yellow-800 py-4" />
              <div className="z-[1] relative py-4">
                <div className="w-full rounded-full top-3 left-0 h-[78%] absolute from-zinc-100 to-blue-900 bg-gradient-to-tr -z-[1] animate-spin delay-150 transition-all duration-300" />
                <div className="size-20 bg-white flex justify-center items-center rounded-full text-4xl dark:text-black">
                  {events.event === EventsCheck.Birthday ? (
                    <BsCakeFill />
                  ) : events.event === EventsCheck.Baby_Shower ? (
                    <FaBaby />
                  ) : events.event === EventsCheck.Wedding ? (
                    <RiCouponFill />
                  ) : (
                    <TbTransactionDollar />
                  )}
                </div>
              </div>
            </div>
            <div className="flex max-sm:gap-2 justify-between pr-4 w-full items-center">
              <div>
                <div className="max-[300px]:pl-4">
                  <h1 className="font-bold capitalize text-lg text-left">
                    {events.name}
                  </h1>
                  <span className="text-base font-semibold opacity-75">
                    {events.phone}
                  </span>
                </div>
              </div>

              <div className="p-3 max-[390px]:hidden rounded-full bg-primary">
                <img
                  src={Assets.comma}
                  alt="comma"
                  className="size-[min(10vw,40px)]"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="pl-4 pt-2">
              <h1 className="font-bold text-base text-left">{events.event}</h1>
              <span className="text-base font-semibold opacity-75">
                {events.date}
              </span>
            </div>
            <div className="px-4 pb-5 pt-2 text-left font-semibold text-gray-600 first:capitalize dark:text-gray-400">
              "{events.description}"
            </div>
            <span className="font-semibold ml-4 font-serif opacity-85">
              Address:
            </span>
            <address className="px-4 pb-6 text-left font-semibold text-gray-600 dark:text-gray-400">
              "{events.address && events.address}, {events.busTop},{" "}
              {events.town}, {events.state}, {events.country}"
            </address>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
