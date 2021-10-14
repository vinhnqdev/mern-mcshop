import React from "react";
import { useController } from "react-hook-form";

function InputField({ label, labelId, name, control, ...inputProps }) {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ name, control });

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        {...field}
        {...inputProps}
        ref={field.ref}
        className="w-full border border-gray-500 text-lg p-3"
      />
      {/** Error Message */}
      {error && <div className="text-sm mt-1 text-red-600">*{error?.message}</div>}
    </div>
  );
}

export default InputField;
