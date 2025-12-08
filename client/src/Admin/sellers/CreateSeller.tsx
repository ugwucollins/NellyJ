import { BiLoaderCircle, BiX } from "react-icons/bi";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminPath } from "../../context/UserContext";
import type { RegisterSellersField } from "../../Zod/typesField";
import toast from "react-hot-toast";
import { LogoIcon } from "../../component/Navbar";
import { ZodInputField } from "../../context/InputField";
import { buttonClassName } from "../../component/Animation";
import { RegisterSellerSchema } from "../../Zod/Schema/RegisterSchema";
import ApiURL from "../../context/Api";
import { UserAdminAuth } from "../context/AdminContext";

const CreateSeller = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(RegisterSellerSchema),
  });
  const { GetAllSellers }: any = UserAdminAuth();

  const OnSubmit: SubmitHandler<RegisterSellersField> = async (data) => {
    const { firstName, lastName, password, email, phoneNumber } = data;
    const { VITE_SELLER_EMAIL } = import.meta.env;
    const UserData = {
      email: email,
      accountEmail: email + VITE_SELLER_EMAIL,
      firstName: firstName,
      lastName: lastName,
      password: password,
      phoneNumber: phoneNumber,
    };

    try {
      const res = await ApiURL.post("/create/seller", UserData);
      const data = res.data;

      if (data.success) {
        setTimeout(() => {
          toast.success(data.message, { id: "signUp" });
          setValue("firstName", "");
          setValue("lastName", "");
          setValue("email", "");
          setValue("password", "");
        }, 100);
        window.location.replace(adminPath + "/sellers");
        GetAllSellers();
      } else {
        toast.error(data.message);
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
    <div className="w-full max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center z-[1] bg-transparent max-sm:py-4 text-black dark:text-black  p-4">
      <div className="w-full justify-center pb-2 flex items-center">
        <LogoIcon />
      </div>

      <h1 className="py-1 pt-5 font-bold text-2xl w-full text-left">
        Create Sellers
      </h1>
      <p className="text-base  font-bold pb-4 opacity-85 w-full text-left">
        Please fill your details to access your account
      </p>

      <form
        onSubmit={handleSubmit(OnSubmit)}
        className="max-sm:w-full text-black dark:text-white"
      >
        <div className="w-full text-black dark:text-black flex flex-row gap-4 max-[400px]:flex-col">
          <ZodInputField
            label="FirstName*"
            type="text"
            placeholder="Ex. John"
            value={register("firstName")}
            error={errors.firstName?.message}
          />
          <ZodInputField
            label="LastName*"
            type="text"
            placeholder="Ex. Doe"
            value={register("lastName")}
            error={errors.lastName?.message}
          />
        </div>
        <div className="flex flex-col gap-y-4 py-4 text-black dark:text-black">
          <ZodInputField
            label="email*"
            type="email"
            placeholder="Enter email Address"
            value={register("email")}
            error={errors.email?.message}
          />
          <ZodInputField
            label="password*"
            type="password"
            error={errors.password?.message}
            placeholder="Enter password"
            value={register("password")}
          />
          <ZodInputField
            label="phoneNumber*"
            type="number"
            placeholder="Enter phoneNumber"
            value={register("phoneNumber")}
            error={errors.phoneNumber?.message}
          />
        </div>

        {errors.root && (
          <span className="text-base text-red-500 font-semibold">
            {errors.root.message}
          </span>
        )}

        <button
          disabled={isSubmitting}
          className={`outline-1 disabled:opacity-85 mt-5 hover:shadow-xl transition-all duration-150 max-sm:hover:text-black max-sm:hover:outline-white hover:drop-shadow dark:hover:outline-black    dark:hover:text-black text-black w-full max-sm:dark:hover:text-white ${buttonClassName}`}
        >
          {isSubmitting ? (
            <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
          ) : (
            <p>Create Seller</p>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateSeller;

export const ModelForm = ({ children, onClose }: any) => {
  return (
    <div className="w-full z-[3] h-screen flex flex-col justify-center text-center items-center bg-black/50 fixed top-0 left-0">
      <div className="shadow-md relative drop-shadow bg-white p-4 rounded-lg">
        <div
          onClick={onClose}
          className="absolute cursor-pointer top-5 text-3xl text-black right-5"
        >
          <BiX />
        </div>
        {children}
      </div>
    </div>
  );
};
