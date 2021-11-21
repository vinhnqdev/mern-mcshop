import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      className="text-xl sm:text-2xl md:text-3xl font-semibold cursor-pointer tracking-wider lg:mr-5"
      to="/"
    >
      MCSHOP
    </Link>
  );
};

export default Logo;
