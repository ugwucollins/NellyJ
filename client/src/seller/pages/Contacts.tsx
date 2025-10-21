import { motion } from "framer-motion";
import { buttonClassName, YSlideIn } from "../../component/Animation";
import { Assets } from "../../component/assets";
import HeaderProp from "../../context/HeaderProp";
import { sellerPath } from "../../context/UserContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const Contacts = () => {
  return (
    <div>
      <>
        <Navbar />
        <div className="w-full flex mt-[68px] max-sm:mt-0">
          <Sidebar />
          <div className="w-full overflow-y-auto h-[90.6vh] max-[500px]:min-h-screen">
            <div className="w-full sticky top-0 z-[1]">
              <HeaderProp
                LinkText1="Home"
                LinkText2="Contacts"
                AnText="All Contacts"
                LinkPath={sellerPath + "/contact"}
              />
            </div>
            <ListContacts />
          </div>
        </div>
      </>
    </div>
  );
};

export default Contacts;

export const ListContacts = () => {
  return (
    <div className="w-full p-4 flex gap-y-2 flex-col">
      {[1, 1, 1].map((_, index) => (
        <motion.div
          variants={YSlideIn(100, index, 0.6, 0.8)}
          initial={"hidden"}
          whileInView={"show"}
          className="p-4 rounded-3xl shadow-md my-2 dark:bg-slate-800 drop-shadow-sm"
        >
          <div className=" w-full items-center max-sm:flex-col flex justify-between px-1 flex- flex-row">
            <div className="flex w-full items-center justify-start gap-2 py-2">
              <div
                className={`bg-neutral-100 size-16 relative flex justify-center items-center max-[330px]:p-0 rounded-md ${
                  true ? "dark:bg-neutral-600" : "dark:bg-neutral-300"
                }`}
              >
                <img
                  src={Assets.Client2}
                  className="size-10 rounded-md object-cover"
                  alt={"contacted photos"}
                />
              </div>
              <div className="whitespace-nowrap">
                <p className="font-semibold text-base capitalize">
                  {"Ugwu Collins"}
                </p>
                <span className="whitespace-nowrap text-sm font-semibold opacity-60 capitalize">
                  {"ugwucollins@gmail.com"}
                </span>
              </div>
            </div>
            <div className=" w-full flex justify-end max-[300px]:justify-center">
              <Link to={`${index}`}>
                <button className={buttonClassName + " whitespace-nowrap"}>
                  <p>View Message</p>
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
