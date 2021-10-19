import React from "react";
import { useController } from "react-hook-form";

function TextAreaField({ label, name, control, ...textAreaField }) {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ name, control });

  return (
    <div className="space-y-1">
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        {...field}
        {...textAreaField}
        className={`w-full border ${invalid ? "border-red-500" : "border-gray-400"} text-md p-2`}
      />
      {/** Error Message */}
      {error && <div className="text-sm mt-1 text-red-600">*{error?.message}</div>}
    </div>
  );
}

export default TextAreaField;
