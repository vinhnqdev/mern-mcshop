import React from "react";
import { useController } from "react-hook-form";
import { CheckIcon } from "@heroicons/react/solid";
function CheckBoxField({ labelId, name, control, checkboxArray = [] }) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="space-y-1">
      {checkboxArray.map((checkbox) => (
        <div key={checkbox.value} className="relative">
          <div
            className={`absolute left-0 top-0 w-5 h-5 rounded-sm border border-black transition duration-500 ${
              field.value === checkbox.value && "bg-black"
            }`}
          >
            {field.value === checkbox.value && <CheckIcon className="text-white" />}
            {/* <span
              className={`${field.value === checkbox.value && "block w-full h-full bg-black"}`}
            ></span> */}
          </div>
          <input
            type="checkbox"
            id={labelId}
            onChange={field.onChange}
            onBlur={field.onBlur}
            checked={field.value}
            value={field.value}
            className="absolute z-10 w-5 h-5 opacity-0 cursor-pointer"
          />
          <label className="ml-6 cursor-pointer" htmlFor={labelId}>
            {checkbox.label}
          </label>
        </div>
      ))}

      {/** Error Message */}
      {error && <div className="text-sm mt-1 text-red-600">*{error?.message}</div>}
    </div>
  );
}

export default CheckBoxField;
