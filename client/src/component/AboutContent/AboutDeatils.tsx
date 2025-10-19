import { Link } from "react-router-dom";
import TextAnimation, { XSlideIn, YSlideIn } from "../Animation";
import { AboutArrays, Assets, Qualitys, TeamsArrays } from "../assets";
import {
  DarkModeClass,
  FeatureArryMap,
} from "../HomeContent/HomeExportComponent";
import { useState } from "react";
import { motion } from "framer-motion";

const AboutDeatils = () => {
  return (
    <div className="w-full flex flex-col gap-y-4 h-auto">
      <AboutHeader />
      <AboutFirstBanner />
    </div>
  );
};

export default AboutDeatils;

export const AboutHeader = () => {
  return (
    <div className="w-full bg-primary1 dark:bg-secondary dark:shadow-lg pb-10 flex-col  flex  min-h-[30vh] justify-center items-center text-center">
      <h1 className="">
        {TextAnimation(
          "About  Us",
          -22,
          0.2,
          "flex  gap-0.5 flex-wrap",
          "text-[min(10vw,30px)] font-bold"
        )}
      </h1>
      <div className="flex gap-1 flex-wrap">
        <Link to={"/"}>
          <p className=" cursor-pointer font-bold capitalize">Home/</p>
        </Link>
        <Link to={"/about"}>
          <p className=" cursor-pointer font-bold capitalize text-blue-900">
            About Us
          </p>
        </Link>
      </div>
    </div>
  );
};

export const AboutFirstBanner = () => {
  return (
    <div className="w-full  py-6 flex flex-col justify-center text-center items-center min-h-screen">
      <h6 className="font-bold text-sm pt-4">Our Story</h6>
      <h1 className="font-bold text-[min(10vw,30px)] text-balance">
        Crafted Comfort: Quality Food with good Nurtrient
      </h1>

      <div className="w-full flex-col flex justify-center text-center items-center pb-8">
        <p className="text-balance text-sm max-w-2xl w-full font-semibold opacity-70 ">
          Excellent food and service, the prices are very affordable and the
          food is delicious and I would recommend this place to anyone looking
          for a good quality food and service.
        </p>

        <p className="font-serif text-base py-6 font-bold">Ugwu Juilet * CEO</p>
      </div>

      {/* About second Banner */}
      <SecondBanner />

      {/* About third Banner */}
      <ThirdBanner />

      {/* About Fourth Banner */}
      <FourthBanner />
    </div>
  );
};

export const SecondBanner = () => {
  return (
    <div className="py-5 pb-10 w-full  px-20 max-md:px-16 max-sm:px-5 max-[170px]:px-1 flex justify-center flex-col items-center text-center">
      <div className="flex flex-col max-[20000px]:w-auto  max-[1800px]:w-full  justify-center items-center text-center p-4">
        <div className="flex flex-row justify-center items-center text-center max-[790px]:flex-col gap-4 w-full py-8">
          <motion.img
            variants={XSlideIn(-100, 0.5, 1, 0.5)}
            whileInView={"show"}
            initial={"hidden"}
            src={Assets.Mixedfood1}
            className="w-full object-cover rounded-3xl max-md:max-w-xl max-w-2xl h-[72vh]"
            alt="food logo"
          />

          <motion.div
            variants={XSlideIn(100, 0.5, 1, 0.5)}
            whileInView={"show"}
            initial={"hidden"}
            className="w-full flex gap-4 flex-col"
          >
            <motion.img
              variants={YSlideIn(-100, 0.5, 1, 0.5)}
              whileInView={"show"}
              initial={"hidden"}
              src={Assets.Mixedfood6}
              className="w-full object-cover  max-w-2xl h-[35vh] rounded-3xl"
              alt="food logo"
            />
            <motion.img
              variants={YSlideIn(100, 0.5, 1, 0.5)}
              whileInView={"show"}
              initial={"hidden"}
              src={Assets.Mixedfood3}
              className="w-full object-cover max-w-2xl h-[35vh] rounded-3xl"
              alt="food logo"
            />
          </motion.div>
        </div>
      </div>

      <div className="w-full rounded-xl bg-yellow-800 flex flex-wrap justify-around items-center text-center py-4 px-4 gap-y-8 gap-4 max-[300px]:px-2">
        {AboutArrays.map((item: any, index: number) => (
          <motion.div
            variants={YSlideIn(100, 0.5, index, 0.5)}
            whileInView={"show"}
            initial={"hidden"}
            key={item.number}
            className="text-primary1 flex font-bold flex-col"
          >
            <span>{item.number}</span>
            <p className="capitalize">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const ThirdBanner = () => {
  return (
    <div className="w-full dark:bg-secondary  max-md:gap-3  gap-y-8 max-md:px-10 flex flex-row-reverse max-[800px]:flex-col max-[800px]:gap-4 py-10  justify-between tems-center max-sm:justify-center gap-2 px-16 max-sm:px-8 max-[400px]:px-2bg-primary1">
      <motion.div
        variants={XSlideIn(150, 0.5, 1, 0.6)}
        whileInView={"show"}
        initial={"hidden"}
        className={`w-full bg-primary1  rounded-3xl px-5 max-sm:px-0 flex flex-col py-5 items-center justify-center text-center relative ${DarkModeClass}`}
      >
        <h6 className="font-bold text-sm pt-4">Our Product Quality</h6>
        <h1 className="font-bold capitalize text-[min(10vw,33px)] text-balance">
          setting the standard for quality Foods
        </h1>
        <p className="text-balance px-2 max-sm:px-0.5 text-sm max-w-xl w-full font-semibold opacity-70 ">
          Excellent food and service, the prices are very affordable and the
          food is delicious and I would recommend this place to anyone looking
          for a good quality food and service.
        </p>

        <div className="flex pt-12 gap-5 flex-row max-[948px]:flex-col max-[800px]:flex-row max-[450px]:flex-col">
          {Qualitys.map((item: any, index: number) => (
            <div
              key={index}
              className="flex px-5 dark:shadow-lg  dark:drop-shadow dark:shadow-secondary shadow-md drop-shadow-md py-4 rounded-3xl "
            >
              <div className="flex flex-col gap-y-1.5 text-left">
                <div className="relative">
                  <img
                    src={item.icon}
                    className="size-[min(20vw,50px)] rounded-full z-[1] relative"
                    alt="food logo"
                  />
                  <div className="size-10 rounded-full bg-yellow-700/50 z-0 absolute left-5 top-5 px-3 py-1.5" />
                </div>
                <h1 className="text-[min(8vw,20px)] font-bold ">
                  {item.title}
                </h1>
                <p className="opacity-70 text-balance text-sm font-semibold">
                  {item.word}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={XSlideIn(-150, 0.5, 1, 0.6)}
        whileInView={"show"}
        initial={"hidden"}
        className="w-full flex gap-2 max-sm:gap-4 flex-row items-center justify-center"
      >
        <div className="w-full h-[520px] max-md:h-[480px] max-md:max-w-[270px] max-w-xs relative">
          <img
            src={Assets.venu1}
            alt=""
            className="w-full object-cover h-full rounded-2xl"
          />
          <div className="w-full h-full absolute top-0 p-3 left-0">
            <div className=" h-full w-full outline outline-3 outline-primary rounded-2xl" />
          </div>
        </div>
        <div className="w-full max-[990px]:hidden max-[450px]:hidden max-[800px]:block block h-[520px] max-md:h-[470px] max-md:max-w-[260px] max-w-xs relative">
          <img
            src={Assets.venu2}
            alt=""
            className="w-full  h-full rounded-2xl"
          />
          <div className="w-full h-full absolute top-0 p-3 left-0">
            <div className=" h-full w-full outline outline-3 outline-primary rounded-2xl" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const FourthBanner = () => {
  const [currentIndex, setcurrentIndex] = useState(0);
  const [currentTeam, setcurrentTeam] = useState(0);
  return (
    <div className="py-10 pt-24 w-full">
      <div className="flex flex-col justify-center text-center items-center">
        <h1 className="">
          {TextAnimation(
            "-- Our  Team --",
            -22,
            0.2,
            "flex  gap-0.5 flex-wrap",
            "text-sm font-bold"
          )}
        </h1>
        <h1 className="">
          {TextAnimation(
            "Meet  Our  Team",
            22,
            0.2,
            "flex  gap-0.5 flex-wrap",
            "text-[min(10vw,30px)] font-bold"
          )}
        </h1>

        <div className="w-full px-20 max-md:px-14 max-sm:px-3 max-[170px]:px-1 flex flex-wrap justify-center gap-3 max-md:gap-3 items-center py-10">
          {TeamsArrays.map((team: any, index: number) => (
            <motion.div
              variants={YSlideIn(-100, 0.5, index, 0.5)}
              whileInView={"show"}
              initial={"hidden"}
              key={index}
              onClick={() => setcurrentTeam(index)}
              className="w-auto flex justify-center items-center flex-col px-1 max-[300px]:px-1 py-5 max-[300px]:w-full"
            >
              <div className="relative flex justify-center flex-col items-center w-full">
                <div className="w-[min(50vw,300px)] max-[300px]:w-full h-[400px]">
                  <img
                    src={team.image}
                    className="w-full object-cover rounded-xl h-full"
                    alt="team photo"
                  />
                </div>
                {currentTeam === index && (
                  <div className="w-full absolute flex flex-wrap gap-4 bottom-5 left-0 justify-evenly">
                    {team.handle.map((icon: any, index: number) => (
                      <motion.div
                        variants={YSlideIn(80, 0.5, index, 0.5)}
                        whileInView={"show"}
                        initial={"hidden"}
                        key={index}
                        onClick={() => setcurrentIndex(index)}
                        className={`p-3 overflow-hidden rounded-3xl  text-2xl font-bold  ${
                          currentIndex === index
                            ? "bg-yellow-800 text-white"
                            : "bg-primary1 text-secondary"
                        }`}
                      >
                        {icon.icon}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2 py-2 pt-8 flex-col text-center w-full capitalize justify-center items-center">
                <h1 className="text-[min(10vw,20px)] font-bold">{team.name}</h1>
                <span className="font-bold">{team.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div
        className={` w-full overflow-hidden px-10 max-[170px]:px-1 max-[690px]:px-10 pb-2 relative z-[2] ${DarkModeClass}`}
      >
        <FeatureArryMap />
      </div>
    </div>
  );
};
