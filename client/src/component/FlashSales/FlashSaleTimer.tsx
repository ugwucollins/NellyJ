import { NavLink } from "react-router-dom";
import { Assets } from "../assets";
import { UserAuth } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { UserProduct } from "../../context/ProductContext";

const FlashSaleTimer = () => {
  return (
    <div className="w-full dark:bg-secondary  max-md:gap-3 max-md:px-10 flex flex-row-reverse max-[700px]:flex-col max-[700px]:gap-4 justify-between tems-center max-sm:justify-center gap-2 min-h-screen px-16 max-sm:px-8 max-[400px]:px-2 py-4 bg-primary1">
      <div className="w-full flex flex-col py-5 items-center justify-center text-center relative">
        <TimeCounter />
      </div>

      <div className="w-full flex gap-2 max-sm:gap-4 flex-row items-center justify-center">
        <div className="w-full h-[520px] max-md:h-[480px] max-md:max-w-[270px] max-w-xs relative">
          <img
            src={Assets.venu1}
            alt=""
            className="w-full object-cover h-full rounded-2xl"
          />
          <div className="w-full h-full absolute top-0 p-3 left-0">
            <div className=" h-full w-full outline outline-3 outline-primary rounded-2xl" />
          </div>
        </div>

        <div className="w-full max-[990px]:hidden max-[450px]:hidden max-[700px]:block block h-[520px] max-md:h-[470px] max-md:max-w-[260px] max-w-xs relative">
          <img
            src={Assets.venu2}
            alt=""
            className="w-full object-cover h-full rounded-2xl"
          />
          <div className="w-full h-full absolute top-0 p-3 left-0">
            <div className=" h-full w-full outline outline-3 outline-primary rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleTimer;

export const TimeCounter = () => {
  const { user }: any = UserAuth();
  const { duration, num }: any = UserProduct();

  const [time, settime]: any = useState(+num ? +num : duration);

  const geFormatedDays = () => {
    let total_seconds = Math.floor(time) / 1000;
    let total_minutes = Math.floor(total_seconds) / 60;
    let total_hours = Math.floor(total_minutes) / 60;
    let days = Math.ceil(Math.floor(total_hours) / 24);

    let seconds = Math.ceil(total_seconds % 60);
    let minutes = Math.ceil(total_minutes % 60);
    let hours = Math.ceil(total_hours % 24);

    return {
      seconds: seconds.toLocaleString().length === 1 ? `0${seconds}` : seconds,
      minutes: minutes.toLocaleString().length === 1 ? `0${minutes}` : minutes,
      hours: hours.toLocaleString().length === 1 ? `0${hours}` : hours,
      days: days.toLocaleString().length === 1 ? `0${days}` : days,
    };
  };

  useEffect(() => {
    setTimeout(() => {
      settime(time - 1000);
      localStorage.setItem("promo", JSON.stringify(time));
    }, 1000);
  }, [time]);

  return (
    <div className="bg-primary/80 max-[700px]:px-20 dark:text-secondary  px-20 max-[900px]:px-5 max-sm:px-8 rounded-2xl hover:shadow-inner hover:drop-shadow-2xl transition-all hover:rounded-3xl max-[400px]:px-5 max-[250px]:px-0  shadow-md drop-shadow-md p-10">
      <h1 className="text-[min(10vw,50px)] max-[170px]:px-0 mb-0.5 font-bold">
        Flash sale!
      </h1>
      <h2>Get 25% off - Limited Time offer!</h2>

      <div className="flex flex-row gap-4 pt-10 pb-7">
        <div className="flex flex-row text-[min(5vw,25px)] font-bold">
          <div className="flex-col flex gap-1">
            <span>{geFormatedDays().days}</span>
            <p>
              {geFormatedDays().days.valueOf().toLocaleString() === `01`
                ? "day"
                : "days"}
            </p>
          </div>
          :
        </div>

        <div className="flex flex-row text-[min(5vw,25px)] font-bold">
          <div className="flex-col flex gap-1">
            <span>{geFormatedDays().hours}</span>
            <p>Hours</p>
          </div>
          :
        </div>

        <div className="flex flex-row text-[min(5vw,25px)] font-bold">
          <div className="flex-col flex gap-1">
            <span>{geFormatedDays().minutes}</span>
            <p>Minutes</p>
          </div>
          :
        </div>

        <div className="flex gap-1 flex-col text-[min(5vw,25px)] font-bold">
          <span>{geFormatedDays().seconds}</span>
          <p>Seconds</p>
        </div>
      </div>
      <NavLink to={user ? "/products" : "/auth/sigin"}>
        <button className="px-5 hover:font-bold font-semibold py-2.5 cursor-pointer bg-secondary text-primary1 rounded-xl hover:rounded-full">
          <p>Shop Now</p>
        </button>
      </NavLink>
    </div>
  );
};
