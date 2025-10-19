import { useState } from "react";
import { LogoIcon } from "../../Navbar";
import { Link } from "react-router-dom";
import InputField from "../../../context/InputField";
import { ImageSection } from "./SignIn/SignIn";
import { Assets } from "../../assets";
import { buttonClassName } from "../../Animation";

const ForgetPassword = () => {
  return (
    <div className="w-full flex max-sm:bg-white bg-neutral-50 flex-col justify-center min-h-screen items-center max-sm:px-1">
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
  const [email, setemail] = useState("");

  const handleSubumit = (e: any) => {
    e.preventDefault();
    setemail("");
  };

  return (
    <div className="w-full max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:text-white z-[1] bg-transparent max-sm:py-4">
      <LogoIcon />

      <h1 className="py-1 pt-5 font-bold text-2xl w-full text-left">Sign In</h1>
      <p className="text-base  font-bold pb-4 opacity-85 w-full text-left">
        Please fill your details to access your account
      </p>

      <form onSubmit={handleSubumit} className="max-sm:w-full py-1">
        <InputField
          label="email*"
          type="email"
          onChange={(e) => setemail(e.target.value)}
          name="email"
          placeholder="Enter email Address"
          value={email}
        />

        <button
          className={`outline-1 mt-6 hover:shadow-xl transition-all duration-150 max-sm:hover:text-white max-sm:hover:outline-white hover:drop-shadow w-full ${buttonClassName}`}
        >
          <p>Forget Password</p>
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
