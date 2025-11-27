import { BiDotsHorizontal, BiPhone } from "react-icons/bi";
import { Assets } from "../../component/assets";
import AvaterImage from "../../context/AvaterImage";
import DateFormater from "../../context/DateFormat";
import { Link } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPersonMilitaryToPerson } from "react-icons/fa6";

const UsersCard = ({
  imageUrl,
  linkPath,
  email,
  createdAt,
  number,
  status,
  name,
  Path,
}: UserCardProp) => {
  return (
    <div className="w-full dark:bg-slate-800/60 outline-none dark:outline-1 dark:outline dark:outline-slate-600/70 dark:text-white max-w-xl shadow-md drop-shadow p-6 rounded-2xl">
      <div className="flex w-full gap-1 justify-between items-center">
        <div className="flex gap-1 items-center">
          {imageUrl ? (
            <img
              src={imageUrl ? imageUrl : Assets.Client1}
              className="size-12 rounded-full object-cover"
              alt={"users photos"}
              loading="lazy"
            />
          ) : (
            <AvaterImage />
          )}
          <div>
            <h1 className="font-bold">
              {name && name.length <= 12
                ? name && name
                : name && name.slice(0, 12) + ".."}
            </h1>
            <p className="text-sm font-semibold opacity-75">
              {DateFormater({
                date: createdAt && createdAt,
                monthType: "short",
              })}
            </p>
          </div>
        </div>
        <div className="group relative">
          <Link to={Path + `/users/${linkPath ? linkPath : ""}`}>
            <div className=" w-auto p-2 bg-slate-100 text-black text-xl rounded-md cursor-pointer">
              <BiDotsHorizontal />
            </div>
          </Link>
          <span className="hidden dark:text-black -left-20 top-[44px] bg-slate-100 p-2 whitespace-nowrap rounded-s-xl rounded-b-2xl absolute group-hover:block capitalize text-base font-semibold">
            view Message
          </span>
        </div>
      </div>
      <hr className="w-full h-[2px] my-2 bg-neutral-400" />
      <div className="flex flex-col gap-y-2 pt-2">
        <div className="flex gap-2 items-center">
          <MdOutlineMailOutline className="text-xl" />
          <p className="text-sm font-semibold opacity-80">{email && email}</p>
        </div>
        <div className="flex gap-2 items-center">
          <BiPhone className="text-xl" />
          <p className="text-sm font-semibold opacity-80">
            {"(+234) " + number}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <FaPersonMilitaryToPerson className="text-xl" />
          <p
            className={`text-sm font-semibold capitalize w-auto p-2  rounded-full outline outline-1 text-black
              ${
                status
                  ? "bg-green-300  outline-green-800"
                  : "bg-yellow-200  outline-yellow-800"
              }
                `}
          >
            {status ? "Active customer" : "guest Visitor"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsersCard;

export type UserCardProp = {
  imageUrl?: string | null;
  createdAt: string | Date;
  linkPath: string;
  email: string;
  number: string | number;
  name: string;
  Path: string;
  status: string | null;
};
