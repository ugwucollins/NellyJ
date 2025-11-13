import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { buttonClassName } from "../Animation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ZodInputField } from "../../context/InputField";
import type { PasswordUpdateField } from "../../Zod/typesField";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordUpdateSchema } from "../../Zod/Schema/Schemas";
import { BiLoaderCircle } from "react-icons/bi";
import { UserAuth } from "../../context/UserContext";
import ApiURL from "../../context/Api";
// const InputField = lazy(() => import("../../context/InputField"));

export type ProfileMProp = {
  setCurrentIndex?: React.Dispatch<React.SetStateAction<string>> | any;
};
const PasswordM = ({ setCurrentIndex }: ProfileMProp) => {
  const { user }: any = UserAuth();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(PasswordUpdateSchema),
  });

  const onSubmit: SubmitHandler<PasswordUpdateField> = async (data) => {
    try {
      if (!data.password.trim()) {
        const message = "Please put the correct password";
        setError("password", {
          message: message,
        });
      } else if (data.password === data.newPassword) {
        const message = "Please put a new different password";
        setError("newPassword", {
          message: message,
        });
      } else if (data.newPassword !== data.confirmPassword) {
        const message = "Your password must be the same";
        setError("confirmPassword", {
          message: message,
        });
      } else {
        const info = {
          password: data.password,
          newPassword: data.confirmPassword,
        };

        const res = await ApiURL.put(`/user/password/${user._id}`, info);
        const userInfo = res.data;

        if (userInfo.success) {
          toast.success(userInfo.message || "Password Has been Updated");
          setValue("confirmPassword", "");
          setValue("password", "");
          setValue("newPassword", "");
          setTimeout(() => {
            setCurrentIndex("account");
          }, 1000);
        } else {
          setError("password", {
            message: userInfo.message,
          });
          toast.error(userInfo.message || "Password Update failed");
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setError("root", {
        message: error.response.data.message || error.message,
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col w-full gap-y-4">
        <div className="relative">
          <ZodInputField
            label="Password*"
            type="password"
            error={errors.password?.message}
            value={register("password")}
            placeholder="Enter Password"
          />

          <Link to={""}>
            <p className="font-semibold hover:font-bold text-sm underline w-full transition-all duration-200 text-right py-3">
              Forgot Password?
            </p>
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <ZodInputField
            label="New Password*"
            type="password"
            error={errors.newPassword?.message}
            value={register("newPassword")}
            placeholder="Enter New Password"
          />
          <ZodInputField
            label="Confirm New Password*"
            type="password"
            error={errors.confirmPassword?.message}
            value={register("confirmPassword")}
            placeholder="Enter Confirm New Password"
          />

          {errors.root && (
            <span className="text-base text-red-500 font-semibold">
              {errors.root.message}
            </span>
          )}

          <div className="w-full justify-start py-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`outline-1 disabled:line-through disabled:text-sm font-medium hover:font-semibold ${buttonClassName}`}
            >
              {isSubmitting ? (
                <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
              ) : (
                <p>Update Password</p>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordM;
