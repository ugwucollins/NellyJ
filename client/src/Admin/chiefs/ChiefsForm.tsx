import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { adminPath, UserAuth } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserAdminAuth } from "../context/AdminContext";
import type { RegisterChiefsField } from "../../Zod/typesField";
import { RegisterChiefSchema } from "../../Zod/Schema/RegisterSchema";
import ApiURL from "../../context/Api";
import InputField, { ZodInputField } from "../../context/InputField";
import { BiLoaderCircle } from "react-icons/bi";
import { buttonClassName } from "../../component/Animation";
import Avater from "../../context/Avater";
import { useState } from "react";
import { ZodSelectField } from "../../context/SelectField";

const ChiefsForm = () => {
  const router = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(RegisterChiefSchema),
  });
  const { GetAllTeams, setOpen }: any = UserAdminAuth();
  const { options }: any = UserAuth();

  const [imageData, setImageData]: any = useState({});
  const [img, setImg] = useState("");
  const [err, setErr] = useState("");
  const [experienceNo, setExperienceNo] = useState<number>(1);

  const OnSubmit: SubmitHandler<RegisterChiefsField> = async (info) => {
    const { instagram, name, email, facebook, whatsapp, twitter, role } = info;
    let handleArray;
    handleArray = facebook + "," + instagram + "," + twitter + "," + whatsapp;
    const arr = handleArray.split(",") || handleArray.split("\n");

    const UserData = {
      email: email,
      name: name,
      imageUrl: img || imageData.url,
      facebook: facebook,
      instagram: instagram,
      whatsapp: whatsapp,
      twitter: twitter,
      handle: arr,
      experience: experienceNo,
      role: role,
    };

    try {
      if (experienceNo === 0 && img === "") {
        setErr("please enter how many years of experience");
      } else {
        const res = await ApiURL.post("/v1/teams/create", UserData, options);

        const data = res.data;

        if (data.success) {
          setTimeout(() => {
            toast.success(data.message, { id: "signUp" });
            setValue("name", "");
            setValue("email", "");
            setValue("whatsapp", "");
            setValue("facebook", "");
            setValue("instagram", "");
            setValue("twitter", "");
          }, 100);
          router(adminPath + "/teams", { replace: true });
          GetAllTeams();
          setOpen(false);
        } else {
          toast.error(data.message);
          setError("root", {
            message: data.message,
          });
        }
      }
    } catch (error: any) {
      console.log(error);

      const message =
        error.response.data.message || error.message || "Internal Server Error";
      toast.error(message, { id: "signUpError" });
      setError("root", {
        message: message,
      });
    }
  };

  return (
    <div className="w-full pt-4 ">
      <form
        onSubmit={handleSubmit(OnSubmit)}
        className=" max-sm:w-full text-black dark:text-white"
      >
        <Avater
          className="justify-center items-center flex"
          setimageData={setImageData}
          setImg={setImg}
        />
        <div className="flex w-full flex-col gap-y-4 py-4 text-black dark:text-black">
          <ZodInputField
            label="FullName*"
            type="text"
            placeholder="Ex. John"
            value={register("name")}
            error={errors.name?.message}
          />
          <ZodInputField
            label="email*"
            type="email"
            placeholder="Enter email Address"
            value={register("email")}
            error={errors.email?.message}
          />

          <ZodSelectField
            options={roleValue}
            label="Role"
            value={register("role")}
            error={errors.role?.message}
          />
          <InputField
            label="Years of experience*"
            type="number"
            name="experience"
            placeholder="Enter No of experience"
            value={experienceNo.toString()}
            onChange={(e) => setExperienceNo(e.target.value)}
          />

          {err && (
            <p className="text-red-600 text-sm font-semibold pl-2">{err}</p>
          )}
        </div>

        <h1 className="font-bold underline pb-3 capitalize text-left">
          socialMedia handles*
        </h1>

        <div className="w-full text-black dark:text-black flex flex-row gap-4 pb-2 max-[370px]:flex-col">
          <ZodInputField
            label="Instagram*"
            type="text"
            placeholder="https://Instagram.dev/link/"
            value={register("instagram")}
            className={socialClass}
            error={errors.instagram?.message}
          />
          <ZodInputField
            label="Facebook*"
            className={socialClass}
            type="text"
            placeholder="https://facebook.dev/link/"
            value={register("facebook")}
            error={errors.facebook?.message}
          />
        </div>

        <div className="w-full  text-black dark:text-black flex flex-row gap-4 max-[370px]:flex-col">
          <ZodInputField
            label="Twitter*"
            type="text"
            placeholder="https://twitter.dev/link/"
            value={register("twitter")}
            className={socialClass}
            error={errors.twitter?.message}
          />
          <ZodInputField
            label="WhatsApp*"
            type="text"
            placeholder="08101245121"
            value={register("whatsapp")}
            className={socialClass}
            error={errors.whatsapp?.message}
          />
        </div>

        <div className="w-full my-1 text-left">
          {errors.root && (
            <span className="text-base text-left py-2 text-red-500 font-semibold">
              {errors.root.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`outline-1 disabled:opacity-85 mt-5 hover:shadow-xl transition-all duration-150 max-sm:hover:text-black max-sm:hover:outline-white hover:drop-shadow dark:hover:outline-black    dark:hover:text-black text-black w-full max-sm:dark:hover:text-white ${buttonClassName}`}
        >
          {isSubmitting ? (
            <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
          ) : (
            <p>Create/Save</p>
          )}
        </button>
      </form>
    </div>
  );
};

export const socialClass =
  "border-0 border-b border-b-black/60 border-x-0 border-t-0 transition-all  duration-200 ease-in-out focus:border-b-2 shadow-none focus:outline-none focus:shadow-none focus:drop-shadow-none focus:border-blue-800  outline-none rounded-3xl hover:outline-none drop-shadow-none pl-2";
export default ChiefsForm;

export const roleValue = [
  {
    title: "Select",
    value: "",
  },
  {
    title: "Chief",
    value: "chief",
  },
  {
    title: "worker",
    value: "worker",
  },
  {
    title: "CEO",
    value: "CEO",
  },
  {
    title: "manager",
    value: "manager",
  },
  {
    title: "seller",
    value: "seller",
  },
  {
    title: "caterer",
    value: "caterer",
  },
];
export const statusValue = [
  {
    title: "Select",
    value: "",
  },
  {
    title: "active",
    value: "active",
  },
  {
    title: "passed",
    value: "passed",
  },
];
