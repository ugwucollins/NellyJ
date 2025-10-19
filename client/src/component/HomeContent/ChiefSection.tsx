import { GrSubtract } from "react-icons/gr";
import { PagenationFun } from "../../context/pagenation";
import { useState } from "react";
import { chiefsArrays } from "../assets";
import { motion } from "framer-motion";
import { buttonClassName, YSlideIn } from "../Animation";
import { production } from "../../context/UserContext";

const ChiefSection = () => {
  return (
    <div className="bg-primary1 max-[170px]:px-1 py-6 px-20 max-md:px-10 max-sm:px-5 dark:text-primary1 min-h-[95vh] dark:bg-secondary">
      <div className="flex flex-col w-full">
        <div className="flex justify-between px-3 flex-wrap pt-10 gap-2 gap-y-4 items-center">
          <h1 className="text-[min(5vw,32px)] font-bold">
            Meet With Our Chiefs
          </h1>

          <button className={buttonClassName}>
            <p>Book An Event</p>
          </button>
        </div>
        <ChiefsCard />
      </div>
    </div>
  );
};

export default ChiefSection;

export const ChiefsCard = () => {
  const [index, setindex] = useState(0);
  const [current, setcurrent] = useState(1);
  const [indexIcon, setindexIcon] = useState(0);
  const [indexBtn, setindexBtn] = useState(0);

  return (
    <div className="pb-0 pt-10 w-full flex-col flex justify-center items-center text-center min-h-[55vh] overflow-hidden">
      <div className="flex gap-6 w-full gap-y-7 flex-wrap items-center justify-center">
        {PagenationFun(chiefsArrays, 4, current).datas.map(
          (item: any, indexs: number) => (
            <motion.div
              key={item.image}
              variants={YSlideIn(-150, 0.5, indexs, production ? 0.5 : 0.8)}
              whileInView={"show"}
              initial={"hidden"}
            >
              <div
                className={`bg-primary dark:bg-primary1/10 dark:text-primary1 drop-shadow rounded-xl hover:shadow-xl hover:drop-shadow-md dark:shadow-primary1/40  w-auto  ${
                  index === indexs
                    ? "px-8 pt-10 pb-5 max-[160px]:p-2 w-auto shadow-lg duration-300 transition-all "
                    : "p-10 py-12 shadow-md max-[160px]:p-2 w-auto"
                }`}
                onClick={() => setindex(indexs)}
              >
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-[220px] object-cover rounded-full"
                  />
                  <div className="pt-5">
                    <h1 className="font-bold uppercase">{item.name}</h1>
                    <span className="opacity-80">{item.experience}</span>
                  </div>

                  {index === indexs ? (
                    <div className="flex w-full flex-wrap items-center gap-2 justify-center pt-7">
                      {item.handle.map((list: any, index: number) => (
                        <div
                          key={index}
                          onClick={() => setindexIcon(index)}
                          className={`text-xl font-bold  rounded-lg ${
                            indexIcon === index
                              ? "bg-yellow-800 p-3 dark:text-primary1  text-primary1 dark:bg-yellow-800"
                              : "bg-primary1 p-2 dark:bg-primary1/20 dark:text-primary "
                          }`}
                        >
                          {list.icon}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
      <div className="flex gap-3 items-center flex-wrap pt-8">
        {PagenationFun(chiefsArrays, 4, current).pages.map(
          (no: any, index: number) => (
            <button
              onClick={() => {
                setcurrent(no);
              }}
              key={index}
            >
              {no && (
                <div
                  onClick={() => setindexBtn(index)}
                  className={`px-3.5 py-1  ${
                    indexBtn === index
                      ? "text-primary1 rounded-2xl bg-yellow-800"
                      : "bg-primary dark:bg-primary1/10"
                  } `}
                >
                  <GrSubtract
                    className={`font-bold  ${
                      indexBtn === index ? "text-primary text-2xl" : "text-xl"
                    }`}
                  />
                </div>
              )}
            </button>
          )
        )}
      </div>
    </div>
  );
};
