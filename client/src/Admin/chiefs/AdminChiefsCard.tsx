import { GrSubtract } from "react-icons/gr";
import { PagenationFun } from "../../context/pagenation";
import { useState } from "react";
import { motion } from "framer-motion";
import { YSlideIn } from "../../component/Animation";
import { adminPath, production } from "../../context/UserContext";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";
import { BsPencilFill, BsTwitter } from "react-icons/bs";
import { UserAdminAuth } from "../context/AdminContext";
import { EmptyItems } from "../../component/ShoppingCart";
import { GiCook } from "react-icons/gi";
import { Link } from "react-router-dom";

const AdminChiefsCard = () => {
  const [index, setindex] = useState(0);
  const [current, setcurrent] = useState(1);
  const [indexIcon, setindexIcon] = useState(0);
  const [indexBtn, setindexBtn] = useState(0);
  const { teams }: any = UserAdminAuth();

  return (
    <div className="pb-0 pt-10 w-full flex-col flex justify-center items-center text-center min-h-[55vh] overflow-hidden">
      <div className="flex gap-6 w-full gap-y-7 flex-wrap items-center justify-center">
        {PagenationFun(teams, 4, current).datas.map(
          (item: any, indexs: number) => (
            <motion.div
              key={indexs}
              variants={YSlideIn(-150, 0.5, indexs, production ? 0.5 : 0.8)}
              whileInView={"show"}
              initial={"hidden"}
              className="relative"
            >
              <div
                className={`bg-primary dark:bg-primary1/10 dark:text-primary1 drop-shadow rounded-xl hover:shadow-xl hover:drop-shadow-md dark:shadow-primary1/40 relative overflow-hidden  w-auto  ${
                  index === indexs
                    ? "px-8 pt-10 pb-5 max-[160px]:p-2 w-auto shadow-lg duration-300 transition-all "
                    : "p-10 py-12 shadow-md max-[160px]:p-2 w-auto"
                }`}
                onClick={() => setindex(indexs)}
              >
                <Link to={item?._id} className=" absolute top-0 right-0">
                  <div className=" p-4 bg-gray-50 cursor-pointer hover:scale-105 hover:text-yellow-800 hover:bg-gray-100 transition-all hover:backdrop-blur-none backdrop-blur-md border border-white rounded-lg">
                    <BsPencilFill />
                  </div>
                </Link>
                <div>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                    className="size-[220px] object-cover rounded-full ring-2 ring-yellow-800"
                  />
                  <div className="pt-5">
                    <h1 className="font-bold uppercase">{item.name}</h1>
                    <div>
                      <p className="opacity-80">{item?.email}</p>
                      <span className="opacity-80 font-semibold">
                        {item.experience === 1
                          ? item.experience + " Year experience"
                          : item.experience + " Years experience"}
                      </span>
                    </div>
                  </div>

                  {index === indexs ? (
                    <div className="flex w-full flex-wrap items-center gap-2 justify-center pt-7">
                      {/* {item.handle.map((list: any, index: number) => (
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
                      ))} */}
                      {Social.map((list, index: number) => (
                        <div
                          key={index}
                          onClick={() => setindexIcon(index)}
                          className={`text-xl font-bold  rounded-lg ${
                            indexIcon === index
                              ? "bg-yellow-800 p-3 dark:text-primary1  text-primary1 dark:bg-yellow-800"
                              : "bg-primary1 p-2 dark:bg-primary1/20 dark:text-primary "
                          }`}
                        >
                          {list}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  className={` rounded h-1 w-full absolute bottom-0 left-0 ${
                    item.status === "active" ? "bg-green-800" : "bg-yellow-800"
                  }`}
                />
              </div>
            </motion.div>
          )
        )}
      </div>

      <div className="flex gap-3 items-center flex-wrap pt-8">
        {PagenationFun(teams, 4, current).pages.map(
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

      {teams.length === 0 && (
        <EmptyItems
          title="No Active Team/Members"
          icon={<GiCook />}
          LinkPath={adminPath + "/teams"}
          Text="Create a Team"
        />
      )}
    </div>
  );
};

export default AdminChiefsCard;

export const Social = [
  <FaFacebook />,
  <ImInstagram />,
  <BsTwitter />,
  <FaWhatsapp />,
];
