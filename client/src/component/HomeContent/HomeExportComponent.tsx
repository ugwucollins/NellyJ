import { motion } from "framer-motion";
import { Assets, FeatureArray } from "../assets";
import { checkEvenNumbers as even, XSlideIn, YSlideIn } from "../Animation";
import { NavLink } from "react-router-dom";
import { lazy } from "react";
import { FaStar } from "react-icons/fa";

const FaRegStarHalfStroke = lazy(() => import("../../context/stars/StarIcon"));

export const VideoCom = ({ className }: any) => {
  return (
    <video className={className} src={Assets.video} muted autoPlay loop></video>
  );
};

export const FeatureArryMap = () => {
  return (
    <div className="w-full dark:text-primary px-0 h-auto py-2 max-sm:pt-8">
      <div className="flex gap-6 flex-row justify-center flex-wrap py-8 max-[900px]:pt-16 max-[650px]:pt-20 max-[380px]:pt-56 max-[420px]:pt-52">
        {FeatureArray.map((item: any, index: number) => (
          <motion.div
            key={index}
            whileInView={"show"}
            initial={"hidden"}
            variants={YSlideIn(even(index) ? 100 : -100, 0.5, index, 0.5)}
          >
            <div
              key={item.id}
              className="flex outline outline-1 outline-neutral-600 flex-row max-[230px]:flex-col-reverse items-center gap-3.5 max-[230px]:gap-5 px-6 rounded-2xl py-6 relative shadow dark:shadow-white/20 drop-shadow hover:drop-shadow-lg hover:cursor-pointer hover:shadow-xl"
            >
              <div className="relative text-[32px] leading-tight">
                <span className="size-7 z-0 rounded-full bg-yellow-600/90 absolute top-2.5 left-3" />
                <div className="relative z-[1]">{item.icon}</div>
              </div>
              <div>
                <h1 className="font-semibold text-balance capitalize max-[500px]:pb-1.5 pb-1">
                  {item.title}
                </h1>
                <p className="text-balance text-gray-700 dark:text-primary1 dark:opacity-45 opacity-90">
                  {item.text}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const DarkModeClass =
  " dark:bg-gradient-to-tr from-gray-900  to-gray-800/60";

// max-sm:size-[350px] max-[420px]:size-[300px] max-[380px]:size-[250px] max-md:size-[450px] max-[950px]:size-[400px] max-[330px]:size-[180px] max-[260px]:size-[150px] max-[230px]:size-[120px] max-[130px]:size-[100px]
export const VideoHeader = () => {
  return (
    <div className="w-full overflow-hidden px-16 max-[170px]:px-1 max-[690px]:px-10 relative z-[2]">
      <div className="min-h-[90vh] w-full max-[900px]:pt-5 relative">
        <div className="flex text-white flex-row w-full justify-between max-sm:justify-center h-auto max-[900px]:flex-col">
          <motion.div
            variants={XSlideIn(-150, 0.5, 1, 1)}
            whileInView={"show"}
            initial={"hidden"}
          >
            <div className="flex dark:text-primary  w-full flex-col justify-center items-left align-middle min-h-[90vh] max-[900px]:min-h-[60vh] max-md:pt-5 text-left gap-2">
              <div className="font-extrabold text-[min(10vw,70px)] w-full pr-5 leading-tight text-balance">
                It's Not just Food, It's an Experience.
              </div>

              <motion.div
                variants={YSlideIn(100, 0.8, 1, 1)}
                whileInView={"show"}
                initial={"hidden"}
              >
                <div className="flex w-full py-4 flex-row gap-5 flex-wrap">
                  <NavLink to={"/product"}>
                    <button className="font-semibold hover:font-bold bg-yellow-800 text-primary px-3.5 cursor-pointer hover:bg-transparent hover:text-primary hover:outline py-2 rounded-full">
                      <p>View Menu</p>
                    </button>
                  </NavLink>

                  <NavLink to={"/event"}>
                    <button className="font-semibold  hover:outline-none hover:font-bold hover:bg-yellow-800 hover:text-primary px-3.5 cursor-pointer bg-transparent text-primary outline py-2 rounded-full">
                      <p>Book An Event</p>
                    </button>
                  </NavLink>
                </div>
              </motion.div>
              <div className="w-full pt-2 flex flex-col gap-y-3">
                <h1>Reviews</h1>
                <div className="flex w-full flex-row ml-1 relative">
                  <img
                    src={Assets.CustomerPhotos}
                    alt="customers picture"
                    className="size-7 rounded-full ring-1"
                  />
                  <img
                    src={Assets.CustomerPhotos1}
                    alt="customers picture"
                    className="size-7 -ml-2.5 rounded-full ring-1"
                  />
                  <img
                    src={Assets.CustomerPhotos2}
                    alt="customers picture"
                    className="size-7 rounded-full -ml-2.5 ring-1"
                  />
                  <img
                    src={Assets.CustomerPhotos3}
                    alt="customers picture"
                    className="size-7 rounded-full -ml-2.5 ring-1"
                  />
                  <div className="size-7 rounded-full -ml-2.5 ring-1 text-sm px-0.5 py-0.5 bg-secondary text-primary">
                    10+
                  </div>
                </div>
                <div className="text-[min(3rem,25px)] leading-tight font-semibold text-yellow-600 flex">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStarHalfStroke />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={XSlideIn(150, 0.5, 1, 1)}
            whileInView={"show"}
            initial={"hidden"}
          >
            <div className="w-full relative items-center align-middle min-h-[90vh] max-[900px]:min-h-[0vh] flex justify-center">
              <div className="size-[min(80vw,460px)] max-[300px]:size-[min(70vw,460px)] rounded-full relative">
                <img
                  src={Assets.Jellofrice1}
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
