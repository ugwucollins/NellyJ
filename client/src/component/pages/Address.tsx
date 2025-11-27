import toast from "react-hot-toast";
import { ZodInputField } from "../../context/InputField";
import type { AddressProp } from "../../context/Types";
import { buttonClassName } from "../Animation";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { UserAuth } from "../../context/UserContext";
import {
  DarkModeClass,
  FeatureArryMap,
} from "../HomeContent/HomeExportComponent";
import HeaderProp from "../../context/HeaderProp";
import CheckOutCard from "../../context/CheckOutCard";
import { ZodSelectField } from "../../context/SelectField";
import { Countries, States } from "../assets";
import { UserAuthInfo } from "../../App";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSchema } from "../../Zod/Schema/Schemas";
import type { AddressField } from "../../Zod/typesField";
import ApiURL from "../../context/Api";
import { BiLoaderCircle } from "react-icons/bi";

const Address = () => {
  const { user }: any = UserAuthInfo();
  const { UsersAddress }: any = UserAuth();

  const [ActiveAddress, setActiveAddress]: any = useState<string>(
    UsersAddress[0]._id
  );
  useEffect(() => {
    const handleUnReLoad = (e: BeforeUnloadEvent) => {
      if (user) {
        e.returnValue = "";
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleUnReLoad);

    return () => {
      window.removeEventListener("beforeunload", handleUnReLoad);
    };
  }, [user]);

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
          <AddaddressCom setActiveAddress={setActiveAddress} />
          <CheckOutCard LinkPath={""} index={ActiveAddress} />
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

const AddaddressCom = ({ setActiveAddress }: any) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(AddressSchema),
  });
  const { UsersAddress, options, Addaddress }: any = UserAuth();
  const { user }: any = UserAuthInfo();

  const [show, setshow] = useState(false);
  const [ActiveIndex, setActiveIndex] = useState(0);

  const emptyForm = () => {
    setValue("title", "");
    setValue("firstName", "");
    setValue("lastName", "");
    setValue("country", "");
    setValue("city", "");
    setValue("state", "");
    setValue("address", "");
    setValue("phoneNumber", "");
    setValue("email", "");
    setValue("nearestBusTop", "");
  };

  const onSubmit: SubmitHandler<AddressField> = async (data) => {
    const info = {
      title: data.title,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      email: data.email,
      phoneNumber: data.phoneNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      nearestBusTop: data.nearestBusTop,
      createdBy: user && user._id,
    };
    try {
      const res = await ApiURL.post("/v1/user/address/create", info, options);
      const UserData = res.data;

      if (UserData.success) {
        toast.success(UserData.message || "Address Added Successfully");
        Addaddress(data);
        setTimeout(() => {
          emptyForm();
          setshow(!show);
        }, 1000);
      } else {
        toast.error(UserData.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setError("root", {
        message: error.response.data.message || error.message,
      });
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
                        setActiveAddress(item._id);
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

        <form onSubmit={handleSubmit(onSubmit)}>
          {show && (
            <>
              <div className="w-full flex flex-row gap-4 max-[500px]:flex-col">
                <ZodInputField
                  label="FirstName*"
                  type="text"
                  error={errors.firstName?.message}
                  placeholder="Ex. John"
                  value={register("firstName")}
                />
                <ZodInputField
                  label="LastName*"
                  type="text"
                  error={errors.lastName?.message}
                  placeholder="Ex. Doe"
                  value={register("lastName")}
                />
              </div>

              <div className="flex flex-col gap-y-3.5 py-4">
                <ZodInputField
                  label="title*"
                  type="text"
                  error={errors.title?.message}
                  placeholder="Main Address"
                  value={register("title")}
                />

                <ZodSelectField
                  label="Country"
                  error={errors.country?.message}
                  options={Countries}
                  value={register("country")}
                />
                <ZodInputField
                  label="Street Address*"
                  error={errors.address?.message}
                  type="text"
                  placeholder="Enter Street address"
                  value={register("address")}
                />
                <ZodInputField
                  label="city*"
                  type="text"
                  error={errors.city?.message}
                  placeholder="owerri"
                  value={register("city")}
                />
                <ZodInputField
                  label="NearestBusTop*"
                  type="text"
                  error={errors.nearestBusTop?.message}
                  placeholder="MCC Junction"
                  value={register("nearestBusTop")}
                />

                <ZodSelectField
                  label="state"
                  error={errors.state?.message}
                  options={States}
                  value={register("state")}
                />
                <ZodInputField
                  label="phone*"
                  type="tel"
                  error={errors.phoneNumber?.message}
                  placeholder="Enter Phone Number"
                  value={register("phoneNumber")}
                />
                <ZodInputField
                  label="email*"
                  type="email"
                  error={errors?.email?.message}
                  placeholder="Enter Email address"
                  value={register("email")}
                />
              </div>

              {errors.root && (
                <span className="text-base text-red-500 font-semibold">
                  {errors.root.message}
                </span>
              )}
            </>
          )}
          {show ? (
            <div className="py-4">
              <button type="submit" className={`outline-1 ${buttonClassName}`}>
                {isSubmitting ? (
                  <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
                ) : (
                  <p>Add Address</p>
                )}
              </button>
            </div>
          ) : (
            <div className="py-4">
              <div
                onClick={() => setshow(!show)}
                className={`outline-1 ${buttonClassName}`}
              >
                <p>Add Address</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Address;
