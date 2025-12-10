import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserAdminAuth } from "../context/AdminContext";
import { BiPlus, BiX } from "react-icons/bi";
import Modal from "../../context/Modal";
import DateFormater from "../../context/DateFormat";
import { EmptyItems } from "../../component/ShoppingCart";
import { TbUsersPlus } from "react-icons/tb";
import { buttonClassName } from "../../component/Animation";
import { Link } from "react-router-dom";
import CreateSeller, { ModelForm } from "./CreateSeller";
import ApiURL from "../../context/Api";
import { UserAuth } from "../../context/UserContext";
import { Assets } from "../../component/assets";
import InputField from "../../context/InputField";
import Loader from "../../context/Loader";

const SellersTable = () => {
  const [open, setOpen] = useState(false);
  const { sellers }: any = UserAdminAuth();

  function handleClose() {
    setOpen(!open);
  }
  return (
    <>
      <div className=" w-full px-4 py-5">
        <div className="flex justify-between max-sm:justify-end items-center">
          <h1 className="text-lg font-bold capitalize max-sm:hidden">
            All sellers <span>({sellers && sellers.length})</span>
          </h1>
          <Link to={``}>
            <button
              onClick={() => setOpen(!open)}
              className={`ml-2 whitespace-nowrap ${buttonClassName}`}
            >
              <div className="flex gap-0.5 items-center text-center">
                <BiPlus className="text-xl pt-1" />
                <p>Create Seller</p>
              </div>
            </button>
          </Link>
        </div>
        <AllSellersTable />
      </div>
      {open && (
        <ModelForm onClose={handleClose}>
          <CreateSeller />
        </ModelForm>
      )}
    </>
  );
};

export const AllSellersTable = () => {
  const { sellers, setSellers, GetAllSellers }: any = UserAdminAuth();
  const { options }: any = UserAuth();

  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState("");
  const [findSellers, setFindSellers] = useState([]);
  const [search, setSearch] = useState<string>("");

  function handleChange(e: any) {
    setSearch(e.target.value);
  }

  function handleFind() {
    const filter =
      sellers &&
      sellers.filter(
        (item: any) =>
          item.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          item.firstName
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          item.lastName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    setFindSellers(filter);
  }

  useEffect(() => {
    setTimeout(() => {
      handleFind();
    }, 1000);
  }, [search]);

  const HandleClose = () => {
    setOpen(!open);
  };

  const HandleDelete = async (itemId: any) => {
    const filter = sellers.filter((item: any) => item._id !== itemId);
    try {
      const res = await ApiURL.put(
        "/user/update/status/" + itemId,
        { status: "passed" },
        options
      );
      const data = res.data;
      if (data.success) {
        setSellers(filter);
        GetAllSellers();
      }
    } catch (error) {}
  };

  const HandleActionModal = () => {
    HandleDelete(itemId);
    toast.success("Seller Delete successfully", { id: "delete" });
    setItemId("");
    HandleClose();
  };

  return (
    <>
      {open && (
        <Modal
          OkayBtn="Yes"
          Title="Are you sure that you want to Delete these Seller"
          CancelBtn="No"
          Progress={HandleActionModal}
          Cancel={HandleClose}
        />
      )}

      <div className="w-full overflow-hidden gap-8 py-10 flex items-center flex-col justify-center px-16 max-md:px-10 mb-5 max-sm:px-8 max-[200px]:px-1 max-[750px]:flex-col">
        <div className="flex w-full gap-y-7  items-center justify-center gap-x-2 flex-row max-sm:flex-col">
          <div className="overflow-hidden  w-full">
            {sellers && (
              <div className="w-full flex justify-end max-sm:justify-start items-end">
                <div className="pr-10 w-80 pt-4 pl-4">
                  <InputField
                    onChange={handleChange}
                    value={search}
                    name="search"
                    placeholder="Search sellers by email, firstName or Email"
                    type="text"
                    className="rounded-lg shadow-lg"
                    label="Search Sellers*"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 overflow-auto px-2 py-2">
              <table className="w-full overflow-auto">
                <thead className="text-left bg-yellow-700 px-4 py-6 capitalize h-10 rounded-3xl w-full">
                  <tr>
                    <th className="pl-2">Name</th>
                    <th>phoneNumber</th>
                    <th className="pl-2.5">Date Added</th>
                    <th>Status</th>
                    <th className="pr-4 text-end">Action</th>
                  </tr>
                </thead>
                <tbody className="w-full overflow-x-auto">
                  {findSellers &&
                    findSellers.map((item: any, index: number) => {
                      const even = index % 2 === 0;

                      return (
                        <tr key={index}>
                          <td className="pr-4">
                            <div className="flex w-full items-center justify-start gap-2 py-2">
                              <BiX
                                className="text-3xl cursor-pointer"
                                onClick={() => {
                                  HandleClose();
                                  setItemId(item._id);
                                }}
                              />
                              <div
                                className={`bg-neutral-100  p-4 rounded-md w-20 ${
                                  even
                                    ? "dark:bg-neutral-600"
                                    : "dark:bg-neutral-300"
                                }`}
                              >
                                <img
                                  src={
                                    item.imageUrl
                                      ? item.imageUrl
                                      : Assets.seller
                                  }
                                  className="size-12 rounded-md object-cover"
                                  alt={`${item.firstName} photo`}
                                  loading="lazy"
                                />
                              </div>
                              <div className="whitespace-nowrap">
                                <p
                                  className={`font-semibold text-base capitalize ${
                                    item.status !== "active" && "line-through"
                                  } `}
                                >
                                  {item.firstName} {item.lastName}
                                </p>
                                <span
                                  className={`text-sm font-semibold opacity-60 capitalize`}
                                >
                                  Status: {item.status}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="pr-4">
                            <div className="flex gap-0.5 items-center font-semibold text-base w-full whitespace-nowrap">
                              <span> {item.phoneNumber}</span>
                            </div>
                          </td>

                          <td className="pr-4 pl-2">
                            <div className=" opacity-80 capitalize font-semibold text-base whitespace-nowrap">
                              {DateFormater({
                                date: item && item.createdAt,
                                monthType: "short",
                              })}
                            </div>
                          </td>

                          <td className="pr-1 max-sm:pr-10  pl-2 whitespace-nowrap">
                            <div className="font-semibold text-base whitespace-nowrap">
                              <span
                                className={`text-base font-semibold capitalize whitespace-nowrap ${
                                  item.status !== "active" && "text-red-800"
                                } `}
                              >
                                {item.status}
                              </span>
                              {/* <span
                            className={`${
                              item.instock ? "text-teal-800" : "text-red-800"
                            }`}
                          >
                            {item.instock ? "Instock" : "OutStock"}
                          </span> */}
                            </div>
                          </td>

                          <td className="pl-2 text-end pr-1">
                            <div className="w-full whitespace-nowrap">
                              <Link to={`${item._id}`}>
                                <button
                                  disabled={item.status === "passed"}
                                  className={`ml-2 whitespace-nowrap disabled:opacity-90 disabled:line-through ${buttonClassName}`}
                                >
                                  <p>View Details</p>
                                </button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              {!findSellers.length && (
                <div className="flex justify-center min-h-[50vh] items-center">
                  <div>
                    <Loader className="w-20" size="size-16" />
                  </div>
                </div>
              )}

              {!sellers.length && (
                <EmptyItems
                  title="No Sellers"
                  icon={<TbUsersPlus />}
                  LinkPath="/sellers"
                  Text="Create A Seller"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellersTable;
