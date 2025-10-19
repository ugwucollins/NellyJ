import { motion } from "framer-motion";
import { XSlideIn, YSlideIn } from "../Animation";
import { NavLink } from "react-router-dom";
import { Assets } from "../assets";
import { BsArrowRight } from "react-icons/bs";

const EventHeader = () => {
  return (
    <div className="w-full relative">
      <div className="min-h-[90vh] max-[900px]:min-h-[120vh] max-[328px]:min-h-screen w-full  absolute">
        <div className="absolute w-full h-full z-[1] dark:bg-secondary dark:opacity-90 bg-black opacity-75 backdrop-blur-sm blur-sm" />
        <EventVideoCom className="absolute z-0 w-full h-full object-cover object-center" />
      </div>

      <EventVideo />
    </div>
  );
};

export default EventHeader;

export const EventVideo = () => {
  return (
    <div className="w-full overflow-hidden px-16 max-[170px]:px-1 max-[690px]:px-10 relative z-[2]">
      <div className="min-h-[90vh] w-full max-[900px]:pt-5 relative">
        <div className="flex text-white flex-row w-full justify-between max-sm:justify-center h-auto max-[900px]:flex-col">
          <motion.div
            variants={XSlideIn(-100, 0.5, 1, 1)}
            whileInView={"show"}
            initial={"hidden"}
          >
            <div className="flex dark:text-primary  w-full flex-col justify-center items-left align-middle min-h-[90vh] max-[900px]:min-h-[60vh] max-md:pt-5 text-left gap-2">
              <div className="font-extrabold text-[min(10vw,60px)] w-full pr-5 leading-tight text-balance">
                Deliciously Curated Foods for Every Diet and Lifestyle
              </div>

              <div className="w-full pt-2 text-sm text-balance font-semibold">
                Choose meals that suit your health needs, dietary preferences,
                and allergy concerns making everyday eating simple
              </div>

              <motion.div
                variants={YSlideIn(100, 0.8, 1, 1)}
                whileInView={"show"}
                initial={"hidden"}
              >
                <div className="flex w-full items-center gap-1 py-4 flex-row flex-wrap">
                  <NavLink to={"/product"}>
                    <button className="font-semibold hover:font-bold bg-yellow-800 text-primary px-4 cursor-pointer hover:bg-transparent hover:text-primary hover:outline py-3 rounded-full">
                      <p>Order Now</p>
                    </button>
                  </NavLink>
                  <NavLink to={"/product"}>
                    <button className="font-semibold hover:font-bold bg-yellow-800 text-primary cursor-pointer hover:bg-transparent hover:text-primary hover:outline p-3 text-xl rounded-full transition-all -rotate-45">
                      <BsArrowRight />
                    </button>
                  </NavLink>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={XSlideIn(100, 0.5, 1, 1)}
            whileInView={"show"}
            initial={"hidden"}
          >
            <div className="w-full relative items-center align-middle min-h-[90vh] max-[900px]:min-h-[0vh] flex justify-center">
              <div className="size-[min(80vw,460px)] max-[300px]:size-[min(70vw,460px)] rounded-full relative">
                <img
                  src={Assets.Jellofrice2}
                  className="w-full rounded-full object-cover absolute h-full"
                  alt="food image"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const EventVideoCom = ({ className }: any) => {
  return (
    <video
      className={className}
      src={Assets.eventVideo}
      muted
      autoPlay
      loop
    ></video>
  );
};
