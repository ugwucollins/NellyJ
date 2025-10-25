import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { CompleteProfileField } from "../../../../Zod/typesField";
import { CompleteProfileSchema } from "../../../../Zod/Schema/Schemas";
import Avater from "../../../../context/Avater";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { ZodInputField } from "../../../../context/InputField";
import { buttonClassName } from "../../../Animation";
import { ZodSelectField } from "../../../../context/SelectField";
import { genderValue } from "../../../ProfileContent/AccountM";
import { UserAuth } from "../../../../context/UserContext";
import toast from "react-hot-toast";

const CompleteForm = ({ _id }: any | string) => {
  const { user, setuser }: any = UserAuth();
  const [img, setImg] = useState("");
  console.log(_id);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: user ? user.email : "",
    },
    resolver: zodResolver(CompleteProfileSchema),
  });
  const onSubmit: SubmitHandler<CompleteProfileField> = async (data) => {
    setTimeout(() => {
      const Info = {
        email: data.email,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        imageUrl: img,
      };
      const UserData = {
        email: user && user.email,
        firstName: user && user.firstName,
        lastName: user && user.lastName,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        imageUrl: img || data.imageUrl,
      };

      if (img.length) {
        console.log(data);
        setuser(UserData);
        setValue("imageUrl", img);
        console.log(Info);
        toast.success("Profile Completed Successfully");
        window.location.replace("/");
      } else {
        toast.error("No Valid Image!");
      }
    }, 1000);
  };
  return (
    <div className="w-full text-black dark:text-black max-sm:dark:text-white max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:text-white z-[1] bg-transparent max-sm:py-4">
      <form
        className="max-sm:w-full text-black dark:text-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-y-4 py-4 text-black dark:text-black max-sm:dark:text-white max-sm:text-white">
          <h1 className="text-center font-bold pb-4 text-lg">
            Complete Profile
          </h1>

          <Avater
            className="justify-center items-center flex"
            setimageData={setImg}
          />
          <div className="w-full flex flex-row gap-4 max-[500px]:flex-col">
            <ZodInputField
              label="phoneNumber*"
              type="number"
              placeholder="Enter phoneNumber"
              value={register("phoneNumber")}
              error={errors.phoneNumber?.message}
            />
            <ZodSelectField
              options={genderValue}
              label="gender*"
              value={register("gender")}
              error={errors.gender?.message}
            />
          </div>

          <ZodInputField
            label="email*"
            type="email"
            placeholder="Enter email Address"
            value={register("email")}
            error={errors.email?.message}
          />

          <button
            disabled={isSubmitting}
            className={`outline-1 disabled:opacity-85 mt-5 hover:shadow-xl transition-all duration-150 max-sm:hover:text-white max-sm:hover:outline-white hover:drop-shadow dark:hover:outline-black  max-sm:dark:hover:outline-white  dark:hover:text-black w-full max-sm:dark:hover:text-white ${buttonClassName}`}
          >
            {isSubmitting ? (
              <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
            ) : (
              <p>Update Changes</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteForm;
