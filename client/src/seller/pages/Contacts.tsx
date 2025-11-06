import { motion } from "framer-motion";
import { YSlideIn } from "../../component/Animation";
import { Assets } from "../../component/assets";
import HeaderProp from "../../context/HeaderProp";
import { sellerPath } from "../../context/UserContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ContactCard from "../Contact/ContactCard";

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
    <div className="w-full py-4 pl-2 pr-5 flex gap-5 justify-center items-center flex-wrap flex-row">
      {/* <ContactCard /> */}
      {ContactArray.map((user, index) => (
        <motion.div
          key={index}
          variants={YSlideIn(100, index, 0.6, 0.8)}
          initial={"hidden"}
          whileInView={"show"}
          className="w-full max-w-xl rounded-xl"
        >
          <ContactCard
            imageUrl={user.userId && user.userId?.image}
            linkPath={user._id}
            name={user.name}
            number={user.number}
            date={user.createdAt}
            email={user.email}
            status={user.userId ? user.userId?._id : null}
          />
        </motion.div>
      ))}
    </div>
  );
};
const date = new Date();

export const ContactArray = [
  {
    _id: "1234",
    name: "Ugwu collins",
    email: "ugwucollins@gmail.com",
    subject: "Auth Failed",
    message: `i don't how this is doing`,
    userId: {
      _id: "63536",
      name: "Tony Collins",
      image: Assets.Client2,
    },
    createdAt: date,
    number: 8101245121,
  },
  {
    _id: "123428",
    name: "Tony collins",
    email: "ugwutony@gmail.com",
    subject: "Users Login and Orders Failed ",
    message: `i don't how this is doing the form is not working with the order Booking`,
    userId: null,
    createdAt: date,
    number: 8101499121,
  },
  {
    _id: "1242856",
    name: "Baby Juliet",
    email: "babyJuliet@gmail.com",
    subject: "Users Login Failed",
    message: `i don't how this is doing the form is not working`,
    userId: {
      _id: "6353666",
      name: "Tony Collins",
      image: Assets.Client3,
    },
    createdAt: date,
    number: 8101465121,
  },
];

{
  /* <div className=" w-full items-center max-sm:flex-col flex justify-between px-1 flex- flex-row">
         <div className="w-full">
              <div className="flex w-full items-center justify-start gap-2 py-2">
                <div
                  className={`bg-neutral-100 size-16 relative flex justify-center items-center max-[330px]:p-0 rounded-md ${
                    true ? "dark:bg-neutral-600" : "dark:bg-neutral-300"
                  }`}
                >
                 <img
                  src={Assets.Avater}
                  className="size-10 rounded-md object-cover"
                  alt={"contacted photos"}
                /> *
                  <AvaterImage size="12" />
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
              <div></div>
            </div>

            <div className=" w-full flex justify-end max-[300px]:justify-center">
              <Link to={`${index}`}>
                <button className={buttonClassName + " whitespace-nowrap"}>
                  <p>View Message</p>
                </button>
              </Link>
            </div>
          </div>*/
}
