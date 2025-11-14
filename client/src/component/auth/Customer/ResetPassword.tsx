import { BiLoaderCircle } from "react-icons/bi";
import { ImageSection } from "./SignIn/SignIn";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { LogoIcon } from "../../Navbar";
import { ZodInputField } from "../../../context/InputField";
import { buttonClassName } from "../../Animation";
import { Assets } from "../../assets";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordResetSchema } from "../../../Zod/Schema/Schemas";
import type { PasswordResetField } from "../../../Zod/typesField";
import toast from "react-hot-toast";
import ApiURL from "../../../context/Api";
import { NotAuth } from "../../../context/UserContext";

const ResetPassword = () => {
  const { id, token } = useParams();

  return (
    <div className="w-full h-[90vh] overflow-hidden flex max-sm:bg-white bg-neutral-50 flex-col justify-center min-h-screen items-center max-sm:px-1">
      <div className="w-full max-w-5xl gap-x-5 px-10 max-sm:px-6 max-[170px]:px-2  flex bg-white justify-center items-center py-12 rounded-xl shadow-xl max-sm:shadow-slate-50 drop-shadow-md max-sm:bg-[url('/food_images/bg-a.jpg')] max-sm:object-cover max-sm:relative z-0">
        <div className="w-full hidden max-sm:block h-full absolute top-0 left-0 bg-black/30 max-sm:text-white rounded-xl backdrop-blur-sm " />
        <ResetPasswordForm token={token!} id={id!} />
        <ImageSection image={Assets.Mixedfood3} />
      </div>
    </div>
  );
};
type ResetPasswordFormProp = {
  token: string;
  id: string;
};

export const ResetPasswordForm = ({ token, id }: ResetPasswordFormProp) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(PasswordResetSchema),
  });
  const router = useNavigate();

  const onSubmit: SubmitHandler<PasswordResetField> = async (data) => {
    const { password } = data;

    try {
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          message: "The password must be the same",
        });
      } else {
        const res = await ApiURL.post(`/reset_password/${id}/${token}`, {
          password: password,
        });
        const userInfo = res.data;
        if (userInfo.success) {
          toast.success(userInfo.message || "Password has been Updated", {
            id: "password",
          });
          setTimeout(() => {
            setValue("password", "");
            setValue("confirmPassword", "");
            router(NotAuth);
          }, 1000);
        } else {
          toast.error(userInfo.message, {
            id: "password",
          });
        }
      }
    } catch (error: any) {
      console.log(error);

      setError("root", {
        message: error.response.data.message || error.message,
      });
    }
  };

  return (
    <div className="w-full max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:text-white z-[1] bg-transparent max-sm:py-4">
      <LogoIcon />

      <h1 className="py-1 pt-5 font-bold text-2xl w-full text-left">
        Reset Password
      </h1>
      <p className="text-base  font-bold pb-4 opacity-85 w-full text-left">
        Please Enter the Password you can remember for Easy access to your
        account
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-sm:w-full py-1 flex gap-3 flex-col"
      >
        <ZodInputField
          label="password*"
          type="password"
          error={errors.password?.message}
          placeholder="Enter New password"
          value={register("password")}
        />
        <ZodInputField
          label="Confirm password*"
          type="password"
          error={errors.confirmPassword?.message}
          placeholder="Confirm Your password "
          value={register("confirmPassword")}
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
            <p>Reset Password</p>
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

export default ResetPassword;
