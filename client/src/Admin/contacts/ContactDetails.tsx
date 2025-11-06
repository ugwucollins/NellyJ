import { useEffect, useState } from "react";
import { ContactArray } from "./ListContact";
import AvaterImage from "../../context/AvaterImage";
import type { ContactCardProp } from "../../seller/Contact/ContactCard";

const ContactDetails = ({ _id }: any | string) => {
  const [ContactInfo, setContactInfo]: ContactCardProp | any = useState({});

  const FetchContactInfo = async () => {
    const filter = ContactArray.find((item) => item._id === _id);
    setContactInfo(filter);
  };

  useEffect(() => {
    FetchContactInfo();
  }, []);

  return (
    <div className="w-full flex justify-center items-center flex-col px-2 py-8">
      <h1 className=" font-bold text-lg dark:py-4">Contact Info</h1>
      <div className="w-full max-w-2xl shadow-lg drop-shadow-md rounded-2xl p-10 outline-none dark:outline-1 dark:outline dark:outline-slate-700">
        <div className="flex w-full items-center justify-center flex-col text-center gap-2 py-2">
          <div
            className={`bg-neutral-100 size-24 relative flex justify-center items-center max-[330px]:p-0 rounded-full ${
              true ? "dark:bg-neutral-600" : "dark:bg-neutral-300"
            }`}
          >
            {ContactInfo && ContactInfo?.userId ? (
              <img
                src={ContactInfo && ContactInfo?.userId?.image}
                className="size-20 rounded-full object-cover"
                alt={"contacted photos"}
              />
            ) : (
              <AvaterImage size="20" />
            )}
          </div>
          <div className="whitespace-nowrap">
            <p className="font-semibold text-base capitalize">
              {ContactInfo && ContactInfo.name}
            </p>
            <span className="whitespace-nowrap text-sm font-semibold opacity-60 capitalize">
              {ContactInfo && ContactInfo.email}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-y-4 w-full">
          <div className=" w-full text-end">
            <h1 className="font-semibold text-lg underline capitalize py-1">
              Subject/Title:
            </h1>
            <p className="font-bold text-balance opacity-80">
              {ContactInfo && ContactInfo?.subject}
            </p>
          </div>
          <div>
            <h1 className="font-semibold text-lg py-1 underline capitalize">
              Message:
            </h1>
            <p className="font-bold text-balance opacity-80 ">
              {ContactInfo && ContactInfo?.message}
            </p>
          </div>
        </div>

        <div className="flex items-center w-full justify-end pt-4">
          <p
            className={`text-sm font-semibold capitalize w-auto p-2  rounded-full outline outline-1 text-black
               ${
                 ContactInfo && ContactInfo?.userId
                   ? "bg-green-300  outline-green-800"
                   : "bg-yellow-200  outline-yellow-800"
               }
                 `}
          >
            {ContactInfo && ContactInfo?.userId
              ? "Active customer"
              : "guest Visitor"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
