import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { CompleteProfileField } from "../../../../Zod/typesField";
import { CompleteProfileSchema } from "../../../../Zod/Schema/Schemas";
import Avater from "../../../../context/Avater";
import { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import InputField, { ZodInputField } from "../../../../context/InputField";
import { buttonClassName } from "../../../Animation";
import { ZodSelectField } from "../../../../context/SelectField";
import { genderValue } from "../../../ProfileContent/AccountM";
import toast from "react-hot-toast";
import ApiURL from "../../../../context/Api";
import { UserAuth } from "../../../../context/UserContext";

const CompleteForm = ({ _id }: any | string) => {
  const localJson: any = localStorage.getItem("id");
  const [Id, setId] = useState(JSON.parse(localJson));
  const { setuser }: any = UserAuth();
  const [imageData, setImageData] = useState(null);
  const [img, setImg] = useState("");
  const [email, setEmail] = useState("");

  async function GetUserEmail() {
    const Ids = _id.length <= 5 ? Id : _id;
    const res = await ApiURL.get("/user/" + Ids);
    const data = res.data;
    setId;
    setEmail(data.data.email);
  }

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(CompleteProfileSchema),
  });
  useEffect(() => {
    GetUserEmail();
  }, []);

  const onSubmit: SubmitHandler<CompleteProfileField> = async (data) => {
    const Info = {
      email: email,
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      imageUrl: JSON.stringify(img),
    };

    try {
      if (imageData && img.length && email.trim()) {
        const res = await ApiURL.post("/completeProfile", Info);
        const UserData = res.data;
        console.log(UserData);

        if (UserData.success) {
          setValue("imageUrl", img);
          toast.success("Profile Completed Successfully");
          setuser(UserData.data);
          setTimeout(() => {
            localStorage.removeItem("id");
            window.location.replace("/auth/signin");
          }, 1000);
        } else {
          toast.error(UserData.message, { id: "UserData" });
        }
      } else {
        toast.error("Please Put an Image");
      }
    } catch (error: any) {
      console.log(error);

      toast.error(error.response.data.message || error.message);
    }
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
            setimageData={setImageData}
            setImg={setImg}
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

          <InputField
            label="email*"
            type="email"
            name="email"
            onChange={() => console.log(email)}
            placeholder="Enter email Address"
            value={email}
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
