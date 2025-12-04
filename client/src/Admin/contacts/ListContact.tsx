import { motion } from "framer-motion";
import { YSlideIn } from "../../component/Animation";
import ContactCard from "../../seller/Contact/ContactCard";
import { adminPath } from "../../context/UserContext";
import { UserSellerAuth } from "../../seller/Context/SellersContext";
import { EmptyItems } from "../../component/ShoppingCart";
import { PiPhoneCall } from "react-icons/pi";

const ListContact = () => {
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
                Path={adminPath}
                imageUrl={user.imageUrl && user.imageUrl}
                linkPath={user._id}
                name={user.name}
                level={user.status}
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
            LinkPath={adminPath}
            Text="Contiune checking"
          />
        )}
      </div>
    </>
  );
};

export default ListContact;
