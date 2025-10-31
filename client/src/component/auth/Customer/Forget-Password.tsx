import { LogoIcon } from "../../Navbar";
import { Link, useNavigate } from "react-router-dom";
import { ZodInputField } from "../../../context/InputField";
import { ImageSection } from "./SignIn/SignIn";
import { Assets } from "../../assets";
import { buttonClassName } from "../../Animation";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { NewsLetterField } from "../../../Zod/typesField";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewsLetterSchema } from "../../../Zod/Schema/Schemas";
import { BiLoaderCircle } from "react-icons/bi";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  return (
    <div className="w-full h-[90vh] overflow-hidden flex max-sm:bg-white bg-neutral-50 flex-col justify-center min-h-screen items-center max-sm:px-1">
      <div className="w-full max-w-5xl gap-x-5 px-10 max-sm:px-6 max-[170px]:px-2  flex bg-white justify-center items-center py-12 rounded-xl shadow-xl max-sm:shadow-slate-50 drop-shadow-md max-sm:bg-[url('/food_images/bg-a.jpg')] max-sm:object-cover max-sm:relative z-0">
        <div className="w-full hidden max-sm:block h-full absolute top-0 left-0 bg-black/30 max-sm:text-white rounded-xl backdrop-blur-sm " />
        <ForgetPasswordForm />
        <ImageSection image={Assets.background_Home1} />
      </div>
    </div>
  );
};

export default ForgetPassword;

export const ForgetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(NewsLetterSchema),
  });
  const router = useNavigate();
  const onSubmit: SubmitHandler<NewsLetterField> = (data) => {
    try {
      toast.success("Please check your email", {
        id: "password",
      });
      setTimeout(() => {
        setValue("email", "");
        console.log(data);
        router(-1);
      }, 1000);
    } catch (error: any) {
      setError("root", {
        message: error.message,
      });
    }
  };

  return (
    <div className="w-full max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:text-white z-[1] bg-transparent max-sm:py-4">
      <LogoIcon />

      <h1 className="py-1 pt-5 font-bold text-2xl w-full text-left">Sign In</h1>
      <p className="text-base  font-bold pb-4 opacity-85 w-full text-left">
        Please fill your details to access your account
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="max-sm:w-full py-1">
        <ZodInputField
          label="email*"
          type="email"
          error={errors.email?.message}
          placeholder="Enter email Address"
          value={register("email")}
        />

        {errors.root && (
          <span className="text-left text-base text-red-600">
            {errors.root.message}
          </span>
        )}

        <button
          className={`outline-1 mt-6 hover:shadow-xl transition-all duration-150 max-sm:hover:text-white max-sm:hover:outline-white hover:drop-shadow w-full ${buttonClassName}`}
        >
          {isSubmitting ? (
            <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
          ) : (
            <p>Forget Password</p>
          )}
        </button>
      </form>

      <p className="w-full pt-3 text-base font-semibold opacity-90">
        Already have an account?{" "}
        <Link
          to={"/auth/signin"}
          className="underline hover:font-bold text-blue-800"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};
