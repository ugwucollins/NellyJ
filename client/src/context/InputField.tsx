import { useState } from "react";
import type { InputProp, ZodInputProp } from "./Types";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const InputField = ({
  placeholder,
  type,
  className,
  value,
  name,
  label,
  onChange,
}: InputProp) => {
  const [show, setshow] = useState(false);
  const handleShow = () => {
    setshow(!show);
  };

  return (
    <div className="w-full flex relative gap-2 flex-col text-left">
      <label htmlFor={name} className="text-sm font-bold capitalize">
        {label}
      </label>
      <input
        type={type === "password" ? (show ? "text" : "password") : type}
        className={`py-2.5 text-black px-4 font-semibold rounded-full w-full text-sm outline-1 outline outline-gray-500 focus:font-bold placeholder:font-normal focus:text-base focus:outline-[1.5px] transition-all shadow-sm drop-shadow-sm focus:shadow-inner focus:drop-shadow-lg  ${className}`}
        placeholder={placeholder}
        value={value && value}
        name={name}
        id={name}
        onChange={(e) => onChange(e)}
      />

      {type === "password" && (
        <span className="top-3.5 pt-6 text-black right-2.5 cursor-pointer text-xl absolute">
          {show ? (
            <BsEye onClick={handleShow} />
          ) : (
            <BsEyeSlash onClick={handleShow} />
          )}
        </span>
      )}
    </div>
  );
};

export const ZodInputField = ({
  value,
  type,
  className,
  label,
  error,
  placeholder,
}: ZodInputProp) => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="w-full flex relative gap-2 flex-col text-left">
      <label className="text-sm font-bold capitalize">{label}</label>
      <input
        type={type === "password" ? (show ? "text" : "password") : type}
        className={`py-2.5 text-black px-4 font-semibold rounded-full w-full text-sm outline-1 outline outline-gray-500 focus:font-bold placeholder:font-normal focus:text-base focus:outline-[1.5px] transition-all shadow-sm drop-shadow-sm focus:shadow-inner focus:drop-shadow-lg  ${className}`}
        placeholder={placeholder}
        {...value}
      />

      {type === "password" && (
        <span className="top-3.5 pt-6 text-black right-2.5 cursor-pointer text-xl absolute">
          {show ? (
            <BsEye onClick={handleShow} />
          ) : (
            <BsEyeSlash onClick={handleShow} />
          )}
        </span>
      )}
      {error && (
        <p className="text-red-600 text-sm font-semibold pl-2">{error}</p>
      )}
    </div>
  );
};

export default InputField;
