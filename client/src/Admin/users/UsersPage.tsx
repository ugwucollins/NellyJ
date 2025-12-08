import { useEffect, useState } from "react";
import InputField from "../../context/InputField";
import { adminPath } from "../../context/UserContext";
import UsersCard from "./UsersCard";
import { EmptyItems } from "../../component/ShoppingCart";
import { TbUserSearch } from "react-icons/tb";
import { UserAdminAuth } from "../context/AdminContext";
import Loader from "../../context/Loader";

const UsersPage = () => {
  const { customers }: any = UserAdminAuth();
  const [findCustomer, setFindCustomer] = useState([]);
  const [search, setSearch] = useState<string>("");

  function handleChange(e: any) {
    setSearch(e.target.value);
  }

  function handleFind() {
    const filter = customers.filter(
      (item: any) =>
        item.lastName
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        item.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        item.firstName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setFindCustomer(filter);
  }

  useEffect(() => {
    setTimeout(() => {
      handleFind();
    }, 1000);
  }, [search]);

  return (
    <div>
      {customers && (
        <div className="w-full flex justify-end max-sm:justify-start items-end">
          <div className="pr-10 w-80 pt-4 pl-4">
            <InputField
              onChange={handleChange}
              value={search}
              name="search"
              placeholder="Search User by Name or Email"
              type="text"
              className="rounded-lg shadow-lg"
              label="Search Customer*"
            />
          </div>
        </div>
      )}

      {!findCustomer.length && (
        <div className="flex justify-center min-h-[50vh] items-center">
          <div>
            <Loader className="w-20" size="size-16" />
          </div>
        </div>
      )}

      <div className="flex py-5 flex-wrap gap-5 justify-center items-center">
        {findCustomer &&
          findCustomer.map((user: any, index: number) => (
            <UsersCard
              key={index}
              imageUrl={user.imageUrl}
              linkPath={user._id}
              email={user.email}
              createdAt={user.createdAt}
              number={user.phoneNumber}
              status={user.status}
              name={user.lastName + " " + user.firstName}
              Path={adminPath}
            />
          ))}

        <div className="flex justify-center min-h-[12vh] items-center">
          {!customers && (
            <div>
              <EmptyItems
                title="No Available Users"
                icon={<TbUserSearch />}
                LinkPath={adminPath}
                Text="Contiune checking"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
  // return (
  //   <div>
  //     {customersDetails ||
  //       (customersDetails.length && (
  //         <div className="w-full flex justify-end items-end">
  //           <div className="pr-10 w-80">
  //             <InputField
  //               onChange={handleChange}
  //               value={search}
  //               name="search"
  //               placeholder="Search User by Name or Email"
  //               type="text"
  //               className="rounded-lg"
  //               label="Search"
  //             />
  //           </div>
  //         </div>
  //       ))}

  //     <div className="flex py-5 flex-wrap gap-5 justify-center items-center">
  //       {customersDetails &&
  //         customersDetails.map((user: any, index: number) => (
  //           <UsersCard
  //             key={index}
  //             imageUrl={user.imageUrl}
  //             linkPath={user._id}
  //             email={user.email}
  //             createdAt={user.createdAt}
  //             number={user.phoneNumber}
  //             status={user.status}
  //             name={user.lastName + " " + user.firstName}
  //             Path={adminPath}
  //           />
  //         ))}
  //       <div className="flex justify-center min-h-[12vh] items-center">
  //         {!customersDetails ||
  //           (!customersDetails.length && (
  //             <>
  //               <EmptyItems
  //                 title="No Available Users"
  //                 icon={<TbUserSearch />}
  //                 LinkPath={adminPath}
  //                 Text="Contiune checking"
  //               />
  //             </>
  //           ))}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default UsersPage;
