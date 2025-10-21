import { motion } from "framer-motion";
import { YSlideIn } from "../Animation";
import { Assets, EventsCheck } from "../assets";
import { useEffect, useState } from "react";
import { BsCakeFill } from "react-icons/bs";
import { FaBaby, FaGraduationCap } from "react-icons/fa6";
import { TbTransactionDollar } from "react-icons/tb";
import { RiHeartsFill } from "react-icons/ri";
import { GiCoffin } from "react-icons/gi";
import { PiFlowerLotusFill } from "react-icons/pi";
import { IoRoseSharp } from "react-icons/io5";
import { UserAuth } from "../../context/UserContext";
import { EmptyItems } from "../ShoppingCart";
import { FeatureArryMap as FeatureArrayMap } from "../HomeContent/HomeExportComponent";

const History = () => {
  return (
    <div className="my-5">
      <HistoryCard />
      <FeatureArrayMap />
    </div>
  );
};

export default History;

export const HistoryCard = () => {
  const { events }: any = UserAuth();

  const [allEvents, setAllEvents] = useState((events && events) || []);

  useEffect(() => {
    setAllEvents;
    console.log(allEvents);
  }, []);

  return (
    <div className="w-full flex flex-row gap-5 justify-center items-center flex-wrap">
      {allEvents.reverse().map((event: any, index: number) => (
        <motion.div
          key={index}
          variants={YSlideIn(150, 1, index ? index : 0.5, 0.5)}
          whileInView={"show"}
          initial={"hidden"}
          className="px-4"
        >
          <div className="bg-primary1 dark:bg-secondary dark:shadow-lg dark:shadow-primary1/15 dark:drop-shadow-lg shadow-md drop-shadow-md hover:shadow-lg hover:drop-shadow-xl rounded-2xl hover:rounded-3xl transition-all w-full max-w-md">
            <div className="w-full flex max-[280px]:flex-wrap gap-4">
              <div className="relative px-5 w-full max-w-[120px]">
                <div className="absolute w-full rounded-r-full z-0 h-full top-0 left-0 bg-yellow-800 py-4" />
                <div className="z-[1] relative py-4">
                  <div className="w-full rounded-full top-3 left-0 h-[78%] absolute from-zinc-100 to-blue-900 bg-gradient-to-tr -z-[1] animate-spin delay-150 transition-all duration-300" />
                  <div className="size-20 bg-white flex justify-center items-center rounded-full text-4xl dark:text-black">
                    {event.event === EventsCheck.Birthday ? (
                      <BsCakeFill />
                    ) : event.event === EventsCheck.Baby_Shower ? (
                      <FaBaby />
                    ) : event.event === EventsCheck.Wedding ? (
                      <RiHeartsFill />
                    ) : event.event === EventsCheck.Burial ? (
                      <GiCoffin />
                    ) : event.event === EventsCheck.Graduation ? (
                      <FaGraduationCap />
                    ) : event.event === EventsCheck.Anniversary ? (
                      <PiFlowerLotusFill />
                    ) : event.event === EventsCheck.Get_Together ? (
                      <IoRoseSharp />
                    ) : (
                      <TbTransactionDollar />
                    )}

                    {/* {icon} */}
                  </div>
                </div>
              </div>
              <div className="flex max-sm:gap-2 justify-between pr-4 w-full items-center">
                <div>
                  <div className="max-[300px]:pl-4">
                    <h1 className="font-bold capitalize text-lg text-left">
                      {event.name}
                    </h1>
                    <span className="text-base font-semibold opacity-75">
                      {event.phone}
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
                <h1 className="font-bold text-base text-left">{event.event}</h1>
                <span className="text-base font-semibold opacity-75">
                  {event.date}
                </span>
              </div>
              <div className="px-4 pb-5 text-balance pt-2 text-left font-semibold text-gray-600 first:capitalize dark:text-gray-400">
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
          </div>
        </motion.div>
      ))}
      {allEvents.length === 0 && (
        <div>
          <EmptyItems
            Text="Book Now"
            LinkPath="/event"
            icon={<TbTransactionDollar />}
            title="No Booked Event"
          />
        </div>
      )}
    </div>
  );
};
