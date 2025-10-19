import { Link } from "react-router-dom";
import TextAnimation, {
  checkEvenNumbers as even,
  XSlideIn,
} from "../Animation";
import { useState } from "react";
import { FAQsQuestionsArray } from "../assets";
import type { FAQsQuestionsProps } from "../../context/Types";
import { BsPlus } from "react-icons/bs";
import { GrSubtract } from "react-icons/gr";
import { motion } from "framer-motion";
import NewsLetter from "../HomeContent/NewsLetter";
import { DarkModeClass } from "../HomeContent/HomeExportComponent";

const FAQs = () => {
  return (
    <div className="w-full flex flex-col gap-y-4 h-auto">
      <FAQsHeader />
      <FAQsQuestions />
      <NewsLetter />
    </div>
  );
};

export default FAQs;

export const FAQsHeader = () => {
  return (
    <div className="w-full bg-primary1 dark:bg-secondary dark:shadow-lg pb-10 flex-col  flex  min-h-[30vh] justify-center items-center text-center">
      <h1 className="">
        {TextAnimation(
          "FAQs",
          -22,
          0.2,
          "flex  gap-0.5 flex-wrap",
          "text-[min(10vw,30px)] font-bold"
        )}
      </h1>
      <div className="flex gap-1 pt-1.5 flex-wrap">
        <Link to={"/"}>
          <p className=" cursor-pointer font-bold capitalize">Home/</p>
        </Link>
        <Link to={"/about"}>
          <p className=" cursor-pointer font-bold capitalize text-blue-900">
            FAQs
          </p>
        </Link>
      </div>
    </div>
  );
};

export const FAQsQuestions = () => {
  const [selectedIndex, setselectedIndex] = useState(0);

  return (
    <>
      <div className="w-full flex-col pb-5 gap-y-5 px-20 max-md:px-16 max-sm:px-5 max-[170px]:px-1 flex items-center justify-center text-center">
        <h1 className="font-bold text-balance text-[min(10vw,25px)] capitalize">
          Question?
          <span className="text-yellow-800"> Look here.</span>
        </h1>
        <div className="px-3 w-full max-w-6xl flex flex-col text-left gap-y-7 py-5">
          {FAQsQuestionsArray.map(
            ({ question, answer }: FAQsQuestionsProps, index: number) => (
              <motion.div
                variants={XSlideIn(even(index) ? 120 : -120, 0.5, index, 0.5)}
                whileInView={"show"}
                initial={"hidden"}
                key={index}
                className={`py-2 overflow-x-hidden dark:outline outline-1 outline outline-gray-300 dark:outline-gray-600 drop-shadow ${
                  selectedIndex === index
                    ? "rounded-2xl shadow-md bg-yellow-800"
                    : "rounded-lg shadow bg-primary dark:bg-secondary"
                }`}
              >
                <div className="flex px-2 justify-between align-middle items-center">
                  <h1
                    className={`font-bold text-base text-balance ${
                      selectedIndex === index
                        ? " text-primary"
                        : " dark:text-primary"
                    }`}
                  >
                    {question}
                  </h1>

                  <button
                    className={`text-3xl font-bold ${
                      selectedIndex === index
                        ? " text-primary"
                        : "text-blac dark:text-primary"
                    }`}
                    onClick={() => setselectedIndex(index)}
                  >
                    {selectedIndex === index ? <GrSubtract /> : <BsPlus />}
                  </button>
                </div>

                {selectedIndex === index && (
                  <motion.div
                    variants={XSlideIn(-120, 0.1, 0.5, 0.3)}
                    whileInView={"show"}
                    initial={"hidden"}
                    className="pb-2 w-full px-2 bg-yellow-800 text-primary1 transition-all duration-300 rounded-lg text-sm font-semibold "
                  >
                    <p className="opacity-80">{answer}</p>
                  </motion.div>
                )}
              </motion.div>
            )
          )}
        </div>
      </div>

      <div
        className={`w-full pb-5 flex items-center justify-center text-center gap-y-5 px-5 max-[170px]:px-1 bg-primary ${DarkModeClass} py-5`}
      >
        <div className="flex gap-3 py-5 flex-col w-full justify-center items-center">
          <h1 className="font-bold text-balance text-[min(10vw,25px)]">
            Still have a<span className="text-yellow-800"> Question?</span>
          </h1>

          <Link to={"/contact"}>
            <button className="px-5 py-3 font-semibold text-base hover:font-bold bg-secondary dark:bg-primary1 hover:outline hover:outline-secondary hover:bg-transparent dark:hover:outline-primary1 dark:text-secondary text-white rounded-lg hover:dark:bg-transparent hover:dark:text-primary hover:text-secondary hover:rounded-full">
              <p>Contact Us</p>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
