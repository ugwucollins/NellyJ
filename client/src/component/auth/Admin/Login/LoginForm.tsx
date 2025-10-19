import React from "react";
import toast from "react-hot-toast";
import { LogoIcon } from "../../../Navbar";
import InputField from "../../../../context/InputField";
import { Link, useNavigate } from "react-router-dom";
import { buttonClassName } from "../../../Animation";
import { adminPath } from "../../../../context/UserContext";
import { BiLoaderCircle } from "react-icons/bi";

const LoginForm = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState({
    password: "",
    email: "",
  });
  const HandleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const router = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (formData.email.trim() && formData.password.trim()) {
      setFormData({
        password: "",
        email: "",
      });
      toast.success("Login Successfully");
      localStorage.setItem("admin", JSON.stringify(formData));
      localStorage.setItem("index", JSON.stringify(0));
      setTimeout(() => {
        window.location.replace(adminPath);
        router(adminPath);
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
      toast.error("Please Provide the Correct Details");
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
        onSubmit={handleSubmit}
        className="max-sm:w-full text-black dark:text-white"
      >
        <div className="flex flex-col gap-y-4 py-4 text-black dark:text-black max-sm:dark:text-white max-sm:text-white">
          <InputField
            label="email*"
            type="email"
            onChange={HandleChange}
            name="email"
            placeholder="Enter email Address"
            value={formData.email}
          />
          <InputField
            label="password*"
            type="password"
            onChange={HandleChange}
            name="password"
            placeholder="Enter password"
            value={formData.password}
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

        <button
          disabled={loading}
          className={`outline-1 mt-5 disabled:opacity-85 hover:shadow-xl transition-all duration-150 max-sm:hover:text-white max-sm:hover:outline-white hover:drop-shadow w-full max-sm:dark:hover:outline-white hover:outline-black  dark:hover:text-black max-sm:dark:hover:text-white ${buttonClassName}`}
        >
          {loading ? (
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
