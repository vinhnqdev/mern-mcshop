import React from "react";
import { useController } from "react-hook-form";

function RadioField({ label, name, control, radioArray = [] }) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="space-y-1">
      <label htmlFor={name}>{label}</label>

      {radioArray.map((radio) => (
        <div key={radio.value} className="relative">
          <div className="absolute left-0 p-1 top-0 w-5 h-5 rounded-sm border border-black">
            <span
              className={`${field.value === radio.value && "block w-full h-full bg-black"}`}
            ></span>
          </div>
          <input
            type="radio"
            id={radio.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            checked={radio.value === field.value}
            value={radio.value}
            className="absolute z-10 w-5 h-5 opacity-0 cursor-pointer"
          />
          <label className="ml-6 cursor-pointer" htmlFor={radio.value}>
            {radio.label}
          </label>
        </div>
      ))}

      {/** Error Message */}
      {error && <div className="text-sm mt-1 text-red-600">*{error?.message}</div>}
    </div>
  );
}

export default RadioField;
