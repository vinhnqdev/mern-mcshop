import React from "react";
import { useController } from "react-hook-form";

function CheckBoxField({ labelId, name, control, checkboxArray = [] }) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="space-y-1">
      {checkboxArray.map((checkbox) => (
        <div key={checkbox.value}>
          <input
            type="checkbox"
            id={labelId}
            onChange={field.onChange}
            onBlur={field.onBlur}
            checked={field.value}
            value={field.value}
          />
          <label htmlFor={labelId}>{checkbox.label}</label>
        </div>
      ))}

      {/** Error Message */}
      {error && <div className="text-sm mt-1 text-red-600">*{error?.message}</div>}
    </div>
  );
}

export default CheckBoxField;
