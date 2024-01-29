import { classNames } from "~/utilities/classNames";
import convertToCapitalizedWords from "~/utilities/convertToCapitalizedWords";
import FormError from "../FormError";
import { useState } from "react";
import icons from "~/assets/js/icons";

const TextInput = ({
  type,
  register,
  rules,
  label,
  title,
  errors,
  name,
  placeholder,
  className,
  required, // set to true or pass custom error message as string if field is required
  min,
  max,
}) => {
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="w-full">
      <label htmlFor={label} className="block mb-1 text-sm font-medium text-black">
        {title || convertToCapitalizedWords(label)}
        {required ? <span className="text-error ml-px">*</span> : null}
      </label>
      <div className="relative group">
        <input
          type={type !== "password" ? type : showPwd ? "text" : "password"}
          id={label}
          name={name || label}
          className={classNames(
            "bg-primary-light border border-gray placeholder:text-gray rounded-md block w-full text-sm p-3 h-12",
            "focus:ring focus:ring-primary/20 focus:outline-none focus:bg-white focus:border-transparent transition-all",
            errors?.[label]?.message && "border-error",
            type === "password" ? "pr-8" : "pr-3",
            className
          )}
          {...register(label, {
            required: required && typeof required === "boolean" ? "This field is required" : required,
            ...rules,
          })}
          placeholder={placeholder}
          min={min}
          max={max}
        />
        {type === "password" && (
          <button
            className="absolute top-3.5 right-3 text-gray group-focus-within:text-black transition-all"
            type="button"
            onClick={() => setShowPwd(!showPwd)}
          >
            {showPwd ? icons.eyeSlash : icons.eye}
          </button>
        )}
      </div>
      <FormError error={errors?.[label]?.message} />
    </div>
  );
};

export default TextInput;
