import toast from "react-hot-toast";
import { LogoIcon } from "../../../Navbar";
import { ZodInputField } from "../../../../context/InputField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { buttonClassName } from "../../../Animation";
import { sellerPath } from "../../../../context/UserContext";
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
  const from = location.state?.from?.pathname || sellerPath;

  const router = useNavigate();

  const OnSubmit: SubmitHandler<LoginField> = async (data) => {
    try {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve;
          localStorage.setItem("seller", JSON.stringify(data));
          localStorage.setItem("index", JSON.stringify(0));
          toast.success("Login Successfully", { id: "loginS" });
          window.location.replace(from);
          setValue("email", "");
          setValue("password", "");
          router(from);
        }, 500)
      );
    } catch (error: any) {
      const message =
        error.message ||
        "Server Error Pls try Again" ||
        "Please Provide the Correct Details";
      toast.error(message, { id: "loginSError" });
      setError("root", {
        message: message,
      });
    }
  };

  return (
    <div className="w-full max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:text-white z-[1] bg-transparent max-sm:py-4 text-black dark:text-black max-sm:dark:text-white">
      <LogoIcon />

      <h1 className="py-1 pt-5 font-bold text-2xl w-full text-left">
        Sellers LogIn
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

// const LoginForm = () => {
//   const [loading, setLoading] = React.useState<boolean>(false);
//   const [formData, setFormData] = React.useState({
//     password: "",
//     email: "",
//   });
//   const location = useLocation();
//   const from = location.state?.from?.pathname || sellerPath;

//   const HandleChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const router = useNavigate();
//   const handleSubmit = (e: any) => {
//     e.preventDefault();

//     setLoading(true);

//     if (formData.email.trim() && formData.password.trim()) {
//       setFormData({
//         password: "",
//         email: "",
//       });
//       localStorage.setItem("seller", JSON.stringify(formData));
//       localStorage.setItem("index", JSON.stringify(0));
//       toast.success("Login Successfully");
//       setTimeout(() => {
//         window.location.replace(from);
//         router(from);
//         setLoading(false);
//       }, 1000);
//     } else {
//       setLoading(false);
//       toast.error("Please Provide the Correct Details");
//     }
//   };

//   return (
//     <div className="w-full max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:text-white z-[1] bg-transparent max-sm:py-4 text-black dark:text-black max-sm:dark:text-white">
//       <LogoIcon />

//       <h1 className="py-1 pt-5 font-bold text-2xl w-full text-left">
//         Sellers LogIn
//       </h1>
//       <p className="text-base  font-bold pb-4 opacity-85 w-full text-left">
//         Please fill your details to access your account
//       </p>

//       <form
//         onSubmit={handleSubmit}
//         className="max-sm:w-full text-black dark:text-white"
//       >
//         <div className="flex flex-col gap-y-4 py-4 text-black dark:text-black max-sm:dark:text-white max-sm:text-white">
//           <InputField
//             label="email*"
//             type="email"
//             onChange={HandleChange}
//             name="email"
//             placeholder="Enter email Address"
//             value={formData.email}
//           />
//           <InputField
//             label="password*"
//             type="password"
//             onChange={HandleChange}
//             name="password"
//             placeholder="Enter password"
//             value={formData.password}
//           />
//         </div>

//         <div className="w-full justify-end flex">
//           <Link
//             to={"/auth/forget-password"}
//             className="font-semibold hover:font-bold underline max-sm:text-white text-blue-800"
//           >
//             Forget Password?
//           </Link>
//         </div>

//         <button
//           disabled={loading}
//           className={`outline-1 disabled:opacity-85 mt-5 hover:shadow-xl transition-all duration-150 max-sm:hover:text-white max-sm:hover:outline-white hover:drop-shadow dark:hover:outline-black  max-sm:dark:hover:outline-white  dark:hover:text-black w-full max-sm:dark:hover:text-white ${buttonClassName}`}
//         >
//           {loading ? (
//             <BiLoaderCircle className="text-2xl w-full animate-spin transition-all duration-150" />
//           ) : (
//             <p>LogIn</p>
//           )}
//         </button>
//       </form>
//       {/* <p className="w-full pt-3 text-base font-semibold opacity-90">
//         Don't have an account?{" "}
//         <Link
//           to={"/auth/signup"}
//           className="underline max-sm:bg-black/50 ml-1 hover:font-bold text-blue-800"
//         >
//           Sign Up
//         </Link>
//       </p> */}
//     </div>
//   );
// };

export default LoginForm;
