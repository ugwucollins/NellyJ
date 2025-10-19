import type { OPTIONPROP, SelectFieldProp } from "./Types";

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
        className={`w-full py-2  mt-1.5 text-base font-semibold outline-neutral-400 shadow rounded-2xl px-2 focus:shadow-md outline outline-1 ${className}`}
      >
        {options.map((list: OPTIONPROP, index) => (
          <option key={index} value={list.value} className="capitalize">
            {list.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
