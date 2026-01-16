import { LogoIcon } from "../../component/Navbar";
import ChiefsForm from "./ChiefsForm";

const AddChief = () => {
  return (
    <div className="w-full max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center z-[1] bg-transparent max-sm:py-4 text-black dark:text-black  p-4 pt-8">
      <div className="w-full justify-center pb-2 flex items-center">
        <LogoIcon />
      </div>

      <h1 className="py-1 pt-5 font-bold text-2xl w-full text-left">
        Create a Member/Worker
      </h1>
      <p className="text-base  font-bold pb-4 opacity-85 w-full text-left">
        Please fill your details to access your account
      </p>
      <ChiefsForm />
    </div>
  );
};

export default AddChief;
