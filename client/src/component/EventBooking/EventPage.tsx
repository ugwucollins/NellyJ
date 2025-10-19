import { motion } from "framer-motion";
import type { EventCardsProp } from "../../context/Types";
import EventCards, { EventCardInfo } from "./EventCards";
import EventHeader from "./EventHeader";
import { YSlideIn } from "../Animation";
import EventForm from "./EventForm";
import { FeatureArryMap as FeatureArrayMap } from "../HomeContent/HomeExportComponent";

const EventPage = () => {
  return (
    <div className="w-full min-h-screen">
      <EventHeader />

      <div className="pt-10 pb-5 mx-auto w-full flex-wrap gap-y-5 flex gap-x-8 justify-center items-center">
        {EventCardInfo.map((item: EventCardsProp, index: number) => (
          <motion.div
            variants={YSlideIn(100, 0.5, index, 0.5)}
            initial={"hidden"}
            whileInView={"show"}
            key={item.Title}
          >
            <EventCards
              imageUrl={item.imageUrl}
              Title={item.Title}
              comment={item.comment}
            />
          </motion.div>
        ))}
      </div>

      <EventForm />

      <FeatureArrayMap />
    </div>
  );
};

export default EventPage;
