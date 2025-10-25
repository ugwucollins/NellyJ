import type { TextareaProp, zodTextareaProp } from "./Types";

const TextAreaField = ({
  placeholder,
  className,
  value,
  row,
  col,
  name,
  label,
  onChange,
}: TextareaProp) => {
  return (
    <div className="flex gap-2.5 py-2 flex-col">
      <label htmlFor="message" className="text-sm font-bold">
        {label}*
      </label>
      <textarea
        name={name}
        className={`px-4 focus:shadow-lg transition-all duration-150 focus:drop-shadow text-black py-5 w-full rounded-xl placeholder:font-bold focus:text-base text-sm focus:rounded-3xl outline outline-1 outline-gray-500 ${className}`}
        rows={row ? row : 5}
        value={value}
        cols={col ? col : 4}
        onChange={onChange}
        placeholder={placeholder}
        id={name}
      ></textarea>
    </div>
  );
};
export const ZodTextAreaField = ({
  placeholder,
  className,
  value,
  row,
  col,
  label,
  error,
}: zodTextareaProp) => {
  return (
    <div className="flex gap-2.5 py-2 flex-col">
      <label htmlFor="message" className="text-sm font-bold">
        {label}*
      </label>
      <textarea
        className={`px-4 focus:shadow-lg transition-all duration-150 focus:drop-shadow text-black py-5 w-full rounded-xl placeholder:font-bold focus:text-base text-sm focus:rounded-3xl outline outline-1 outline-gray-500 ${className}`}
        rows={row ? row : 5}
        {...value}
        cols={col ? col : 4}
        placeholder={placeholder}
      />
      {error && (
        <p className="text-red-600 text-sm font-semibold pl-2">{error}</p>
      )}
    </div>
  );
};

export default TextAreaField;
