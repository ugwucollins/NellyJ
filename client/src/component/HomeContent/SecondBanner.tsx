import { NavLink } from "react-router-dom";
import { Assets, KeyFeatures } from "../assets";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { DarkModeClass } from "./HomeExportComponent";
import { motion } from "framer-motion";
import { YSlideIn } from "../Animation";
import { production } from "../../context/UserContext";

const SecondBanner = () => {
  return (
    <div
      className={`w-full py-8 min-h-[90vh] bg-transparent overflow-hidden flex justify-center max-[170px]:px-1 px-16 max-sm:px-8 max-[400px]:px-3 ${DarkModeClass}`}
    >
      <div className="flex flex-row max-sm:justify-center  justify-between items-center max-[790px]:flex-col max-[790px]:gap-4 align-middle w-full overflow-hidden">
        <motion.div
          variants={YSlideIn(160, 1, 0.5, production ? 0.5 : 0.8)}
          whileInView={"show"}
          initial={"hidden"}
          className="w-full px-2"
        >
          <h1 className="font-extrabold text-[min(10vw,50px)] w-full leading-tight text-balance">
            Key Features of vitamin Food include
          </h1>

          <p className="text-balance text-sm text-gray-700 dark:text-gray-400 py-1 pb-3">
            jjjjjjjjjjjj
          </p>

          <div className="flex flex-col gap-1 items-start py-3 pb-8">
            {KeyFeatures.map((text: any, index: number) => (
              <div
                key={index}
                className="flex flex-shrink-0 gap-1.5 flex-row items-center"
              >
                <IoMdCheckmarkCircle className="text-secondary dark:text-yellow-800" />
                <span className="text-base text-balance text-secondary dark:text-primary1/85">
                  {text}
                </span>
              </div>
            ))}
          </div>

          <NavLink to={"/event"}>
            <button className="py-3 px-6 rounded-2xl hover:font-bold  transition-all duration-200 hover:rounded-full bg-secondary text-primary1 dark:outline outline-gray-50 dark:outline-2 dark:rounded-full">
              <p>Book Now</p>
            </button>
          </NavLink>
        </motion.div>

        <motion.div
          variants={YSlideIn(-160, 1, 0.5, production ? 0.5 : 0.8)}
          whileInView={"show"}
          initial={"hidden"}
          className="flex max-[790px]:py-6 relative flex-row items-center gap-2 w-full px-2"
        >
          <div className="h-[500px] w-full max-w-xs max-md:max-w-sm">
            <img
              src={Assets.Mixedfood6}
              alt="food image"
              className="w-full h-full object-cover rounded-[2.5rem]"
            />
          </div>
          <div className="h-[500px]  w-full max-w-xs max-md:max-w-sm max-[850px]:hidden max-[460px]:hidden max-[790px]:block max-[790px]:gap-3">
            <img
              src={Assets.Mixedfood1}
              alt="food image"
              className="w-full h-full object-cover rounded-[2.5rem]"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SecondBanner;
