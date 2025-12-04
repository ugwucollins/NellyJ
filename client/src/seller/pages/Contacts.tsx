import { motion } from "framer-motion";
import { YSlideIn } from "../../component/Animation";
import HeaderProp from "../../context/HeaderProp";
import { sellerPath } from "../../context/UserContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ContactCard from "../Contact/ContactCard";
import { UserSellerAuth } from "../Context/SellersContext";
import { EmptyItems } from "../../component/ShoppingCart";
import { PiPhoneCall } from "react-icons/pi";

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
  const { contact }: any = UserSellerAuth();

  return (
    <>
      <div className="w-full py-4 pl-2 pr-5 flex gap-5 justify-center items-center flex-wrap flex-row">
        {/* <ContactCard /> */}
        {contact &&
          contact.map((user: any, index: number) => (
            <motion.div
              key={index}
              variants={YSlideIn(100, index, 0.6, 0.8)}
              initial={"hidden"}
              whileInView={"show"}
              className="w-full max-w-xl rounded-xl"
            >
              <ContactCard
                Path={sellerPath}
                imageUrl={user.imageUrl && user.imageUrl}
                linkPath={user._id}
                level={user.status}
                name={user.name}
                number={user.phoneNumber}
                date={user.createdAt}
                email={user.userInfo}
                status={user.contactedBy ? user.contactedBy : null}
              />
            </motion.div>
          ))}
      </div>

      <div className="flex justify-center min-h-[60vh] items-center">
        {!contact && (
          <EmptyItems
            title="No Contact Messages"
            icon={<PiPhoneCall />}
            LinkPath={sellerPath}
            Text="Contiune checking"
          />
        )}
      </div>
    </>
  );
};

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
