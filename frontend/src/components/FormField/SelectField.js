import React from "react";
import { useController } from "react-hook-form";

function SelectField({ label, name, control, optionsArray = [] }) {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ name, control });

  return (
    <div className="space-y-1">
      <label htmlFor={name}>{label}</label>
      <select
        className={`block w-full p-3 border ${invalid ? "border-red-600" : "border-gray-400"}`}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        id={name}
      >
        <option value="">{label}</option>
        {optionsArray.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/** Error Message */}
      {error && <div className="text-xs mt-1 text-red-600">*{error?.message}</div>}
    </div>
  );
}

export default SelectField;
