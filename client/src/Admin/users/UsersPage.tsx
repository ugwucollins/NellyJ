import { Assets, DummyAddress } from "../../component/assets";
import { adminPath } from "../../context/UserContext";
import { RealValues } from "../../seller/Context/RealValues";
import UsersCard from "./UsersCard";

const UsersPage = () => {
  const { customersDetails } = RealValues();

  return (
    <div>
      <div className="flex py-5 flex-wrap gap-5 justify-center items-center">
        {customersDetails &&
          customersDetails.map((user: any, index) => (
            <UsersCard
              key={index}
              imageUrl={user.imageUrl}
              linkPath={user._id}
              email={user.email}
              createdAt={user.createdAt}
              number={user.phoneNumber}
              status={user.status}
              name={user.name}
              Path={adminPath}
            />
          ))}
      </div>
    </div>
  );
};

export default UsersPage;

export const UsersArray = [
  {
    _id: 1,
    name: "John Doe",
    email: "johndoe@gmail.com",
    PhoneNumber: "234567890",
    createdAt: new Date(),
    imageUrl: Assets.Client1,
    month: "June",
    year: "2022",
    address: DummyAddress[2],
  },
  {
    _id: 2,
    name: "Jane Juice",
    email: "janedoe@gmail.com",
    PhoneNumber: "234567891",
    createdAt: new Date(),
    imageUrl: Assets.Client3,
    month: "May",
    year: "2022",
    address: DummyAddress[1],
  },
  {
    _id: 3,
    name: "Collins Doe",
    email: "Collinsdoe@gmail.com",
    PhoneNumber: "234567890",
    createdAt: new Date(),
    imageUrl: Assets.Client4,
    month: "June",
    year: "2022",
    address: DummyAddress[0],
  },
];
