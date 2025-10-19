import { motion } from "framer-motion";
import {
  Assets,
  Countries,
  FoodOptions,
  NumberOfPeople,
  States,
  Events,
} from "../assets";
import { buttonClassName, XSlideIn } from "../Animation";
import InputField from "../../context/InputField";
import { useState } from "react";
import SelectField from "../../context/SelectField";
import toast from "react-hot-toast";
import TextAreaField from "../../context/TextAreaField";
import { BiLoaderCircle } from "react-icons/bi";

const EventForm = () => {
  return (
    <div>
      <EventPath />
    </div>
  );
};

export default EventForm;

export const EventPath = () => {
  return (
    <div className="w-full dark:bg-secondary  max-md:gap-3  gap-y-8 max-md:px-10 flex flex-row max-[800px]:flex-col max-[800px]:gap-4 py-10  justify-between  items-center max-sm:justify-center gap-2 px-16 max-sm:px-8 max-[400px]:px-2bg-primary1">
      <EventFormField />

      <motion.div
        variants={XSlideIn(-150, 0.5, 1, 0.6)}
        whileInView={"show"}
        initial={"hidden"}
        className="w-full flex gap-2 max-sm:gap-4 flex-row items-center justify-center"
      >
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
        <div className="w-full max-[990px]:hidden max-[450px]:hidden max-[800px]:block block h-[520px] max-md:h-[470px] max-md:max-w-[260px] max-w-xs relative">
          <img
            src={Assets.venu2}
            alt=""
            className="w-full  h-full rounded-2xl"
          />
          <div className="w-full h-full absolute top-0 p-3 left-0">
            <div className=" h-full w-full outline outline-3 outline-primary rounded-2xl" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function EventFormField() {
  const [foods, setFoods]: any = useState([]);
  const [loading, setLoading]: any = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    person: "",
    description: "",
    state: "",
    country: "",
    event: "",
    town: "",
    busTop: "",
    date: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const handleChangeFood = (e: any) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setFoods([...foods, value]);
    } else {
      const Remove = foods.filter((item: any) => item !== value);
      setFoods(Remove);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      address: formData.address,
      name: formData.name,
      phone: formData.phone,
      person: formData.person,
      description: formData.description,
      state: formData.state,
      country: formData.country,
      town: formData.town,
      busTop: formData.busTop,
      event: formData.event,
      date: formData.date,
      foods: foods,
    };
    if (
      formData.name.trim() &&
      formData.phone.trim() &&
      formData.address.trim() &&
      formData.description.trim() &&
      formData.busTop.trim() &&
      formData.town.trim() &&
      formData.state.trim() &&
      formData.event.trim() &&
      formData.date.trim() &&
      formData.country.trim() &&
      formData.person.trim() &&
      foods.length !== 0
    ) {
      toast.success(`${formData.name} Booked An Event`);
      setFormData({
        name: "",
        phone: "",
        person: "",
        description: "",
        state: "",
        country: "",
        town: "",
        busTop: "",
        event: "",
        date: "",
        address: "",
      });
      localStorage.setItem("event", JSON.stringify(data));
      setFoods([]);
      setTimeout(() => {
        setLoading(false);
        window.location.replace("/event/history");
      }, 1000);
    } else {
      toast.error(`${formData.name} Booking Event Failed`);
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div>
        <h1 className="font-semibold text-lg pb-2 max-sm:pb-4 max-sm:text-center max-sm:text-xl max-sm:underline">
          Book An Event With Us
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
          <InputField
            value={formData.name}
            label="Name*"
            placeholder="Enter your name"
            type="text"
            name="name"
            onChange={handleChange}
          />

          <InputField
            value={formData.phone}
            label="Phone Number*"
            placeholder="Enter your name"
            type="number"
            name="phone"
            onChange={handleChange}
          />
          <InputField
            value={formData.address}
            label="address*"
            placeholder="Enter your Address/street"
            type="text"
            name="address"
            onChange={handleChange}
          />

          <div className="flex flex-row gap-y-3 gap-x-4 max-[400px]:flex-col">
            <SelectField
              label="state"
              onChange={handleChange}
              options={States}
              name="state"
              value={formData.state}
            />
            <SelectField
              label="country"
              onChange={handleChange}
              options={Countries}
              name="country"
              value={formData.country}
            />
          </div>

          <InputField
            value={formData.date}
            label="Date*"
            placeholder="Enter The date"
            type="date"
            name="date"
            onChange={handleChange}
          />

          <div className="flex flex-row-reverse gap-y-3 gap-x-4 max-[400px]:flex-col">
            <InputField
              value={formData.town}
              label="Town*"
              placeholder="Enter your Town"
              type="text"
              name="town"
              onChange={handleChange}
            />
            <InputField
              value={formData.busTop}
              label="Nearest BusTop*"
              placeholder="Enter your Nearest busTop"
              type="text"
              name="busTop"
              onChange={handleChange}
            />
          </div>

          <SelectField
            label="Number of Guest/Persons"
            onChange={handleChange}
            options={NumberOfPeople}
            name="person"
            value={formData.person}
          />
          <SelectField
            label="Event Name"
            onChange={handleChange}
            options={Events}
            name="event"
            value={formData.event}
          />

          <div className="py-4">
            <h1 className="text-base underline font-bold py-3">
              Select Foods*
            </h1>
            <div className="flex items-start text-left  justify-between gap-5 flex-wrap">
              {FoodOptions.map((item, index) => (
                <div key={index} className="flex gap-1 items-center">
                  <input
                    type="checkbox"
                    id="foods"
                    onChange={handleChangeFood}
                    name="foods"
                    value={item.value}
                  />
                  <label htmlFor="foods" className="font-semibold text-base">
                    {item.title}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <TextAreaField
            value={formData.description}
            label="Description*"
            placeholder="Explain the Event"
            name="description"
            onChange={handleChange}
          />
          <div className="max-[300px]:w-full">
            <button
              disabled={loading}
              className={`mt-3 max-[300px]:w-full disabled:opacity-80 ${buttonClassName}`}
            >
              {loading ? (
                <BiLoaderCircle className="text-2xl animate-spin transition-all duration-150" />
              ) : (
                <p>Book Now</p>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
