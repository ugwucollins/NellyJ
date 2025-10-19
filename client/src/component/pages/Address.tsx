import toast from "react-hot-toast";
import InputField from "../../context/InputField";
import type { AddressProp } from "../../context/Types";
import { buttonClassName } from "../Animation";
import { useState } from "react";
import { UserAuth } from "../../context/UserContext";
import {
  DarkModeClass,
  FeatureArryMap,
} from "../HomeContent/HomeExportComponent";
import HeaderProp from "../../context/HeaderProp";
import CheckOutCard from "../../context/CheckOutCard";
import SelectField from "../../context/SelectField";
import { Countries, States } from "../assets";

const Address = () => {
  return (
    <div>
      <HeaderProp
        AnText="Checkout"
        LinkPath=""
        LinkText1="Home"
        className="pb-10"
        LinkText2="profile"
      />

      <div className="w-full px-20 max-md:px-14 max-sm:px-5 max-[170px]:px-1">
        <div className="flex w-full gap-y-7 justify-center items-start gap-x-5 py-10 flex-row max-sm:flex-col">
          <AddaddressCom />
          <CheckOutCard LinkPath={""} />
        </div>
      </div>

      <div
        className={`w-full overflow-hidden px-10 max-[170px]:px-1 max-[690px]:px-10 pb-3 relative z-[2] ${DarkModeClass}`}
      >
        <FeatureArryMap />
      </div>
    </div>
  );
};

const AddaddressCom = () => {
  const { UsersAddress, Addaddress }: any = UserAuth();
  const [formData, setformData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    country: "Nigeria",
    city: "",
    state: "",
    address: "",
    phone: "",
    email: "",
  });
  const [show, setshow] = useState(false);
  const [ActiveIndex, setActiveIndex] = useState(0);
  const [ActiveAddress, setActiveAddress]: any = useState({});

  const HandleChange = (e: any) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubumit = (e: any) => {
    e.preventDefault();
    if (show) {
      toast.success("Add Address Succssfully");
      Addaddress(formData);
      setshow(!show);
      setformData({
        title: "",
        firstName: "",
        lastName: "",
        country: "Nigeria",
        city: "",
        state: "",
        address: "",
        phone: "",
        email: "",
      });
    } else {
      setshow(!show);
      console.log(ActiveAddress);
    }
  };

  return (
    <div className="w-full">
      <div className="flex hover:shadow-lg hover:rounded-xl transition-all duration-150 hover:drop-shadow-sm  flex-col outline-1 rounded-md shadow py-1.5 px-2 outline-slate-400 outline mb-4">
        {UsersAddress.sort((a: any, b: any) => b._id - a._id).map(
          (item: AddressProp, index: number) => {
            // const even = index % 2 === 0;
            return (
              <div key={index}>
                <div className="w-full flex justify-between items-center">
                  <address>
                    <h1 className="text-base font-bold">{item.title}</h1>
                    <div className="pb-2">
                      {item.address}, {item.city},{" "}
                      {item.state.split(" " + "State")}
                      {""} State
                    </div>
                  </address>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => {
                        setActiveIndex(index);
                        setActiveAddress(item);
                      }}
                      className="px-4 cursor-pointer py-3 font-semibold hover:font-bold text-base"
                    >
                      <div
                        className={` rounded-full  ${
                          ActiveIndex === index
                            ? "bg-yellow-800 size-[17px] ring-2 dark:ring-white ring-slate-200"
                            : "bg-transparent dark:ring-white ring-neutral-600 ring-2 size-3.5"
                        } `}
                      />
                    </button>
                  </div>
                </div>

                <hr className="my-1.5 outline-1 outline outline-slate-300" />
              </div>
            );
          }
        )}
        {!UsersAddress.length && (
          <div className=" w-full flex justify-center text-center text-red-800 py-10 animate-bounce font-bold text-xl">
            No Address
          </div>
        )}
      </div>

      <div
        className={
          !show
            ? "flex items-center flex-row justify-between px-4 max-sm:px-1"
            : "flex-col"
        }
      >
        <h1
          className={`py-4 text-[min(5vw,18px)] ${
            !show ? "font-bold" : "font-semibold"
          } `}
        >
          Add New Address
        </h1>

        <form onSubmit={handleSubumit}>
          {show && (
            <>
              <div className="w-full flex flex-row gap-4 max-[500px]:flex-col">
                <InputField
                  label="FirstName*"
                  type="text"
                  onChange={HandleChange}
                  name="firstName"
                  placeholder="Ex. John"
                  value={formData.firstName}
                />
                <InputField
                  label="LastName*"
                  type="text"
                  onChange={HandleChange}
                  name="lastName"
                  placeholder="Ex. Doe"
                  value={formData.lastName}
                />
              </div>

              <div className="flex flex-col gap-y-3.5 py-4">
                <InputField
                  label="title*"
                  type="text"
                  onChange={HandleChange}
                  name="title"
                  placeholder="Main Address"
                  value={formData.title}
                />

                <InputField
                  label="Street Address*"
                  type="text"
                  onChange={HandleChange}
                  name="address"
                  placeholder="Enter Street address"
                  value={formData.address}
                />
                <InputField
                  label="city*"
                  type="text"
                  onChange={HandleChange}
                  name="city"
                  placeholder="owerri"
                  value={formData.city}
                />

                <SelectField
                  label="State"
                  onChange={HandleChange}
                  options={States}
                  name="state"
                  value={formData.state}
                />
                <SelectField
                  label="Country"
                  onChange={HandleChange}
                  options={Countries}
                  name="country"
                  value={formData.country}
                />
                <InputField
                  label="phone*"
                  type="tel"
                  onChange={HandleChange}
                  name="phone"
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                />
                <InputField
                  label="email*"
                  type="email"
                  onChange={HandleChange}
                  name="email"
                  placeholder="Enter Email address"
                  value={formData.email}
                />
              </div>
            </>
          )}

          <div className="py-4">
            <button className={`outline-1 ${buttonClassName}`}>
              <p>{"Add Address"}</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Address;
