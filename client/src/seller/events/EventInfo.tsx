import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { EventStatus } from "./EventCards";
import { useEffect, useState } from "react";
import { sellerPath, UserAuth } from "../../context/UserContext";
import { UserSellerAuth } from "../Context/SellersContext";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import ApiURL from "../../context/Api";
import toast from "react-hot-toast";
import AvaterImage from "../../context/AvaterImage";
import { BsCakeFill } from "react-icons/bs";
import { FaBaby, FaGraduationCap } from "react-icons/fa";
import { RiHeartsFill } from "react-icons/ri";
import { GiCoffin } from "react-icons/gi";
import { PiFlowerLotusFill } from "react-icons/pi";
import { IoRoseSharp } from "react-icons/io5";
import { TbTransactionDollar } from "react-icons/tb";
import DateFormater from "../../context/DateFormat";
import { ZodSelectField } from "../../context/SelectField";
import { buttonClassName } from "../../component/Animation";
import { BiLoaderCircle } from "react-icons/bi";
import { EventsCheck } from "../../component/assets";

const statusSchema = z.object({
  status: z.enum([
    EventStatus.Active,
    EventStatus.Pending,
    EventStatus.completed,
  ]),
});
type StatusField = z.infer<typeof statusSchema>;
const EventInfo = ({ id: _id }: string | any) => {
  const [EventInfo, setEventInfo]: any = useState({});
  const { options }: any = UserAuth();
  const { events, GetAllBookedEvents }: any = UserSellerAuth();
  const router = useNavigate();

  const FetchContactInfo = async () => {
    const filter =
      events &&
      events.find((item: any) => item._id.toString() === _id.toString());
    setEventInfo(filter);
    setValue("status", EventInfo.status && EventInfo.status.toString());
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      status: EventInfo.status,
    },
    resolver: zodResolver(statusSchema),
  });

  useEffect(() => {
    FetchContactInfo();
  }, []);

  const onSubmit: SubmitHandler<StatusField> = async (data) => {
    const Update =
      events &&
      events.map((item: any) =>
        item._id.toString() === _id.toString()
          ? {
              ...item,
              status: data.status,
            }
          : item
      );

    try {
      const res = await ApiURL.put(
        "/v1/events/update/" + _id,
        {
          status: data.status,
        },
        options
      );
      const resData = res.data;

      if (resData.success) {
        setTimeout(() => {
          setEventInfo({ ...EventInfo, status: data.status });
          localStorage.setItem("event", JSON.stringify(Update));
          toast.success("Updated changes Successfully");
          console.log(Update);
          router(sellerPath + "/events");
          GetAllBookedEvents();
        }, 1000);
      } else {
        toast.success(resData.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.success(error.response.data.message);
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-col px-2 py-8">
      <h1 className=" font-bold text-lg dark:py-4">Event Info</h1>
      <div className="w-full max-w-2xl shadow-lg drop-shadow-md rounded-2xl p-10 outline-none dark:outline-1 dark:outline dark:outline-slate-700">
        <div className="flex w-full items-center justify-center flex-col text-center gap-2 py-2">
          <div
            className={`bg-neutral-100 size-24 relative flex justify-center items-center max-[330px]:p-0 rounded-full ${
              true ? "dark:bg-neutral-600" : "dark:bg-neutral-300"
            }`}
          >
            {EventInfo && EventInfo?.createdBy ? (
              <img
                src={EventInfo && EventInfo?.createdBy?.imageUrl}
                className="size-20 rounded-full object-cover"
                alt={"contacted photos"}
              />
            ) : (
              <AvaterImage size="20" />
            )}
          </div>
          <div className="whitespace-nowrap">
            <p className="font-semibold text-base capitalize">
              {EventInfo && EventInfo.name}
            </p>
            <span className="whitespace-nowrap text-sm font-semibold opacity-60 capitalize">
              {EventInfo ? EventInfo.email : EventInfo?.createdBy?.email}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 w-full">
          <div className="flex gap-2 items-center pb-2">
            <div className="w-auto p-4 text-black text-2xl bg-slate-50 shadow rounded-full">
              {EventInfo && EventInfo.event === EventsCheck.Birthday ? (
                <BsCakeFill />
              ) : EventInfo && EventInfo.event === EventsCheck.Baby_Shower ? (
                <FaBaby />
              ) : EventInfo && EventInfo.event === EventsCheck.Wedding ? (
                <RiHeartsFill />
              ) : EventInfo && EventInfo.event === EventsCheck.Burial ? (
                <GiCoffin />
              ) : EventInfo && EventInfo.event === EventsCheck.Graduation ? (
                <FaGraduationCap />
              ) : EventInfo && EventInfo.event === EventsCheck.Anniversary ? (
                <PiFlowerLotusFill />
              ) : EventInfo && EventInfo.event === EventsCheck.Get_Together ? (
                <IoRoseSharp />
              ) : (
                <TbTransactionDollar />
              )}
            </div>

            <div className="flex flex-col">
              <h1 className="font-bold">{EventInfo && EventInfo.event}</h1>
              <p className="text-sm font-semibold opacity-75">
                {DateFormater({
                  date: EventInfo.createdAt ? EventInfo.createdAt : new Date(),
                  monthType: "short",
                })}
              </p>
            </div>
          </div>

          <div>
            <h1 className="font-semibold text-lg py-1 underline capitalize">
              description:
            </h1>
            <p className="font-bold text-balance opacity-80 ">
              {EventInfo && EventInfo?.description}
            </p>
          </div>

          <div>
            <span className="font-bold mr-4 font-serif opacity-85 underline">
              Foods:
            </span>

            <div>
              {EventInfo.foods &&
                EventInfo.foods.map((food: any, index: number) => (
                  <div
                    key={index}
                    className="text-left font-semibold capitalize dark:text-gray-400 pl-4"
                  >
                    <li>{food}</li>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-4 font-serif opacity-85 ">
              Number OF Guest:
            </span>

            <div className="text-left font-bold capitalize dark:text-gray-400 pl-4 underline">
              {EventInfo && +EventInfo.NumberOfGuest} people
            </div>
          </div>
          <div>
            <span className="font-semibold mr-4 font-serif opacity-85">
              Address:
            </span>
            <address className="pr-4 pb-6 text-left font-semibold text-gray-600 dark:text-gray-400">
              "{EventInfo.address && EventInfo.address},{" "}
              {EventInfo.NumberOfGuest}, {EventInfo.town}, {EventInfo.state},{" "}
              {EventInfo.country}"
            </address>
          </div>
        </div>
        <div className="flex items-center w-full justify-end pt-4">
          <div
            className={` capitalize outline outline-1 cursor-pointer w-auto px-3.5 rounded-full py-2 font-semibold ${
              EventInfo.status === EventStatus.Pending
                ? "bg-red-400/70 outline-red-700"
                : EventInfo.status === EventStatus.Active
                ? "bg-yellow-400/70 outline-yellow-700"
                : "bg-green-400/70 outline-green-700"
            }`}
          >
            {EventInfo.status === EventStatus.Pending
              ? EventStatus.Pending
              : EventInfo.status === EventStatus.Active
              ? EventStatus.Active
              : EventStatus.completed}
          </div>
        </div>

        <div>
          {EventInfo.status !== EventStatus.completed && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-y-4"
            >
              <ZodSelectField
                value={register("status")}
                error={errors.status?.message}
                label="Event Status"
                options={EventStatusOptions}
              />
              {errors.root && (
                <span className="text-base text-red-600 font-semibold">
                  {errors.root.message}
                </span>
              )}
              <button
                disabled={isSubmitting}
                className={`${buttonClassName} disabled:opacity-80`}
              >
                {isSubmitting ? (
                  <BiLoaderCircle className="text-2xl disabled:line-through w-full animate-spin transition-all duration-150" />
                ) : (
                  <p>Save Changes</p>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
export const EventStatusOptions = [
  {
    title: "Pending",
    value: "pending",
  },
  {
    title: "active",
    value: "active",
  },
  {
    title: "completed",
    value: "completed",
  },
];
