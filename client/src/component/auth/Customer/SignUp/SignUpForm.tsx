import { useState } from "react";
import InputField from "../../../../context/InputField";
import { LogoIcon } from "../../../Navbar";
import { buttonClassName } from "../../../Animation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserAuth } from "../../../../context/UserContext";
import { BiLoaderCircle } from "react-icons/bi";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { setuser }: any = UserAuth();
  const from = location.state?.from?.pathname || -1;
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const HandleChange = (e: any) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubumit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const { firstName, lastName, password, email } = formData;
    if (
      formData.email.trim() &&
      formData.password.trim() &&
      formData.firstName.trim() &&
      formData.lastName.trim()
    ) {
      setformData({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
      });
      setuser(firstName, lastName, email, password);
      toast.success("Created Account Successfully");
      setTimeout(() => {
        navigate(from, { replace: true });
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
      toast.error("Please fill In the Gaps");
    }
  };

  return (
    <div className="w-full text-black dark:text-black max-sm:dark:text-white max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:text-white z-[1] bg-transparent max-sm:py-4">
      <LogoIcon />

      <h1 className="py-1 pt-5 font-bold text-2xl w-full text-left">Sign Up</h1>
      <p className="text-base  font-bold pb-4 opacity-85 w-full text-left">
        fill your information below correctly
      </p>

      <form onSubmit={handleSubumit} className="max-sm:w-full">
        <div className="w-full flex flex-row gap-4 max-[400px]:flex-col">
          <InputField
            label="FirstName*"
            type="text"
            onChange={HandleChange}
            name="firstName"
            placeholder="Ex. John"
            value={formData.firstName}
          />
          <InputField
            label="LastName*"
            type="text"
            onChange={HandleChange}
            name="lastName"
            placeholder="Ex. Doe"
            value={formData.lastName}
          />
        </div>

        <div className="flex flex-col gap-y-3.5 py-4">
          <InputField
            label="email*"
            type="tel"
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

        <button
          disabled={loading}
          className={`outline-1 mt-5 disabled:opacity-85 hover:shadow-xl transition-all duration-150 max-sm:hover:text-white max-sm:hover:outline-white hover:drop-shadow w-full max-sm:dark:hover:outline-white hover:outline-black  dark:hover:text-black max-sm:dark:hover:text-white ${buttonClassName}`}
        >
          {loading ? (
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
    </div>
  );
};

export default SignUpForm;
