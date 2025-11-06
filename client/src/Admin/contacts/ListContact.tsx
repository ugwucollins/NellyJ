import { motion } from "framer-motion";
import { YSlideIn } from "../../component/Animation";
import ContactCard from "../../seller/Contact/ContactCard";
import { Assets } from "../../component/assets";

const ListContact = () => {
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

export default ListContact;
