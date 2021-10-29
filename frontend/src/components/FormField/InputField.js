import React from "react";
import { useController } from "react-hook-form";

function InputField({ label, name, control, ...inputProps }) {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ name, control });

  return (
    <div className="space-y-1">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        {...field}
        {...inputProps}
        ref={field.ref}
        className={`w-full border ${invalid ? "border-red-500" : "border-gray-400"} text-md p-2`}
      />
      {/** Error Message */}
      {error && <div className="text-xs mt-1 text-red-600">*{error?.message}</div>}
    </div>
  );
}

export default InputField;
