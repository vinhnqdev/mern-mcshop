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
        <div key={radio.value}>
          <input
            type="radio"
            id={radio.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            checked={radio.value === field.value}
            value={radio.value}
          />
          <label htmlFor={radio.value}>{radio.label}</label>
        </div>
      ))}

      {/** Error Message */}
      {error && <div className="text-sm mt-1 text-red-600">*{error?.message}</div>}
    </div>
  );
}

export default RadioField;
