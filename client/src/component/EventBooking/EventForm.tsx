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
import { ZodInputField } from "../../context/InputField";
import { useEffect, useState } from "react";
import { ZodSelectField } from "../../context/SelectField";
import toast from "react-hot-toast";
import { ZodTextAreaField } from "../../context/TextAreaField";
import { BiLoaderCircle } from "react-icons/bi";
import DateField from "../../context/DateField";
import { UserAuth } from "../../context/UserContext";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { EventField } from "../../Zod/typesField";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchema } from "../../Zod/Schema/Schemas";
import { UserAuthInfo } from "../../App";
import ApiURL from "../../context/Api";

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
  const { events, setEvents, options }: any = UserAuth();
  const { user }: any = UserAuthInfo();
  const [date, setDate] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      date: date ? date : "",
      email: user ? user.email : "",
      name: user ? user.lastName + " " + user.firstName : "",
      phoneNumber: user ? user.phoneNumber : "",
    },
    resolver: zodResolver(EventSchema),
  });

  const handleArray = (data: any) => {
    const id = Date.now();

    const info = {
      _id: id,
      id: id + data.name,
      address: data.address,
      name: data.name,
      phone: data.phoneNumber,
      person: data.people,
      description: data.description,
      state: data.state,
      country: data.country,
      town: data.town,
      busTop: data.busTop,
      event: data.event,
      date: data.date,
      email: data.email,
      foods: data.foods,
      status: "pending",
      createdAt: new Date(),
    };
    const allInfo = info;
    const EventArray = [...events, allInfo ? allInfo : data];
    localStorage.setItem("event", JSON.stringify(EventArray));
    setEvents(EventArray);
  };

  useEffect(() => {
    if (date.trim()) {
      setValue("date", date);
    }
  }, [date]);

  const onSubmit: SubmitHandler<EventField> = async (data) => {
    const info = {
      name: data.name,
      phoneNumber: data.phoneNumber,
      description: data.description,
      state: data.state,
      country: data.country,
      town: data.town,
      nearestBusTop: data.busTop,
      NumberOfGuest: data.people,
      address: data.address,
      event: data.event,
      date: date ? date : data.date,
      email: data.email,
      foods: data.foods,
      city: data.town,
    };
    try {
      setValue("date", date);
      const res = await ApiURL.post("/v1/events/create", info, options);
      const resData = res.data;
      if (resData.success) {
        toast.success(resData.message || `${data.name} Booked An Event`);
        handleArray(data);
        setDate("");
        setTimeout(() => {
          window.location.replace("/event/history");
          console.log(info);
        }, 1000);
      } else {
        toast.error(resData.message);
      }
    } catch (error: any) {
      setError("root", {
        message: error.response.data.message,
      });
    }
  };

  return (
    <div className="w-full">
      <div>
        <h1 className="font-semibold text-lg pb-2 max-sm:pb-4 max-sm:text-center max-sm:text-xl max-sm:underline">
          Book An Event With Us
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-3"
        >
          <ZodInputField
            value={register("name")}
            label="Name*"
            placeholder="Enter your name"
            type="text"
            error={errors.name?.message}
          />

          <ZodInputField
            value={register("phoneNumber")}
            label="Phone Number*"
            placeholder="Enter your Number"
            type="number"
            error={errors.phoneNumber?.message}
          />

          <ZodInputField
            value={register("address")}
            label="address*"
            placeholder="Enter your Address/street"
            type="text"
            error={errors.address?.message}
          />

          <div className="flex flex-row gap-y-3 gap-x-4 max-[400px]:flex-col">
            <ZodSelectField
              label="state"
              error={errors.state?.message}
              options={States}
              value={register("state")}
            />
            <ZodSelectField
              label="country"
              error={errors.country?.message}
              options={Countries}
              value={register("country")}
            />
          </div>

          <div className="flex flex-row-reverse gap-y-3 gap-x-4 max-[400px]:flex-col">
            <ZodInputField
              value={register("town")}
              label="Town*"
              placeholder="Enter your Town"
              type="text"
              error={errors.town?.message}
            />
            <ZodInputField
              value={register("busTop")}
              label="Nearest BusTop*"
              placeholder="Enter your Nearest busTop"
              type="text"
              error={errors.busTop?.message}
            />
          </div>

          <ZodSelectField
            label="Number of Guest/Persons"
            error={errors.people?.message}
            options={NumberOfPeople}
            value={register("people")}
          />
          <ZodInputField
            value={register("email")}
            label="Email*"
            placeholder="Enter your email address"
            type="email"
            error={errors.email?.message}
          />
          <ZodSelectField
            label="Event Name"
            error={errors.event?.message}
            options={Events}
            value={register("event")}
          />

          <DateField setDate={setDate} />

          <div className="py-4">
            <h1 className="text-base underline font-bold py-3">
              Select Foods*
            </h1>
            <div className="flex items-start text-left  justify-between gap-5 flex-wrap">
              {FoodOptions.map((item, index) => (
                <div key={index} className="flex gap-1 items-center">
                  <input
                    type="checkbox"
                    {...register("foods")}
                    value={item.value}
                  />
                  <label htmlFor="foods" className="font-semibold text-base">
                    {item.title}
                  </label>
                </div>
              ))}
            </div>
            {errors.foods && (
              <span className="text-red-500 text-base">
                {errors.foods.message}
              </span>
            )}
          </div>

          <ZodTextAreaField
            value={register("description")}
            label="Description*"
            placeholder="Explain the Event"
            error={errors.description?.message}
          />
          <div className="max-[300px]:w-full">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-3 max-[300px]:w-full disabled:opacity-80 ${buttonClassName}`}
            >
              {isSubmitting ? (
                <BiLoaderCircle className="text-2xl animate-spin transition-all duration-150" />
              ) : (
                <p>Book Now</p>
              )}
            </button>
          </div>

          {errors.root && (
            <span className="text-red-500 text-base">
              {errors.root.message}
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
// export function EventFormField() {
//   const { events, setEvents }: any = UserAuth();
//   const [foods, setFoods]: any = useState([]);
//   const [date, setDate] = useState("");

//   const [loading, setLoading]: any = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     person: "",
//     description: "",
//     state: "",
//     country: "",
//     event: "",
//     town: "",
//     busTop: "",
//   });

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData((pre) => ({ ...pre, [name]: value }));
//   };

//   const handleChangeFood = (e: any) => {
//     const value = e.target.value;
//     const isChecked = e.target.checked;
//     if (isChecked) {
//       setFoods([...foods, value]);
//     } else {
//       const Remove = foods.filter((item: any) => item !== value);
//       setFoods(Remove);
//     }
//   };

//   const handleArray = () => {
//     const id = Date.now();

//     const data = {
//       _id: id,
//       id: id + formData.name,
//       address: formData.address,
//       name: formData.name,
//       phone: formData.phone,
//       person: formData.person,
//       description: formData.description,
//       state: formData.state,
//       country: formData.country,
//       town: formData.town,
//       busTop: formData.busTop,
//       event: formData.event,
//       date: date,
//       foods: foods,
//     };
//     const allInfo = data;
//     const EventArray = [...events, allInfo ? allInfo : data];
//     localStorage.setItem("event", JSON.stringify(EventArray));
//     setEvents(EventArray);
//   };

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     setLoading(true);

//     if (
//       formData.name.trim() &&
//       formData.phone.trim() &&
//       formData.address.trim() &&
//       formData.description.trim() &&
//       formData.busTop.trim() &&
//       formData.town.trim() &&
//       formData.state.trim() &&
//       formData.event.trim() &&
//       date.trim() &&
//       formData.country.trim() &&
//       formData.person.trim() &&
//       foods.length !== 0
//     ) {
//       toast.success(`${formData.name} Booked An Event`);
//       setFormData({
//         name: "",
//         phone: "",
//         person: "",
//         description: "",
//         state: "",
//         country: "",
//         town: "",
//         busTop: "",
//         event: "",
//         address: "",
//       });
//       setFoods([]);
//       handleArray();
//       setDate("");
//       setTimeout(() => {
//         setLoading(false);
//         window.location.replace("/event/history");
//       }, 1000);
//     } else {
//       toast.error(`${formData.name} Booking Event Failed`);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full">
//       <div>
//         <h1 className="font-semibold text-lg pb-2 max-sm:pb-4 max-sm:text-center max-sm:text-xl max-sm:underline">
//           Book An Event With Us
//         </h1>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
//           <InputField
//             value={formData.name}
//             label="Name*"
//             placeholder="Enter your name"
//             type="text"
//             name="name"
//             onChange={handleChange}
//           />

//           <InputField
//             value={formData.phone}
//             label="Phone Number*"
//             placeholder="Enter your Number"
//             type="number"
//             name="phone"
//             onChange={handleChange}
//           />
//           <InputField
//             value={formData.address}
//             label="address*"
//             placeholder="Enter your Address/street"
//             type="text"
//             name="address"
//             onChange={handleChange}
//           />

//           <div className="flex flex-row gap-y-3 gap-x-4 max-[400px]:flex-col">
//             <SelectField
//               label="state"
//               onChange={handleChange}
//               options={States}
//               name="state"
//               value={formData.state}
//             />
//             <SelectField
//               label="country"
//               onChange={handleChange}
//               options={Countries}
//               name="country"
//               value={formData.country}
//             />
//           </div>

//           <div className="flex flex-row-reverse gap-y-3 gap-x-4 max-[400px]:flex-col">
//             <InputField
//               value={formData.town}
//               label="Town*"
//               placeholder="Enter your Town"
//               type="text"
//               name="town"
//               onChange={handleChange}
//             />
//             <InputField
//               value={formData.busTop}
//               label="Nearest BusTop*"
//               placeholder="Enter your Nearest busTop"
//               type="text"
//               name="busTop"
//               onChange={handleChange}
//             />
//           </div>

//           <SelectField
//             label="Number of Guest/Persons"
//             onChange={handleChange}
//             options={NumberOfPeople}
//             name="person"
//             value={formData.person}
//           />
//           <SelectField
//             label="Event Name"
//             onChange={handleChange}
//             options={Events}
//             name="event"
//             value={formData.event}
//           />

//           <DateField setDate={setDate} />

//           <div className="py-4">
//             <h1 className="text-base underline font-bold py-3">
//               Select Foods*
//             </h1>
//             <div className="flex items-start text-left  justify-between gap-5 flex-wrap">
//               {FoodOptions.map((item, index) => (
//                 <div key={index} className="flex gap-1 items-center">
//                   <input
//                     type="checkbox"
//                     id="foods"
//                     onChange={handleChangeFood}
//                     name="foods"
//                     value={item.value}
//                   />
//                   <label htmlFor="foods" className="font-semibold text-base">
//                     {item.title}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <TextAreaField
//             value={formData.description}
//             label="Description*"
//             placeholder="Explain the Event"
//             name="description"
//             onChange={handleChange}
//           />
//           <div className="max-[300px]:w-full">
//             <button
//               disabled={loading}
//               className={`mt-3 max-[300px]:w-full disabled:opacity-80 ${buttonClassName}`}
//             >
//               {loading ? (
//                 <BiLoaderCircle className="text-2xl animate-spin transition-all duration-150" />
//               ) : (
//                 <p>Book Now</p>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
