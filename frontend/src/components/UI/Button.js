import React from "react";

function Button({ children, type = "button", onClick, className }) {
  return (
    <button onClick={onClick} type={type} className={className}>
      {children}
    </button>
  );
}

export default Button;
