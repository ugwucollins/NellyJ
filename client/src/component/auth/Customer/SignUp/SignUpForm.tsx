import { ZodInputField } from "../../../../context/InputField";
import { LogoIcon } from "../../../Navbar";
import { buttonClassName } from "../../../Animation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserAuth } from "../../../../context/UserContext";
import { BiLoaderCircle } from "react-icons/bi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { RegisterSchema } from "../../../../Zod/Schema/RegisterSchema";
import type { RegisterField } from "../../../../Zod/typesField";

const SignUpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setuser }: any = UserAuth();
  const from = location.state?.from?.pathname || -1;
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const OnSubumit: SubmitHandler<RegisterField> = async (data) => {
    const { firstName, lastName, password, email } = data;
    const UserData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    };

    try {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve;
          setuser(UserData);
          toast.success("Created Account Successfully");
          navigate(from, { replace: true });
          setValue("firstName", "");
          setValue("lastName", "");
          setValue("email", "");
          setValue("password", "");
        }, 500)
      );
    } catch (error: any) {
      const message = error.message || "Internal Server Error";
      toast.error(message);
      setError("root", {
        message: message,
      });
    }
  };

  return (
    <div className="w-full text-black dark:text-black max-sm:dark:text-white max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:text-white z-[1] bg-transparent max-sm:py-4">
      <LogoIcon />

      <h1 className="py-1 pt-5 font-bold text-2xl w-full text-left">Sign Up</h1>
      <p className="text-base  font-bold pb-4 opacity-85 w-full text-left">
        fill your information below correctly
      </p>

      <form onSubmit={handleSubmit(OnSubumit)} className="max-sm:w-full">
        <div className="w-full flex flex-row gap-4 max-[400px]:flex-col">
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

        <div className="flex flex-col gap-y-3.5 py-4">
          <ZodInputField
            label="email*"
            type="tel"
            placeholder="Enter email Address"
            value={register("email")}
            error={errors.email?.message}
          />
          <ZodInputField
            label="password*"
            type="password"
            placeholder="Enter password"
            value={register("password")}
            error={errors.password?.message}
          />
        </div>

        <button
          disabled={isSubmitting}
          className={`outline-1 mt-5 disabled:opacity-85 hover:shadow-xl transition-all duration-150 max-sm:hover:text-white max-sm:hover:outline-white hover:drop-shadow w-full max-sm:dark:hover:outline-white hover:outline-black  dark:hover:text-black max-sm:dark:hover:text-white ${buttonClassName}`}
        >
          {isSubmitting ? (
            <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
          ) : (
            <p>Sign UP</p>
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

      {errors.root && (
        <span className="text-base text-red-500 font-semibold">
          {errors.root.message}
        </span>
      )}
    </div>
  );
};

export default SignUpForm;
