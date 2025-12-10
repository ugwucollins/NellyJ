import { useEffect, useState } from "react";
import AvaterImage from "../../context/AvaterImage";
import type { ContactCardProp } from "../../seller/Contact/ContactCard";
import SelectField from "../../context/SelectField";
import ApiURL from "../../context/Api";
import { adminPath, UserAuth } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { OPTIONPROP } from "../../context/Types";
import { buttonClassName } from "../../component/Animation";
import { BiLoaderCircle } from "react-icons/bi";
import { UserSellerAuth } from "../../seller/Context/SellersContext";

const ContactDetails = ({ _id }: any | string) => {
  const [ContactInfo, setContactInfo]: ContactCardProp | any = useState({});
  const { contact, GetAllContactHandler }: any = UserSellerAuth();

  const { options }: any = UserAuth();
  const [status, setStatus] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useNavigate();
  const FetchContactInfo = async () => {
    const filter = contact && contact.find((item: any) => item._id === _id);
    setContactInfo(filter);
    setStatus(filter.status);
  };

  const HandleSubmit = async (e: any) => {
    setLoading(true);
    const statusValue = {
      status: status,
    };
    e.preventDefault();
    try {
      if (status?.trim()) {
        const res = await ApiURL.put(
          "/v1/contact/update/" + _id,
          statusValue,
          options
        );
        const data = res.data;
        if (data.success) {
          setStatus("");
          toast.success(data.message || "contact Updated Successfully", {
            id: "orders",
          });
          setTimeout(() => {
            setLoading(false);
            router(adminPath + "/contact", { replace: true });
            GetAllContactHandler();
          }, 1000);
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error("please enter the correct value");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || "Server Error 501");
    } finally {
      setLoading(false);
    }
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
            {ContactInfo && ContactInfo?.imageUrl ? (
              <img
                src={ContactInfo && ContactInfo?.imageUrl}
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
              {ContactInfo && ContactInfo.userInfo}
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
                ContactInfo && ContactInfo?.contactedBy
                  ? "bg-green-300  outline-green-800"
                  : "bg-yellow-200  outline-yellow-800"
              }
                `}
          >
            {ContactInfo && ContactInfo?.contactedBy
              ? "Active customer"
              : "guest Visitor"}
          </p>
        </div>
      </div>
      <div className="w-full py-6 px-4 mb-2 rounded-xl shadow-lg drop-shadow-sm">
        <h1
          className="py-1
          "
        >
          contact Status Change
        </h1>

        <form onSubmit={HandleSubmit} className="flex flex-col gap-y-4">
          <SelectField
            name="status"
            label="contact Status"
            value={status!}
            className="py-4"
            options={contactStatusArray}
            onChange={(e) => setStatus(e.target.value)}
          />

          <button
            disabled={loading}
            className={` disabled:opacity-80 ${buttonClassName}`}
          >
            {loading ? (
              <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
            ) : (
              <p>Update</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactDetails;

export const contactStatusArray: OPTIONPROP[] = [
  {
    value: "pending",
    title: "Pending",
  },
  {
    value: "completed",
    title: "Completed",
  },
];
