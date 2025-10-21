import { useParams } from "react-router-dom";
import HeaderProp from "../../context/HeaderProp";
import { sellerPath } from "../../context/UserContext";
import Navbar from "../pages/Navbar";
import Sidebar from "../pages/Sidebar";
import { Assets } from "../../component/assets";

const ContactID = () => {
  const { id } = useParams();

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
                AnText="Personal Message"
                LinkPath={sellerPath + "/contact"}
              />
            </div>
            <ContactIDDetails _id={id} />
          </div>
        </div>
      </>
    </div>
  );
};

export default ContactID;

export const ContactIDDetails = ({ _id }: any) => {
  return (
    <div className="w-full flex justify-center items-center flex-col px-2 py-8">
      ContactIDDetails {_id}
      <div className="w-full max-w-2xl shadow-lg drop-shadow-md rounded-xl p-10">
        <div className="flex w-full items-center justify-center flex-col text-center gap-2 py-2">
          <div
            className={`bg-neutral-100 size-24 relative flex justify-center items-center max-[330px]:p-0 rounded-full ${
              true ? "dark:bg-neutral-600" : "dark:bg-neutral-300"
            }`}
          >
            <img
              src={Assets.Client2}
              className="size-20 rounded-full object-cover"
              alt={"contacted photos"}
            />
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

        <div className="flex flex-col gap-y-4 w-full">
          <div className=" w-full text-end">
            <h1 className="font-semibold text-lg underline capitalize py-1">
              Subject/Title:
            </h1>
            <p className=" text-black font-bold text-balance opacity-80">
              text-black font-bold text-balance
            </p>
          </div>
          <div>
            <h1 className="font-semibold text-lg py-1 underline capitalize">
              Message:
            </h1>
            <p className=" text-black font-bold text-balance opacity-80">
              {` <div>
            <h1 className="font-semibold text-lg underline capitalize py-1">
              Subject/Title:
            </h1>
            <p className=" text-black font-bold text-balance opacity-80">
              text-black font-bold text-balance 
            </p>
          </div>
          <div>
            <h1 className="font-semibold text-lg py-1 underline capitalize">
              Message:`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
