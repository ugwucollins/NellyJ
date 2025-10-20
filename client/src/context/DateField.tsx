import { useState } from "react";
import type { OPTIONPROP } from "./Types";
import { Days, Months, Years } from "../component/assets";

// type DateFieldProp = {
//   label?: string;
//   placeholder?: string;
//   valueMonth: string;
//   valueDay: string;
//   valueYear: string;
//   name?: string;
//   className?: string;
//   optionsM: OPTIONPROP[];
//   optionsY: OPTIONPROP[];
//   onChange: (e: any) => void;
// };

const DateField = ({ setDate }: any) => {
  const [dates, setDates] = useState({
    day: "",
    month: "",
    year: "",
  });
  const handleChangeDate = (e: any) => {
    const { name, value } = e.target;
    setDates({ ...dates, [name]: value });
  };
  if (
    dates.day.trim() &&
    dates.day.length <= 2 &&
    dates.month.trim() &&
    dates.year.trim()
  ) {
    const data = `${dates.day},${dates.month} ${dates.year}`;
    setDate(data && data);
  }

  return (
    <div>
      <div className="w-full flex relative flex-col text-left">
        <label htmlFor="category" className="font-bold capitalize text-base">
          Date*
        </label>

        <div className="rounded-full max-[400px]:flex-col max-[400px]:outline-none outline outline-1 w-full flex justify-between items-center gap-1 gap-y-2  mt-1.5 text-base font-semibold outline-neutral-400 px-2 shadow focus:shadow-md overflow-">
          <div className="w-full">
            <select
              name="day"
              value={dates.day}
              onChange={handleChangeDate}
              id={"day"}
              className={`outline-none py-2 w-full`}
            >
              {Days.map((list: OPTIONPROP | any, index) => (
                <option key={index} value={list.value} className="capitalize">
                  {list.title}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <select
              name="month"
              value={dates.month}
              onChange={handleChangeDate}
              id={"month"}
              className={`outline-none py-2 w-full`}
            >
              {Months.map((list: OPTIONPROP | any, index) => (
                <option key={index} value={list.value} className="capitalize">
                  {list.title}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <select
              name="year"
              value={dates.year}
              onChange={handleChangeDate}
              id={"year"}
              className={`outline-none py-2 w-full`}
            >
              {Years.map((list: OPTIONPROP | any, index) => (
                <option key={index} value={list.value} className="capitalize">
                  {list.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateField;
