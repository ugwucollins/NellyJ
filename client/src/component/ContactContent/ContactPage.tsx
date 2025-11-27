import { Link } from "react-router-dom";
import TextAnimation, { XSlideIn, YSlideIn } from "../Animation";
import { useState } from "react";
import {
  DarkModeClass,
  FeatureArryMap,
} from "../HomeContent/HomeExportComponent";
import { SocialMediaIcons } from "../assets";
import { motion } from "framer-motion";
import MapCompontentMap from "./MapContent";
import { ZodTextAreaField } from "../../context/TextAreaField";
import { BiLoaderCircle } from "react-icons/bi";
// import toast from "react-hot-toast";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ContactField } from "../../Zod/typesField";
import { ContactSchema } from "../../Zod/Schema/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodInputField } from "../../context/InputField";
import { UserAuthInfo } from "../../App";

// const InputField = lazy(() => import("../../context/InputField"));

export const ContactInputValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactPage = () => {
  return (
    <div className="w-full">
      <ContactHeader />
      <ContactForm />
      <MapCompontent />

      <div
        className={` w-full overflow-hidden px-10 max-[170px]:px-1 max-[690px]:px-10 pb-3 relative z-[2] ${DarkModeClass}`}
      >
        <FeatureArryMap />
      </div>
    </div>
  );
};

export const ContactHeader = () => {
  return (
    <div className="w-full bg-primary1 dark:bg-secondary dark:shadow-lg dark:shadow-slate-800 pb-10 flex-col  flex  min-h-[30vh] justify-center items-center text-center">
      <h1>
        {TextAnimation(
          "Contact  Us",
          -25,
          0.2,
          "flex  gap-1 flex-wrap",
          "text-[min(10vw,30px)] font-bold"
        )}
      </h1>
      <div className="flex gap-1 flex-wrap">
        <Link to={"/"}>
          <p className=" cursor-pointer font-bold capitalize">Home/</p>
        </Link>
        <Link to={"/contact"}>
          <p className=" cursor-pointer font-bold capitalize text-blue-900">
            Contact Us
          </p>
        </Link>
      </div>
    </div>
  );
};

export const ContactForm = () => {
  const { user }: any = UserAuthInfo();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user ? user.lastName + " " + user.firstName : "",
      email: user ? user.email : "",
    },
    resolver: zodResolver(ContactSchema),
  });

  const OnSubmit: SubmitHandler<ContactField> = (data) => {
    const info = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      phoneNumber: `0${user ? user.phoneNumber : data.phoneNumber}`,
      message: data.message,
    };
    console.log(info);
  };
  const [indexIcon, setindexIcon] = useState(0);

  return (
    <div className="w-full h-auto overflow-hidden gap-8 py-10 flex items-center flex-row px-20 max-md:px-16 mb-5 max-sm:px-8 max-[200px]:px-1 max-[750px]:flex-col">
      <motion.div
        variants={YSlideIn(-150, 0.5, 0.5, 0.5)}
        whileInView={"show"}
        initial={"hidden"}
        className="flex flex-col gap-5 w-full"
      >
        <div>
          <h1 className="text-[min(10vw,25px)] font-bold capitalize">
            Get in touch
          </h1>
          <p className="opacity-70 text-sm font-semibold">
            Your email address will not be published. Required fields are
            marked*
          </p>
        </div>
        <form onSubmit={handleSubmit(OnSubmit)} className="flex gap-4 flex-col">
          <div className="flex gap-5 items-center max-[850px]:flex-col max-[750px]:flex-row max-[550px]:flex-col flex-row">
            <ZodInputField
              label="Your Name*"
              placeholder="Ex. john Deo"
              type="text"
              error={errors.name?.message}
              value={register("name")}
            />

            <ZodInputField
              label="Email*"
              placeholder="example@gmail.com"
              type="email"
              error={errors.email?.message}
              value={register("email")}
            />
          </div>
          {!user && (
            <ZodInputField
              label="PhoneNumber*"
              placeholder="Enter Your PhoneNumber"
              type="number"
              error={errors.phoneNumber?.message}
              value={register("phoneNumber")}
            />
          )}

          <ZodInputField
            label="Subject*"
            placeholder="Enter Subject"
            type="text"
            error={errors.subject?.message}
            value={register("subject")}
          />

          <ZodTextAreaField
            label="message"
            placeholder="Enter message"
            className="font-semibold"
            error={errors.message?.message!}
            value={register("message")}
          />
          <div>
            <button
              disabled={isSubmitting}
              type="submit"
              className=" px-5 rounded-2xl disabled:opacity-85 hover:rounded-full py-4 dark:bg-yellow-800 bg-secondary text-primary1 font-semibold text-base hover:font-bold"
            >
              {isSubmitting ? (
                <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
              ) : (
                <p>Send Message</p>
              )}
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div
        variants={YSlideIn(150, 0.5, 0.5, 0.5)}
        whileInView={"show"}
        initial={"hidden"}
        className={`w-full flex-col relative rounded-2xl bg-secondary text-primary h-auto ${DarkModeClass} shadow-lg drop-shadow-lg dark:shadow-gray-700 px-5 pt-5 pb-8`}
      >
        <div className="absolute size-32 max-[480px]:size-20 dark:bg-primary1/80 bg-primary1 shadow-xl drop-shadow top-0 right-0  rotate-90 dark:rounded-tl-[50px] rounded-ee-[990px]" />

        <div className="px-4 flex flex-col text-left justify-start gap-y-10 py-2">
          <div>
            <h1 className="font-bold pb-2 text-[min(4vw,18px)]">Address</h1>
            <div className=" opacity-80">
              <address>92502 Presion Rd. Inglewood, Maine 98380</address>
            </div>
          </div>

          <div>
            <h1 className="font-bold pb-2 text-[min(4vw,18px)]">Contact</h1>
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-1.5 opacity-90">
                <p>Phone:</p>
                <span>+2348107289948</span>
              </div>
              <div className="flex flex-wrap gap-1.5 opacity-90">
                <p>Email:</p>
                <span>example@gmail.com</span>
              </div>
            </div>
          </div>

          <div>
            <h1 className="font-bold pb-2 text-[min(4vw,18px)]">Open Time</h1>
            <div>
              <div className="flex flex-wrap gap-1.5 opacity-90">
                <p>Monday- Friday :</p>
                <span>10: 00- 20:00</span>
              </div>
              <div className="flex flex-wrap gap-1.5  opacity-90">
                <p>Saturday- Sunday :</p>
                <span>11: 00- 18:00</span>
              </div>
            </div>
          </div>

          <div>
            <h1 className="font-bold pb-5 text-[min(5vw,18.5spx)]">
              Stay Connected
            </h1>
            <div className="flex max-[300px]:justify-center flex-wrap gap-4">
              {SocialMediaIcons.map((icon: any, index: number) => (
                <Link to={icon.path} key={index}>
                  <motion.div
                    variants={XSlideIn(100, 0.5, index, 0.5)}
                    itemID="hidden"
                    whileInView={"show"}
                    key={index}
                    onClick={() => setindexIcon(index)}
                    className={`p-3 hover:cursor-pointer  font-bold  hover:rounded-full transition-all duration-200 ${
                      index === indexIcon
                        ? " bg-yellow-800 rounded-full"
                        : "text-black bg-primary1 rounded-2xl"
                    }`}
                  >
                    <p className="text-xl">{icon.icon}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const MapCompontent = () => {
  return (
    <div className="flex flex-col justify-center py-5 items-center w-full bg-primary1 dark:bg-slate-800/95">
      <div className="px-20 relative min-h-[70vh] max-md:px-14 max-sm:px-6 w-full flex flex-col max-[170px]:px-1">
        <MapCompontentMap />
      </div>
    </div>
  );
};
export const contactVaildInput = (value: any, setErrorState: any) => {
  let err = ContactInputValues;

  if (value.name === "") {
    let message = "Users Name is Required";
    err.name = message;
  } else if (value.email === "") {
    let message = "Email is Required";
    err.email = message;
    return false;
  } else {
    setErrorState({ ...err });
    err;
    return true;
  }
};

export default ContactPage;
