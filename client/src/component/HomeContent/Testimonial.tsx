import { useState } from "react";
import TextAnimation, { YSlideIn } from "../Animation";
import { Assets, Testimonials } from "../assets";
import { PagenationFun } from "../../context/pagenation";
import { DarkModeClass } from "./HomeExportComponent";
import { motion } from "framer-motion";

const Testimonial = () => {
  return (
    <div
      className={`min-h-[90vh] w-full py-10 px-20 max-md:px-10 max-sm:px-5 max-[170px]:px-1 ${DarkModeClass}`}
    >
      <div className="flex flex-col justify-center text-center w-full  items-center">
        <div className="w-full text-center pt-3 flex items-center justify-center flex-col">
          {TextAnimation(
            "-- Our Testimonials --",
            10,
            0.3,
            "flex  gap-1 flex-row px-8 ",
            "text-[min(2vw,13px)] font-bold"
          )}
          <h1 className="pb-4">
            {TextAnimation(
              "What  Our Clients  Say",
              -20,
              0.2,
              "flex  gap-1 flex-wrap text-balance",
              "text-[min(10vw,33px)] text-balance font-bold"
            )}
          </h1>
        </div>
        <TestimonialCard />
      </div>
    </div>
  );
};

export default Testimonial;

export const TestimonialCard = () => {
  const [current, setcurrent] = useState(1);
  const [indexBtn, setindexBtn] = useState(0);
  return (
    <div className="py-6">
      <div className="flex pt-4 pb-14 flex-wrap items-center justify-center gap-8">
        {PagenationFun(Testimonials, 2, current).datas.map(
          (client: any, index: number) => (
            <motion.div
              key={index}
              variants={YSlideIn(150, 1, index ? index : 0.5, 0.5)}
              whileInView={"show"}
              initial={"hidden"}
            >
              <div className="bg-primary1 dark:bg-secondary dark:shadow-lg dark:shadow-primary1/15 dark:drop-shadow-lg shadow-md drop-shadow-md hover:shadow-lg hover:drop-shadow-xl rounded-2xl hover:rounded-3xl transition-all w-full max-w-md">
                <div className="w-full flex max-[280px]:flex-wrap gap-4">
                  <div className="relative px-5 w-full max-w-[120px]">
                    <div className="absolute w-full rounded-r-full z-0 h-full top-0 left-0 bg-yellow-800" />
                    <div className="z-[1] relative py-4">
                      <img
                        src={client.image}
                        alt={client.name}
                        className="size-20 object-cover rounded-full ring-4 ring-primary"
                      />
                    </div>
                  </div>
                  <div className="flex max-sm:gap-2 justify-between pr-4 w-full items-center">
                    <div>
                      <h1 className="font-bold text-lg pb-2 text-left">
                        {client.name}
                      </h1>
                      <div className="flex flex-wrap gap-1 items-center">
                        <div className="flex text-yellow-800 text-xl">
                          {client.icon}
                        </div>
                        <p className="font-bold">
                          {client.rating.toString().length === 1
                            ? `${client.rating}.0`
                            : client.rating}
                        </p>
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
                <div className="px-4 pb-6 pt-3.5 text-left font-semibold text-gray-600 dark:text-gray-400">
                  {client.comment}.
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
      <div className="w-full bg-primary1/30 dark:bg-primary1/10 flex flex-wrap justify-center items-center gap-1">
        {PagenationFun(Testimonials, 2, current).pages.map(
          (no: number | any, index: number) => (
            <div key={no}>
              {no && (
                <div
                  onClick={() => {
                    setcurrent(no);
                    setindexBtn(index);
                  }}
                  className={`w-10 h-1 cursor-pointer rounded-3xl  ${
                    indexBtn === index
                      ? "bg-yellow-800"
                      : "bg-gray-400 dark:bg-primary1 shadow-md"
                  }`}
                />
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};
