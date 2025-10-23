import toast from "react-hot-toast";
import { LogoIcon } from "../../../Navbar";
import { ZodInputField } from "../../../../context/InputField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { buttonClassName } from "../../../Animation";
import { adminPath } from "../../../../context/UserContext";
import { BiLoaderCircle } from "react-icons/bi";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../../../Zod/Schema/LoginSchema";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginField } from "../../../../Zod/typesField";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const location = useLocation();
  const from = location.state?.from?.pathname || adminPath;

  const router = useNavigate();

  const OnSubmit: SubmitHandler<LoginField> = async (data) => {
    try {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve;
          localStorage.setItem("admin", JSON.stringify(data));
          localStorage.setItem("index", JSON.stringify(0));
          toast.success("Login Successfully");
          window.location.replace(from);
          router(adminPath);
          setValue("email", "");
          setValue("password", "");
          router(from);
        }, 1000)
      );
    } catch (error: any) {
      const message =
        error.message ||
        "Server Error Pls try Again" ||
        "Please Provide the Correct Details";
      toast.error(message);
      setError("root", {
        message: message,
      });
    }
  };

  return (
    <div className="w-full max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:text-white z-[1] bg-transparent max-sm:py-4 text-black dark:text-black max-sm:dark:text-white">
      <LogoIcon />

      <h1 className="py-1 pt-5 font-bold text-2xl w-full text-left">
        Admin LogIn
      </h1>
      <p className="text-base  font-bold pb-4 opacity-85 w-full text-left">
        Please fill your details to access your account
      </p>

      <form
        onSubmit={handleSubmit(OnSubmit)}
        className="max-sm:w-full text-black dark:text-white"
      >
        <div className="flex flex-col gap-y-4 py-4 text-black dark:text-black max-sm:dark:text-white max-sm:text-white">
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
        </div>

        <div className="w-full justify-end flex">
          <Link
            to={"/auth/forget-password"}
            className="font-semibold hover:font-bold underline max-sm:text-white text-blue-800"
          >
            Forget Password?
          </Link>
        </div>

        {errors.root && (
          <span className="text-base text-red-500 font-semibold">
            {errors.root.message}
          </span>
        )}

        <button
          disabled={isSubmitting}
          className={`outline-1 disabled:opacity-85 mt-5 hover:shadow-xl transition-all duration-150 max-sm:hover:text-white max-sm:hover:outline-white hover:drop-shadow dark:hover:outline-black  max-sm:dark:hover:outline-white  dark:hover:text-black w-full max-sm:dark:hover:text-white ${buttonClassName}`}
        >
          {isSubmitting ? (
            <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
          ) : (
            <p>LogIn</p>
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
