import React from "react";

function Button({ children, type = "button", onClick, className, disabled = false }) {
  return (
    <button
      className={`bg-black ${
        disabled ? "bg-opacity-40 cursor-not-allowed" : "bg-opacity-100 cursor-pointer"
      } text-lg text-white font-bold px-6 py-2 uppercase rounded-full`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
