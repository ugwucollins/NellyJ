import type { OPTIONPROP, SelectFieldProp, ZodSelectFieldProp } from "./Types";

const SelectField = ({
  className,
  value,
  name,
  options,
  label,
  onChange,
}: SelectFieldProp) => {
  return (
    <div className="w-full flex relative flex-col text-left">
      <label htmlFor="category" className="font-bold capitalize text-base">
        {label}*
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        id={name}
        className={`w-full py-2  mt-1.5 dark:text-black text-base font-semibold outline-neutral-400 shadow rounded-2xl px-2 focus:shadow-md outline outline-1 ${className}`}
      >
        {options.map((list: OPTIONPROP, index) => (
          <option
            key={index}
            value={list ? list.value.toString() : ""}
            className="capitalize dark:text-black"
          >
            {list.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export const ZodSelectField = ({
  className,
  value,
  options,
  label,
  error,
}: ZodSelectFieldProp) => {
  return (
    <div className="w-full flex  relative flex-col text-left">
      <label htmlFor="category" className="font-bold capitalize text-base">
        {label}*
      </label>
      <select
        {...value}
        className={`w-full py-2 text-black max-sm:text-black  mt-1.5 dark:text-black text-base font-semibold outline-neutral-400 shadow rounded-2xl px-2 focus:shadow-md outline outline-1 ${className}`}
      >
        {options.map((list: OPTIONPROP, index) => (
          <option
            key={index}
            value={list.value.toString()}
            className="capitalize dark:text-black"
          >
            {list.title}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-red-600 text-sm font-semibold pl-2">{error}</p>
      )}
    </div>
  );
};

export default SelectField;
