import React from "react";

function Button({ children, type = "button", onClick, className, disabled = false }) {
  return (
    <button
      className={`cursor-pointer ${disabled ? "bg-opacity-40" : "bg-opacity-100"} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
