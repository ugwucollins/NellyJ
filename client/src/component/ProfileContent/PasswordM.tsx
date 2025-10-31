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
// const InputField = lazy(() => import("../../context/InputField"));

const PasswordM = () => {
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
  const onSubmit: SubmitHandler<PasswordUpdateField> = (data) => {
    try {
      if (user && user.password !== data.password) {
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
        console.log(data);
        toast.success("Password Has been Updated");
        setValue("confirmPassword", "");
        setValue("password", "");
        setValue("newPassword", "");
      }
    } catch (error: any) {
      setError("root", {
        message: error.message,
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

          {errors.root && (
            <span className="text-base text-red-500 font-semibold">
              {errors.root.message}
            </span>
          )}
        </form>
      </div>
    </div>
  );
};
// const PasswordM = () => {
//   const [password, setpassword] = useState("");
//   const [Newpassword, setNewpassword] = useState("");
//   const [Confirmpassword, setConfirmpassword] = useState("");

//   const handleSubumit = (e: any) => {
//     e.preventDefault();
//     if (Newpassword.trim() && Confirmpassword.trim() && password.trim()) {
//       if (password === Newpassword) {
//         toast.error("Password Already Exist, Please Add A new One");
//       }

//       if (Newpassword === Confirmpassword) {
//         console.log("yes");
//         setConfirmpassword("");
//         setNewpassword("");
//         setpassword("");
//         toast.success("Password Has been Changed successfully");
//       } else {
//         console.log("NO");
//         toast.error("New Password and Confirm Password must Match", {
//           position: "bottom-right",
//         });
//       }
//     } else {
//       toast.error("Please Enter The Correct Password");
//     }
//   };

//   return (
//     <div>
//       <div className="flex flex-col w-full gap-y-4">
//         <div className="relative">
//           <InputField
//             label="Password*"
//             type="password"
//             value={password}
//             name="password"
//             placeholder="Enter Password"
//             onChange={(e) => setpassword(e.target.value)}
//           />

//           <Link to={""}>
//             <p className="font-semibold hover:font-bold text-sm underline w-full transition-all duration-200 text-right py-3">
//               Forgot Password?
//             </p>
//           </Link>
//         </div>

//         <form onSubmit={handleSubumit} className="flex flex-col gap-4">
//           <InputField
//             label="New Password*"
//             type="password"
//             value={Newpassword}
//             name="Newpassword"
//             placeholder="Enter Password"
//             onChange={(e) => setNewpassword(e.target.value)}
//           />

//           <InputField
//             label="Confirm New Password*"
//             type="password"
//             value={Confirmpassword}
//             name="Confirmpassword"
//             placeholder="Enter Password"
//             onChange={(e) => setConfirmpassword(e.target.value)}
//           />

//           <div className="w-full justify-start py-2">
//             <button
//               type="submit"
//               disabled={!Newpassword || !Confirmpassword}
//               className={`outline-1 disabled:line-through disabled:text-sm font-medium hover:font-semibold ${buttonClassName}`}
//             >
//               <p>Update Password</p>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

export default PasswordM;
